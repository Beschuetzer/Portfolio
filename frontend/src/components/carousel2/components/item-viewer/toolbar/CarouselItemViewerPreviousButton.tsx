import { forwardRef, useCallback } from 'react';
import { useCarouselContext } from '../../../context';
import { PreviousButton } from '../../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';

type CarouselItemViewerPreviousButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPreviousButton = forwardRef<any, CarouselItemViewerPreviousButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs, toolbarLogic } = useCarouselContext();
    const svgHref = currentSvgs?.itemViewer?.previousButton || '';
    const previousItemAction = new ToolbarActionsLogic(options).getPreviousItem();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={previousItemAction.keys} shortcutPosition={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} /> :
                <PreviousButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} />}
        </CarouselItemViewerShortcutIndicator>
    )
})
