import React, { ReactNode, useState } from "react";
import { useContext } from "react";
import { CarouselItemViewer } from "./CarouselItemViewer";

type CarouselContextProps = {
    children: ReactNode | ReactNode[];
}

type CarouselValueProps = {
    currentItemSrc: string,
    currentPage: number
}

const CarouselContext = React.createContext<CarouselValueProps>({} as any);

export function useCarouselContext() {
    return useContext(CarouselContext)
}

export const CarouselProvider = ({
    children
}: CarouselContextProps) => {
    const [currentItemSrc, setcurrentItemSrc] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    setTimeout(() => {
        setcurrentItemSrc("123");
    }, 5000)

    return (
        <CarouselContext.Provider 
            value={{
                currentItemSrc,
                currentPage,
            }}
        >
            {children}
            <CarouselItemViewer />
        </CarouselContext.Provider>
    )
}