import React, {
    useCallback,
    useState,
    useEffect,
    useRef,
    useMemo
} from 'react'
import {
    CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL,
    CLASSNAME__TOOLBAR_PROGRESS,
    NUMBER_OF_MS_IN_A_SECOND,
    PROGRESS_BAR_PERCENT_INITIAL_VALUE
} from '../../../constants';
import {
    convertTimeStringToMilliseconds,
    getFormattedTimeString,
    getIsPointInsideElement,
    getPoint
} from '../../../utils';
import { VideoTimeStrings } from '../../../types';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { useCarouselContext } from '../../../context';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { CarouselModalInternalProps } from '../../CarouselModal';
import { useSectionToValueMapping } from '../../../hooks/useSectionToValueMapping';

type CarouselItemViewerProgressBarProps = {
    isMouseDownRef: React.MutableRefObject<boolean | undefined> | undefined;
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>
    & Required<Pick<
        CarouselItemViewerToolbarProps,
        'setIsVideoPlaying' | 'currentVideoSection' | 'setCurrentVideoSection' | 'seekPercent' | 'setSeekPercent' | 'percent' | 'setPercent'
    >>
    & Pick<CarouselModalInternalProps, 'isProgressBarBeingHoveredRef'>


export const CarouselItemViewerProgressBar = (props: CarouselItemViewerProgressBarProps) => {
    //#region Init
    const {
        currentVideoSection,
        isMouseDownRef,
        isProgressBarBeingHoveredRef,
        percent,
        seekPercent,
        setCurrentVideoSection,
        setIsVideoPlaying,
        setPercent,
        setSeekPercent,
        setTimeStrings,
        videoRef,
    } = props;
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};
    const areSectionsGiven = useMemo(() => sections && sections.length > 0, [sections]);
    const progressBarRef = useRef<HTMLDivElement>();
    //this is used to prevent the the seekPercent from being reset then immediately set to a value when moving the triggering onMouseMove
    const wasMouseUpJustTriggeredRef = useRef(false);
    const [showDot, setShowDot] = useState(false);
    const { stylingLogic, optionsLogic } = useBusinessLogic();
    const sectionToValueMappingRef = useSectionToValueMapping({
        videoRef,
    });

    //this appears to be dead code
    // const toolbarWidth = useSetToolbarWidth({progressBarRef});
    //#endregion

    //#region Functions/Handlers
    const getCurrentSection = useCallback((percent: number) => {
        if (percent === undefined || percent === null) return CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL;
        for (const [index, sectionRange] of Object.entries(sectionToValueMappingRef.current)) {
            const indexAsNumber = Number(index);
            const isFirstIndex = indexAsNumber === 0;
            const isLastIndex = indexAsNumber === Object.keys(sectionToValueMappingRef || {}).length + 1;
            if (isLastIndex && percent > 1) return indexAsNumber;
            if (isFirstIndex && percent < 0) return 0;
            if (percent >= sectionRange.start && percent <= sectionRange.end) return indexAsNumber;
        }
        return CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL;
    }, [sectionToValueMappingRef])

    const getIsInCurrentSection = useCallback((percent: number) => {
        return getCurrentSection(percent) === currentVideoSection;
    }, [currentVideoSection, getCurrentSection])

    const setCurrentSectionFromPercent = useCallback((percent: number) => {
        if (percent < 0 || percent > 1) return;
        setCurrentVideoSection && setCurrentVideoSection(getCurrentSection(percent));
    }, [getCurrentSection, setCurrentVideoSection]);

    const getPercent = useCallback((e: MouseEvent) => {
        const progressbarRect = progressBarRef?.current?.getBoundingClientRect();
        if (!e || !progressbarRect) return 0;
        const clientX = e.clientX;
        const progressBarLeftX = progressbarRect.left;
        const progressBarRightX = progressbarRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        return amountPastLeft / (progressBarRightX - progressBarLeftX);
    }, [])

    const onMouseUp = useCallback((e: MouseEvent) => {
        wasMouseUpJustTriggeredRef.current = true;
        if (isMouseDownRef) {
            isMouseDownRef.current = false;
        }

        const point = getPoint(e);
        const isInsideProgressBar = getIsPointInsideElement(point, progressBarRef.current);
        if (!isInsideProgressBar) {
            setCurrentVideoSection && setCurrentVideoSection(CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL);
        }

        setSeekPercent(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
        setIsVideoPlaying && setIsVideoPlaying(true);

        if (videoRef?.current) {
            videoRef.current.currentTime = percent * videoRef.current.duration;
            videoRef?.current?.play();
        }
    }, [isMouseDownRef, percent, setCurrentVideoSection, setIsVideoPlaying, setSeekPercent, videoRef]);

    const onMouseDown = useCallback((e: MouseEvent) => {
        wasMouseUpJustTriggeredRef.current = false;
        if (isMouseDownRef) {
            isMouseDownRef.current = true;
        }
        setIsVideoPlaying && setIsVideoPlaying(false);
        videoRef?.current?.pause();

        const progressBar = e.currentTarget as HTMLDivElement;
        if (!progressBar) return;
        const percent = getPercent(e);
        setPercent(percent);
        if (videoRef?.current) {
            const video = videoRef?.current;
            setSeekPercent(video.currentTime / video.duration);
            video.currentTime = percent * video.duration;
        }
    }, [getPercent, isMouseDownRef, setIsVideoPlaying, setPercent, setSeekPercent, videoRef]);

    const onMouseLeave = useCallback((index: number, e: MouseEvent) => {
        if (isMouseDownRef?.current) {
            return;
        };
        if (isProgressBarBeingHoveredRef?.current !== undefined) {
            isProgressBarBeingHoveredRef.current = false;
        }
        setShowDot(false);
        setSeekPercent(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
    }, [isMouseDownRef, isProgressBarBeingHoveredRef, setSeekPercent])

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isProgressBarBeingHoveredRef?.current !== undefined) {
            isProgressBarBeingHoveredRef.current = true;
        }
        setShowDot(true);
        const percent = getPercent(e);
        setCurrentVideoSection && setCurrentVideoSection(areSectionsGiven ? getCurrentSection(percent) : 0);

        if (isMouseDownRef?.current) {
            setPercent(percent)
        } else {
            if (wasMouseUpJustTriggeredRef.current) {
                wasMouseUpJustTriggeredRef.current = false;
            } else {
                setSeekPercent(percent);
            }
        }
    }, [
        areSectionsGiven,
        getCurrentSection,
        getPercent,
        isMouseDownRef,
        isProgressBarBeingHoveredRef,
        setCurrentVideoSection,
        setPercent,
        setSeekPercent
    ])

    const onMouseMoveGlobal = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isMouseDownRef?.current) return;
        const xMovementMouse = (e as MouseEvent)?.movementX;
        let movementAmount: number;

        if (xMovementMouse !== undefined) {
            const toolbarRect = progressBarRef?.current?.getBoundingClientRect();
            if (!toolbarRect) return;
            movementAmount = xMovementMouse / (toolbarRect.right - toolbarRect.left);
        } else if (xMovementMouse === undefined) {
            //todo what is TouchEvent equivalent of e.movementX?
            //assume MouseEvent if xMovementMouse is truthy
            console.log({ firstTouch: (e as TouchEvent)?.changedTouches?.[0]?.pageX });
            movementAmount = 1;
        }

        setPercent((current) => {
            const newValue = current + movementAmount;
            if (newValue >= 1) return 1;
            else if (newValue <= 0) return 0;
            return newValue;
        });
    }, [isMouseDownRef, setPercent])

    const onMouseUpGlobal = useCallback((e: MouseEvent) => {
        if (!isMouseDownRef?.current) return;
        onMouseUp(e);
    }, [isMouseDownRef, onMouseUp])
    //#endregion

    //#region Side FX
    useEffect(() => {
        const videoRefCopy = videoRef?.current;

        function onVideoTimeUpdate(e: Event) {
            const videoElement = e.currentTarget || e.target as any;
            if (!videoElement) return;
            const percent = videoElement.currentTime / videoElement.duration;
            if (percent >= 0 && percent <= 1) {
                if (!isMouseDownRef?.current) {
                    setPercent(percent);
                }
                updateTimeStrings(videoElement);
            }
        }

        function updateTimeStrings(video: HTMLVideoElement) {
            if (!video) return;
            setTimeStrings({
                currentTimeStr: getFormattedTimeString(video.currentTime || -1),
                durationStr: getFormattedTimeString(video.duration || -1),
            });
        }

        if (videoRef?.current) {
            videoRef.current.addEventListener('timeupdate', onVideoTimeUpdate);
        }

        return () => {
            if (videoRefCopy) {
                videoRefCopy.removeEventListener('timeupdate', onVideoTimeUpdate);
            }
        }
    }, [isMouseDownRef, setPercent, setTimeStrings, videoRef])

    useEffect(() => {
        setPercent(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
    }, [currentItem, setPercent])

    //use sectionToProgressBarValueMapping to set currentVideoSection on progressBarValue change
    useEffect(() => {
        if (
            !isMouseDownRef?.current ||
            Object.keys(sectionToValueMappingRef.current || {}).length <= 0
        ) return;
        setCurrentSectionFromPercent(percent);
    }, [isMouseDownRef, percent, sectionToValueMappingRef, setCurrentSectionFromPercent])

    //setup global listeners
    useEffect(() => {
        document.addEventListener('mousemove', onMouseMoveGlobal);
        document.addEventListener('mouseup', onMouseUpGlobal);
        document.addEventListener('touchmove', onMouseMoveGlobal);


        return () => {
            document.removeEventListener('mousemove', onMouseMoveGlobal);
            document.removeEventListener('mouseup', onMouseUpGlobal);
        }
    }, [onMouseMoveGlobal, onMouseUpGlobal])
    //#endregion

    //#region JSX
    const getBackgroundDiv = useCallback((percent: number, left = 0, index = 0) => {
        if (isNaN(percent)) return null;
        return (
            <div
                key={`backDiv-${index}`}
                style={stylingLogic.getCarouselVideoProgressBackgroundSectionContainerStyle(
                    percent,
                    left,
                    index,
                    sections?.length || 1,
                    currentVideoSection
                )}
            >
                <div
                    style={stylingLogic.carouselVideoProgressBackgroundSectionStyle}
                />
            </div>
        )
    }, [currentVideoSection, sections?.length, stylingLogic])

    const getForegroundDiv = useCallback((percent: number, left = 0, index = 0) => {
        if (isNaN(percent)) return null;
        return <div key={`foreDiv-${index}`} style={stylingLogic.getCarouselVideoProgressForegroundStyle(
            percent,
            left,
            index,
            sections?.length || 1,
            currentVideoSection
        )} />
    }, [currentVideoSection, sections?.length, stylingLogic]);

    const getSeekDiv = useCallback((percent: number, left = 0, index = 0) => {
        if (isNaN(percent) || percent <= 0) return null;
        return <div key={`seekDiv-${index}`} style={stylingLogic.getCarouselVideoProgressSeekStyle(
            percent,
            left,
            index,
            sections?.length || 1,
            currentVideoSection
        )} />
    }, [currentVideoSection, sections?.length, stylingLogic]);

    function renderSections() {
        if (!sections || sections.length <= 1 || !videoRef?.current) {
            return (
                <>
                    {getBackgroundDiv(1)}
                    {getSeekDiv(seekPercent)}
                    {getForegroundDiv(percent)}
                </>
            );
        }

        const backgroundDivs = [];
        const foregroundDivs = [];
        const seekDivs = [];
        let amountBeforeCurrent = 0;
        for (let index = 0; index < sections.length; index++) {
            const section = sections[index];
            const [, duration] = section;
            const isLastSection = index === sections.length - 1;

            let backgroundLeft = 0, percentAcross = 0;

            //calculating backgroundLeft and percentAcross for both input cases
            if (typeof duration === "string" || (duration === undefined && index === 0)) {
                const nextSection = sections[index + 1];
                let sectionDiff = 0;

                //all sections but the last one
                if (nextSection !== undefined) {
                    const nextSectionTimestamp = nextSection?.[1] as string;
                    const nextConverted = convertTimeStringToMilliseconds(nextSectionTimestamp);
                    sectionDiff = Math.abs(nextConverted - amountBeforeCurrent);
                }
                percentAcross = sectionDiff as number / NUMBER_OF_MS_IN_A_SECOND / (videoRef?.current?.duration || 1);
                backgroundLeft = index === 0 ? 0 : amountBeforeCurrent / NUMBER_OF_MS_IN_A_SECOND / videoRef.current.duration;
                amountBeforeCurrent += sectionDiff;
            } else {
                const durationToUse = duration || Math.abs(amountBeforeCurrent - videoRef?.current?.duration);
                percentAcross = durationToUse as number / NUMBER_OF_MS_IN_A_SECOND / (videoRef?.current?.duration || 1);
                backgroundLeft = amountBeforeCurrent / NUMBER_OF_MS_IN_A_SECOND / videoRef.current.duration;
                amountBeforeCurrent += duration as number;
            }

            //rendering the divs
            const percentPlayedAlready = videoRef.current.currentTime / videoRef.current.duration;
            const percentToUse = isLastSection ? 1 - backgroundLeft : percentAcross
            const currentSectionTime = sectionToValueMappingRef.current[index];
            const itemToTrack = isMouseDownRef?.current ? percent : percentPlayedAlready;

            //background stuff
            backgroundDivs.push(getBackgroundDiv(percentToUse, backgroundLeft, index));

            //seek stuff
            if (!isMouseDownRef?.current) {
                if (seekPercent !== PROGRESS_BAR_PERCENT_INITIAL_VALUE && index < currentVideoSection) {
                    seekDivs.push(getSeekDiv(percentToUse, backgroundLeft, index))
                } else if (seekPercent !== PROGRESS_BAR_PERCENT_INITIAL_VALUE && index === currentVideoSection) {
                    const percentAcrossCurrentSectionFactor = (seekPercent - currentSectionTime?.start) / (currentSectionTime?.end - currentSectionTime?.start)
                    foregroundDivs.push(getSeekDiv(percentToUse * percentAcrossCurrentSectionFactor, backgroundLeft, index))
                }
            }

            //foreground stuff
            if (itemToTrack >= currentSectionTime?.end) {
                foregroundDivs.push(getForegroundDiv(percentToUse, backgroundLeft, index))
            } else if (itemToTrack >= currentSectionTime?.start && itemToTrack <= currentSectionTime?.end) {
                const percentAcrossCurrentSectionFactor = (itemToTrack - currentSectionTime?.start) / (currentSectionTime?.end - currentSectionTime?.start)
                foregroundDivs.push(getForegroundDiv(percentToUse * percentAcrossCurrentSectionFactor, backgroundLeft, index))
            }
            // console.log({progressBarValue, itemToTrack ,currentSectionTime, index, durationToUse, duration, videoDuration: videoRef.current.duration, percentAcross, isLastSection });
        }

        return (
            <>
                {backgroundDivs}
                {foregroundDivs}
                {seekDivs}
            </>
        );

    }

    //#endregion
    return (
        <div
            ref={progressBarRef as any}
            style={stylingLogic.carouselVideoProgressContainerStyle}
            className={CLASSNAME__TOOLBAR_PROGRESS}
            onMouseDownCapture={onMouseDown as any}
            onMouseUp={onMouseUp as any}
            onMouseMoveCapture={onMouseMove as any}
            onMouseLeave={onMouseLeave as any}
        >
            {optionsLogic.isToolbarInVideo ?
                <div style={stylingLogic.getCarouselVideoProgressSeekDotStyle(percent, showDot, getIsInCurrentSection(percent))} /> :
                null
            }
            {renderSections()}
        </div>
    )
}

