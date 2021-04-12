const axios = require('axios');

export default async function github(queryAsInterpolatedString) {
  try {

    const repos = await axios.get('/repos', { params: { query: queryAsInterpolatedString } });  
    console.log('repos =', repos);
    return repos;
  }
  catch (err) {
    console.log('error in github------------------------------------------------');
    console.log('err =', err);
  }
}
