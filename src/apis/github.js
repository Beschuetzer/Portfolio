import { githubKey } from './keys';
import { GraphQLClient, gql } from 'graphql-request'

export default async function github(query) {
  const endpoint = 'https://api.github.com/graphql'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: githubKey,
    },
  })

  const data = await graphQLClient.request(gql`${query}`)
  console.log(JSON.stringify(data, undefined, 2))
  return data;
}
