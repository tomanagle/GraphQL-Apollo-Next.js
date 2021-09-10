import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/client/react/ssr';
import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true
});

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    link: persistedQueriesLink.concat(
      createHttpLink({
        fetch, // Switches between unfetch & node-fetch for client & server.
        uri: process.env.GRAPHQL_URL,
        headers: {
          'X-API-Key': process.env.API_KEY
        }
      })
    ),
    cache: new InMemoryCache()
      // rehydrate the cache using the initial data passed from the server:
      .restore(initialState || {})
  });
})(MyApp, { getDataFromTree });
