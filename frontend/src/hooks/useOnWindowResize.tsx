import { useEffect } from "react";

export const useOnWindowResize = (onResize: () => void) => {
 useEffect(() => {
    console.log('add event listener');
     window.addEventListener("resize", onResize);
     onResize();
     return () => {
        console.log('removing event listener');

       window.removeEventListener("resize", onResize);
     };
   }, [onResize]);
};
