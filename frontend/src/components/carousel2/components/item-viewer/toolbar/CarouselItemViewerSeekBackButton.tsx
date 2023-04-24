import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerButtonProps } from '../../../types';
import { SeekBackButton } from '../../buttons/SeekBackButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
type CarouselItemViewerSeekBackButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekBackButton = forwardRef<any, CarouselItemViewerSeekBackButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs: currentSvgsGlobal } = useCarouselContext();
    const { currentSvgs: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const svgHref = currentSvgs?.itemViewer?.seekBackButton || '';
    const seekBackwardsAction = new ToolbarActionsLogic(options).getSeekBackwards();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={seekBackwardsAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
                <SeekBackButton ref={ref} onClick={onClick} />}
        </CarouselItemViewerShortcutIndicator>
    )
})