// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselItemDisplayLocation, CarouselLayoutOptions } from "../types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselVideo } from '../components/CarouselVideo';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselImage } from '../components/CarouselImage';
import { useState, useLayoutEffect } from "react";
import { useCarouselContext } from "../context";
import { useRenderCount as useRenderCountRef } from "./useRenderCountRef";

/**
*This is a hack to get the image/video to re-render after exiting full screen when {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none}}.
*the issue seems to stem from the fact that the height of the `itemViewer`
*depends on the `toolbarRef` but the toolbar is a child of 
*{@link CarouselVideo}/{@link CarouselImage}, so the style is calculated before the child has finished rendering.
**/
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