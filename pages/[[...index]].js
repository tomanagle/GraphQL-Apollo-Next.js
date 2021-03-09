import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useHelloBrightspotQuery } from '../generated/graphql';

const Home = () => {
  const router = useRouter();
  const { index, previewId } = router.query;
  const VARIABLES =
    previewId != null ? { id: previewId } : { path: '/' + index };

  const { data, loading, error } = useHelloBrightspotQuery({
    variables: VARIABLES
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (!data?.HelloBrightspot) {
    return <div>404</div>;
  }

  return (
    <div>
      <Head>
        <title>{data?.HelloBrightspot?.message}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{data?.HelloBrightspot?.message}</h1>
    </div>
  );
};

export default Home;
