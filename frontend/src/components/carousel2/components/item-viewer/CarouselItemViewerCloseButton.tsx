import React, { useCallback, useMemo } from 'react'
import { CloseButton } from '../buttons/CloseButton';
import { useCarouselInstanceContext } from '../CarouselInstanceProvider';
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { getClassname } from '../../utils';

const elementName = 'item-viewer-button';
export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const { id } = useCarouselInstanceContext();
    const closeButtonSvgHref = currentSvgHrefs?.closeButton || '';

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
    ) : <CloseButton onClick={onClose}/>
}