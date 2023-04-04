import React, { useEffect } from 'react'
import { getClassname } from '../utils';

export type CarouselVideoOverlay = {
   /*
    * This only shows when the video is paused and is an <h3> tag under the hood.
    */
   title?: string | undefined;

   /*
   * This only shows when the video is paused and is a <p> tag under the hood.
   */
   text?: string | undefined;
}
export type CarouselVideoOverlayProps = {
    /*
    *This is used internally and determines when the overlay is shown
    */
    isVideoPlaying?: boolean;
} & CarouselVideoOverlay;

export const CarouselVideoOverlay = (props: CarouselVideoOverlayProps) => {
    //#region Init
    const { isVideoPlaying, title, text } = props;
    //#endregion

    //#region JSX
    const visibilityStyle = isVideoPlaying ? getClassname({ modifiedName: "hidden" }) : '';
    const classnameToUse = `${getClassname({ elementName: 'video-overlay' })} ${visibilityStyle}`;

    return (
        <div className={classnameToUse}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
    //#endregion
}