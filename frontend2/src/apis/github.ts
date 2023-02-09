const axios = require('axios');

export default async function github(query: string) {
  try {
    const repos = await axios.get('/repos', { params: { query: query } });  
    return repos;
  }
  catch (err) {
    console.log('error in github------------------------------------------------');
    console.log('err =', err);
  }
}
