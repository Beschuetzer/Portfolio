import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { NextButton } from '../../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';
import { ToolbarLogic } from '../../../business-logic/ToolbarLogic';

type CarouselItemViewerNextButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerNextButton = forwardRef<any, CarouselItemViewerNextButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { items, elementStylings, isFullscreenMode } = useCarouselContext();
    const { svgHref, style } = elementStylings?.nextButton || {};
    const nextItemAction = new ToolbarActionsLogic({ options, isFullscreenMode }).getNextItem();
    const stylingLogic = new StylingLogic({ options, isFullscreenMode });
    const toolbarLogic = new ToolbarLogic(items);
    const fillColor = stylingLogic.getButtonColor(CarouselElement.nextButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={nextItemAction.keys} shortcutPosition={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} useElementStyle={style} fillColor={fillColor} /> :
                <NextButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})