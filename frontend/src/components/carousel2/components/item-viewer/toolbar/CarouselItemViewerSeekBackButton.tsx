import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { SeekBackButton } from '../../buttons/SeekBackButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
type CarouselItemViewerSeekBackButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekBackButton = forwardRef<any, CarouselItemViewerSeekBackButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs: currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.seekBackButton || '';
    const seekBackwardsAction = new ToolbarActionsLogic(options).getSeekBackwards();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={seekBackwardsAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <SeekBackButton ref={ref} onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
})