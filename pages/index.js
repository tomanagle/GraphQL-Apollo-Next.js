import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import Nav from '../components/nav';
import JOBS_QUERY from '../graphql/jobs.query';

const Home = () => {
  // Create a query hook
  const { data, loading, error } = useQuery(JOBS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return JSON.stringify(error);
  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />

      {data.jobs.map(job => {
        return <li key={job.id}>{job.title}</li>;
      })}
    </div>
  );
};

export default Home;
