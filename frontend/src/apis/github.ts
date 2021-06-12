import { Repository } from "../components/Skills/utils";

const axios = require('axios');

let reposCached: Repository;

export default async function github(query: string) {
  try {
    if (reposCached) {
      console.log('returning cached repos------------------------------------------------');
      return reposCached
    }
    const repos = await axios.get('/repos', { params: { query: query } });  
    console.log('repos =', repos);
    reposCached = repos;
    return repos;
  }
  catch (err) {
    console.log('error in github------------------------------------------------');
    console.log('err =', err);
  }
}
