import React, { ReactNode } from "react";
import { useContext } from "react";

type CarouselInstanceProps = {
    id: string;
    children: ReactNode | ReactNode[];
}

type CarouselInstanceContextProps = {
    id: string;
}

const CarouselInstanceContext = React.createContext<CarouselInstanceContextProps>({} as any);

export function useCarouselInstanceContext() {
    return useContext(CarouselInstanceContext)
}

export const CarouselInstanceProvider = ({
    children,
    id,
}: CarouselInstanceProps) => {
    return (
        <CarouselInstanceContext.Provider 
            value={{
                id
            }}
        >
            {children}
        </CarouselInstanceContext.Provider>
    )
}