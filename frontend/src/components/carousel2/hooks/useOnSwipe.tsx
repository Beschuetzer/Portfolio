import { useCallback, useEffect, useRef } from "react"

export type StylingCase = 'start' | 'end';
type Coordinate = {
    x: number;
    y: number;
}
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
    *The minimum number of pixels in the given direction that must be made to register a valid event
    */
    minThreshold?: number;
}

export type UseOnSwipeProps = {
    element: HTMLElement;
    isDisabled?: boolean;
    handleStyleChanges: (element: HTMLElement, stylingCase: StylingCase) => void;
    swipeHandlers?: UseOnSwipeHandlers;
}

//positive horizontal diff means right and positive vertical diff means down
export const useOnSwipe = ({
    element,
    isDisabled = false,
    swipeHandlers = {},
    handleStyleChanges,
}: UseOnSwipeProps) => {
    //todo: need to add handlers to swiping on a phone too?
    const startCoordinateRef = useRef<Coordinate>();
    const mouseDownSourceElement = useRef<HTMLElement>();
    const mouseUpSourceElement = useRef<HTMLElement>();

    const handleMouseDown = useCallback((e: MouseEvent) => {
        if (isDisabled) return;
        handleStyleChanges && handleStyleChanges(element, 'start')

        if (mouseDownSourceElement) {
            mouseDownSourceElement.current = e.target as HTMLElement;
        }

        startCoordinateRef.current = {
            x: e.x || e.clientX || e.pageX,
            y: e.y || e.clientY || e.pageY,
        }
    }, [element, handleStyleChanges, isDisabled])

    const handleMouseUp = useCallback((e: MouseEvent) => {
        if (!startCoordinateRef.current || isDisabled) return;
        handleStyleChanges && handleStyleChanges(element, 'end');

        if (mouseUpSourceElement) {
            mouseUpSourceElement.current = e.target as HTMLElement;
        }
        if (mouseDownSourceElement.current === mouseUpSourceElement.current) return;

        const endX = e.x || e.clientX || e.pageX;
        const endY = e.y || e.clientY || e.pageY;
        const { x: startX, y: startY } = startCoordinateRef.current
        startCoordinateRef.current = undefined;

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
            if (swipeHandlers.minThreshold && swipeHandlers.minThreshold > horizontalDiffAbsolute) return;
            if (horizontalDiff > 0) {
                swipeHandlers.left && swipeHandlers.left();
            } else {
                swipeHandlers.right && swipeHandlers.right();
            }
        } else {
            if (swipeHandlers.minThreshold && swipeHandlers.minThreshold > verticalDiffAbsolute) return;
            if (verticalDiff > 0) {
                swipeHandlers.top && swipeHandlers.top();
            } else {
                swipeHandlers.bottom && swipeHandlers.bottom();
            }
        }
    }, [element, handleStyleChanges, isDisabled, swipeHandlers])


    useEffect(() => {
        if (!element) return;
        element.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [element, handleMouseDown, handleMouseUp, swipeHandlers])
}