import { useState, useLayoutEffect } from "react";
import { useCarouselContext } from "../context";
import { useRenderCount as useRenderCountRef } from "./useRenderCountRef";

//this is a hack to get the image/video to re-render after exiting full screen when 'itemDisplayLocation' is not 'none'
export const useRerenderOnExitFullscreenMode = () => {
    const { isFullscreenMode } = useCarouselContext();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setShouldRerender] = useState(false);
    const countRef = useRenderCountRef();
    
    useLayoutEffect(() => {
        if (isFullscreenMode || countRef.current <= 0) return;
        setTimeout(() => {
            setShouldRerender((current) => !current);
        }, 1)
    }, [isFullscreenMode, countRef])
}