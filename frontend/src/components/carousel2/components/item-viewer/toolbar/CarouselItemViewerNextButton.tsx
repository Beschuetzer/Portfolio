import { forwardRef, useCallback } from 'react';
import { useCarouselContext } from '../../../context';
import { NextButton } from '../../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic';

type CarouselItemViewerNextButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerNextButton = forwardRef<any, CarouselItemViewerNextButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs, toolbarLogic } = useCarouselContext();
    const svgHref = currentSvgs?.itemViewer?.nextButton || '';
    const nextItemAction = new ToolbarActionsLogic(options).getNextItem();

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={nextItemAction.keys} shortcutPosition={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} /> :
                <NextButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} />}
        </CarouselItemViewerShortcutIndicator>
    )
})