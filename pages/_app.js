import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../util/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default MyApp;
