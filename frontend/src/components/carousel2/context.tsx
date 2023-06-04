import React, { ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CarouselItemProps } from "./components/CarouselItem";
import { CURRENT_ITEM_INDEX_INITIAL, CURRENT_PAGE_INITIAL, CURRENT_VIDEO_CURRENT_TIME_DEFAULT, WINDOW_RESIZE_DEBOUNCE } from "./constants";
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
    currentPage: number;
    currentVideoCurrentTime: number;
    elementStylings: CarouselElementStyles | undefined;
    isFullscreenMode: boolean;
    numberOfPages: number;
    viewPortWidth: number;
    setCurrentItemIndex: React.Dispatch<React.SetStateAction<number>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setCurrentVideoCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    setIsFullscreenMode: React.Dispatch<React.SetStateAction<boolean>>;
    setItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>;
    setOptions: React.Dispatch<React.SetStateAction<CarouselOptions>>;
    setViewPortWidth: React.Dispatch<React.SetStateAction<number>>;
} & Required<Omit<CarouselContextInputProps, 'children'>>

export const CarouselProvider = ({
    carouselContainerRef,
    children,
    items: itemsInput,
    options: optionsInput,

}: CarouselContextInputProps) => {
    const [currentItem, setCurrentItem] = useState(itemsInput[0]);
    const [currentItemIndex, setCurrentItemIndex] = useState(CURRENT_ITEM_INDEX_INITIAL);
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
    const [currentVideoCurrentTime, setCurrentVideoCurrentTime] = useState(CURRENT_VIDEO_CURRENT_TIME_DEFAULT);
    const [isFullscreenMode, setIsFullscreenMode] = useState(false);
    const [items, setItems] = useState(itemsInput);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [options, setOptions] = useState<CarouselOptions>(optionsInput || {});
    const [viewPortWidth, setViewPortWidth] = useState(0);
    const itemViewerRef = useRef<HTMLElement>(null);
    const currentItemToUse = Object.keys(currentItem || {}).length > 0 ? currentItem : items[0];
    const resizeIntervalRef = useRef<any>(-1);

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

    useLayoutEffect(() => {
        function handleResize() {
            clearInterval(resizeIntervalRef.current);
            resizeIntervalRef.current = setInterval(() => {
                const width = window.innerWidth;
                clearInterval(resizeIntervalRef.current)
                console.log({width, viewPortWidth});
                setViewPortWidth(width);
            }, WINDOW_RESIZE_DEBOUNCE)
        }
        
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [viewPortWidth])

    return (
        <CarouselContext.Provider 
            value={{
                carouselContainerRef,
                currentItem: currentItemToUse,
                currentItemIndex,
                currentPage,
                currentVideoCurrentTime,
                elementStylings: options.styling?.elements,
                isFullscreenMode,
                items,
                numberOfPages,
                options,
                viewPortWidth,
                setCurrentItemIndex,
                setCurrentPage,
                setCurrentVideoCurrentTime,
                setIsFullscreenMode,
                setItems,
                setNumberOfPages,
                setOptions,
                setViewPortWidth,
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