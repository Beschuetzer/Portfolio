import { useEffect } from "react";

type UseWindowSizeOnResize = () => void;
export const useOnWindowResize = (onResize: UseWindowSizeOnResize) => {
  useEffect(() => {
    window.addEventListener("resize", onResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
};
