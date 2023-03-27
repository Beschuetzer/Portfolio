import React, { useEffect, useState } from 'react'
import { CarouselItemImage } from './CarouselItemImage';
import { CarouselItemVideo } from './CarouselItemVideo';
import { EMPTY_STRING, VIDEO_EXTENSIONS } from './constants';
import { useCarouselContext } from './context'
import { globalStyles } from './styles';
import { CssStyles } from './types';
import { getRegexStringFromStringArray } from './utils';


export const CarouselItemViewer = () => {
    //#region Init
    //todo: needs to be hidden until an item is clicked
    const { currentItemSrc, currentItemProps, currentPage, setCurrentItemSrc } = useCarouselContext();
    const [isVisible, setisVisible] = useState(!!currentItemSrc);
    const isVideo = currentItemSrc?.match(
		getRegexStringFromStringArray(VIDEO_EXTENSIONS),
	);

    console.log({currentItemSrc, currentPage });
    //#endregion

    //#region Function/Handlers
    function onClose() {
        setCurrentItemSrc(EMPTY_STRING);
    }
    //#endregion

    //#region Side Fx
    useEffect(() => {
        setisVisible(!!currentItemSrc);
    }, [currentItemSrc])
    //#endregion
    
    //#region JSX
    //todo: need to use stying here instead for smooth transitions?
    const ItemToRender = isVideo ? CarouselItemVideo : CarouselItemImage;
    const visibilityStyle = isVisible ? {} : globalStyles.hidden;
    return (
        <section
            style={{
                ...styles.containerPosition,
                ...styles.containerLook,
                ...visibilityStyle,
            }}>
            <ItemToRender {...currentItemProps}/>
            <div onClick={onClose}>
                Close
            </div>
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
} as CssStyles