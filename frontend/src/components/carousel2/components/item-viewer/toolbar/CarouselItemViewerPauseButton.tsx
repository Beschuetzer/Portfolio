import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { PauseButton } from '../../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';

type CarouselItemViewerPauseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPauseButton = forwardRef<any, CarouselItemViewerPauseButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentButtons: currentSvgsGlobal } = useCarouselContext();
    const { currentButtons: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const { svgHref } = currentSvgs?.pauseButton || {};
    const pauseAction = new ToolbarActionsLogic(options).getPause();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={pauseAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <PauseButton ref={ref} onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
})