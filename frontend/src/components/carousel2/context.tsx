import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { CarouselItemProps } from "./components/CarouselItem";
import { CarouselVideoModalProps } from "./components/CarouselVideoModal";
import { EMPTY_STRING } from "./constants";
import { CarouselItemViewer } from "./components/item-viewer/CarouselItemViewer";
import './css/style.css';
import { CarouselOptions, CarouselElements } from "./types";

type CarouselContextProps = {
    children: ReactNode | ReactNode[];
}

export type CarouselValueProps = {
    currentElements: CarouselElements | undefined;
    currentCarouselId: string;
    currentItem: CarouselItemProps;
    currentItemIndex: number;
    currentItems: CarouselItemProps[];
    currentVideoOverlayProps: CarouselVideoModalProps;
    itemViewerRef: React.RefObject<HTMLElement>;
    options: CarouselOptions;
    setCurrentElements: React.Dispatch<React.SetStateAction<CarouselElements | undefined>>;
    setCurrentCarouselId: React.Dispatch<React.SetStateAction<string>>; 
    setCurrentItemIndex: React.Dispatch<React.SetStateAction<number>>;
    setCurrentItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
    setCurrentVideoOverlayProps: React.Dispatch<React.SetStateAction<CarouselVideoModalProps>>;
    setOptions: React.Dispatch<React.SetStateAction<CarouselOptions>>;
}

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
    children
}: CarouselContextProps) => {
    //note: setCurrentItem is set internally upon change of currentItems or currentItemIndex
    const [currentItem, setCurrentItem] = useState({} as CarouselItemProps);
    const [currentItems, setCurrentItems] = useState([] as CarouselItemProps[]);
    const [currentItemIndex, setCurrentItemIndex] = useState(CURRENT_ITEM_INDEX_INITIAL);
    const [currentCarouselId, setCurrentCarouselId] = useState(EMPTY_STRING);
    const [currentVideoOverlayProps, setCurrentVideoOverlayProps] = useState<CarouselVideoModalProps>(OVERLAY_PROPS_DEFAULT);
    const [currentElements, setCurrentElements] = useState<CarouselElements>()
    const [options, setOptions] = useState<CarouselOptions>(OPTIONS_DEFAULT);
    const itemViewerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setCurrentItem(currentItems?.[currentItemIndex] || {});
    }, [currentItems, currentItemIndex])

    return (
        <CarouselContext.Provider 
            value={{
                currentCarouselId,
                currentItem,
                currentItemIndex,
                currentItems,
                currentElements,
                currentVideoOverlayProps,
                itemViewerRef,
                options,
                setCurrentCarouselId,
                setCurrentItemIndex,
                setCurrentItems,
                setCurrentElements,
                setCurrentVideoOverlayProps,
                setOptions,
            }}
        >
            {children}
            <CarouselItemViewer ref={itemViewerRef} />
        </CarouselContext.Provider>
    )
}

const CarouselContext = React.createContext<CarouselValueProps>({} as any);

export function useCarouselContext() {
    return useContext(CarouselContext)
}