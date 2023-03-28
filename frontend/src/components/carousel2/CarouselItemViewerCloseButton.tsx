import React from 'react'
import { EMPTY_STRING } from './constants';
import { useCarouselContext } from './context';
import { CssStyles } from './types';

export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItemSrc, closeButtonSvgXlinkHrefRef } = useCarouselContext();

    function onClose() {
        setCurrentItemSrc(EMPTY_STRING);
    }

    return !!closeButtonSvgXlinkHrefRef.current ? (
        <svg onClick={onClose} style={styles.svg}>
            <use xlinkHref={closeButtonSvgXlinkHrefRef.current}></use>
        </svg>
    ) : (
        <div>
            close button
        </div>
    )
}

const styles = {
    svg: {
        height: "5rem",
        width: "5rem",
        fill: 'white',
        position: "absolute",
        top: "1rem",
        right: "1rem",

    }
} as CssStyles;