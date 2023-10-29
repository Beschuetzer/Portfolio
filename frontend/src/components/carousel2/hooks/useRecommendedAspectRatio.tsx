import { useState, useEffect, useRef, useCallback } from "react";
import { CarouselItemProps } from "../components/CarouselItem";
import { CAROUSEL_MAX_HEIGHT_DEFAULT, CLASSNAME__CAROUSEL_ITEM, CLASSNAME__CAROUSEL_ITEMS_CONTAINER, CLASSNAME__NAVIGATION, USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL } from "../constants";
import { useBusinessLogic } from "./useBusinessLogic";
import { getIsItemOfType } from "../utils/getIsItemOfType";
import { SpacingDirection, CarouselSection } from "../types";

const CHECK_INTERVAL = 10;

/**
*Calculates the recommended aspect ratio based on the items given.  
*Only runs if {@link OptionsLogic.itemViewerUseRecommendedAspectRatio itemViewerUseRecommendedAspectRatio} is `true`.
**/

//todo: modify useRecommendedAspectRatio to check for an image and only count it in the total if it is either an image (srcMain) or has a thumbnail.  Prefer srcMain for images and srcThumbnail for everything else
export const useRecommendedAspectRatio = (items: CarouselItemProps[]) => {
    const [recommendedAspectRatio, setRecommendedAspectRatio] = useState(USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL);
    const lowestRatioRef = useRef(5);
    const hasStartedRef = useRef(false);
    const imageCountRef = useRef(items.length);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const intervalRef = useRef<any>();
    const { optionsLogic } = useBusinessLogic();

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
        if (hasStartedRef.current || !optionsLogic.itemViewerUseRecommendedAspectRatio) return;
        if (optionsLogic.maxHeight !== CAROUSEL_MAX_HEIGHT_DEFAULT) {
            const navigationContainer = optionsLogic.carouselContainerRef?.current?.querySelector(`.${CLASSNAME__NAVIGATION}`);
            const navigationHeight = navigationContainer?.getBoundingClientRect().height || 0;
            const itemsContainer = optionsLogic.carouselContainerRef?.current?.querySelector(`.${CLASSNAME__CAROUSEL_ITEMS_CONTAINER}`) as HTMLElement;
            const itemsContainerHeight = itemsContainer.getBoundingClientRect().height || 0;
            const carouselItem = (optionsLogic.carouselContainerRef?.current?.querySelector(`.${CLASSNAME__CAROUSEL_ITEM}`) as HTMLElement);
            const carouselItemMarginTop = parseInt(getComputedStyle(carouselItem)?.marginTop, 10) || 0;
            
            if (!navigationHeight || !itemsContainerHeight || !carouselItemMarginTop) return;
            // console.log({ navigationHeight, itemsContainerHeight, carouselItem, carouselItemMarginTop });
            
            const paddingTop = optionsLogic.getPaddingAmount(SpacingDirection.top, CarouselSection.container);
            const paddingBottom = optionsLogic.getPaddingAmount(SpacingDirection.bottom, CarouselSection.container);
            const containerWidth = optionsLogic.carouselContainerRef?.current?.getBoundingClientRect().width || 0;
            const paddingLeft = optionsLogic.getPaddingAmount(SpacingDirection.left, CarouselSection.container);
            const paddingRight = optionsLogic.getPaddingAmount(SpacingDirection.right, CarouselSection.container);
            const maxItemHeight = optionsLogic.maxHeight - navigationHeight - paddingBottom - paddingTop - itemsContainerHeight - carouselItemMarginTop;

            hasStartedRef.current = true;
            setRecommendedAspectRatio(maxItemHeight / (containerWidth - paddingLeft - paddingRight));
            return;
        }

        hasStartedRef.current = true;

        //load the images
        for (const item of items) {
            try {
                const isImage = getIsItemOfType(item, 'image');
                const imageSrc = (isImage ? item.srcMain as string : item.srcThumbnail) || '';
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

        return () => {
            clearInterval(intervalRef.current);
            hasStartedRef.current = false;
        }
    }, [items, optionsLogic, setRatio])

    return recommendedAspectRatio;
}