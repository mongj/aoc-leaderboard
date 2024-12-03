import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import Cookies from 'js-cookie';
import './style.css';
import App from './App.tsx';

// Set the cookie before rendering the app
Cookies.set('session', import.meta.env.VITE_AOC_SESSION_COOKIE, {
  secure: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
