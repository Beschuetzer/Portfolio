import React from 'react'
import { EMPTY_STRING } from './constants';
import { useCarouselContext } from './context';
import { CssStyles } from './types';
import { getClassname } from './utils';

export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItemSrc, closeButtonSvgXlinkHrefRef } = useCarouselContext();

    function onClose() {
        setCurrentItemSrc(EMPTY_STRING);
    }

    return !!closeButtonSvgXlinkHrefRef.current ? (
        <svg onClick={onClose}className={getClassname({elementName: 'item-viewer-close-button'})}>
            <use 
                xlinkHref={closeButtonSvgXlinkHrefRef.current}
                href={closeButtonSvgXlinkHrefRef.current}
            />
        </svg>
    ) : (
        <div>
            close button
        </div>
    )
}