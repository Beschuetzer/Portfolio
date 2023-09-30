import { useRef, useEffect, useCallback } from "react";
import { NUMBER_OF_MS_IN_A_SECOND, CAROUSEL_VIDEO_SECTION_MIN_LENGTH } from "../constants";
import { useCarouselContext } from "../context";
import { CarouselItemViewerToolbarProps } from "../components/item-viewer/toolbar/CarouselItemViewerToolbar";
import { convertTimeStringToMilliseconds } from "../utils/utils";

const MAP_SECTION_INTERVAL = 100;
const NEXT_SECTION_OFFSET = .0000000000000001;

type SectionToValueMapping = {
    [number: number]: SectionToValueMappingValue;
}

type SectionToValueMappingValue = {
    start: number;
    end: number;
}

export type UseSectionToValueMappingInput = {} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;
const EXAMPLE_SENTENCE = 'Please check CarouselVideoOptions.sections in CarouselVideo.tsx for examples.';

/**
*Create an object where the keys are the sections and the value is an object with a 
*{@link SectionToValueMappingValue start and end value}, representing what percent
*of the video that section spans.  
**/
export const useSectionToValueMapping = (input: UseSectionToValueMappingInput) => {
    const {
        videoRef,
    } = input;
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};
    const checkIsVideoLoadedTimoutRef = useRef<any>(-1);
    const sectionToValueMappingRef = useRef<SectionToValueMapping>({});

    const mapSectionRanges = useCallback(() => {
        if (!sections || sections.length <= 0 || !videoRef?.current) {
            sectionToValueMappingRef.current = {};
            return;
        }
        if (Object.values(sectionToValueMappingRef.current).length > 0) return;

        let amountBefore = 0;
        const videoDuration = (videoRef?.current?.duration || 0) * NUMBER_OF_MS_IN_A_SECOND
        const isUsingNumberedSections = typeof sections?.[0]?.[1] === 'number';
        let indexToUse = 0;

        try {
            for (let index = 0; index < sections.length; index++) {
                indexToUse = index;

                if (isUsingNumberedSections) {
                    const section = sections[index];
                    const sectionDuration = section[1] as number;
                    amountBefore += sectionDuration as number;

                } else {
                    const nextSection = sections[index + 1];

                    //all sections but the last one
                    if (nextSection !== undefined) {
                        const nextSectionTimestamp = nextSection?.[1] as string;
                        const nextConverted = convertTimeStringToMilliseconds(nextSectionTimestamp);
                        const sectionDiff = Math.abs(nextConverted - amountBefore);
                        amountBefore += sectionDiff;
                    }
                }

                const start = indexToUse === 0 ? 0 : sectionToValueMappingRef.current[indexToUse - 1]?.end + NEXT_SECTION_OFFSET;
                const end = indexToUse === sections.length - 1 ? 1 : amountBefore / videoDuration;

                if (end > 1) alert(`Section ${index + 1} ends after the video's end.  Please check the sections object for this video.`);

                sectionToValueMappingRef.current[indexToUse] = {
                    start,
                    end
                }
            }
        } catch (error) {
            alert(`Developer Warning: There is an issue with this item's sections.  ${EXAMPLE_SENTENCE}`);
        }

        // console.log({sectionToValueMappingRef});
    }, [sections, videoRef]);

    const validateSections = useCallback(() => {
        if (sections && sections?.length <= 0) return;
        const isString = typeof sections?.[0]?.[1] === 'string' || typeof sections?.[0]?.[1] === 'undefined';
        const videoDuration = videoRef?.current?.duration || 0;
        let sum = 0;

        if (isString && sections) {
            for (let index = 0; index < sections.length; index++) {
                const currentSection = sections[index];
                const nextSection = sections[index + 1];

                if (index > 0 && typeof currentSection?.[1] !== 'string') {
                    alert(`Developer Warning: Expecting a start time for each section.  Either different types of values are being used or an expected start value was omitted for a section.  ${EXAMPLE_SENTENCE}`);
                    throw new Error();
                }

                if (nextSection !== undefined) {
                    const currentSectionStart = convertTimeStringToMilliseconds(currentSection[1] as string);
                    const nextSectionStart = convertTimeStringToMilliseconds(nextSection[1] as string);

                    if (!currentSectionStart || !nextSectionStart) continue;
                    if (currentSectionStart >= nextSectionStart) {
                        alert(`Developer Warning: Check your section values for this video.  One section starts before the next one ends.  ${EXAMPLE_SENTENCE}`);
                        throw new Error();
                    }
                    else if (Math.abs(currentSectionStart - nextSectionStart) < CAROUSEL_VIDEO_SECTION_MIN_LENGTH) {
                        alert(`Developer Warning: The length of the section titled '${currentSection?.[0]}' does not exceed the minimum length of ${CAROUSEL_VIDEO_SECTION_MIN_LENGTH} milliseconds.  ${EXAMPLE_SENTENCE}`)
                        throw new Error();
                    }
                }
            }
        }

        if (!isString && sections) {
            sum = sections?.map(section => section[1]).reduce((a, b) => {
                if (b === undefined) return a as number;
                return ((a as number) + (b as number));
            }, 0) as number / NUMBER_OF_MS_IN_A_SECOND;

            
            if (sections.some((section) => typeof section?.[1] !== 'number' && typeof section?.[1] !== 'undefined')) {
                alert(`Developer Warning: Expecting a duration for sections.  Either different types of values are being used or an expected duration value was omitted from a section.  ${EXAMPLE_SENTENCE}`);
                throw new Error();
            }
        }

        if (sum > videoDuration) alert("The sum of the sections is greater than the video duration")
    }, [sections, videoRef]);

    useEffect(() => {
        function checkIfVideoLoaded() {
            clearTimeout(checkIsVideoLoadedTimoutRef.current);

            const videoDuration = (videoRef?.current?.duration || 0) * NUMBER_OF_MS_IN_A_SECOND
            if (!videoDuration || isNaN(videoDuration)) {
                checkIsVideoLoadedTimoutRef.current = setTimeout(() => {
                    checkIfVideoLoaded();
                }, MAP_SECTION_INTERVAL)
                return;
            } else {
                mapSectionRanges();
                validateSections();
            }
        }

        checkIfVideoLoaded();

        return () => {
            sectionToValueMappingRef.current = {};
        }
    }, [mapSectionRanges, sections, validateSections, videoRef])

    return sectionToValueMappingRef;
}