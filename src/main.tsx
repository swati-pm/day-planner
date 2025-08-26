import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration: ServiceWorkerRegistration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError: Error) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
