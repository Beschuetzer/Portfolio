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

export type UseOnSwipeHandlerDirection = {
    callback: () => void;
    /*
    *If the `mouseDownSourceElement` is in this array, then the callback is skipped
    */
    mouseDownSkipTargets?: Array<HTMLElement>;
}
export type UseOnSwipeHandlers = {
    [direction in SwipeDirection]?: UseOnSwipeHandlerDirection;
} & {
    /*
    *see types.ts for description on how this works
    */
    maxClickThreshold?: number;
    /*
    *The minimum number of pixels in the given direction that must be made to register a valid swipe event
    */
    minSwipeThreshold?: number;
    /*
    *This event is triggered whenever the mouse moves after the initial mousedown event.  
    *Positive xDiff means the cursor is to the right of where the mousedown event occured
    *Positive yDiff means the cursor is below where the mousedown event occured
    */
    onMoveWhenGrabbing?: (xDiff: number, yDiff: number) => void;
}

export type UseOnSwipeProps = {
    element: HTMLElement;
    isDisabled?: boolean;
    handleStyleChanges: (stylingCase: StylingCase, element: HTMLElement) => void;
    swipeHandlers?: UseOnSwipeHandlers;
} & Partial<Pick<CarouselNavigationOptions, 'maxClickThreshold'>>

const ON_MOVE_WHEN_GRABBING_SHORT_CIRCUIT_AMOUNT = 10;
//positive horizontal diff means right and positive vertical diff means down
export const useOnSwipe = ({
    element,
    isDisabled = false,
    maxClickThreshold = 0,
    swipeHandlers = {},
    handleStyleChanges,
}: UseOnSwipeProps) => {
    //todo: need to add handlers to swiping on a phone too?
    const lastCoordinateRef = useRef<Coordinate>();
    const currentCoordinateRef = useRef<Coordinate>();
    const startCoordinateRef = useRef<Coordinate>();
    const endCoordinateRef = useRef<Coordinate>();
    const mouseDownSourceElement = useRef<HTMLElement>();
    const mouseUpSourceElement = useRef<HTMLElement>();

    const reset = useCallback(() => {
        startCoordinateRef.current = undefined;
        endCoordinateRef.current = undefined;
        mouseDownSourceElement.current = undefined;
        mouseUpSourceElement.current = undefined;
        lastCoordinateRef.current = undefined;
    }, []);

    const getSkipTargetMatchFound = useCallback((swipeDirection: SwipeDirection) => {
        const isSkipTargetsGiven = swipeHandlers[swipeDirection]?.mouseDownSkipTargets;
        if (!isSkipTargetsGiven || !mouseDownSourceElement.current) return false;
        return swipeHandlers[swipeDirection]?.mouseDownSkipTargets?.includes(mouseDownSourceElement.current);
    }, [swipeHandlers])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (mouseDownSourceElement.current) {
            setCoordinate(currentCoordinateRef, e);
            if (lastCoordinateRef.current) {
                const { xDiff, yDiff } = getCoordinateDifference(currentCoordinateRef.current as Coordinate, lastCoordinateRef.current as Coordinate);
                if (Math.abs(xDiff) > ON_MOVE_WHEN_GRABBING_SHORT_CIRCUIT_AMOUNT || Math.abs(yDiff) > ON_MOVE_WHEN_GRABBING_SHORT_CIRCUIT_AMOUNT) return;
                swipeHandlers.onMoveWhenGrabbing && swipeHandlers.onMoveWhenGrabbing(xDiff, yDiff);
            }
            setCoordinate(lastCoordinateRef, e);
        }
    }, [swipeHandlers])

    const handleClick = useCallback((e: Event) => {
        //this is needed to be able to use handleClickStop
    }, [])

    const handleClickStop = useCallback((e: Event) => {
        // console.log({ startCoordinate: startCoordinateRef.current, endCoordinate: endCoordinateRef.current, downSource: mouseDownSourceElement.current, upSource: mouseUpSourceElement.current });
        if (startCoordinateRef?.current && endCoordinateRef?.current) {
            const { distance } = getCoordinateDifference(startCoordinateRef.current, endCoordinateRef.current);
            if (distance > maxClickThreshold && mouseDownSourceElement.current === mouseUpSourceElement.current) {
                stopPropagation(e);
            }
        }

        reset();
        window.removeEventListener('click', handleClickStop, true);
    }, [maxClickThreshold, reset])

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
        const { distance } = getCoordinateDifference(startCoordinateRef.current as Coordinate, endCoordinateRef.current as Coordinate);

        //no need to do anything if event is being registered as a click rather than swipe
        if (distance <= maxClickThreshold) return;

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
                const matchFound = getSkipTargetMatchFound(SwipeDirection.left)
                if (swipeHandlers.left?.callback && !matchFound) {
                    swipeHandlers.left.callback();
                }
            } else {
                const matchFound = getSkipTargetMatchFound(SwipeDirection.right)
                if (swipeHandlers.right?.callback && !matchFound) {
                    swipeHandlers.right.callback();
                }
            }
        } else {
            if (swipeHandlers.minSwipeThreshold && swipeHandlers.minSwipeThreshold > verticalDiffAbsolute) return;
            if (verticalDiff > 0) {
                const matchFound = getSkipTargetMatchFound(SwipeDirection.top)
                if (swipeHandlers.top?.callback && !matchFound) {
                    swipeHandlers.top.callback();
                }
            } else {
                const matchFound = getSkipTargetMatchFound(SwipeDirection.bottom)
                if (swipeHandlers.bottom?.callback && !matchFound) {
                    swipeHandlers.bottom.callback();
                }
            }
        }
    }, [maxClickThreshold, swipeHandlers, getSkipTargetMatchFound])

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

        if (swipeHandlers?.onMoveWhenGrabbing) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            element.removeEventListener('click', handleClick);
            element.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);

            if (swipeHandlers?.onMoveWhenGrabbing) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
        }
    }, [element, handleClick, handleClickStop, handleMouseDown, handleMouseMove, handleMouseUp, swipeHandlers])
}

function setCoordinate(ref: React.MutableRefObject<Coordinate | undefined>, e: MouseEvent) {
    ref.current = {
        x: e.x || e.clientX || e.pageX,
        y: e.y || e.clientY || e.pageY,
    }
}