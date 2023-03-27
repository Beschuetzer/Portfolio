import React from 'react'

export type CarouselItemVideoOverlayProps = {
    /*
    * This only shows when the video is paused and is an <h3> tag under the hood.
    */
    title?: string | undefined;

    /*
    * This only shows when the video is paused and is a <p> tag under the hood.
    */
    text?: string | undefined;
}

export const CarouselItemVideoOverlay = (props: CarouselItemVideoOverlayProps) => {
    //#region Init
    const {title, text} = props;
    //#endregion

    //#region JSX
    return (
        <div>
            Overlay:
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
        )
    //#endregion
}