import React, { useCallback, useMemo } from 'react'
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { CloseButton } from './CloseButton';
import { EMPTY_STRING } from './constants';
import { useCarouselContext } from './context';
import { getClassname } from './utils';

const elementName = 'item-viewer-close-button';
export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItemSrc, svgHrefsRef } = useCarouselContext();
    const { id } = useCarouselInstanceContext();
    const closeButtonSvgHref = svgHrefsRef.current?.[id]?.closeButton || '';

    console.log({svgHrefsRef, id});
    
    const onClose = useCallback(() => {
        setCurrentItemSrc(EMPTY_STRING);
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!closeButtonSvgHref ? (
        <svg onClick={onClose} className={getClassname({ elementName })}>
            <use 
                xlinkHref={closeButtonSvgHref}
                href={closeButtonSvgHref}
            />
        </svg>
    ) : <CloseButton onClose={onClose}/>
}