import React, { ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { CarouselOptions } from "../types";
import { CarouselItemProps } from "./CarouselItem";
import { CURRENT_ITEM_INDEX_INITIAL } from "../context";

type CarouselInstanceProps = {
    children: ReactNode | ReactNode[];
} & CarouselInstanceContextProps

type CarouselInstanceContextProps = {
    currentItemInInstance?: CarouselItemProps;
    currentItemInInstanceIndex?: number;
    carouselContainerRef: React.MutableRefObject<HTMLDivElement>;
    itemsInInstance: CarouselItemProps[];
    id: string;
    options: CarouselOptions | undefined;
    setCurrentItemInInstance?: React.Dispatch<React.SetStateAction<CarouselItemProps>>;
    setCurrentItemInInstanceIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselInstanceContext = React.createContext<CarouselInstanceContextProps>({} as any);

export function useCarouselInstanceContext() {
    return useContext(CarouselInstanceContext)
}

export const CarouselInstanceProvider = ({
    carouselContainerRef,
    children,
    id,
    itemsInInstance,
    options,
}: CarouselInstanceProps) => {
    const [currentItemInInstanceLocal, setCurrentItemInInstance] = useState<CarouselItemProps>({} as CarouselItemProps);
    const [currentItemInInstanceIndex, setCurrentItemInInstanceIndex] = useState(CURRENT_ITEM_INDEX_INITIAL);
    const [itemsInInstanceLocal, setItemsInInstance] = useState(itemsInInstance);

    useEffect(() => {
        if (CURRENT_ITEM_INDEX_INITIAL === currentItemInInstanceIndex) return;
        setCurrentItemInInstance(itemsInInstanceLocal[currentItemInInstanceIndex]);
    }, [itemsInInstanceLocal, currentItemInInstanceIndex])

    return (
        <CarouselInstanceContext.Provider
            value={{
                carouselContainerRef,
                currentItemInInstance: currentItemInInstanceLocal,
                currentItemInInstanceIndex,
                id,
                itemsInInstance: itemsInInstanceLocal,
                options,
                setCurrentItemInInstance,
                setCurrentItemInInstanceIndex,
            }}
        >
            {children}
        </CarouselInstanceContext.Provider>
    )
}