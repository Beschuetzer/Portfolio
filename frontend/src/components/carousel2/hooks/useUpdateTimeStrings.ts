import { useEffect, useRef } from "react";
import { getIsVideo, getFormattedTimeString } from "../utils/utils";
import { CarouselItemProps } from "../components/CarouselItem";
import { VideoTimeStrings } from "../types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselVideoOptions} from '../components/CarouselVideo';

const TIME_STRING_UPDATE_INTERVAL_DURATION = 100;
const NUMBER_TIME_STRING_UPDATE_CHECKS = 200;

export type UseUpdateTimeStringInput = {
    currentItemInInstance: CarouselItemProps | undefined;
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
    videoRef: React.MutableRefObject<HTMLVideoElement | undefined> | null | undefined;
}

/**
*updating time string on item change when {@link CarouselVideoOptions.autoPlay autoPlay} is `false`.
**/
export const useUpdateTimeString = (input: UseUpdateTimeStringInput) => {
    const {
        currentItemInInstance,
        setTimeStrings,
        videoRef,
    } = input;
    const checkVideoTimeStringIntervalRef = useRef<any>();
    const checkVideoTimeStringCountRef = useRef<any>(0);

    useEffect(() => {
        clearInterval(checkVideoTimeStringIntervalRef.current);

        if (!getIsVideo(currentItemInInstance)) return;
        const isAutoPlay = currentItemInInstance?.video?.autoPlay;
        if (isAutoPlay) return;

        checkVideoTimeStringIntervalRef.current = setInterval(() => {
            checkVideoTimeStringCountRef.current++;
            if (videoRef?.current?.duration) {
                clearInterval(checkVideoTimeStringIntervalRef.current);
                checkVideoTimeStringCountRef.current = 0;
                setTimeStrings({
                    durationStr: getFormattedTimeString((videoRef?.current?.duration) || 0),
                    currentTimeStr: getFormattedTimeString((videoRef?.current?.currentTime) || 0),
                });
            }
            if (checkVideoTimeStringCountRef.current >= NUMBER_TIME_STRING_UPDATE_CHECKS) {
                clearInterval(checkVideoTimeStringIntervalRef.current);
                checkVideoTimeStringCountRef.current = 0;
            }
        }, TIME_STRING_UPDATE_INTERVAL_DURATION)
    }, [currentItemInInstance, setTimeStrings, videoRef])
}