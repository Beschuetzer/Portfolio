import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { PauseButton } from '../../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';

type CarouselItemViewerPauseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPauseButton = forwardRef<any, CarouselItemViewerPauseButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.pauseButton || '';
    const pauseAction = new ToolbarActionsLogic(options).getPause();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={pauseAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <PauseButton ref={ref} onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
})