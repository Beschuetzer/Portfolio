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

export type GithubRepository = {
  createdAt: string;
  description: string;
  name: string;
  updatedAt: string;
  homepageUrl: string;
  url: string;
}

export type GithubPageInfo = {
  endCursor: string;
  hasNextPage: boolean;
}

export type GetGithubReposResponse = {
  search: {
    nodes: GithubRepository[];
    pageInfo: GithubPageInfo;
  };
}

export const GITHUB_REPOS_PAGE_SIZE_DEFAULT = 10;
export const GITHUB_END_CURSOR_DEFAULT = "";

export async function getGithubRepos(input: GetGithubReposInput): Promise<GetGithubReposResponse | null> {
  try {
    const { endCursor = GITHUB_END_CURSOR_DEFAULT, pageSize = GITHUB_REPOS_PAGE_SIZE_DEFAULT, topic } = input;
    const response = await fetch(`/repos?pageSize=${pageSize}&topic=${topic}&endCursor=${endCursor}`);  
    if (!response.ok) {
      throw new Error(`getGithubRepos failed with status ${response.status}`);
    }
    const data = await response.json();
    return data as GetGithubReposResponse;
  }
  catch (err) {
    console.warn('error fetching github repos', err);
    return null;
  }
}
