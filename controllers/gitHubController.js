// import { GraphQLClient, gql } from 'graphql-request';
const { GraphQLClient, gql } = require('graphql-request');

exports.githubController = async (req, res) => {
  const { topic, pageSize = 10, endCursor = '' } = req.query;
  const endpoint = 'https://api.github.com/graphql';
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB}`
    }
  });

  try {
    const endCursorToUse = endCursor === '' ? '' : endCursor.replace(/"/g, '');
    const data = await graphQLClient.request(gql`
      query() {
        search(query: "user:beschuetzer topic:${topic}", type: REPOSITORY, first: ${pageSize}, after:"${endCursorToUse}") {
            nodes {
                ... on Repository {
                    createdAt
                    description
                    name
                    updatedAt                            
                    homepageUrl
                    url
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
      }
      `);
    res.send(data);
  } catch (err) {
    const statusCode = err?.response?.status === 200 ? 400 : 500;
    res.status(statusCode).send(err);
  }
};
