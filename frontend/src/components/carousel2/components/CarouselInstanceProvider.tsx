import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { CarouselOptions } from "../types";
import { CarouselItemProps } from "./CarouselItem";
import { CURRENT_ITEM_INDEX_INITIAL } from "../context";

type CarouselInstanceProps = {
    children: ReactNode | ReactNode[];
} & CarouselInstanceContextProps

export type CarouselInstanceContextProps = {
    currentItemInInstance?: CarouselItemProps;
    currentItemInInstanceIndex?: number;
    carouselContainerRef: React.MutableRefObject<HTMLDivElement>;
    itemsInInstance: CarouselItemProps[];
    id: string;
    itemViewerToolbarRef?: React.MutableRefObject<HTMLElement | undefined>;
    options: CarouselOptions | undefined;
    setCurrentItemInInstance?: React.Dispatch<React.SetStateAction<CarouselItemProps>>;
    setCurrentItemInInstanceIndex?: React.Dispatch<React.SetStateAction<number>>;
    setItemsInInstance?: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
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
    const itemViewerToolbarRef = useRef<HTMLElement>();

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
                itemViewerToolbarRef,
                options,
                setCurrentItemInInstance,
                setCurrentItemInInstanceIndex,
                setItemsInInstance,
            }}
        >
            {children}
        </CarouselInstanceContext.Provider>
    )
}