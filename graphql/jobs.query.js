import gql from 'graphql-tag';

const JOBS_QUERY = gql`
  query Jobs {
    jobs {
      id
      title
    }
  }
`;

export default JOBS_QUERY;
