import React, { ReactNode, useContext, useState } from "react";
import { CarouselItemProps } from "./components/CarouselItem";
import { CarouselVideoOverlayProps } from "./components/CarouselVideoOverlay";
import { EMPTY_STRING } from "./constants";
import { CarouselItemViewer } from "./components/item-viewer/CarouselItemViewer";
import './css/style.css';
import { CarouselOptions, CarouselSvgHrefs } from "./types";

type CarouselContextProps = {
    children: ReactNode | ReactNode[];
}

type CarouselValueProps = {
    currentItemSrc: string;
    currentItemProps: CarouselItemProps;
    currentPage: number;
    currentSvgHrefs: CarouselSvgHrefs | undefined;
    currentVideoOverlayProps: CarouselVideoOverlayProps;
    options: CarouselOptions;
    setCurrentItemProps: React.Dispatch<React.SetStateAction<CarouselItemProps>>;
    setCurrentItemSrc: React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setCurrentSvgHrefs: React.Dispatch<React.SetStateAction<CarouselSvgHrefs | undefined>>;
    setCurrentVideoOverlayProps: React.Dispatch<React.SetStateAction<CarouselVideoOverlayProps>>;
    setOptions: React.Dispatch<React.SetStateAction<CarouselOptions>>;
}

export const CURRENT_PAGE_INITIAL = 0;
export const AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT = 2500;

export const OPTIONS_DEFAULT = {
    autoHideToolbarDuration: AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT,
} as CarouselOptions;
const OVERLAY_PROPS_DEFAULT = {
    text: EMPTY_STRING,
    title: EMPTY_STRING,
} as CarouselVideoOverlayProps;

export const CarouselProvider = ({
    children
}: CarouselContextProps) => {
    const [currentItemSrc, setCurrentItemSrc] = useState(EMPTY_STRING);
    const [currentItemProps, setCurrentItemProps] = useState<CarouselItemProps>({
        srcMain: EMPTY_STRING,
        description: EMPTY_STRING,
        srcThumbnail: EMPTY_STRING,
        videoProps: {
            overlayProps: OVERLAY_PROPS_DEFAULT,
        }
    });
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
    const [currentVideoOverlayProps, setCurrentVideoOverlayProps] = useState<CarouselVideoOverlayProps>(OVERLAY_PROPS_DEFAULT);
    const [currentSvgHrefs, setCurrentSvgHrefs] = useState<CarouselSvgHrefs>()
    const [options, setOptions] = useState<CarouselOptions>(OPTIONS_DEFAULT);

    return (
        <CarouselContext.Provider 
            value={{
                currentItemProps,
                currentItemSrc,
                currentPage,
                currentSvgHrefs,
                currentVideoOverlayProps,
                options,
                setCurrentItemProps,
                setCurrentItemSrc,
                setCurrentPage,
                setCurrentSvgHrefs,
                setCurrentVideoOverlayProps,
                setOptions,
            }}
        >
            {children}
            <CarouselItemViewer />
        </CarouselContext.Provider>
    )
}

const CarouselContext = React.createContext<CarouselValueProps>({} as any);

export function useCarouselContext() {
    return useContext(CarouselContext)
}