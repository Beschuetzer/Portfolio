// import { GraphQLClient, gql } from 'graphql-request';
const { GraphQLClient, gql } = require('graphql-request');


const query =
`query {
  viewer {
    repositories(first:50) {
      nodes {
        createdAt
        description
        name
        updatedAt
        repositoryTopics(first:50) {
          nodes {
            topic {
              name
            }
          }
        }
        homepageUrl
        url
      }
    }
  }
}`;

exports.githubController = async (req, res) => {
  console.log('req.params =', req.params);
  console.log('process.env.REACT_APP_GITHUB =', process.env.REACT_APP_GITHUB);
  const endpoint = 'https://api.github.com/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB}`,
    },
  })

  try {
    const data = await graphQLClient.request(gql`${req.params.query}`)
    res.send(data);
  }
  catch (err) {
    console.log('err =', err);
  }
};
