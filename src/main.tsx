import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from './contexts/AuthContext';

// Preload critical routes and assets
const preloadCriticalAssets = () => {
  // Preload critical routes
  const routes = [
    '/pages/Inicio',
    '/pages/Refugios',
    '/pages/Adoptar',
    '/pages/Mascota'
  ];
  
  // Preload critical styles
  const styles = [
    '/src/index.css',
    '/src/styles/mobile.css',
    '/src/App.css'
  ];

  // Preload routes
  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = route;
    document.head.appendChild(link);
  });

  // Preload styles
  styles.forEach(style => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = style;
    link.as = 'style';
    document.head.appendChild(link);
  });
};

// Initialize preloading
preloadCriticalAssets();

// Styles - Load in parallel
const stylePromises = [
  import('./index.css'),
  import('./styles/mobile.css'),
  import('bootstrap/dist/css/bootstrap.min.css'),
  import('bootstrap-icons/font/bootstrap-icons.css')
];

// Load styles in parallel
Promise.all(stylePromises).then(() => {
  // Initialize app after styles are loaded
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
});