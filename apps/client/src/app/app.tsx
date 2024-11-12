import { Routes, Route } from "react-router-dom";
import axios from 'axios';

import { useTheme } from "@pps-easy/ui/theme-provider";
import { ClientRecaptchaChecker, GoogleRecaptchaGenerator, LocalRecaptchaChecker } from '@pps-easy/recaptcha/google';

import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { LoginFormPage } from "./components/form/LoginFormPage";
import { routesConfig } from "./routes/route";
import { PrivateRoute } from "./routes/components/PrivateRoute";
import { GuestPage } from "./components/GuestPage";
import { useAuth } from "./hooks/useAuth";
import { AuthenticationContext } from './contexts/authentication-context';
import { FirebaseAuthenticationService } from './service/firebase-authentication-service';
import { PPSCertificateApiContext } from './contexts/pps-certificate-api-context';
import { PPSCertificateApiService } from './api/pps-certificate-api-service';
import { IRecaptchaChecker, IRecaptchaGenerator } from '@pps-easy/recaptcha/contracts';
import { LocalRecaptchaGenerator } from './service/local-recaptcha-generator';
import { LocalAuthenticationService } from './service/local-authentication-service';
import { ContactFormApiServiceContext } from './contexts/contact-form-api-context';
import { LocalContactFormApiService } from './api/local-contact-form-api-service';
import { FirebaseContactFormApiService } from './api/firebase-contact-form-api-service';

export function App() {
  const { theme } = useTheme();
  const { loading } = useAuth();
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000',
  });
  const isLocalEnvironment = process.env.ENVIRONMENT === 'local';
  const googleRecaptchaGenerator: IRecaptchaGenerator = isLocalEnvironment ?
    new LocalRecaptchaGenerator() :
    new GoogleRecaptchaGenerator(process.env.REACT_APP_RECAPTCHA_SITE_KEY || '');
  const clientRecaptchaChecker: IRecaptchaChecker = isLocalEnvironment ?
    new LocalRecaptchaChecker() :
    new ClientRecaptchaChecker(axiosInstance);
  const authenticationService = isLocalEnvironment ?
    new LocalAuthenticationService() :
    new FirebaseAuthenticationService(clientRecaptchaChecker, googleRecaptchaGenerator);
  const contactFormApiService = isLocalEnvironment ?
    new LocalContactFormApiService() :
    new FirebaseContactFormApiService();
  const ppsCertificateApiService = new PPSCertificateApiService(axiosInstance, googleRecaptchaGenerator)

  return (
    <AuthenticationContext.Provider value={authenticationService}>
      <PPSCertificateApiContext.Provider value={ppsCertificateApiService}>
        <ContactFormApiServiceContext.Provider value={contactFormApiService}>
          <div className={`
            min-h-screen flex flex-col justify-center ${theme === "dark" ? "bg-background dark:bg-background" : "bg-white"} ${loading ? "items-center" : ""}
          `}>
            <Routes>
              <Route path="/login" element={<AuthLayout />}>
                <Route path="" element={<LoginFormPage />} />
              </Route>

              <Route path="/generate-certificate" element={<GuestPage />} />

              <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  {routesConfig.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                </Route>
              </Route>
            </Routes>
          </div>
        </ContactFormApiServiceContext.Provider>
      </PPSCertificateApiContext.Provider>
    </AuthenticationContext.Provider>
  );
}

export default App;
