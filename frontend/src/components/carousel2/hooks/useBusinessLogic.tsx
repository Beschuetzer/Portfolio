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
    itemRef,
    itemViewerToolbarRef,
    loadingSpinnerOptions,
    options: optionsInput,
    modalRef,
}: UseBusinessLogicInput): UseBusinessLogicResponse => {
    const {
        carouselContainerRef,
        currentItem,
        // currentItemIndex,
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
        isFullscreenMode,
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
        carouselContainerRef,
        currentItem,
        isCurrentItem,
        isFullscreenMode,
        items,
        itemViewerToolbarRef,
        loadingSpinnerOptions,
        numberOfPages,
        options,
        optionsLogic,
        modalRef,
        itemRef
    }));

    useEffect(() => {
        const newOptionsLogic = getOptionsLogic({
            options,
            currentItem,
            isFullscreenMode,
            numberOfPages,
            items,
        })
        const newStylingLogic = getStylingLogic({
            carouselContainerRef,
            currentItem,
            isCurrentItem,
            isFullscreenMode,
            items,
            itemViewerToolbarRef,
            loadingSpinnerOptions,
            numberOfPages,
            options,
            optionsLogic: newOptionsLogic,
            modalRef,
            itemRef
        })

        setOptionsLogic(newOptionsLogic);
        setStylingLogic(newStylingLogic);
    }, [
        carouselContainerRef,
        currentItem,
        isCurrentItem,
        isFullscreenMode,
        itemRef,
        items,
        modalRef,
        numberOfPages,
        options,
        itemViewerToolbarRef,
        loadingSpinnerOptions,
    ])

    useEffect(() => {
        const newToolbarActionsLogic = getToolbarActionsLogic({
            options,
            isFullscreenMode
        })
        setToolbarActionsLogic(newToolbarActionsLogic);
    }, [isFullscreenMode, options])

    useEffect(() => {
        const newToolbarLogic = getToolbarLogic({ items })
        setToolbarLogic(newToolbarLogic);
    }, [items])

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