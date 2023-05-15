import { useEffect, useState } from "react";
import { CarouselContextOutputProps, useCarouselContext } from "../context"
import { StylingLogic, StylingLogicConstructor } from "../business-logic/StylingLogic";
import { ToolbarLogic, ToolbarLogicConstructor } from "../business-logic/ToolbarLogic";
import { OptionsLogic, OptionsConstructor } from "../business-logic/OptionsLogic";
import { ToolbarActionsLogic, ToolbarActionsLogicConstructor } from "../business-logic/ToolbarActionsLogic";
import { CarouselProps } from "../components/Carousel";

export type UseBusinessLogicResponse = {
    optionsLogic: OptionsLogic;
    stylingLogic: StylingLogic;
    toolbarLogic: ToolbarLogic;
    toolbarActionsLogic: ToolbarActionsLogic;
}

export type UseBusinessLogicInput = {
    options?: CarouselProps["options"];
} & Partial<
    Omit<
        OptionsConstructor &
        StylingLogicConstructor &
        ToolbarActionsLogicConstructor &
        ToolbarLogicConstructor,
        keyof CarouselContextOutputProps | 'optionsLogic'
    >
>

export const useBusinessLogic = ({
    isCurrentItem,
    itemViewerToolbarRef,
    loadingSpinnerOptions,
    options: optionsInput,
    progressBarValue,
    videoModalRef,
    videoRef
}: UseBusinessLogicInput): UseBusinessLogicResponse => {
    const {
        // carouselContainerRef,
        currentItem,
        currentItemIndex,
        // elementStylings,
        isFullscreenMode,
        items,
        numberOfPages,
        options: optionsGlobal,
    } = useCarouselContext();
    const options = optionsInput || optionsGlobal;
    const [optionsLogic, setOptionsLogic] = useState<OptionsLogic>(getOptionsLogic({
        options,
        currentItem,
        numberOfPages,
        items,
    }));
    const [toolbarLogic, setToolbarLogic] = useState<ToolbarLogic>(getToolbarLogic({
        items,
    }));
    const [toolbarActionsLogic, setToolbarActionsLogic] = useState<ToolbarActionsLogic>(getToolbarActionsLogic({
        options,
        isFullscreenMode,
    }));
    const [stylingLogic, setStylingLogic] = useState<StylingLogic>(getStylingLogic({
        options,
        currentItem,
        isFullscreenMode,
        isCurrentItem,
        optionsLogic,
        itemViewerToolbarRef,
        loadingSpinnerOptions,
        progressBarValue,
        videoModalRef,
        videoRef
    }));

    useEffect(() => {
        const newOptionsLogic = getOptionsLogic({
            options,
            currentItem,
            numberOfPages,
            items,
        })
        const newToolbarActionsLogic = getToolbarActionsLogic({
            options,
            isFullscreenMode
        })
        const newToolbarLogic = getToolbarLogic({ items })
        const newStylingLogic = getStylingLogic({
            options,
            currentItem,
            isFullscreenMode,
            isCurrentItem,
            optionsLogic: newOptionsLogic,
            itemViewerToolbarRef,
            loadingSpinnerOptions,
            progressBarValue,
            videoModalRef,
            videoRef
        })

        setOptionsLogic(newOptionsLogic);
        setStylingLogic(newStylingLogic);
        setToolbarLogic(newToolbarLogic);
        setToolbarActionsLogic(newToolbarActionsLogic);
    }, [
        currentItem,
        currentItemIndex,
        isCurrentItem,
        isFullscreenMode,
        items,
        numberOfPages,
        options,
        itemViewerToolbarRef,
        loadingSpinnerOptions,
        progressBarValue,
        videoModalRef,
        videoRef,
    ])

    return {
        optionsLogic,
        stylingLogic,
        toolbarActionsLogic,
        toolbarLogic,
    }
}

function getOptionsLogic(constructor: OptionsConstructor) {
    return new OptionsLogic(constructor);
}
function getStylingLogic(constructor: StylingLogicConstructor) {
    return new StylingLogic(constructor);
}
function getToolbarActionsLogic(constructor: ToolbarActionsLogicConstructor) {
    return new ToolbarActionsLogic(constructor);
}
function getToolbarLogic(constructor: ToolbarLogicConstructor) {
    return new ToolbarLogic(constructor);
}