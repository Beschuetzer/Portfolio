import { forwardRef, useCallback } from 'react'
import { EMPTY_STRING } from '../../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { CarouselItemViewerButtonProps } from '../../../types';
import { exitFullScreen } from '../../../utils';
import { ToolbarLogic } from '../../../business-logic/ToolbarLogic';
import { ShortcutLogic } from '../../../business-logic/ShortcutLogic';

type CarouselItemViewerCloseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerCloseButton = forwardRef<any, CarouselItemViewerCloseButtonProps> (({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition = 'center',
}, ref) => {
    const { currentItems, setCurrentItems, setCurrentItemIndex, currentSvgs, itemViewerRef } = useCarouselContext();
    const toolbarLogic = new ToolbarLogic(currentItems);
    const closeButtonShortcut = new ShortcutLogic(options).getClose();
    const svgHref = currentSvgs?.itemViewer?.closeButton || '';
    useKeyboardShortcuts([
        {
            keys: closeButtonShortcut.keys,
            action: () => {
                onClickLocal();
                closeButtonShortcut.onActionCompleted();
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
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={closeButtonShortcut.keys} shortcutPosition={shortcutPosition} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} /> :
                <CloseButton ref={ref} onClick={onClickLocal} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})