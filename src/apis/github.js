import { githubKey } from './keys';
import { GraphQLClient, gql } from 'graphql-request'

export default async function github(queryAsInterpolatedString) {
  const endpoint = 'https://api.github.com/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${githubKey}`,
    },
  })

  const data = await graphQLClient.request(gql`${queryAsInterpolatedString}`)
  return data;
}
