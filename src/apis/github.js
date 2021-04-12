const axios = require('axios');

export default async function github(queryAsInterpolatedString) {
  const repos = await axios.get('http://adammajor.herokuapp.com/repos', { params: { query: queryAsInterpolatedString } });  

  console.log('repos =', repos);
  return repos;
}
