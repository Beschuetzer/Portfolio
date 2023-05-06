import { useEffect, useState } from "react";
import { CarouselContextOutputProps, useCarouselContext } from "../context"
import { StylingLogic, StylingLogicConstructor } from "../business-logic/StylingLogic";
import { ToolbarLogic, ToolbarLogicConstructor } from "../business-logic/ToolbarLogic";
import { ItemDisplayLocationLogic, ItemDisplayLocationLogicConstructor } from "../business-logic/ItemDisplayLocationLogic";
import { ToolbarActionsLogic, ToolbarActionsLogicConstructor } from "../business-logic/ToolbarActionsLogic";
import { CarouselProps } from "../components/Carousel";

export type UseBusinessLogicResponse = {
    itemDisplayLocationLogic: ItemDisplayLocationLogic;
    stylingLogic: StylingLogic;
    toolbarLogic: ToolbarLogic;
    toolbarActionsLogic: ToolbarActionsLogic;
}

export type UseBusinessLogicInput = {
    options?: CarouselProps["options"];
} & Partial<
    Omit<
        ItemDisplayLocationLogicConstructor &
        StylingLogicConstructor &
        ToolbarActionsLogicConstructor &
        ToolbarLogicConstructor,
        keyof CarouselContextOutputProps | 'itemDisplayLocationLogic'
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
        // numberOfPages,
        options: optionsGlobal,
    } = useCarouselContext();
    const options = optionsInput || optionsGlobal;
    const [itemDisplayLocationLogic, setItemDisplayLocationLogic] = useState<ItemDisplayLocationLogic>(getItemDisplayLogic({
        options,
        currentItem,
        currentItemIndex
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
        itemDisplayLocationLogic,
        itemViewerToolbarRef,
        loadingSpinnerOptions,
        progressBarValue,
        videoModalRef,
        videoRef
    }));

    useEffect(() => {
        const newItemDisplayLocationLogic = getItemDisplayLogic({
            options,
            currentItem,
            currentItemIndex
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
            itemDisplayLocationLogic: newItemDisplayLocationLogic,
            itemViewerToolbarRef,
            loadingSpinnerOptions,
            progressBarValue,
            videoModalRef,
            videoRef
        })

        setItemDisplayLocationLogic(newItemDisplayLocationLogic);
        setStylingLogic(newStylingLogic);
        setToolbarLogic(newToolbarLogic);
        setToolbarActionsLogic(newToolbarActionsLogic);
    }, [
        currentItem,
        currentItemIndex,
        isCurrentItem,
        isFullscreenMode,
        items,
        options,
        itemViewerToolbarRef,
        loadingSpinnerOptions,
        progressBarValue,
        videoModalRef,
        videoRef,
    ])

    return {
        itemDisplayLocationLogic,
        stylingLogic,
        toolbarActionsLogic,
        toolbarLogic,
    }
}

function getItemDisplayLogic(constructor: ItemDisplayLocationLogicConstructor) {
    return new ItemDisplayLocationLogic(constructor);
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