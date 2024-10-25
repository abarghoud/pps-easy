import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { LoginFormPage } from "./components/form/LoginFormPage";
import { routesConfig } from "./routes/route";
import { PrivateRoute } from "./routes/components/PrivateRoute";
import { useTheme } from "@pps-easy/ui/theme-provider";

export function App() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-background dark:bg-background" : "bg-white"}`}>
      <Routes>
        <Route path="/login" element={<AuthLayout />}>
          <Route path="" element={<LoginFormPage />} />
        </Route>

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
