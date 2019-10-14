import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const client = new ApolloClient({
  // Provide required constructor fields
  cache: new InMemoryCache(),
  link: createHttpLink({
    fetch,
    uri: 'https://api.graphql.jobs/'
  }),

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});

export default client;
