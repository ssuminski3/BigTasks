import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from './auth/Auth0ProviderWithNavigation.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
  ,
)
