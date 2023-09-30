import { useEffect, useRef } from "react";
import { Point } from "../types";
import { stopPropagation } from "../utils/utils";

/**
*Returns a ref that tracks the mouse position as it moves.
**/
export const useMousePosition = () => {
    const mousePositionRef = useRef<Point>({} as Point);

    useEffect(() => {
        function updatePosition(e: MouseEvent) {
            stopPropagation(e);
            const { clientX, clientY} = e;
            if (mousePositionRef.current) {
                mousePositionRef.current.x = clientX;
                mousePositionRef.current.y = clientY;
            }
        }

        window.addEventListener('mousemove', updatePosition);
        return () => {
            window.removeEventListener('mousemove', updatePosition);
        }
    }, [])

    return mousePositionRef;
}