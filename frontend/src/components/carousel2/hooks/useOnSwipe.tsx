import { useCallback, useEffect, useRef } from "react"
import { getAncestorContainsClassname, getCoordinateDifference, stopPropagation } from "../utils";
import { CarouselNavigationOptions, Coordinate } from "../types";
import { MOBILE_PIXEL_WIDTH } from "../constants";

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
    *If the mouseDownSourceElement is a child node of a node with any of the given classnames, then the callback will be skipped.
    *Needed in order to prevent the swipes starting on the toolbar from changing items
    */
    skipCallbackParentClassnames?: string[];
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
    const isMobile = window.innerWidth <= MOBILE_PIXEL_WIDTH

    const reset = useCallback(() => {
        startCoordinateRef.current = undefined;
        endCoordinateRef.current = undefined;
        mouseDownSourceElement.current = undefined;
        mouseUpSourceElement.current = undefined;
        lastCoordinateRef.current = undefined;
    }, []);

    const getShouldSkipCallback = useCallback((swipeDirection: SwipeDirection) => {
        const skipTargets = swipeHandlers[swipeDirection]?.skipCallbackParentClassnames;
        if (!skipTargets || skipTargets.length === 0 || !mouseDownSourceElement.current) return false;
        for (const skipTarget of skipTargets) {
            const isChildOfSkipElement = getAncestorContainsClassname(mouseDownSourceElement.current, skipTarget);
            if (isChildOfSkipElement) return true;
        }
        return false;
    }, [swipeHandlers])

    const handleMove = useCallback((e: Event) => {
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

    const handleStart = useCallback((e: Event) => {
        stopPropagation(e)
        if (isDisabled) return;
        handleStyleChanges && handleStyleChanges('start', element)

        if (mouseDownSourceElement) {
            mouseDownSourceElement.current = e.target as HTMLElement;
        }

        if (getIsTouchEvent(e)) {
            setCoordinateWithTouchEvent(startCoordinateRef, e as TouchEvent);
        } else {
            setCoordinateWithMouseEvent(startCoordinateRef, e as MouseEvent);
        }
    }, [element, handleStyleChanges, isDisabled])

    /*
    *Determines whether the swipe actually occurs and which callback to trigger
    */
    const handleSwiping = useCallback((e: Event) => {

        const { endX, endY } = getEndCoordinate(e);
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
                const shouldSkipCallback = getShouldSkipCallback(SwipeDirection.left)
                if (swipeHandlers.left?.callback && !shouldSkipCallback) {
                    swipeHandlers.left.callback();
                }
            } else {
                const shouldSkipCallback = getShouldSkipCallback(SwipeDirection.right)
                if (swipeHandlers.right?.callback && !shouldSkipCallback) {
                    swipeHandlers.right.callback();
                }
            }
        } else {
            if (swipeHandlers.minSwipeThreshold && swipeHandlers.minSwipeThreshold > verticalDiffAbsolute) return;
            if (verticalDiff > 0) {
                const shouldSkipCallback = getShouldSkipCallback(SwipeDirection.top)
                if (swipeHandlers.top?.callback && !shouldSkipCallback) {
                    swipeHandlers.top.callback();
                }
            } else {
                const shouldSkipCallback = getShouldSkipCallback(SwipeDirection.bottom)
                if (swipeHandlers.bottom?.callback && !shouldSkipCallback) {
                    swipeHandlers.bottom.callback();
                }
            }
        }
    }, [maxClickThreshold, swipeHandlers, getShouldSkipCallback])

    const handleEnd = useCallback((e: Event) => {
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
        element.addEventListener('mousedown', handleStart);
        window.addEventListener('mouseup', handleEnd);

        if (swipeHandlers?.onMoveWhenGrabbing) {
            window.addEventListener('mousemove', handleMove);
        }

        if (isMobile) {
            element.addEventListener('touchstart', handleStart);
            window.addEventListener('touchend', handleEnd);
            window.addEventListener('touchmove', handleMove);
        }

        return () => {
            element.removeEventListener('click', handleClick);
            element.removeEventListener('mousedown', handleStart);
            window.removeEventListener('mouseup', handleEnd);
            element.removeEventListener('touchstart', handleStart);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('touchmove', handleMove);

            if (swipeHandlers?.onMoveWhenGrabbing) {
                window.removeEventListener('mousemove', handleMove);
            }

        }
    }, [
        element,
        handleClick,
        handleClickStop,
        handleStart,
        handleMove,
        handleEnd,
        isMobile,
        swipeHandlers
    ])
}

//#region Helpers
function getEndCoordinate(e: Event) {
    let endX, endY;
    if (getIsTouchEvent(e)) {
        const event = (e as TouchEvent);
        const changedTouch = event.changedTouches?.[0] || {};
        endX = changedTouch?.pageX || changedTouch.clientX;
        endY = changedTouch?.pageY || changedTouch.clientY;
    } else {
        const event = (e as MouseEvent);
        endX = event?.x || event?.clientX || event?.pageX;
        endY = event?.y || event?.clientY || event?.pageY;
    }
    return { endX, endY };
}

function getIsTouchEvent(e: Event) {
    return !!(e as TouchEvent)?.changedTouches;
}

function setCoordinate(ref: React.MutableRefObject<Coordinate | undefined>, e: Event) {
    if (getIsTouchEvent(e)) {
        setCoordinateWithTouchEvent(ref, e as TouchEvent);
    } else {
        setCoordinateWithMouseEvent(ref, e as MouseEvent);
    }
}

function setCoordinateWithMouseEvent(ref: React.MutableRefObject<Coordinate | undefined>,
    e: MouseEvent) {
    ref.current = {
        x: e.x || e.clientX || e.pageX,
        y: e.y || e.clientY || e.pageY,
    }
}

function setCoordinateWithTouchEvent(ref: React.MutableRefObject<Coordinate | undefined>,
    e: TouchEvent) {
    const event = e.changedTouches?.[0] || {};
    ref.current = {
        x: event.pageX || event.clientX,
        y: event.pageY || event.clientY,
    }
}
//#endregion