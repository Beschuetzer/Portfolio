import React, { useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../../constants';
import { getClassname, getFormattedTimeString } from '../../../utils';
import { VideoTimeStrings } from '../../../types';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { useCarouselContext } from '../../../context';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type SectionToProgressBarValueMapping = {
    [number: number]: {
        start: number;
        end: number;
    }
}

type CarouselItemViewerProgressBarProps = {
    isMouseDownRef: React.MutableRefObject<boolean>;
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>
    & Pick<CarouselItemViewerToolbarProps, 'setIsVideoPlaying'>;

const NUMBER_OF_MS_IN_A_SECOND = 1000;
const NEXT_SECTION_START_OFFSET = .0000000000000001;
const CURRENT_SECTION_INITIAL = -1;
const INITIAL_VALUE = 0;
export const CarouselItemViewerProgressBar = ({
    isMouseDownRef,
    setIsVideoPlaying,
    setTimeStrings,
    videoRef,
}: CarouselItemViewerProgressBarProps) => {
    //#region Init
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};
    const areSectionsGiven = sections && sections.length > 0;
    const toolbarRef = useRef<HTMLDivElement>();
    const sectionToProgressBarValueMapping = useRef<SectionToProgressBarValueMapping>({});
    const mapSectionToProgressBarTimeoutRef = useRef<any>(-1);
    const [toolbarWidth, setToolbarWidth] = useState(INITIAL_VALUE)
    const [progressBarValue, setProgressBarValue] = useState(INITIAL_VALUE);
    const [currentSection, setCurrentSection] = useState(CURRENT_SECTION_INITIAL);
    const [showDot, setShowDot] = useState(false);
    const [seekWidth, setSeekWidth] = useState(INITIAL_VALUE);
    const { stylingLogic } = useBusinessLogic({ progressBarValue });
    //#endregion

    //#region Functions/Handlers
    const setCurrentSectionFromPercent = useCallback((percent: number) => {
        if (percent < 0 || percent > 1) return;
        for (const [sectionIndex, sectionRange] of Object.entries(sectionToProgressBarValueMapping.current)) {
            if (percent >= sectionRange.start && percent <= sectionRange.end) setCurrentSection(Number(sectionIndex));
        }
    }, []);

    const getPercent = useCallback((e: MouseEvent) => {
        const toolbarRect = toolbarRef?.current?.getBoundingClientRect();
        if (!e || !toolbarRect) return 0;
        const clientX = e.clientX;
        const progressBarLeftX = toolbarRect.left;
        const progressBarRightX = toolbarRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        return amountPastLeft / (progressBarRightX - progressBarLeftX);
    }, [])

    const onMouseUp = useCallback((e: MouseEvent) => {
        isMouseDownRef.current = false;
        setCurrentSection(CURRENT_SECTION_INITIAL);
        setIsVideoPlaying && setIsVideoPlaying(true);
        if (videoRef?.current) {
            videoRef.current.currentTime = progressBarValue * videoRef.current.duration;
            videoRef?.current?.play();
        }
    }, [isMouseDownRef, progressBarValue, setIsVideoPlaying, videoRef]);

    const onMouseDown = useCallback((e: MouseEvent) => {
        isMouseDownRef.current = true;
        setIsVideoPlaying && setIsVideoPlaying(false);
        videoRef?.current?.pause();

        const progressBar = e.currentTarget as HTMLDivElement;
        if (!progressBar) return;
        const percent = getPercent(e);
        setProgressBarValue(percent);
        if (videoRef?.current) {
            const video = videoRef?.current;
            setSeekWidth(video.currentTime / video.duration);
            video.currentTime = percent * video.duration;
        }
    }, [getPercent, isMouseDownRef, setIsVideoPlaying, videoRef]);

    const onMouseLeave = useCallback((index: number, e: MouseEvent) => {
        if (isMouseDownRef.current) {
            // onMouseUp(e);
            return;
        };
        setCurrentSection(CURRENT_SECTION_INITIAL);
        setShowDot(false);
        setSeekWidth(INITIAL_VALUE);
    }, [isMouseDownRef])

    const onMouseMove = useCallback((e: MouseEvent) => {
        setShowDot(true);
        if (areSectionsGiven) return;
        const percent = getPercent(e);
        if (isMouseDownRef.current) {
            setProgressBarValue(percent)
        } else {
            setSeekWidth(percent);
        }
    }, [areSectionsGiven, getPercent, isMouseDownRef])

    const onMouseMoveGlobal = useCallback((e: MouseEvent) => {
        if (!isMouseDownRef.current) return;
        const xMovement = e.movementX;
        const toolbarRect = toolbarRef?.current?.getBoundingClientRect();
        if (!toolbarRect) return;
        const movementAmount = xMovement / (toolbarRect.right - toolbarRect.left);
        setProgressBarValue((current) => {
            const newValue = current + movementAmount;
            if (newValue >= 1) return 1;
            else if (newValue <= 0) return 0;
            return newValue
        });
    }, [isMouseDownRef])

    const onMouseUpGlobal = useCallback((e: MouseEvent) => {
        if (!isMouseDownRef.current) return;
        onMouseUp(e);
        setSeekWidth(INITIAL_VALUE);
    }, [isMouseDownRef, onMouseUp])

    const onMouseMoveBackground = useCallback((index: number, e: MouseEvent) => {
        setCurrentSection(index);
    }, [])
    //#endregion

    //#region Side FX
    useEffect(() => {
        const videoRefCopy = videoRef?.current;

        function onVideoTimeUpdate(e: Event) {
            const videoElement = e.currentTarget || e.target as any;
            if (!videoElement) return;
            const percent = videoElement.currentTime / videoElement.duration;
            if (percent >= 0 && percent <= 1) {
                setProgressBarValue(percent);
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
                videoRefCopy.addEventListener('timeupdate', onVideoTimeUpdate);
            }
        }
    }, [setTimeStrings, videoRef])

    useEffect(() => {
        setProgressBarValue(INITIAL_VALUE);
    }, [currentItem])

    useLayoutEffect(() => {
        if (toolbarWidth !== undefined && toolbarWidth <= INITIAL_VALUE) {
            const newWidth = toolbarRef?.current?.getBoundingClientRect().width;
            if (newWidth !== undefined && newWidth > 0 && toolbarWidth !== undefined) {
                console.log("setting width to: " + newWidth);

                setToolbarWidth(newWidth);
            }
        }
    }, [setToolbarWidth, toolbarWidth])

    //calculate the sectionToProgressBarValueMapping
    useEffect(() => {
        function mapSection() {
            clearTimeout(mapSectionToProgressBarTimeoutRef.current);
            if (!sections || sections.length <= 0 || !videoRef?.current) {
                sectionToProgressBarValueMapping.current = {};
                return;
            }
            if (Object.values(sectionToProgressBarValueMapping.current).length > 0) return;

            const videoDuration = videoRef.current.duration * NUMBER_OF_MS_IN_A_SECOND
            if (isNaN(videoDuration)) {
                mapSectionToProgressBarTimeoutRef.current = setTimeout(() => {
                    mapSection();
                }, 100)
                return;
            }

            let amountBefore = 0;
            for (let index = 0; index < sections.length; index++) {
                const section = sections[index];
                const sectionDuration = section[1];
                const start = index === 0 ? 0 : sectionToProgressBarValueMapping.current[index - 1].end + NEXT_SECTION_START_OFFSET;
                amountBefore += sectionDuration;
                const end = index === sections.length - 1 ? 1 : amountBefore / videoDuration;
                sectionToProgressBarValueMapping.current[index] = {
                    start,
                    end
                }
            }
            console.log({ sectionToProgressBarValueMapping });
        }

        mapSection();
    }, [sections, videoRef])

    //use sectionToProgressBarValueMapping to set currentSection on progressBarValue change
    useEffect(() => {
        if (
            !isMouseDownRef.current ||
            Object.keys(sectionToProgressBarValueMapping.current || {}).length <= 0
        ) return;
        setCurrentSectionFromPercent(progressBarValue);
    }, [isMouseDownRef, progressBarValue, setCurrentSectionFromPercent])

    //setup global listeners
    useEffect(() => {
        document.addEventListener('mousemove', onMouseMoveGlobal);
        document.addEventListener('mouseup', onMouseUpGlobal);

        return () => {
            document.removeEventListener('mousemove', onMouseMoveGlobal);
            document.removeEventListener('mouseup', onMouseUpGlobal);
        }
    }, [onMouseMoveGlobal, onMouseUpGlobal])
    //#endregion

    //#region JSX
    const getBackgroundDiv = useCallback((width: number, index: number, left = 0, isLast = false) => {
        if (isNaN(width)) return null;
        return (
            <div
                key={index}
                style={stylingLogic.getCarouselVideoProgressBackgroundSectionContainerStyle(width, left, isLast, sections?.length, index === currentSection)}
                onMouseMove={onMouseMoveBackground.bind(null, index) as any}
                onMouseLeave={onMouseLeave.bind(null, index) as any}
            >
                <div
                    style={stylingLogic.carouselVideoProgressBackgroundSectionStyle}
                />
            </div>
        )
    }, [currentSection, onMouseLeave, onMouseMoveBackground, sections?.length, stylingLogic])

    const getForegroundDiv = useCallback((percent: number, isCurrent = false) => {
        return <div style={stylingLogic.getCarouselVideoProgressForegroundStyle(percent, isCurrent)} />
    }, [stylingLogic]);

    const getSeekDiv = useCallback((percent: number, isCurrent = false) => {
        return <div style={stylingLogic.getCarouselVideoProgressSeekStyle(percent, isCurrent)} />
    }, [stylingLogic]);

    function renderSections() {
        const currentForegroundSection = getForegroundDiv(progressBarValue, currentSection !== CURRENT_SECTION_INITIAL);
        const currentSeekSection = getSeekDiv(seekWidth, currentSection !== CURRENT_SECTION_INITIAL);
        const fullForegroundSection = getForegroundDiv(1);
        const fullSeekSection = getSeekDiv(1);

        if (!sections || sections.length <= 1 || !videoRef?.current) {
            return (
                <>
                    {getBackgroundDiv(1, 0)}
                    {currentSeekSection}
                    {currentForegroundSection}
                </>
            );
        }

        const backgroundDivs = [];
        let amountBeforeCurrent = 0;
        for (let index = 0; index < sections.length; index++) {
            const section = sections[index];
            const [text, duration] = section;
            const isFirstSection = index === 0;
            const isLastSection = index === sections.length - 1;
            const percentAcross = duration / NUMBER_OF_MS_IN_A_SECOND / (videoRef?.current?.duration || 1);
            const backgroundLeft = amountBeforeCurrent / NUMBER_OF_MS_IN_A_SECOND / videoRef.current.duration;

            //background div stuff
            backgroundDivs.push(getBackgroundDiv(isLastSection ? 1 - backgroundLeft : percentAcross, index, backgroundLeft, isLastSection));
            amountBeforeCurrent += duration;
            // console.log({ text, duration, videoDuration: videoRef.current.duration, percentAcross, isLastSection });
        }

        return (
            <>
                {/* <div style={stylingLogic.carouselVideoProgressBackgroundDivsContainer}> */}
                {backgroundDivs}
                {/* </div> */}
                {/* {currentSeekSection}
                {currentForegroundSection} */}
            </>
        );

    }

    //#endregion
    return (
        <div
            ref={toolbarRef as any}
            style={stylingLogic.carouselVideoProgressContainerStyle}
            className={getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-progress` })}
            onMouseDownCapture={onMouseDown as any}
            onMouseUp={onMouseUp as any}
            onMouseMoveCapture={onMouseMove as any}
        >
            <div style={stylingLogic.getCarouselVideoProgressSeekDotStyle(progressBarValue, showDot)} />
            {renderSections()}
        </div>
    )
}

