import { useState, useEffect } from "react";
import { GITHUB_END_CURSOR_DEFAULT, GetGithubReposInput, GITHUB_REPOS_PAGE_SIZE_DEFAULT, getGithubRepos } from "../apis/github";

export const useGithubData = (input: GetGithubReposInput) => {
  const { endCursor = GITHUB_END_CURSOR_DEFAULT, pageSize = GITHUB_REPOS_PAGE_SIZE_DEFAULT, topic } = input;
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getGithubRepos({ endCursor, pageSize, topic });
        if (response.status !== 200) {
          throw new Error("Error fetching github repos");
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [endCursor, pageSize, topic]);

  return { data, loading, error };
};
