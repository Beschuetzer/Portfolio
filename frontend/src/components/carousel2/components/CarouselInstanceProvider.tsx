import React, { ReactNode } from "react";
import { useContext } from "react";
import { CarouselOptions, CarouselSvgHrefs } from "../types";

type CarouselInstanceProps = {
    children: ReactNode | ReactNode[];
} & CarouselInstanceContextProps

type CarouselInstanceContextProps = {
    carouselContainerRef: React.MutableRefObject<HTMLDivElement>;
    id: string;
    options: CarouselOptions | undefined;
    svgHrefInstance: CarouselSvgHrefs;
}

const CarouselInstanceContext = React.createContext<CarouselInstanceContextProps>({} as any);

export function useCarouselInstanceContext() {
    return useContext(CarouselInstanceContext)
}

export const CarouselInstanceProvider = ({
    carouselContainerRef,
    children,
    id,
    options,
    svgHrefInstance,
}: CarouselInstanceProps) => {
    return (
        <CarouselInstanceContext.Provider 
            value={{
                carouselContainerRef,
                id,
                options,
                svgHrefInstance,
            }}
        >
            {children}
        </CarouselInstanceContext.Provider>
    )
}