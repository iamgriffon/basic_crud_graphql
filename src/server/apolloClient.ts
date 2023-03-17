import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { useMemo } from 'react';


export const client = new ApolloClient({
  link: new HttpLink({uri: 'http:localhost:3000/api/graphql'}),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
});

  export const useApollo = () => useMemo(() => client, [])
