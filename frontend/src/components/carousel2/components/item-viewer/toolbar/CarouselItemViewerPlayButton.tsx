import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { PlayButton } from '../../buttons/PlayButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerPlayButtonProps = {
} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPlayButton = forwardRef<any, CarouselItemViewerPlayButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.playButton || {};
    const { stylingLogic, toolbarActionsLogic } = useBusinessLogic({});
    const playAction = toolbarActionsLogic.getPlay();
    const fillColor = stylingLogic.getButtonColor(CarouselElement.playButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={playAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
                <PlayButton ref={ref} onClick={onClick} childStyle={style} fillColor={fillColor} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})