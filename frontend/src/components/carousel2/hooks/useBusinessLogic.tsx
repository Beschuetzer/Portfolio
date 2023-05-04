import { useEffect, useState } from "react";
import { CarouselContextOutputProps, useCarouselContext } from "../context"
import { StylingLogic, StylingLogicConstructor } from "../business-logic/StylingLogic";
import { ToolbarLogic, ToolbarLogicConstructor } from "../business-logic/ToolbarLogic";
import { ItemDisplayLocationLogic, ItemDisplayLocationLogicConstructor } from "../business-logic/ItemDisplayLocationLogic";
import { ToolbarActionsLogic, ToolbarActionsLogicConstructor } from "../business-logic/ToolbarActionsLogic";

export type UseBusinessLogicResponse = {
    itemDisplayLocationLogic: ItemDisplayLocationLogic;
    stylingLogic: StylingLogic;
    toolbarLogic: ToolbarLogic;
    toolbarActionsLogic: ToolbarActionsLogic;
}

export type UseBusinessLogicInput = Partial<
    Omit<{} &
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
    progressBarValue,
    videoModalRef,
    videoRef
}: UseBusinessLogicInput): UseBusinessLogicResponse => {
    const {
        carouselContainerRef,
        currentItem,
        currentItemIndex,
        elementStylings,
        isFullscreenMode,
        items,
        numberOfPages,
        options,
    } = useCarouselContext();
    const [toolbarLogic, setToolbarLogic] = useState<ToolbarLogic | null>(null);
    const [toolbarActionsLogic, setToolbarActionsLogic] = useState<ToolbarActionsLogic | null>(null);
    const [stylingLogic, setStylingLogic] = useState<StylingLogic | null>(null);
    const [itemDisplayLocationLogic, setItemDisplayLocationLogic] = useState<ItemDisplayLocationLogic | null>(null);

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
        carouselContainerRef,
        currentItem,
        currentItemIndex,
        elementStylings,
        isFullscreenMode,
        items,
        numberOfPages,
        options,
        setItemDisplayLocationLogic,
        setStylingLogic,
        setToolbarActionsLogic,
        setToolbarLogic,
    ])


    return {
        itemDisplayLocationLogic: itemDisplayLocationLogic || getItemDisplayLogic({
            options,
            currentItem,
            currentItemIndex
        }),
        stylingLogic: stylingLogic || getStylingLogic({
            options,
            currentItem,
            isFullscreenMode,
            isCurrentItem,
            itemDisplayLocationLogic: itemDisplayLocationLogic || getItemDisplayLogic({
                options,
                currentItem,
                currentItemIndex
            }),
            itemViewerToolbarRef,
            loadingSpinnerOptions,
            progressBarValue,
            videoModalRef,
            videoRef
        }),
        toolbarActionsLogic: toolbarActionsLogic || getToolbarActionsLogic({
            options,
            isFullscreenMode,
        }),
        toolbarLogic: toolbarLogic || getToolbarLogic({
            items,
        }),
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