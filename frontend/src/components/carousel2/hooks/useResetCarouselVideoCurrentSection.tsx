import { useCallback, useEffect } from "react"
import { getIsPointInsideElement, getPoint } from "../utils/utils";
import { CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL } from "../constants";

type ElementToUse = Element | undefined | null;

export type UseResetCarouselVideoCurrentSectionInput = {
    element: ElementToUse;
    progressBarElement: ElementToUse;
    currentSection: number;
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
    isMouseDownRef: React.MutableRefObject<boolean>;
}

export const useResetCarouselVideoCurrentSection = (input: UseResetCarouselVideoCurrentSectionInput) => {
    const {
        element,
        progressBarElement,
        currentSection,
        setCurrentSection,
        isMouseDownRef,
    } = input;
    const handleMove = useCallback((e: MouseEvent) => {
        if (currentSection === CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL || isMouseDownRef.current) return;
        const point = getPoint(e);
        const isInsideProgressBar = getIsPointInsideElement(point, progressBarElement);
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