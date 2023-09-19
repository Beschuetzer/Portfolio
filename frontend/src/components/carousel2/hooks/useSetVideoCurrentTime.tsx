import { useRef, useCallback, useLayoutEffect } from "react";
import { useCarouselContext } from "../context";

export type UseSetVideoCurrentTimeInput = {
    percent: number | undefined;
    video: HTMLVideoElement | undefined;
}

const IMAGE_DRAW_INTERVAL = 100;
const LAST_DRAW_INTERVAL = 100;
/**
*Used to "seek" video items 
**/
export const useSetVideoCurrentTime = (input: UseSetVideoCurrentTimeInput) => {
    const {
        percent,
        video,
    } = input;
    const { currentItemIndex } = useCarouselContext();
    const lastRenderTimeoutRef = useRef<any>();
    const lastDrawTimeRef = useRef<number>(0);

    const drawSnapshot = useCallback((duration: number) => {
        if (!video || percent === undefined || percent < 0 || !isFinite(duration) || !isFinite(percent)) return;
        video.currentTime = percent * duration;
    }, [percent, video])

    const handleDrawSnapshot = useCallback(() => {
        if (video && percent !== undefined) {
            clearTimeout(lastRenderTimeoutRef.current);
            const duration = video?.duration;

            lastRenderTimeoutRef.current = setTimeout(() => {
                drawSnapshot(duration);
            }, LAST_DRAW_INTERVAL)

            const now = Date.now();
            const hasEnoughTimePassed = Math.abs(now - lastDrawTimeRef.current) > IMAGE_DRAW_INTERVAL;
            if (!hasEnoughTimePassed || !isFinite(duration)) return;
            lastDrawTimeRef.current = now;
            drawSnapshot(duration);
        }
    }, [drawSnapshot, percent, video])

    useLayoutEffect(() => {
        handleDrawSnapshot();
    }, [handleDrawSnapshot])

    useLayoutEffect(() => {
        if (video?.load) {
            video.load();
        }
    }, [video, currentItemIndex])
}