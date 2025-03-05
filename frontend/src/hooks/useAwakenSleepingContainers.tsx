import { useEffect } from "react";
import { LIVE_BRIDGE_URL, LIVE_REPLAYS_URL } from "../components/constants";

export const useAwakenSleepingContainers = () => {
     useEffect(() => {
        (async () => {
          // Trigger a call to the URL behind the scenes
          const bridgeUrlPromise = fetch(LIVE_BRIDGE_URL, {
            mode: "no-cors",
          });
          const replaysUrlPromise = fetch(LIVE_REPLAYS_URL, {
            mode: "no-cors",
          });
          await Promise.all([bridgeUrlPromise, replaysUrlPromise]);
        })();
      }, []);
}