import { useEffect } from "react";

export const useHideMainScrollbar = (show = true) => {
  useEffect(() => {
    if (!show) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [show]);
};
