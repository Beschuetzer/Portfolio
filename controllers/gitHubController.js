// import { GraphQLClient, gql } from 'graphql-request';
const { GraphQLClient, gql } = require('graphql-request');

exports.githubController = async (req, res) => {
  const endpoint = 'https://api.github.com/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB}`,
    },
  })

  try {
    const data = await graphQLClient.request(gql`${req.query.query}`)
    res.send(data);
  }
  catch (err) {
    console.log('err =', err);
  }
};
