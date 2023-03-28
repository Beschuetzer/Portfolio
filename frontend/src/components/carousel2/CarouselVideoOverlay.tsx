import React from 'react'
import { useCarouselContext } from './context';
import { globalStyles } from './styles';
import { CssStyles } from './types';

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
    const {title, text} = props;
    //#endregion

    //#region JSX
    const visibilityStyle = !!currentItemSrc ? {} : globalStyles.hidden;
    return (
        <div style={{...styles.container, ...visibilityStyle}}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
        )
    //#endregion
}

const styles = {
    container: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
} as CssStyles