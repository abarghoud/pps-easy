import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { useTheme } from '@pps-easy/ui/theme-provider';
import {
  ClientRecaptchaChecker,
  GoogleRecaptchaGenerator,
  LocalRecaptchaChecker,
} from '@pps-easy/recaptcha/google';

import { MainLayout } from './layout/MainLayout';
import { AuthLayout } from './layout/AuthLayout';
import { LoginFormPage } from './components/form/LoginFormPage';
import { routesConfig } from './routes/route';
import { PrivateRoute } from './routes/components/PrivateRoute';
import { GuestPage } from './components/GuestPage';
import { useAuth } from './hooks/useAuth';
import { AuthenticationContext } from './contexts/authentication-context';
import { FirebaseAuthenticationService } from './service/firebase-authentication-service';
import { PPSCertificateApiService } from './api/pps-certificate-api-service';
import {
  IRecaptchaChecker,
  IRecaptchaGenerator,
} from '@pps-easy/recaptcha/contracts';
import { LocalRecaptchaGenerator } from './service/local-recaptcha-generator';
import { LocalAuthenticationService } from './service/local-authentication-service';
import { ContactFormApiServiceContext } from './contexts/contact-form-api-context';
import { LocalContactFormApiService } from './api/local-contact-form-api-service';
import { FirebaseContactFormApiService } from './api/firebase-contact-form-api-service';
import { AuthenticationUserPersistenceHandler } from './service/authentication-user-persistence/authentication-user-persistence-handler';
import { useEffect, useMemo } from 'react';
import { FirebaseAuthenticationUserPersistenceRepository } from './service/authentication-user-persistence/firebase-authentication-user-persistence-repository';
import { LocalstorageAuthenticationUserPersistenceStateTracker } from './service/authentication-user-persistence/localstorage-authentication-user-persistence-state-tracker';
import { DoNothingUserPersistenceHandler } from './service/authentication-user-persistence/do-nothing-user-persistence-handler';
import { EventFormService } from './service/event-form-service';
import { EventFormServiceContext } from './contexts/event-form-service-context';
import { UserPersonalInfoFirebaseRepository } from '@pps-easy/user/data-access';
import { initDb } from './config/firebase';

export function App() {
  const { theme } = useTheme();
  const { loading } = useAuth();

  const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000',
  });
  const isLocalEnvironment = process.env.ENVIRONMENT === 'local';
  const googleRecaptchaGenerator: IRecaptchaGenerator = isLocalEnvironment
    ? new LocalRecaptchaGenerator()
    : new GoogleRecaptchaGenerator(
        process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''
      );
  const clientRecaptchaChecker: IRecaptchaChecker = isLocalEnvironment
    ? new LocalRecaptchaChecker()
    : new ClientRecaptchaChecker(axiosInstance);
  const authenticationService = isLocalEnvironment
    ? new LocalAuthenticationService()
    : new FirebaseAuthenticationService(
        clientRecaptchaChecker,
        googleRecaptchaGenerator
      );
  const contactFormApiService = isLocalEnvironment
    ? new LocalContactFormApiService()
    : new FirebaseContactFormApiService();
  const ppsCertificateApiService = new PPSCertificateApiService(
    axiosInstance,
    googleRecaptchaGenerator
  );
  const userUpdater = isLocalEnvironment
    ? new DoNothingUserPersistenceHandler()
    : new AuthenticationUserPersistenceHandler(
        authenticationService,
        new FirebaseAuthenticationUserPersistenceRepository(),
        new LocalstorageAuthenticationUserPersistenceStateTracker()
      );
  const personalInfoRepository = useMemo(
    () => new UserPersonalInfoFirebaseRepository(initDb(), authenticationService),
    [authenticationService]
  );
  const eventFormService = useMemo(
    () =>
      new EventFormService(ppsCertificateApiService, personalInfoRepository),
    [personalInfoRepository, ppsCertificateApiService]
  );

  useEffect(() => {
    userUpdater.init();
  }, [userUpdater]);

  return (
    <AuthenticationContext.Provider value={authenticationService}>
      <EventFormServiceContext.Provider value={eventFormService}>
        <ContactFormApiServiceContext.Provider value={contactFormApiService}>
          <div
            className={`
            min-h-screen flex flex-col justify-center ${
              theme === 'dark' ? 'bg-background dark:bg-background' : 'bg-white'
            } ${loading ? 'items-center' : ''}
          `}
          >
            <Routes>
              <Route path="/login" element={<AuthLayout />}>
                <Route path="" element={<LoginFormPage />} />
              </Route>

              <Route path="/generate-certificate" element={<GuestPage />} />

              <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  {routesConfig.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
              </Route>
            </Routes>
          </div>
        </ContactFormApiServiceContext.Provider>
      </EventFormServiceContext.Provider>
    </AuthenticationContext.Provider>
  );
}

export default App;
