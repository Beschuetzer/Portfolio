import { useCallback, useEffect, useRef } from "react"
import { getCoordinateDifference, stopPropagation } from "../utils";
import { CarouselNavigationOptions, Coordinate } from "../types";

export type StylingCase = 'start' | 'end';

enum SwipeDirection {
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    top = 'top',
}
export type UseOnSwipeHandlers = {
    [direction in SwipeDirection]?: () => void;
} & {
    /*
    *see types.ts for description on how this works
    */
    maxClickThreshold?: number;
    /*
    *The minimum number of pixels in the given direction that must be made to register a valid swipe event
    */
    minSwipeThreshold?: number;
}

export type UseOnSwipeProps = {
    element: HTMLElement;
    isDisabled?: boolean;
    handleStyleChanges: (stylingCase: StylingCase, element: HTMLElement) => void;
    swipeHandlers?: UseOnSwipeHandlers;
} & Partial<Pick<CarouselNavigationOptions, 'maxClickThreshold'>>

//positive horizontal diff means right and positive vertical diff means down
export const useOnSwipe = ({
    element,
    isDisabled = false,
    maxClickThreshold = 0,
    swipeHandlers = {},
    handleStyleChanges,
}: UseOnSwipeProps) => {
    //todo: need to add handlers to swiping on a phone too?
    const startCoordinateRef = useRef<Coordinate>();
    const endCoordinateRef = useRef<Coordinate>();
    const mouseDownSourceElement = useRef<HTMLElement>();
    const mouseUpSourceElement = useRef<HTMLElement>();

    const handleClick = useCallback((e: Event) => {
        //this is needed to be able to use handleClickStop
    }, [])

    const handleClickStop = useCallback((e: Event) => {
        // console.log({ startCoordinate: startCoordinateRef.current, endCoordinate: endCoordinateRef.current, downSource: mouseDownSourceElement.current, upSource: mouseUpSourceElement.current });
        if (startCoordinateRef?.current && endCoordinateRef?.current) {
            const distanceMoved = getCoordinateDifference(startCoordinateRef.current, endCoordinateRef.current);
            console.log({ distanceMoved, maxClickThreshold });

            if (distanceMoved > maxClickThreshold && mouseDownSourceElement.current === mouseUpSourceElement.current) {
                stopPropagation(e);
            }
        }

        startCoordinateRef.current = undefined;
        window.removeEventListener('click', handleClickStop, true);
    }, [maxClickThreshold])

    const handleMouseDown = useCallback((e: MouseEvent) => {
        stopPropagation(e)
        if (isDisabled) return;
        handleStyleChanges && handleStyleChanges('start', element)

        if (mouseDownSourceElement) {
            mouseDownSourceElement.current = e.target as HTMLElement;
        }
        setCoordinate(startCoordinateRef, e);
    }, [element, handleStyleChanges, isDisabled])

    /*
    *Determines whether the swipe actually occurs and which callback to trigger
    */
    const handleSwiping = useCallback((e: MouseEvent) => {
        const endX = e.x || e.clientX || e.pageX;
        const endY = e.y || e.clientY || e.pageY;
        const { x: startX, y: startY } = startCoordinateRef.current as Coordinate;
        const distanceMoved = getCoordinateDifference(startCoordinateRef.current as Coordinate, endCoordinateRef.current as Coordinate);

        //no need to do anything if event is being registered as a click rather than swipe
        if (distanceMoved <= maxClickThreshold) return;

        const verticalDiff = endY - startY;
        const horizontalDiff = endX - startX;
        const verticalDiffAbsolute = Math.abs(verticalDiff);
        const horizontalDiffAbsolute = Math.abs(horizontalDiff);
        const absoluteDiff = Math.abs(verticalDiffAbsolute - horizontalDiffAbsolute);
        const smallerDiff = Math.min(verticalDiffAbsolute, horizontalDiffAbsolute);
        const isAmbiguous = absoluteDiff < smallerDiff;

        // console.log({ verticalDiffAbsolute, horizontalDiffAbsolute, absoluteDiff, smallerDiff, isAmbiguous });
        if (isAmbiguous) return;
        if (horizontalDiffAbsolute !== smallerDiff) {
            //is horizontal
            if (swipeHandlers.minSwipeThreshold && swipeHandlers.minSwipeThreshold > horizontalDiffAbsolute) return;
            if (horizontalDiff > 0) {
                swipeHandlers.left && swipeHandlers.left();
            } else {
                swipeHandlers.right && swipeHandlers.right();
            }
        } else {
            if (swipeHandlers.minSwipeThreshold && swipeHandlers.minSwipeThreshold > verticalDiffAbsolute) return;
            if (verticalDiff > 0) {
                swipeHandlers.top && swipeHandlers.top();
            } else {
                swipeHandlers.bottom && swipeHandlers.bottom();
            }
        }
    }, [maxClickThreshold, swipeHandlers])

    const handleMouseUp = useCallback((e: MouseEvent) => {
        stopPropagation(e)
        if (!startCoordinateRef.current || isDisabled) return;
        setCoordinate(endCoordinateRef, e);
        handleStyleChanges && handleStyleChanges('end', element);
        window.addEventListener('click', handleClickStop, true);

        if (mouseUpSourceElement) {
            mouseUpSourceElement.current = e.target as HTMLElement;
        }

        handleSwiping(e);
    }, [element, handleClickStop, handleStyleChanges, handleSwiping, isDisabled])

    useEffect(() => {
        if (!element) return;
        element.addEventListener('click', handleClick);
        element.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            element.removeEventListener('click', handleClick);
            element.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [element, handleClick, handleClickStop, handleMouseDown, handleMouseUp, swipeHandlers])
}


function setCoordinate(ref: React.MutableRefObject<Coordinate | undefined>, e: MouseEvent) {
    ref.current = {
        x: e.x || e.clientX || e.pageX,
        y: e.y || e.clientY || e.pageY,
    }
}