const axios = require('axios');

export default async function github(queryAsInterpolatedString) {
  const repos = await axios.get('/repos');  

  console.log('repos =', repos);
  return repos;
}
