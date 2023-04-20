import { forwardRef, useCallback } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { SeekForwardButton } from '../../buttons/SeekForwardButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';

type CarouselItemViewerSeekForwardButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekForwardButton = forwardRef<any, CarouselItemViewerSeekForwardButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    options = {},
    onClick = () => null,
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.seekForwardButton || '';
    const seekForwardShortcuts = new ToolbarActionsLogic(options).getSeekForwards();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={seekForwardShortcuts.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <SeekForwardButton ref={ref} onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
})