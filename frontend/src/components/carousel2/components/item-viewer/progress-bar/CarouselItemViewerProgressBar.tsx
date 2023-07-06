import React, { useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../../constants';
import { getClassname, getFormattedTimeString } from '../../../utils';
import { VideoTimeStrings } from '../../../types';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { useCarouselContext } from '../../../context';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerProgressBarProps = {
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>
    & Pick<CarouselItemViewerToolbarProps, 'setIsVideoPlaying'>;

const CURRENT_SECTION_INITIAL = -1;
const INITIAL_VALUE = 0;
export const CarouselItemViewerProgressBar = ({
    setIsVideoPlaying,
    setTimeStrings,
    videoRef,
}: CarouselItemViewerProgressBarProps) => {
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};
    const areSectionsGiven = sections && sections.length > 0;
    const isMouseDownRef = useRef(false);
    const toolbarRef = useRef<HTMLDivElement>();
    const [toolbarWidth, setToolbarWidth] = useState(INITIAL_VALUE)
    const [progressBarValue, setProgressBarValue] = useState(INITIAL_VALUE);
    const [currentSection, setCurrentSection] = useState(CURRENT_SECTION_INITIAL);
    const [showDot, setShowDot] = useState(false);
    const [seekWidth, setSeekWidth] = useState(INITIAL_VALUE);
    const { stylingLogic } = useBusinessLogic({ progressBarValue });

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
    }, [progressBarValue, setIsVideoPlaying, videoRef]);

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
    }, [getPercent, setIsVideoPlaying, videoRef]);

    const onMouseLeave = useCallback((e: MouseEvent) => {
        if (isMouseDownRef.current) {
            // onMouseUp(e);
            return;
        };
        setCurrentSection(CURRENT_SECTION_INITIAL);
        setShowDot(false);
        setSeekWidth(INITIAL_VALUE);
    }, [])

    const onMouseMove = useCallback((e: MouseEvent) => {
        setShowDot(true);
        if (areSectionsGiven) return;
        const percent = getPercent(e);
        if (isMouseDownRef.current) {
            setProgressBarValue(percent)
        } else {
            setSeekWidth(percent);
        }
    }, [areSectionsGiven, getPercent])

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
    }, [])

    const onMouseUpGlobal = useCallback((e: MouseEvent) => {
        if (!isMouseDownRef.current) return;
        onMouseUp(e);
        setSeekWidth(INITIAL_VALUE);
    }, [onMouseUp])

    const onMouseMoveBackground = useCallback((index: number, e: MouseEvent) => {
        setCurrentSection(index);
    }, [])

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

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMoveGlobal);
        document.addEventListener('mouseup', onMouseUpGlobal);

        return () => {
            document.removeEventListener('mousemove', onMouseMoveGlobal);
            document.removeEventListener('mouseup', onMouseUpGlobal);
        }
    }, [onMouseMoveGlobal, onMouseUpGlobal])

    //#region JSX
    const getBackgroundDiv = useCallback((width: number, index: number, left = 0, isLast = false) => {
        if (isNaN(width)) return null;
        return (
            <div
                key={index}
                style={stylingLogic.getCarouselVideoProgressBackgroundSectionContainerStyle(width, left, isLast, sections?.length, index === currentSection)}
                onMouseMove={onMouseMoveBackground.bind(null, index) as any}
            >
                <div
                    style={stylingLogic.carouselVideoProgressBackgroundSectionStyle}
                />
            </div>
        )
    }, [currentSection, onMouseMoveBackground, sections?.length, stylingLogic])

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
            const percentAcross = duration / 1000 / (videoRef?.current?.duration || 1);
            const backgroundLeft = amountBeforeCurrent / 1000 / videoRef.current.duration;

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
            onMouseLeave={onMouseLeave as any}
        >
            <div style={stylingLogic.getCarouselVideoProgressSeekDotStyle(progressBarValue, showDot)} />
            {renderSections()}
        </div>
    )
}

