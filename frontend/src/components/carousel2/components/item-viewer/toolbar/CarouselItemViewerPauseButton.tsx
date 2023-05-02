import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { PauseButton } from '../../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';

type CarouselItemViewerPauseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPauseButton = forwardRef<any, CarouselItemViewerPauseButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { elementStylings, isFullscreenMode } = useCarouselContext();
    const { svgHref, style } = elementStylings?.pauseButton || {};
    const pauseAction = new ToolbarActionsLogic({options, isFullscreenMode}).getPause();
    const stylingLogic = new StylingLogic({ options, isFullscreenMode });
    const fillColor = stylingLogic.getButtonColor(CarouselElement.pauseButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={pauseAction.keys} shortcutPosition={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor}/> :
                <PauseButton ref={ref} onClick={onClick} childStyle={style} fillColor={fillColor}/>}
        </CarouselItemViewerShortcutIndicator>
    )
})