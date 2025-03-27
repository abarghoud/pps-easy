import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@pps-easy/ui/theme-provider';

import App from './app/app';

if (
  window.location.hostname !== "pps-easy.fr" &&
  window.location.hostname !== 'www.pps-easy.fr' &&
  window.location.hostname !== 'localhost'
) {
  window.location.replace("https://www.pps-easy.fr" + window.location.pathname + window.location.search);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
