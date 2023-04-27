import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { PreviousButton } from '../../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselButton, CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
import { StylingLogic } from '../../../business-logic/StylingLogic';

type CarouselItemViewerPreviousButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPreviousButton = forwardRef<any, CarouselItemViewerPreviousButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const {  currentButtons: currentSvgsGlobal, toolbarLogic } = useCarouselContext();
    const { currentButtons: currentSvgsLocal } = useCarouselInstanceContext();
    const currentSvgs = currentSvgsLocal || currentSvgsGlobal;
    const { svgHref, style } = currentSvgs?.previousButton || {};
    const previousItemAction = new ToolbarActionsLogic(options).getPreviousItem();
    const stylingLogic = new StylingLogic({ options });
    const fillColor = stylingLogic.getButtonColor(CarouselButton.previousButton);
    
    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={previousItemAction.keys} shortcutPosition={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()}  useElementStyle={style} fillColor={fillColor} /> :
                <PreviousButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()}  childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})
