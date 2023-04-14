import { useCallback } from 'react'
import { EMPTY_STRING } from '../../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';

type CarouselItemViewerCloseButtonProps = {
    onClick?: () => void;
}
export const CarouselItemViewerCloseButton = ({
    onClick = () => null,
}: CarouselItemViewerCloseButtonProps) => {
    const { setCurrentItems, setCurrentItemIndex, currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.closeButton || '';

    const onClickLocal = useCallback(() => {
        setCurrentItemIndex(CURRENT_ITEM_INDEX_INITIAL);
        setCurrentItems(CURRENT_ITEMS_INITIAL);
        onClick && onClick()
    }, [setCurrentItemIndex, EMPTY_STRING, onClick]);

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClickLocal} xlinkHref={svgHref}/> :
        <CloseButton onClick={onClickLocal}/>
}