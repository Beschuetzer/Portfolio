import { forwardRef, useCallback } from 'react'
import { EMPTY_STRING } from '../../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { exitFullScreen } from '../../../utils';
import { ToolbarLogic } from '../../../business-logic/ToolbarLogic';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
import { StylingLogic } from '../../../business-logic/StylingLogic';

type CarouselItemViewerFullScreenButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerFullScreenButton = forwardRef<any, CarouselItemViewerFullScreenButtonProps>(({
    onClick = () => null,
    options = {},
}, ref) => {
    const { setCurrentItems, setCurrentItemIndex, currentButtons: currentSvgsGlobal, itemViewerRef } = useCarouselContext();
    const { currentButtons: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const stylingLogic = new StylingLogic({ options });
    const { svgHref, style } = currentSvgs?.closeButton || {};
    const fillColor = stylingLogic.getButtonColor(CarouselElement.closeButton);

    const onClickLocal = useCallback(async () => {
        setCurrentItemIndex(CURRENT_ITEM_INDEX_INITIAL);
        setCurrentItems(CURRENT_ITEMS_INITIAL);
        onClick && onClick()
        exitFullScreen(itemViewerRef.current);
    }, [setCurrentItemIndex, EMPTY_STRING, onClick]);

    return (
        !!svgHref ?
            <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
            <CloseButton ref={ref} onClick={onClickLocal} fillColor={fillColor} childStyle={style} />
    )
})