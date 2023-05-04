import { useEffect } from "react";
import { useCarouselContext } from "../context"
import { StylingLogic } from "../business-logic/StylingLogic";

export type UseBusinessLogicResponse = {

}

export const useBusinessLogic = (): UseBusinessLogicResponse => {
    const {
        options,
        currentItem,
        currentItemIndex,
        elementStylings,
        isFullscreenMode,
        items,
        numberOfPages
    } = useCarouselContext();
    const stylingLogic = new StylingLogic({options, currentItem, isFullscreenMode, })

    useEffect(() => {

    }, [third])


    return {

    }
}