import React, { useEffect, useState } from 'react'
import { CarouselImage } from './CarouselImage';
import { CarouselVideo } from './CarouselVideo';
import { EMPTY_STRING, VIDEO_EXTENSIONS } from './constants';
import { useCarouselContext } from './context'
import { globalStyles } from './styles';
import { CssStyles } from './types';
import { getRegexStringFromStringArray } from './utils';
import close from './resources/close.svg';
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton';


export const CarouselItemViewer = () => {
    //#region Init
    //todo: needs to be hidden until an item is clicked
    const { currentItemSrc, currentItemProps, currentPage, closeButtonSvgXlinkHrefRef } = useCarouselContext();
    const [isVisible, setisVisible] = useState(!!currentItemSrc);
    const isVideo = currentItemSrc?.match(
		getRegexStringFromStringArray(VIDEO_EXTENSIONS),
	);
    //#endregion

    //#region Function/Handlers
    
    //#endregion

    //#region Side Fx
    useEffect(() => {
        console.log({currentItemSrc, currentPage, closeButtonSvgXlinkHrefRef: closeButtonSvgXlinkHrefRef.current });
        setisVisible(!!currentItemSrc);
    }, [currentItemSrc])
    //#endregion
    
    //#region JSX
    //todo: need to use stying here instead for smooth transitions?
    const ItemToRender = isVideo ? CarouselVideo : CarouselImage;
    const visibilityStyle = isVisible ? {} : globalStyles.hidden;
    return (
        <section
            style={{
                ...styles.containerPosition,
                ...styles.containerLook,
                ...visibilityStyle,
            }}>
            <ItemToRender {...currentItemProps}/>
            <CarouselItemViewerCloseButton />
        </section>
    )
    //#endregion
}

const styles = {
    containerPosition: {
        display: "flex",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: Number.MAX_SAFE_INTEGER,
    } as React.CSSProperties,
    containerLook: {
        backgroundColor: 'black', //todo: allow styles to be passed in
        transition: "opacity .5s ease",
    },
    svg: {
        height: "28px",
        width: "22px",
        backgroundColor: "white",
    }
} as CssStyles