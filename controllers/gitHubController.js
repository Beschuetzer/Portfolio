exports.githubController= (req, res) => {
  rimport { GraphQLClient, gql } from 'graphql-request'
  const endpoint = 'https://api.github.com/graphql'
  
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `bearer ${gitHubAPIKey}`,
      },
    })
  
    const data = await graphQLClient.request(gql`${queryAsInterpolatedString}`)
    res.send(data);
};
