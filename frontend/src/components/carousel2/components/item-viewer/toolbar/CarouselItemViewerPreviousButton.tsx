import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { PreviousButton } from '../../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';
import { ToolbarLogic } from '../../../business-logic/ToolbarLogic';

type CarouselItemViewerPreviousButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPreviousButton = forwardRef<any, CarouselItemViewerPreviousButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentItems, currentItemIndex, currentElements: currentElementsGlobal } = useCarouselContext();
    const { currentElements: currentElementsLocal, itemsInInstance } = useCarouselInstanceContext();
    const currentElements = currentElementsLocal || currentElementsGlobal;
    const itemsToUse = currentItems?.length > 0 ? currentItems : itemsInInstance;
    const { svgHref, style } = currentElements?.previousButton || {};
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options, currentItemIndex });
    const previousItemAction = new ToolbarActionsLogic(options, itemDisplayLocationLogic).getPreviousItem();
    const stylingLogic = new StylingLogic({ options });
    const toolbarLogic = new ToolbarLogic(itemsToUse);
    const fillColor = stylingLogic.getButtonColor(CarouselElement.previousButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={previousItemAction.keys} shortcutPosition={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()}  useElementStyle={style} fillColor={fillColor} /> :
                <PreviousButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()}  childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})
