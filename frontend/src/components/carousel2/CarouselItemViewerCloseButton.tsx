import React, { useCallback, useMemo } from 'react'
import { CloseButton } from './CloseButton';
import { EMPTY_STRING } from './constants';
import { useCarouselContext } from './context';
import { getClassname } from './utils';

const elementName = 'item-viewer-close-button';
export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItemSrc, closeButtonSvgXlinkHrefRef } = useCarouselContext();

    const onClose = useCallback(() => {
        setCurrentItemSrc(EMPTY_STRING);
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!closeButtonSvgXlinkHrefRef.current ? (
        <svg onClick={onClose} className={getClassname({ elementName })}>
            <use 
                xlinkHref={closeButtonSvgXlinkHrefRef.current}
                href={closeButtonSvgXlinkHrefRef.current}
            />
        </svg>
    ) : <CloseButton onClose={onClose}/>
}