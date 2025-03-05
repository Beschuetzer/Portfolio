import { useCallback, useEffect } from "react";
import { LIVE_BRIDGE_URL, LIVE_REPLAYS_URL } from "../components/constants";

const NUMBER_OF_MINUTES = .1;
const PING_INTERVAL = 60 * 1000 * NUMBER_OF_MINUTES;
const GROCIFY_BFF_URL = "https://grocify-bff-ac27c2662495.herokuapp.com/";
const URLS_TO_PING = [
  `${GROCIFY_BFF_URL}/ping`,
  LIVE_BRIDGE_URL,
  LIVE_REPLAYS_URL,
];

export const useAwakenSleepingContainers = () => {
  const makeCalls = useCallback(async () => {
    const promises = [];
    for (const url of URLS_TO_PING) {
      promises.push(
        fetch(url, {
          mode: "no-cors",
        })
      );
    }
    await Promise.allSettled(promises);
  }, []);

  useEffect(() => {
    makeCalls();
    setInterval(() => {
      (async () => {
        await makeCalls();
      })();
    }, PING_INTERVAL);
  }, [makeCalls]);
};
