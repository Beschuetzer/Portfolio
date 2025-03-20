import { useEffect } from "react";

export const useOnWindowResize = (onResize: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
};
