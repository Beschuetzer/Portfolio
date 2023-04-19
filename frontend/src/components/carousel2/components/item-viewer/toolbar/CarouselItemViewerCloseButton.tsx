import { forwardRef, useCallback } from 'react'
import { EMPTY_STRING, ITEM_VIEWER_CLOSE_SHORTCUTS } from '../../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { CarouselItemViewerButtonProps } from '../../../types';

type CarouselItemViewerCloseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerCloseButton = forwardRef<any, CarouselItemViewerCloseButtonProps> (({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    position = 'center',
    shortcuts = [],
}, ref) => {
    const { currentItems, setCurrentItems, setCurrentItemIndex, currentSvgs } = useCarouselContext();
    const svgHref = currentSvgs?.itemViewer?.closeButton || '';
    useKeyboardShortcuts([
        {
            keys: ITEM_VIEWER_CLOSE_SHORTCUTS,
            action: () => onClickLocal(),
        },
    ],  () => !currentItems || currentItems.length === 0);

    const onClickLocal = useCallback(() => {
        setCurrentItemIndex(CURRENT_ITEM_INDEX_INITIAL);
        setCurrentItems(CURRENT_ITEMS_INITIAL);
        onClick && onClick()
    }, [setCurrentItemIndex, EMPTY_STRING, onClick]);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={shortcuts} position={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} /> :
                <CloseButton ref={ref} onClick={onClickLocal} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})