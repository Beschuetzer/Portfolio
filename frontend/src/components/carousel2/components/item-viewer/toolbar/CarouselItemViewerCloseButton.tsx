import { forwardRef, useCallback } from 'react'
import { EMPTY_STRING, ITEM_VIEWER_CLOSE_SHORTCUTS } from '../../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { CarouselItemViewerButtonProps, CarouselShortcut } from '../../../types';
import { exitFullScreen } from '../../../utils';
import { ToolbarLogic } from './ToolbarLogic';

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
    const svgHref = currentSvgs?.itemViewer?.closeButton || '';
    const customCloseShortcut = options?.shortcuts?.itemViewer?.close || {} as CarouselShortcut;
    const shortcutsToUse =  customCloseShortcut?.keys || ITEM_VIEWER_CLOSE_SHORTCUTS;
    useKeyboardShortcuts([
        {
            keys: shortcutsToUse,
            action: () => {
                onClickLocal();
                customCloseShortcut?.onActionCompletion && customCloseShortcut.onActionCompletion();
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
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={shortcutsToUse} shortcutPosition={shortcutPosition} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} /> :
                <CloseButton ref={ref} onClick={onClickLocal} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})