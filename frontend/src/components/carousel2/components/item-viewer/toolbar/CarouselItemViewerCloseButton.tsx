import React, { useCallback } from 'react'
import { CloseButton } from '../../buttons/CloseButton';
import { EMPTY_STRING } from '../../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItems, setCurrentItemIndex, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.closeButton || '';

    const onClick = useCallback(() => {
        setCurrentItemIndex(CURRENT_ITEM_INDEX_INITIAL);
        setCurrentItems(CURRENT_ITEMS_INITIAL);
    }, [setCurrentItemIndex, EMPTY_STRING]);

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <CloseButton onClick={onClick}/>
}