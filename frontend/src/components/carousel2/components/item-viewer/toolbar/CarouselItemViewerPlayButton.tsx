import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { PlayButton } from '../../buttons/PlayButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';

type CarouselItemViewerPlayButtonProps = {
} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPlayButton = forwardRef<any, CarouselItemViewerPlayButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs: currentSvgsGlobal } = useCarouselContext();
    const { currentSvgs: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const svgHref = currentSvgs?.itemViewer?.playButton || '';
    const playAction = new ToolbarActionsLogic(options).getPlay();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={playAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <PlayButton ref={ref} onClick={onClick} />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})