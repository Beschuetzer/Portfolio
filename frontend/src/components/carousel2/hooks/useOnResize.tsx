import { useRef, useLayoutEffect } from "react";
import { WINDOW_RESIZE_DEBOUNCE } from "../constants";

export const useOnResize = (onResize: (viewPortWidth: number) => void) => {
    const resizeIntervalRef = useRef<any>(-1);
    const lastWidthRef = useRef(-1);

    useLayoutEffect(() => {
        function handleResize() {
            clearInterval(resizeIntervalRef.current);
            resizeIntervalRef.current = setInterval(() => {
                const windowWidth = window.innerWidth;
                if (windowWidth === lastWidthRef.current) return;
                onResize && onResize(windowWidth);
                lastWidthRef.current = windowWidth
                clearInterval(resizeIntervalRef.current)                
            }, WINDOW_RESIZE_DEBOUNCE)
        }
        
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [onResize])
}