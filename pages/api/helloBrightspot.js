import { gql, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-unfetch'

export default async (req, res) => {

  const { previewId } = req.query;
  const variables = previewId != null ? { id: previewId } : {}
  variables.id = req.query.id
  variables.path = req.query.path

  const query = gql`
      query HelloBrightspot($id: ID, $path: String) {
        HelloBrightspot(id: $id, path: $path) {
          message
        }
      }
  `

  const client = new ApolloClient({
    link: createHttpLink({
        fetch,
        uri: process.env.GRAPHQL_URL,
        headers: {
          'X-API-Key': process.env.API_KEY
        }
      }
    ),
    cache: new InMemoryCache()
  })

  const data = await client.query({ query, variables })

  res.status(200).json(data)
}