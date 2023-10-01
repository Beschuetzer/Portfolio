import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { CarouselItemProps } from "../components/CarouselItem";
import { USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL } from "../constants";
import { useBusinessLogic } from "./useBusinessLogic";
import { getIsItemOfType } from "../utils/getIsItemOfType";

const CHECK_INTERVAL = 10;

/**
*Calculates the recommended aspect ratio based on the items given.  
*Only runs if {@link OptionsLogic.itemViewerUseRecommendedAspectRatio itemViewerUseRecommendedAspectRatio} is `true`.
**/

//todo: modify useRecommendedAspectRatio to check for an image and only count it in the total if it is either an image (srcMain) or has a thumbnail.  Prefer srcMain for images and srcThumbnail for everything else
export const useRecommendedAspectRatio = (items: CarouselItemProps[]) => {
    const [recommendedAspectRatio, setRecommendedAspectRatio] = useState(USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL);
    const lowestRatioRef = useRef(5);
    const imageCountRef = useRef(items.length);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const intervalRef = useRef<any>();
    const {optionsLogic} = useBusinessLogic();

    const setRatio = useCallback(() => {
        for (const image of imagesRef.current) {
            const ratio = image.height / image.width;
            // console.log({width: image.width, height: image.height, ratio, src: image.currentSrc});
            if (ratio < lowestRatioRef.current) lowestRatioRef.current = ratio;
        }

        // console.log({ lowestRatioRef: lowestRatioRef.current });
        setRecommendedAspectRatio(lowestRatioRef.current);
    }, [])
    
    useEffect(() => {
        if (!optionsLogic.itemViewerUseRecommendedAspectRatio) return;

        //load the images
        for (const item of items) {
            try {         
                const isImage = getIsItemOfType(item, 'image');
                const imageSrc = (isImage ? item.srcMain : item.srcThumbnail)|| '';
                const image = new Image();
                image.src = imageSrc;
                image.onload = () => {
                    const itemToPush = imageSrc ? image : { width: 1, height: Number.MAX_SAFE_INTEGER } as any;
                    imagesRef.current.push(itemToPush);
                }
            } catch (error) { }
        }

        // console.log({ imagesRefLength: imagesRef.current.length, imageCountRef: imageCountRef.current });
        //run calculation after all images loaded
        intervalRef.current = setInterval(() => {
            // console.log({ imagesRefLength: imagesRef.current.length, imageCountRef: imageCountRef.current });
            if (imagesRef.current.length < imageCountRef.current) return;
            setRatio();
            clearInterval(intervalRef.current);
        }, CHECK_INTERVAL)

        return () => clearInterval(intervalRef.current);
    }, [items, optionsLogic.itemViewerUseRecommendedAspectRatio, setRatio])

    return recommendedAspectRatio;
}