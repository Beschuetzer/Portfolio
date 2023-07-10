import { useCallback, useEffect } from "react"
import { getIsPointInsideElement } from "../utils";
import { Point } from "../types";
import { CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL } from "../constants";

type ElementToUse = Element | undefined | null;
export const useResetCarouselVideoCurrentSection = (
    element: ElementToUse,
    progressBarElement: ElementToUse,
    currentSection: number,
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>,
    isMouseDownRef: React.MutableRefObject<boolean>,
) => {
    const handleMove = useCallback((e: MouseEvent) => {
        if (currentSection === CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL || isMouseDownRef.current) return;
        const point: Point = {
            x: e.clientX,
            y: e.clientY,
        }
        const isInsideProgressBar = getIsPointInsideElement(point, progressBarElement);
        console.log({e, progressBarElement, isInsideProgressBar, currentSection});
        if (isInsideProgressBar) return;
        setCurrentSection(CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL);
    }, [currentSection, isMouseDownRef, progressBarElement, setCurrentSection])

    useEffect(() => {
        if (!element || !progressBarElement) return;

        element.addEventListener('mousemove', handleMove as any);

        return () => {
            element.removeEventListener('mousemove', handleMove as any)
        }
    }, [element, handleMove, progressBarElement])
}