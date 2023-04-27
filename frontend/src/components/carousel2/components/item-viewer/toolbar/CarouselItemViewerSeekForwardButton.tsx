import { forwardRef, useCallback } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselButton, CarouselItemViewerButtonProps } from '../../../types';
import { SeekForwardButton } from '../../buttons/SeekForwardButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
import { StylingLogic } from '../../../business-logic/StylingLogic';

type CarouselItemViewerSeekForwardButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekForwardButton = forwardRef<any, CarouselItemViewerSeekForwardButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    options = {},
    onClick = () => null,
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentButtons: currentSvgsGlobal } = useCarouselContext();
    const { currentButtons: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const { svgHref, style } = currentSvgs?.seekForwardButton || {};
    const seekForwardAction = new ToolbarActionsLogic(options).getSeekForwards();
    const stylingLogic = new StylingLogic({ options });
    const fillColor = stylingLogic.getButtonColor(CarouselButton.seekForwardButton);
    
    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={seekForwardAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
                <SeekForwardButton ref={ref} onClick={onClick} childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})