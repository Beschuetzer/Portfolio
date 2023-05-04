import { forwardRef, useCallback } from 'react'
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CloseButton } from '../../buttons/CloseButton';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerCloseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerCloseButton = forwardRef<any, CarouselItemViewerCloseButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition = 'center',
}, ref) => {
    const { elementStylings, setIsFullscreenMode } = useCarouselContext();
    const {
        stylingLogic,
        toolbarActionsLogic,
        toolbarLogic
    } = useBusinessLogic({});
    const closeAction = toolbarActionsLogic.getClose();
    const { svgHref, style } = elementStylings?.closeButton || {};
    const fillColor = stylingLogic.getButtonColor(CarouselElement.closeButton);
    useKeyboardShortcuts([
        {
            keys: closeAction.keys,
            action: () => {
                onClickLocal();
            },
        },
    ], () => toolbarLogic?.getShouldSkipKeyboardShortcuts());

    const onClickLocal = useCallback(async () => {
        onClick && onClick()
        setIsFullscreenMode(false);
    }, [onClick, setIsFullscreenMode]);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={closeAction.keys} shortcutPosition={shortcutPosition} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
                <CloseButton ref={ref} onClick={onClickLocal} fillColor={fillColor} childStyle={style} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})