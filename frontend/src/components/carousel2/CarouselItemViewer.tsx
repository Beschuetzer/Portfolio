import React, { useEffect, useState } from 'react'
import { useCarouselContext } from './context'
import { CssStyles } from './types';

export const CarouselItemViewer = () => {
    //todo: needs to be hidden until an item is clicked
    const { currentItemSrc, currentPage } = useCarouselContext();
    const [isVisible, setisVisible] = useState(!!currentItemSrc);

    console.log({currentItemSrc, currentPage });

    useEffect(() => {
        setisVisible(!!currentItemSrc);
    }, [currentItemSrc])
    
    //#region JSX
    //todo: need to use stying here instead for smooth transitions?
    const visibilityStyle = isVisible ? styles.visible : styles.hidden;
    return (
        <section
            style={{
                ...styles.containerPosition,
                ...styles.containerLook,
                ...visibilityStyle,
            }}>
            CarouselItemViewer
        </section>
    )
    //#endregion
}

const styles = {
    containerPosition: {
        display: "flex",
        position: "absolute",
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
    hidden: {
        visibility: "hidden",
        opacity: 0,
        pointerEvents: "none",
    },
    visible: {

    },
} as CssStyles