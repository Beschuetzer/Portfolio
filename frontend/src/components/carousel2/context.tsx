import React, { ReactNode, useRef, useState } from "react";
import { useContext } from "react";
import { CarouselItemProps } from "./CarouselItem";
import { CarouselItemVideoOverlayProps } from "./CarouselItemVideoOverlay";
import { CarouselItemViewer } from "./CarouselItemViewer";
import { EMPTY_STRING } from "./constants";

type CarouselContextProps = {
    children: ReactNode | ReactNode[];
}

type CarouselValueProps = {
    closeButtonSvgXlinkHrefRef: React.MutableRefObject<string | undefined>;
    currentItemSrc: string;
    currentItemProps: CarouselItemProps;
    currentPage: number;
    currentVideoOverlayProps: CarouselItemVideoOverlayProps;
    setCurrentItemProps: React.Dispatch<React.SetStateAction<CarouselItemProps>>;
    setCurrentItemSrc: React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setCurrentVideoOverlayProps: React.Dispatch<React.SetStateAction<CarouselItemVideoOverlayProps>>;

}

const CarouselContext = React.createContext<CarouselValueProps>({} as any);

export function useCarouselContext() {
    return useContext(CarouselContext)
}

export const CURRENT_PAGE_INITIAL = 0;
const OVERLAY_PROPS_INITIAL = {
    text: EMPTY_STRING,
    title: EMPTY_STRING,
} as CarouselItemVideoOverlayProps;

export const CarouselProvider = ({
    children
}: CarouselContextProps) => {
    const [currentItemSrc, setCurrentItemSrc] = useState(EMPTY_STRING);
    const [currentItemProps, setCurrentItemProps] = useState<CarouselItemProps>({
        srcMain: EMPTY_STRING,
        description: EMPTY_STRING,
        srcThumbnail: EMPTY_STRING,
        videoProps: {
            overlayProps: OVERLAY_PROPS_INITIAL,
        }
    });
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
    const [currentVideoOverlayProps, setCurrentVideoOverlayProps] = useState<CarouselItemVideoOverlayProps>(OVERLAY_PROPS_INITIAL);
    const closeButtonSvgXlinkHrefRef = useRef<string>()

    return (
        <CarouselContext.Provider 
            value={{
                closeButtonSvgXlinkHrefRef,
                currentItemProps,
                currentItemSrc,
                currentPage,
                currentVideoOverlayProps,
                setCurrentItemProps,
                setCurrentItemSrc,
                setCurrentPage,
                setCurrentVideoOverlayProps,
            }}
        >
            {children}
            <CarouselItemViewer />
        </CarouselContext.Provider>
    )
}