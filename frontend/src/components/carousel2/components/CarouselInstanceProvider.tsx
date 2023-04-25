import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { CarouselOptions, CarouselButtons } from "../types";
import { CarouselItemProps } from "./CarouselItem";
import { CURRENT_ITEM_INDEX_INITIAL } from "../context";

type CarouselInstanceProps = {
    children: ReactNode | ReactNode[];
} & CarouselInstanceContextProps

export type CarouselInstanceContextProps = {
    currentButtons?: CarouselButtons | undefined;
    currentItemInInstance?: CarouselItemProps;
    currentItemInInstanceIndex?: number;
    carouselContainerRef: React.MutableRefObject<HTMLDivElement>;
    itemsInInstance: CarouselItemProps[];
    id: string;
    itemViewerToolbarRef?: React.MutableRefObject<HTMLElement | undefined>;
    numberOfPages: number;
    options: CarouselOptions | undefined;
    setCurrentButtons?: React.Dispatch<React.SetStateAction<CarouselButtons | undefined>>;
    setCurrentItemInInstance?: React.Dispatch<React.SetStateAction<CarouselItemProps>>;
    setCurrentItemInInstanceIndex?: React.Dispatch<React.SetStateAction<number>>;
    setItemsInInstance?: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
    setNumberOfPages?: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselInstanceContext = React.createContext<CarouselInstanceContextProps>({} as any);

export function useCarouselInstanceContext() {
    return useContext(CarouselInstanceContext)
}

export const CarouselInstanceProvider = ({
    carouselContainerRef,
    children,
    currentButtons: currentSvgsLocal,
    id,
    itemsInInstance,
    numberOfPages: numberOfPagesGiven,
    options,
}: CarouselInstanceProps) => {
    const [currentButtons, setCurrentButtons] = useState<CarouselButtons>(currentSvgsLocal || {} as CarouselButtons)
    const [currentItemInInstanceLocal, setCurrentItemInInstance] = useState<CarouselItemProps>({} as CarouselItemProps);
    const [currentItemInInstanceIndex, setCurrentItemInInstanceIndex] = useState(CURRENT_ITEM_INDEX_INITIAL);
    const [itemsInInstanceLocal, setItemsInInstance] = useState(itemsInInstance);
    const [numberOfPages, setNumberOfPages] = useState(numberOfPagesGiven);
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
                currentButtons,
                id,
                itemsInInstance: itemsInInstanceLocal,
                itemViewerToolbarRef,
                numberOfPages,
                options,
                setCurrentItemInInstance,
                setCurrentItemInInstanceIndex,
                setItemsInInstance,
                setNumberOfPages,
            }}
        >
            {children}
        </CarouselInstanceContext.Provider>
    )
}