import React, { useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react'
import { CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL, CLASSNAME__TOOLBAR_PROGRESS, NUMBER_OF_MS_IN_A_SECOND } from '../../../constants';
import { getFormattedTimeString, getIsPointInsideElement, getPoint } from '../../../utils';
import { VideoTimeStrings } from '../../../types';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { useCarouselContext } from '../../../context';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type SectionToProgressBarValueMapping = {
    [number: number]: SectionToProgressBarValueMappingValue;
}
type SectionToProgressBarValueMappingValue = {
    start: number;
    end: number;
}

type CarouselItemViewerProgressBarProps = {
    isMouseDownRef: React.MutableRefObject<boolean | undefined> | undefined;
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>
    & Required<Pick<CarouselItemViewerToolbarProps, 'setIsVideoPlaying' | 'currentVideoSection' | 'setCurrentVideoSection'>>;

const MAP_SECTION_INTERVAL = 100;
const NEXT_SECTION_OFFSET = .0000000000000001;
const INITIAL_VALUE = 0;
export const CarouselItemViewerProgressBar = ({
    currentVideoSection,
    isMouseDownRef,
    setCurrentVideoSection,
    setIsVideoPlaying,
    setTimeStrings,
    videoRef,
}: CarouselItemViewerProgressBarProps) => {
    //#region Init
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};
    const areSectionsGiven = sections && sections.length > 0;
    const progressBarRef = useRef<HTMLDivElement>();
    const sectionToProgressBarValueMapping = useRef<SectionToProgressBarValueMapping>({});
    const mapSectionToProgressBarTimeoutRef = useRef<any>(-1);
    const [toolbarWidth, setToolbarWidth] = useState(INITIAL_VALUE)
    const [progressBarValue, setProgressBarValue] = useState(INITIAL_VALUE);
    const [showDot, setShowDot] = useState(false);
    const [seekWidth, setSeekWidth] = useState(INITIAL_VALUE);
    const { stylingLogic, optionsLogic } = useBusinessLogic({ progressBarValue });
    //#endregion

    //#region Functions/Handlers
    /**
    *Takes a time stamp that uses the following format `mm:ss:ms`.  
    *E.g. `1:23:920` would mean at 1 minute 23 seconds and 920 milliseconds
    *`1:23` would mean at 1 second and 23 milleseconds
    *Will throw an alert if any of the sections are > 60 or <= 0
    *@returns a number representing the number of ms at which the section begins
    **/
    const convertTimeStringToDuration = useCallback((timestamp: string, index: number) => {
        if (!timestamp)
            alert(`${timestamp} is not a valid time stamp`);

        const split = timestamp.split(':');
        const milliseconds = parseInt(split[split?.length - 1], 10) || 0;
        const seconds = parseInt(split[split?.length - 2], 10) || 0;
        const minutes = parseInt(split[split?.length - 3], 10) || 0;

        if (milliseconds >= 1000 || milliseconds < 0) {
            alert(`The number of milliseconds must be between 0 and 999.  ${timestamp} has ${milliseconds}`);
        } else if (seconds >= 60 || seconds < 0) {
            alert(`The number of seconds must be between 0 and 59.  ${timestamp} has ${seconds}`);
        } else if (minutes >= 60 || minutes < 0) {
            alert(`The number of seconds must be between 0 and 59.  ${timestamp} has ${minutes}`);
        }

        const toReturn = minutes * NUMBER_OF_MS_IN_A_SECOND * NUMBER_OF_MS_IN_A_SECOND + seconds * NUMBER_OF_MS_IN_A_SECOND + milliseconds;
        return toReturn;
    }, [])

    const getCurrentSection = useCallback((percent: number) => {
        if (percent === undefined || percent === null) return CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL;
        for (const [index, sectionRange] of Object.entries(sectionToProgressBarValueMapping.current)) {
            if (percent >= sectionRange.start && percent <= sectionRange.end) return Number(index);
        }
        return CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL;
    }, [])

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
        if (isMouseDownRef) {
            isMouseDownRef.current = false;
        }

        const point = getPoint(e);
        const isInsideProgressBar = getIsPointInsideElement(point, progressBarRef.current);
        if (!isInsideProgressBar) {
            setCurrentVideoSection && setCurrentVideoSection(CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL);
        }

        setSeekWidth(INITIAL_VALUE);
        setIsVideoPlaying && setIsVideoPlaying(true);

        if (videoRef?.current) {
            videoRef.current.currentTime = progressBarValue * videoRef.current.duration;
            videoRef?.current?.play();
        }
    }, [isMouseDownRef, progressBarValue, setCurrentVideoSection, setIsVideoPlaying, videoRef]);

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (isMouseDownRef) {
            isMouseDownRef.current = true;
        }
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
        if (isMouseDownRef?.current) {
            return;
        };
        setShowDot(false);
        setSeekWidth(INITIAL_VALUE);
    }, [isMouseDownRef])

    const onMouseMove = useCallback((e: MouseEvent) => {
        setShowDot(true);
        const percent = getPercent(e);
        setCurrentVideoSection && setCurrentVideoSection(areSectionsGiven ? getCurrentSection(percent) : 0);

        if (isMouseDownRef?.current) {
            setProgressBarValue(percent)
        } else {
            setSeekWidth(percent);
        }
    }, [areSectionsGiven, getCurrentSection, getPercent, isMouseDownRef, setCurrentVideoSection])

    const onMouseMoveGlobal = useCallback((e: MouseEvent) => {
        if (!isMouseDownRef?.current) return;
        const xMovement = e.movementX;
        const toolbarRect = progressBarRef?.current?.getBoundingClientRect();
        if (!toolbarRect) return;
        const movementAmount = xMovement / (toolbarRect.right - toolbarRect.left);
        setProgressBarValue((current) => {
            const newValue = current + movementAmount;
            if (newValue >= 1) return 1;
            else if (newValue <= 0) return 0;
            return newValue;
        });
    }, [isMouseDownRef])

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
                videoRefCopy.removeEventListener('timeupdate', onVideoTimeUpdate);
            }
        }
    }, [setTimeStrings, videoRef])

    useEffect(() => {
        setProgressBarValue(INITIAL_VALUE);
    }, [currentItem])

    useLayoutEffect(() => {
        if (toolbarWidth !== undefined && toolbarWidth <= INITIAL_VALUE) {
            const newWidth = progressBarRef?.current?.getBoundingClientRect().width;
            if (newWidth !== undefined && newWidth > 0 && toolbarWidth !== undefined) {
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
                }, MAP_SECTION_INTERVAL)
                return;
            }

            let amountBefore = 0;
            const isUsingNumberedSections = typeof sections[0][1] === 'number';
            let indexToUse = 0;

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
                        const nextConverted = convertTimeStringToDuration(nextSectionTimestamp, index + 1);
                        const sectionDiff = Math.abs(nextConverted - amountBefore);
                        amountBefore += sectionDiff;
                    }
                }

                const start = indexToUse === 0 ? 0 : sectionToProgressBarValueMapping.current[indexToUse - 1]?.end + NEXT_SECTION_OFFSET;
                const end = indexToUse === sections.length - 1 ? 1 : amountBefore / videoDuration;
                sectionToProgressBarValueMapping.current[indexToUse] = {
                    start,
                    end
                }
                console.log({ sectionToProgressBarValueMapping: sectionToProgressBarValueMapping.current });
            }
        }

        mapSection();

        return () => {
            sectionToProgressBarValueMapping.current = {};
        }
    }, [convertTimeStringToDuration, sections, videoRef])

    //use sectionToProgressBarValueMapping to set currentVideoSection on progressBarValue change
    useEffect(() => {
        if (
            !isMouseDownRef?.current ||
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
        if (isNaN(percent)) return null;
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
                    {getSeekDiv(seekWidth)}
                    {getForegroundDiv(progressBarValue)}
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
                    const nextConverted = convertTimeStringToDuration(nextSectionTimestamp, index + 1);
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
            const currentSectionTime = sectionToProgressBarValueMapping.current[index];
            const itemToTrack = isMouseDownRef?.current ? progressBarValue : percentPlayedAlready;

            //background stuff
            backgroundDivs.push(getBackgroundDiv(percentToUse, backgroundLeft, index));

            //seek stuff
            if (seekWidth !== INITIAL_VALUE && index < currentVideoSection) {
                seekDivs.push(getSeekDiv(percentToUse, backgroundLeft, index))
            } else if (seekWidth !== INITIAL_VALUE && index === currentVideoSection) {
                const percentAcrossCurrentSectionFactor = (seekWidth - currentSectionTime?.start) / (currentSectionTime?.end - currentSectionTime?.start)
                foregroundDivs.push(getSeekDiv(percentToUse * percentAcrossCurrentSectionFactor, backgroundLeft, index))
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
                <div style={stylingLogic.getCarouselVideoProgressSeekDotStyle(progressBarValue, showDot, getIsInCurrentSection(progressBarValue))} /> :
                null
            }
            {renderSections()}
        </div>
    )
}

