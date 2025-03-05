const axios = require('axios');

export type GetGithubReposInput = {
 /**
   *This is used for pagination. It is the cursor that points to the end of the data that was returned in the previous request.
   **/
   endCursor?: string;
   /**
    *This is used for pagination. It is the number of items that you want to be returned in the response.
    **/
   pageSize?: number;
   topic: string;
};

export const GITHUB_REPOS_PAGE_SIZE_DEFAULT = 10;
export const GITHUB_END_CURSOR_DEFAULT = "";

export async function getGithubRepos(input: GetGithubReposInput) {
  try {
    const { endCursor = GITHUB_END_CURSOR_DEFAULT, pageSize = GITHUB_REPOS_PAGE_SIZE_DEFAULT, topic } = input;
    const repos = await axios.get(`/repos?pageSize=${pageSize}&topic=${topic}&endCursor=${endCursor}`);  
    return repos;
  }
  catch (err) {
    console.warn('error fetching github repos', err);
  }
}
