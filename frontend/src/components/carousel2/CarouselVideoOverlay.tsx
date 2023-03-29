import React, { useState } from 'react'
import { useCarouselContext } from './context';
import { getClassname } from './utils';

export type CarouselVideoOverlayProps = {
    /*
    * This only shows when the video is paused and is an <h3> tag under the hood.
    */
    title?: string | undefined;

    /*
    * This only shows when the video is paused and is a <p> tag under the hood.
    */
    text?: string | undefined;
}

export const CarouselVideoOverlay = (props: CarouselVideoOverlayProps) => {
    //#region Init
    const { currentItemSrc } = useCarouselContext();
    const { title, text } = props;

    //todo: change to visible when paused
    const [isVisible, setIsVisible] = useState(false);
    //#endregion

    //#region JSX
    const visibilityStyle = isVisible ? '' : getClassname({ modifiedName: "hidden" });
    const classnameToUse = `${getClassname({ elementName: 'video-overlay' })} ${visibilityStyle}`;

    return (
        <div className={classnameToUse}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
    //#endregion
}