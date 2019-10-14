import React from 'react';
import App from 'next/app';
import ApolloClient from 'apollo-client';
import client from '../util/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloClient>
        <Component {...pageProps} />
      </ApolloClient>
    );
  }
}

export default MyApp;
