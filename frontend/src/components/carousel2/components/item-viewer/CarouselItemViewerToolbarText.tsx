import React from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { getClassname } from '../../utils';
import { VideoTimeStrings } from '../../types';

export type CarouselItemViewerToolbarTextProps = {
    description: string;
    isVideo: boolean;
    timeStrings: VideoTimeStrings;
}

const CLASSNAME_TOOLBAR_MIDDLE = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-middle` });

export const CarouselItemViewerToolbarText = ({
    description,
    isVideo = false,
    timeStrings,
}: CarouselItemViewerToolbarTextProps) => {
    return (
        <span className={CLASSNAME_TOOLBAR_MIDDLE}>
            {isVideo ? (
                <>
                    <span>{timeStrings.currentTimeStr}</span>
                    <span>/</span>
                    <span>{timeStrings.durationStr}</span>
                </>
            ) : null}
            <span>{description}</span>
        </span>
    )
}