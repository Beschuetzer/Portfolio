import { forwardRef, useCallback } from 'react'
import { EMPTY_STRING } from '../../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { CarouselButton, CarouselItemViewerButtonProps } from '../../../types';
import { exitFullScreen } from '../../../utils';
import { ToolbarLogic } from '../../../business-logic/ToolbarLogic';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
import { StylingLogic } from '../../../business-logic/StylingLogic';

type CarouselItemViewerCloseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerCloseButton = forwardRef<any, CarouselItemViewerCloseButtonProps> (({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition = 'center',
}, ref) => {
    const { currentItems, setCurrentItems, setCurrentItemIndex, currentButtons: currentSvgsGlobal, itemViewerRef } = useCarouselContext();
    const { currentButtons: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const toolbarLogic = new ToolbarLogic(currentItems);
    const closeAction = new ToolbarActionsLogic(options).getClose();
    const stylingLogic = new StylingLogic({options});
    const { svgHref, style } = currentSvgs?.closeButton || {};
    const fillColor = stylingLogic.getButtonColor(CarouselButton.closeButton);
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
        setCurrentItems(CURRENT_ITEMS_INITIAL);
        onClick && onClick()
        exitFullScreen(itemViewerRef.current);
    }, [setCurrentItemIndex, EMPTY_STRING, onClick]);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={closeAction.keys} shortcutPosition={shortcutPosition} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} style={style} fillColor={fillColor}/> :
                <CloseButton ref={ref} onClick={onClickLocal} fillColor={fillColor} style={style} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})