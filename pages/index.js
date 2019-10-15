import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import JOBS_QUERY from '../graphql/jobs.query';

const Home = () => {
  // Create a query hook
  const { data, loading, error } = useQuery(JOBS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data.jobs.map(job => {
          return <li key={`job__${job.id}`}>{job.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
