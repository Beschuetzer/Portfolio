import { useEffect } from "react";
import { LIVE_BRIDGE_URL, LIVE_REPLAYS_URL } from "../components/constants";

const NUMBER_OF_MINUTES = 10;
const PING_INTERVAL = 60 * 1000 * NUMBER_OF_MINUTES;
const GROCIFY_BFF_URL = "https://grocify-bff-ac27c2662495.herokuapp.com/";
const URLS_TO_PING = [
  GROCIFY_BFF_URL,
  LIVE_BRIDGE_URL,
  LIVE_REPLAYS_URL,
];

export const useAwakenSleepingContainers = () => {
  useEffect(() => {
    setInterval(() => {
      (async () => {
        const promises = [];
        for (const url of URLS_TO_PING) {
          promises.push(fetch(url, {
            mode: "no-cors",
          }));
        }
        await Promise.all(promises);
      })();
    }, PING_INTERVAL);
  }, []);
};
