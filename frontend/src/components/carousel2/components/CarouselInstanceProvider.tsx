import React, { ReactNode } from "react";
import { useContext } from "react";
import { CarouselSvgHrefs } from "./Carousel";

type CarouselInstanceProps = {
    children: ReactNode | ReactNode[];
} & CarouselInstanceContextProps

type CarouselInstanceContextProps = {
    id: string;
    svgHrefInstance: CarouselSvgHrefs;
}

const CarouselInstanceContext = React.createContext<CarouselInstanceContextProps>({} as any);

export function useCarouselInstanceContext() {
    return useContext(CarouselInstanceContext)
}

export const CarouselInstanceProvider = ({
    children,
    id,
    svgHrefInstance,
}: CarouselInstanceProps) => {
    return (
        <CarouselInstanceContext.Provider 
            value={{
                id,
                svgHrefInstance,
            }}
        >
            {children}
        </CarouselInstanceContext.Provider>
    )
}