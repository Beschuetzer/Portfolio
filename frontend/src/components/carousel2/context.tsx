import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { CarouselItemProps } from "./components/CarouselItem";
import { CarouselVideoModalProps } from "./components/CarouselVideoModal";
import { EMPTY_STRING } from "./constants";
import { CarouselItemViewer } from "./components/item-viewer/CarouselItemViewer";
import './css/style.css';
import { CarouselOptions, CarouselElementStyles } from "./types";
import { enterFullScreen, exitFullScreen } from "./utils";

export type CarouselContextInputProps = {
    carouselContainerRef: React.MutableRefObject<HTMLDivElement>;
    children: ReactNode | ReactNode[];
    items: CarouselItemProps[];
    options: CarouselOptions;
}

export type CarouselContextOutputProps = {
    currentItem: CarouselItemProps;
    currentItemIndex: number;
    elementStylings: CarouselElementStyles | undefined;
    isFullscreenMode: boolean;
    numberOfPages: number;
    setCurrentItemIndex: React.Dispatch<React.SetStateAction<number>>;
    setIsFullscreenMode: React.Dispatch<React.SetStateAction<boolean>>;
    setItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>;
    setOptions: React.Dispatch<React.SetStateAction<CarouselOptions>>;
} & Required<Omit<CarouselContextInputProps, 'children'>>

export const TRANSLATION_AMOUNT_INITIAL = 0;
export const CURRENT_ITEM_INDEX_INITIAL = -1;
export const CURRENT_ITEMS_INITIAL = [];
export const CURRENT_PAGE_INITIAL = 0;
export const AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT = 2500;
export const SEEK_AMOUNT_DEFAULT = 5000;
export const OPTIONS_DEFAULT = {
    itemViewer: {
        autoHideToolbarDuration: AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT,
        seekAmount: SEEK_AMOUNT_DEFAULT,
    },
} as CarouselOptions;
const OVERLAY_PROPS_DEFAULT = {
    text: EMPTY_STRING,
    title: EMPTY_STRING,
} as CarouselVideoModalProps;

export const CarouselProvider = ({
    carouselContainerRef,
    children,
    items: itemsInput,
    options: optionsInput,

}: CarouselContextInputProps) => {
    const [currentItem, setCurrentItem] = useState(itemsInput[0]);
    const [currentItemIndex, setCurrentItemIndex] = useState(CURRENT_ITEM_INDEX_INITIAL);
    const [isFullscreenMode, setIsFullscreenMode] = useState(false);
    const [items, setItems] = useState(itemsInput);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [options, setOptions] = useState<CarouselOptions>(optionsInput || OPTIONS_DEFAULT);
    const itemViewerRef = useRef<HTMLElement>(null);
    const currentItemToUse = Object.keys(currentItem || {}).length > 0 ? currentItem : items[0];

    useEffect(() => {
        setCurrentItem(items?.[currentItemIndex]);
    }, [items, currentItemIndex, setCurrentItem])

    useEffect(() => {
        if (isFullscreenMode) {
            enterFullScreen(itemViewerRef.current)
        } else {
            exitFullScreen(itemViewerRef.current)
        }
    }, [isFullscreenMode, enterFullScreen, exitFullScreen])

    return (
        <CarouselContext.Provider 
            value={{
                carouselContainerRef,
                currentItem: currentItemToUse,
                currentItemIndex,
                elementStylings: options.styling?.elements,
                isFullscreenMode,
                items,
                numberOfPages,
                options,
                setCurrentItemIndex,
                setIsFullscreenMode,
                setItems,
                setNumberOfPages,
                setOptions,
            }}
        >
            {children}
            <CarouselItemViewer ref={itemViewerRef} />
        </CarouselContext.Provider>
    )
}

const CarouselContext = React.createContext<CarouselContextOutputProps>({} as any);

export function useCarouselContext() {
    return useContext(CarouselContext)
}