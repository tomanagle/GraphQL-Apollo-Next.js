import { gql } from '@apollo/client';

export const GET_HELLO_BRIGHTSPOT = gql`
  query HelloBrightspot($id: ID, $path: String) {
    HelloBrightspot(id: $id, path: $path) {
      message
    }
  }
`;
