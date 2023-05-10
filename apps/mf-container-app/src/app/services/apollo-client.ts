// import { ApolloClient } from "@apollo/client";
import { ApolloClient, NormalizedCacheObject, ApolloLink, from, InMemoryCache, split, HttpLink } from '@apollo/client';
// import { getMainDefinition } from "apollo-utilities";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { getMainDefinition } from '@apollo/client/utilities';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL as string || 'http://localhost:5001/graphql';
const SUBSCRIPTION_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION as string;

interface Definintion {
  kind: string;
  operation?: string;
}

export class CudoApolloClient extends ApolloClient<NormalizedCacheObject> {
  private static isBrowser = typeof window !== 'undefined';

  constructor() {
    super({
      link: from([CudoApolloClient.authMiddleware(), CudoApolloClient.links]),
      ssrMode: true,
      cache: CudoApolloClient.configureCache(),
    });
  }

  private static authMiddleware = () =>
    new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        // headers: {
        //   ...headers,
        //   Authorization: CudoApolloClient.getToken(),
        // },
      }));

      return forward(operation);
    });

  private static configureCache = (): InMemoryCache => new InMemoryCache();

  private static configureWebSocketLink = () =>
    new GraphQLWsLink(
      createClient({
        url: SUBSCRIPTION_ENDPOINT,
      })
    );

  private static configureHttpLink = () =>
    new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    });

  // private static getToken = (): string => {
  //   const token = Cookies.get(CookieNames.TOKEN);

  //   return token ? `Bearer ${token}` : '';
  // };

  private static get links() {
    return typeof window !== 'undefined' && CudoApolloClient.configureWebSocketLink() != null
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            const { kind, operation }: Definintion = getMainDefinition(query);

            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
            // return kind === "OperationDefinition" && operation === "subscription";
          },
          CudoApolloClient.configureWebSocketLink(),
          CudoApolloClient.configureHttpLink()
        )
      : CudoApolloClient.configureHttpLink();
  }
}
