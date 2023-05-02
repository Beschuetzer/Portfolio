import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { SeekBackButton } from '../../buttons/SeekBackButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';
type CarouselItemViewerSeekBackButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekBackButton = forwardRef<any, CarouselItemViewerSeekBackButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { elementStylings, isFullscreenMode } = useCarouselContext();
    const { svgHref, style } = elementStylings?.seekBackButton || {};
    const seekBackwardsAction = new ToolbarActionsLogic({ options, isFullscreenMode }).getSeekBackwards();
    const stylingLogic = new StylingLogic({ options, isFullscreenMode });
    const fillColor = stylingLogic.getButtonColor(CarouselElement.seekBackButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={seekBackwardsAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
                <SeekBackButton ref={ref} onClick={onClick} childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})