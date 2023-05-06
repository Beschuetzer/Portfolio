import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { PreviousButton } from '../../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerPreviousButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPreviousButton = forwardRef<any, CarouselItemViewerPreviousButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    position = 'center',
}, ref) => {
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.previousButton || {};
    const { stylingLogic, toolbarActionsLogic, toolbarLogic } = useBusinessLogic({});
    const previousItemAction = toolbarActionsLogic.getPreviousItem();
    const fillColor = stylingLogic.getButtonColor(CarouselElement.previousButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={previousItemAction.keys} position={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} useElementStyle={style} fillColor={fillColor} /> :
                <PreviousButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})
