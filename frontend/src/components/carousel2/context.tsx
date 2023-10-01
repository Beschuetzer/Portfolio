import React, { ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CarouselItemProps } from "./components/CarouselItem";
import { CURRENT_ITEM_INDEX_INITIAL, CURRENT_PAGE_INITIAL, CURRENT_VIDEO_CURRENT_TIME_DEFAULT, ITEM_CONTAINER_HEIGHT_INITIAL, MODAL_IS_MINIMIZED_INITIAL } from "./constants";
import { CarouselItemViewer } from "./components/item-viewer/CarouselItemViewer";
import './css/style.css';
import { CarouselOptions, CarouselElementStyles } from "./types";
import { enterFullScreen, exitFullScreen } from "./utils/utils";

export type CarouselContextInputProps = {
    carouselContainerRef: React.MutableRefObject<HTMLDivElement> | undefined;
    children: ReactNode | ReactNode[];
    hiddenInputRef: React.MutableRefObject<HTMLInputElement>;
    items: CarouselItemProps[];
    options: CarouselOptions;
}

export type CarouselContextOutputProps = {
    currentItem: CarouselItemProps;
    currentItemIndex: number;
    currentPage: number;
    currentVideoCurrentTime: number;
    elementStylings: CarouselElementStyles | undefined;
    isFullscreenMode: boolean;
    isModalMinimized: boolean;
    itemContainerHeight: number | string;
    itemViewerRef: React.RefObject<HTMLElement>;
    numberOfPages: number;
    setCurrentItemIndex: React.Dispatch<React.SetStateAction<number>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setCurrentVideoCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    setIsFullscreenMode: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalMinimized: React.Dispatch<React.SetStateAction<boolean>>;
    setItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
    setItemContainerHeight: React.Dispatch<React.SetStateAction<number | string>>;
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>;
    setOptions: React.Dispatch<React.SetStateAction<CarouselOptions>>;
} & Required<Omit<CarouselContextInputProps, 'children'>>

export const CarouselProvider = (props: CarouselContextInputProps) => {
    const {
        carouselContainerRef,
        children,
        hiddenInputRef,
        items: itemsInput,
        options: optionsInput,
    } = props;
    const [currentItem, setCurrentItem] = useState(itemsInput[0]);
    const [currentItemIndex, setCurrentItemIndex] = useState(CURRENT_ITEM_INDEX_INITIAL);
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
    const [currentVideoCurrentTime, setCurrentVideoCurrentTime] = useState(CURRENT_VIDEO_CURRENT_TIME_DEFAULT);
    const [isFullscreenMode, setIsFullscreenMode] = useState(false);
    const [isModalMinimized, setIsModalMinimized] = useState(MODAL_IS_MINIMIZED_INITIAL)
    const [items, setItems] = useState(itemsInput);
    const [itemContainerHeight, setItemContainerHeight] = useState<number | string>(ITEM_CONTAINER_HEIGHT_INITIAL)
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [options, setOptions] = useState<CarouselOptions>(optionsInput || {});
    const itemViewerRef = useRef<HTMLElement>(null);
    const currentItemToUse = useMemo(() => Object.keys(currentItem || {}).length > 0 ? currentItem : items[0], [currentItem, items]);    

    useEffect(() => {
        setCurrentItem(items?.[currentItemIndex]);
    }, [items, currentItemIndex, setCurrentItem])

    useEffect(() => {
        if (isFullscreenMode) {
            enterFullScreen(itemViewerRef.current)
        } else {
            exitFullScreen(itemViewerRef.current)
        }
    }, [isFullscreenMode])

    return (
        <CarouselContext.Provider 
            value={{
                carouselContainerRef,
                currentItem: currentItemToUse,
                currentItemIndex,
                currentPage,
                currentVideoCurrentTime,
                elementStylings: options.styling?.elements,
                hiddenInputRef,
                isFullscreenMode,
                isModalMinimized,
                itemViewerRef,
                itemContainerHeight,
                items,
                numberOfPages,
                options,            
                setCurrentItemIndex,
                setCurrentPage,
                setCurrentVideoCurrentTime,
                setIsFullscreenMode,
                setIsModalMinimized,
                setItemContainerHeight,
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