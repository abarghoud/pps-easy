import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { routesConfig } from "./routes/route";
import { useIsLoginPage } from './hooks/useIsLoginPage';

export function App() {
  const isLoginPage = useIsLoginPage();

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {isLoginPage ? (
          <Route path="/" element={<AuthLayout />}>
            {routesConfig.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        ) : (
          <Route path="/" element={<MainLayout />}>
            {routesConfig.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
