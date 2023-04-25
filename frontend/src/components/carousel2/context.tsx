import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { CarouselItemProps } from "./components/CarouselItem";
import { CarouselVideoOverlayProps } from "./components/CarouselVideoOverlay";
import { EMPTY_STRING } from "./constants";
import { CarouselItemViewer } from "./components/item-viewer/CarouselItemViewer";
import './css/style.css';
import { CarouselOptions, CarouselButton, CarouselButtons } from "./types";
import { ToolbarLogic } from "./business-logic/ToolbarLogic";

type CarouselContextProps = {
    children: ReactNode | ReactNode[];
}

export type CarouselValueProps = {
    currentButtons: CarouselButtons | undefined;
    currentCarouselId: string;
    currentItem: CarouselItemProps;
    currentItemIndex: number;
    currentItems: CarouselItemProps[];
    currentVideoOverlayProps: CarouselVideoOverlayProps;
    itemViewerRef: React.RefObject<HTMLElement>;
    options: CarouselOptions;
    setCurrentButtons: React.Dispatch<React.SetStateAction<CarouselButtons | undefined>>;
    setCurrentCarouselId: React.Dispatch<React.SetStateAction<string>>; 
    setCurrentItemIndex: React.Dispatch<React.SetStateAction<number>>;
    setCurrentItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
    setCurrentVideoOverlayProps: React.Dispatch<React.SetStateAction<CarouselVideoOverlayProps>>;
    setOptions: React.Dispatch<React.SetStateAction<CarouselOptions>>;
    toolbarLogic: ToolbarLogic;
}

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
} as CarouselVideoOverlayProps;

export const CarouselProvider = ({
    children
}: CarouselContextProps) => {
    //note: setCurrentItem is set internally upon change of currentItems or currentItemIndex
    const [currentItem, setCurrentItem] = useState({} as CarouselItemProps);
    const [currentItems, setCurrentItems] = useState([] as CarouselItemProps[]);
    const [currentItemIndex, setCurrentItemIndex] = useState(CURRENT_ITEM_INDEX_INITIAL);
    const [currentCarouselId, setCurrentCarouselId] = useState(EMPTY_STRING);
    const [currentVideoOverlayProps, setCurrentVideoOverlayProps] = useState<CarouselVideoOverlayProps>(OVERLAY_PROPS_DEFAULT);
    const [currentButtons, setCurrentButtons] = useState<CarouselButtons>()
    const [options, setOptions] = useState<CarouselOptions>(OPTIONS_DEFAULT);
    const itemViewerRef = useRef<HTMLElement>(null);
    const toolbarLogic = new ToolbarLogic(currentItems);

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
                currentButtons,
                currentVideoOverlayProps,
                itemViewerRef,
                options,
                setCurrentCarouselId,
                setCurrentItemIndex,
                setCurrentItems,
                setCurrentButtons,
                setCurrentVideoOverlayProps,
                setOptions,
                toolbarLogic,
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