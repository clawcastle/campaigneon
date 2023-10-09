import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/routes.tsx';

const router = createBrowserRouter(routes);

const client = new ApolloClient({
  uri: import.meta.env.CAMPAIGNEON_GRAPHQL_SERVICE_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Auth0Provider domain="campaigneon.eu.auth0.com" clientId="0Hrfqnycryw5HJNCLUkYNIe9TW4txtjq" authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://campaigneon",
        scope: "read:campaigns"
      }}>
        <RouterProvider router={router} />
      </Auth0Provider>
    </ApolloProvider>
  </React.StrictMode>,
)
