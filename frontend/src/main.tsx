import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/routes.tsx';
import { GraphQlClientProvider } from './GraphQlClientProvider.tsx';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider domain="campaigneon.eu.auth0.com" clientId="0Hrfqnycryw5HJNCLUkYNIe9TW4txtjq" authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://campaigneon",
      scope: "read:campaigns"
    }}>
      <GraphQlClientProvider>
        <RouterProvider router={router} />
      </GraphQlClientProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
