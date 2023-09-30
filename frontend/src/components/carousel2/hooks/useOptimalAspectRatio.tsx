import { useState, useEffect, useRef } from "react";
import { CarouselItemProps } from "../components/CarouselItem";

export const useOptimalAspectRatio = (items: CarouselItemProps[]) => {
    const [optimalAspectRatio, setOptimalAspectRatio] = useState(Number.MAX_SAFE_INTEGER);
    const timeoutRef = useRef<any>();

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            let lowestRatio = Number.MAX_VALUE;
            for (const item of items) {
                try {
                    const image = new Image();
                    image.src = item.srcThumbnail || '';
                    const ratio = image.height / image.width;
                    console.log({ src: item.srcThumbnail, imageWidth: image.width, imageHeight: image.height });
                    if (ratio < lowestRatio) lowestRatio = ratio;
                } catch (error) { }
            }
            console.log({lowestRatio});
            
            setOptimalAspectRatio(lowestRatio);
        }, 1)

        return () => clearTimeout(timeoutRef.current);
    }, [items])

    return optimalAspectRatio;
}