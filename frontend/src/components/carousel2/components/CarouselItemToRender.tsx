import React, { useEffect, useRef, useState } from 'react'
import { CarouselItemViewerContainer } from './item-viewer/toolbar/CarouselItemViewerContainer';
import { useCarouselContext } from '../context';
import { getIsVideo } from '../utils';
import { CarouselVideo } from './CarouselVideo';
import { CarouselImage } from './CarouselImage';

type CarouselItemToRenderProps = {}

const HEIGHT_INITIAL = 0;
const INTERVAL_AMOUNT = 1000;
const MAX_INTERVALS = 10;
export const CarouselItemToRender = (props: CarouselItemToRenderProps) => {
    const { currentItem } = useCarouselContext();
    const itemContainerRef = useRef<HTMLDivElement>();
    const isVideo = getIsVideo(currentItem);
    const [height, setHeight] = useState(HEIGHT_INITIAL);
    const intervalRef = useRef<any>(-1);
    const currentInvervalRef = useRef(0);
    const previousHeightRef = useRef(HEIGHT_INITIAL);

    useEffect(() => {
        if (height > HEIGHT_INITIAL) return;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            currentInvervalRef.current++;
            const heightLocal = itemContainerRef.current?.getBoundingClientRect().height || HEIGHT_INITIAL;
            console.log({ heightLocal, height, currentInvervalRef: currentInvervalRef.current, previousHeightRef: previousHeightRef.current });
            if ((previousHeightRef.current === heightLocal && previousHeightRef.current !== HEIGHT_INITIAL) || currentInvervalRef.current > MAX_INTERVALS) {
                clearInterval(intervalRef.current);
                console.log("clearing interval");
                
                return;
            }
            if (heightLocal === HEIGHT_INITIAL) return;
            setHeight(heightLocal);
            previousHeightRef.current = heightLocal;
        }, INTERVAL_AMOUNT)
    }, [height])

    return (
        <CarouselItemViewerContainer ref={itemContainerRef}>
            {isVideo ?
                <CarouselVideo itemContainerRef={itemContainerRef} {...currentItem} />
                :
                <CarouselImage itemContainerRef={itemContainerRef} {...currentItem} />
            }
        </CarouselItemViewerContainer>
    )
}