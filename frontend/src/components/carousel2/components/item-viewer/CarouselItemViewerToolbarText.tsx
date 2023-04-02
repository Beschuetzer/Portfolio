import React from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { getClassname, getFormattedTimeString } from '../../utils';

export type CarouselItemViewerToolbarTextProps = {
    description: string;
    videoRef: React.RefObject<HTMLVideoElement>;
}

const CLASSNAME_TOOLBAR_MIDDLE = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-middle` });

export const CarouselItemViewerToolbarText = ({
    description,
    videoRef,
}: CarouselItemViewerToolbarTextProps) => {
    const durationStr = getFormattedTimeString((videoRef.current?.duration) || -1);
    const currentTimeStr = getFormattedTimeString((videoRef.current?.currentTime) || -1);
    
    return (
        <span className={CLASSNAME_TOOLBAR_MIDDLE}>
            <span>{currentTimeStr}</span>
            <span>/</span>
            <span>{durationStr}</span>
            <span>{description}</span>
        </span>
    )
}