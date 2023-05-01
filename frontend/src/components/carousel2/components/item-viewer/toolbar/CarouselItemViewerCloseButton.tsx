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
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';

type CarouselItemViewerCloseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerCloseButton = forwardRef<any, CarouselItemViewerCloseButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition = 'center',
}, ref) => {
    const { currentItemIndex, items, setCurrentItemIndex, elementStylings, itemViewerRef } = useCarouselContext();
    const toolbarLogic = new ToolbarLogic(items);
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options, currentItemIndex });
    const closeAction = new ToolbarActionsLogic(options, itemDisplayLocationLogic).getClose();
    const stylingLogic = new StylingLogic({ options });
    const { svgHref, style } = elementStylings?.closeButton || {};
    const fillColor = stylingLogic.getButtonColor(CarouselElement.closeButton);
    useKeyboardShortcuts([
        {
            keys: closeAction.keys,
            action: () => {
                onClickLocal();
            },
        },
    ], () => toolbarLogic.getShouldSkipKeyboardShortcuts());

    const onClickLocal = useCallback(async () => {
        setCurrentItemIndex(CURRENT_ITEM_INDEX_INITIAL);
        onClick && onClick()
        exitFullScreen(itemViewerRef.current);
    }, [exitFullScreen, setCurrentItemIndex, EMPTY_STRING, CURRENT_ITEM_INDEX_INITIAL, CURRENT_ITEMS_INITIAL, itemViewerRef, onClick]);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={closeAction.keys} shortcutPosition={shortcutPosition} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
                <CloseButton ref={ref} onClick={onClickLocal} fillColor={fillColor} childStyle={style} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})