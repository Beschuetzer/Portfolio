import { useEffect, useState } from "react";
import {
  getGithubRepos,
  GetGithubReposInput,
  GetGithubReposResponse,
} from "../apis/github";

type UseGithubReposResponse = GetGithubReposResponse | null;

type UseGithubReposInput = GetGithubReposInput & {
  onSuccess?: (data: UseGithubReposResponse) => void;
  onError?: (error: Error) => void;
};

export const useGithubRepos = (input: UseGithubReposInput) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UseGithubReposResponse>(null);
  const { onError, onSuccess, topic, pageSize, endCursor } = input;

  useEffect(() => {
    (async () => {
      if (!topic) return;
      try {
        setIsLoading(true);
        setError(null);
        const response = await getGithubRepos({
          topic,
          pageSize,
          endCursor,
        });
        setData(response);
        onSuccess && onSuccess(response);
      } catch (error) {
        setError(error as Error);
        onError && onError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [onError, onSuccess, topic, pageSize, endCursor]);

  return { isLoading, error, data };
};
