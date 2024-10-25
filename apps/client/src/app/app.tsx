import { Routes, Route } from "react-router-dom";
import { FirebaseAuthenticationService } from './service/firebase-authentication-service';
import { auth } from "./config/firebase";
import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { LoginFormPage } from "./components/form/LoginFormPage";
import { routesConfig } from "./routes/route";
import { PrivateRoute } from "./routes/components/PrivateRoute";
import { useTheme } from "@pps-easy/ui/theme-provider";
import { GuestPage } from "./components/GuestPage";
import { useAuth } from "./hooks/useAuth";

export function App() {
  const authService = new FirebaseAuthenticationService(auth);

  const { theme } = useTheme();
  const { loading } = useAuth(authService);

  return (
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
  );
}

export default App;
