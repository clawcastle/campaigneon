import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useMemo } from "react";

type GraphQlClientProviderProps = {
  children: React.ReactNode;
};

export const GraphQlClientProvider: React.FC<GraphQlClientProviderProps> = ({
  children,
}) => {
  const { getAccessTokenSilently } = useAuth0();

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: import.meta.env.CAMPAIGNEON_GRAPHQL_SERVICE_URL,
    });

    const authLink = setContext(async (_, { headers }) => {
      const token = await getAccessTokenSilently();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    return client;
  }, [getAccessTokenSilently]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
