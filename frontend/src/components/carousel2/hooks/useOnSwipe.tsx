import { useCallback, useEffect, useRef } from "react"

type Coordinate = {
    x: number;
    y: number;
}
enum SwipeDirections {
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    top = 'top',
}
export type UseOnSwipeHandlers = {
    [direction in SwipeDirections]?: () => void;
}

//positive horizontal diff means right and positive vertical diff means down
export const useOnSwipe = (element: HTMLElement | null, swipeHandlers: UseOnSwipeHandlers) => {
    //todo: need to add handlers to swiping on a phone too?
    const startCoordinateRef = useRef<Coordinate>();

    const handleDragStart = useCallback((e: DragEvent) => {
        console.log({ e });
        startCoordinateRef.current = {
            x: e.x || e.clientX || e.pageX,
            y: e.y || e.clientY || e.pageY,
        }
    }, [])

    const handleDragEnd = useCallback((e: DragEvent) => {
        if (!startCoordinateRef.current) return;
        const endX = e.x || e.clientX || e.pageX;
        const endY = e.y || e.clientY || e.pageY;
        const { x: startX, y: startY } = startCoordinateRef.current

        
        const verticalDiff = endY - startY;
        const horizontalDiff = endX - startX;
        const verticalDiffAbsolute = Math.abs(verticalDiff);
        const horizontalDiffAbsolute = Math.abs(horizontalDiff);
        const absoluteDiff = Math.abs(verticalDiffAbsolute - horizontalDiffAbsolute);
        const smallerDiff = Math.min(verticalDiffAbsolute, horizontalDiffAbsolute);
        const isAmbiguous = absoluteDiff < smallerDiff;
        // console.log({verticalDiffAbsolute, horizontalDiffAbsolute, absoluteDiff, smallerDiff, isAmbiguous });

        if (isAmbiguous) return;
        if (horizontalDiffAbsolute !== smallerDiff) {
            //is horizontal
            if (horizontalDiff > 0) {
                swipeHandlers.left && swipeHandlers.left();
            } else {
                swipeHandlers.right && swipeHandlers.right();
            }
        } else {
            if (verticalDiff > 0) {
                swipeHandlers.top && swipeHandlers.top();
            } else {
                swipeHandlers.bottom && swipeHandlers.bottom();
            }
        }
    }, [swipeHandlers])

    useEffect(() => {
        if (!element) return;
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);


        return () => {
            element.removeEventListener('dragstart', handleDragStart);
            element.addEventListener('dragend', handleDragEnd);
        }
    }, [element, swipeHandlers, handleDragStart, handleDragEnd])

}