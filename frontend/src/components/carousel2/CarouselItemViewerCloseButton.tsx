import React from 'react'
import { EMPTY_STRING } from './constants';
import { useCarouselContext } from './context';
import { getClassname } from './utils';

const elementName = 'item-viewer-close-button';
export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItemSrc, closeButtonSvgXlinkHrefRef } = useCarouselContext();

    function onClose() {
        setCurrentItemSrc(EMPTY_STRING);
    }

    console.log({closeButtonSvgXlinkHrefRef: closeButtonSvgXlinkHrefRef.current});
    

    return !!closeButtonSvgXlinkHrefRef.current ? (
        <svg onClick={onClose} className={getClassname({ elementName })}>
            <use 
                xlinkHref={closeButtonSvgXlinkHrefRef.current}
                href={closeButtonSvgXlinkHrefRef.current}
            />
        </svg>
    ) : (
        <div onClick={onClose} className={getClassname({ elementName: `${elementName}` })}>
            <div className={getClassname({ elementName: `${elementName}-left` })}/>
            <div className={getClassname({ elementName: `${elementName}-right` })}/>
        </div>
    )
}