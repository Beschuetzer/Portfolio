import { useState, useEffect, useRef, useCallback } from "react";
import { CarouselItemProps } from "../components/CarouselItem";
import { getIsVideo } from "../utils/utils";
import { USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL } from "../constants";

const CHECK_INTERVAL = 10;
export const useRecommendedAspectRatio = (items: CarouselItemProps[]) => {
    const [recommendedAspectRatio, setRecommendedAspectRatio] = useState(USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL);
    const lowestRatioRef = useRef(5);
    const imageCountRef = useRef(items.filter(item => !getIsVideo(item)).length || 0);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const intervalRef = useRef<any>();

    const setRatio = useCallback(() => {
        for (const image of imagesRef.current) {
            const ratio = image.height / image.width;
            if (ratio < lowestRatioRef.current) lowestRatioRef.current = ratio;
        }

        console.log({ lowestRatioRef: lowestRatioRef.current });
        setRecommendedAspectRatio(lowestRatioRef.current);
    }, [])
    
    useEffect(() => {
        for (const item of items) {
            try {                
                const image = new Image();
                image.src = item.srcMain || '';
                image.onload = () => {
                    // console.log({image});
                    imagesRef.current.push(image);
                }
            } catch (error) { }
        }

        intervalRef.current = setInterval(() => {
            // console.log({ imagesRefLength: imagesRef.current.length, imageCountRef: imageCountRef.current });
            if (imagesRef.current.length < imageCountRef.current) return;
            setRatio();
            clearInterval(intervalRef.current);
        }, CHECK_INTERVAL)

        return () => clearInterval(intervalRef.current);
    }, [items, setRatio])

    return recommendedAspectRatio;
}