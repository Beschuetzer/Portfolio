import React from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { getClassname } from '../../utils';
import { VideoTimeStrings } from '../../types';

export type CarouselItemViewerToolbarTextProps = {
    description: string;
    timeStrings: VideoTimeStrings;
}

const CLASSNAME_TOOLBAR_MIDDLE = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-middle` });

export const CarouselItemViewerToolbarText = ({
    description,
    timeStrings,
}: CarouselItemViewerToolbarTextProps) => {
    return (
        <span className={CLASSNAME_TOOLBAR_MIDDLE}>
            <span>{timeStrings.currentTimeStr}</span>
            <span>/</span>
            <span>{timeStrings.durationStr}</span>
            <span>{description}</span>
        </span>
    )
}