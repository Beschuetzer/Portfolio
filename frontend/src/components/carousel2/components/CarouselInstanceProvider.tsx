import React, { ReactNode } from "react";
import { useContext } from "react";
import { CarouselOptions } from "../types";

type CarouselInstanceProps = {
    children: ReactNode | ReactNode[];
} & CarouselInstanceContextProps

type CarouselInstanceContextProps = {
    carouselContainerRef: React.MutableRefObject<HTMLDivElement>;
    id: string;
    options: CarouselOptions | undefined;
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
}: CarouselInstanceProps) => {
    return (
        <CarouselInstanceContext.Provider 
            value={{
                carouselContainerRef,
                id,
                options,
            }}
        >
            {children}
        </CarouselInstanceContext.Provider>
    )
}