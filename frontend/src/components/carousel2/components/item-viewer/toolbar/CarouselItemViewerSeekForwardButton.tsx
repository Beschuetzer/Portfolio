import { forwardRef, useCallback } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { SeekForwardButton } from '../../buttons/SeekForwardButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';

type CarouselItemViewerSeekForwardButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekForwardButton = forwardRef<any, CarouselItemViewerSeekForwardButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    options = {},
    onClick = () => null,
    shortcutPosition: position = 'center',
}, ref) => {
    const { elementStylings, isFullscreenMode } = useCarouselContext();
    const { svgHref, style } = elementStylings?.seekForwardButton || {};
    const seekForwardAction = new ToolbarActionsLogic({ options, isFullscreenMode }).getSeekForwards();
    const stylingLogic = new StylingLogic({ options, isFullscreenMode });
    const fillColor = stylingLogic.getButtonColor(CarouselElement.seekForwardButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={seekForwardAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
                <SeekForwardButton ref={ref} onClick={onClick} childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})