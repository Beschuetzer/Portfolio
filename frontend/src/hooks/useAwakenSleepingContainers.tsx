import { useCallback, useEffect, useRef } from "react";

const NUMBER_OF_MINUTES = 8;
const PING_INTERVAL = 60 * 1000 * NUMBER_OF_MINUTES;

export const useAwakenSleepingContainers = (urls: string[], pingIntervalInMs = PING_INTERVAL) => {
  const intervalRef = useRef<any>(null);

  const makeCalls = useCallback(async () => {
    const promises = [];
    for (const url of urls) {
      console.log(`Pinging '${url}'...`);
      promises.push(
        fetch(url, {
          mode: "no-cors",
        })
      );
    }
    await Promise.allSettled(promises);
  }, [urls]);

  useEffect(() => {
    makeCalls();
    intervalRef.current = setInterval(() => {
      (async () => {
        await makeCalls();
      })();
    }, pingIntervalInMs);

    return () => {
      clearInterval(intervalRef.current);
    }
  }, [makeCalls, pingIntervalInMs]);
};
