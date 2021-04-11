import { GraphQLClient, gql } from 'graphql-request'

export default async function github(queryAsInterpolatedString) {
  const endpoint = 'https://api.github.com/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB}`,
    },
  })

  const data = await graphQLClient.request(gql`${queryAsInterpolatedString}`)
  return data;
}
