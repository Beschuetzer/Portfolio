import React, { ReactNode, useState } from "react";
import { useContext } from "react";
import { CarouselItemViewer } from "./CarouselItemViewer";
import { EMPTY_STRING } from "./constants";

type CarouselContextProps = {
    children: ReactNode | ReactNode[];
}

type CarouselValueProps = {
    currentItemSrc: string,
    currentPage: number,
    setCurrentItemSrc: React.Dispatch<React.SetStateAction<string>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
}

const CarouselContext = React.createContext<CarouselValueProps>({} as any);

export function useCarouselContext() {
    return useContext(CarouselContext)
}

export const CURRENT_PAGE_INITIAL = 0;

export const CarouselProvider = ({
    children
}: CarouselContextProps) => {
    const [currentItemSrc, setCurrentItemSrc] = useState(EMPTY_STRING);
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);

    return (
        <CarouselContext.Provider 
            value={{
                currentItemSrc,
                currentPage,
                setCurrentItemSrc,
                setCurrentPage
            }}
        >
            {children}
            <CarouselItemViewer />
        </CarouselContext.Provider>
    )
}