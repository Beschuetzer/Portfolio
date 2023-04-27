import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { PlayButton } from '../../buttons/PlayButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
import { StylingLogic } from '../../../business-logic/StylingLogic';

type CarouselItemViewerPlayButtonProps = {
} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPlayButton = forwardRef<any, CarouselItemViewerPlayButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentButtons: currentSvgsGlobal } = useCarouselContext();
    const { currentButtons: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const { svgHref, style } = currentSvgs?.playButton || {};
    const playAction = new ToolbarActionsLogic(options).getPlay();
    const stylingLogic = new StylingLogic({ options });
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