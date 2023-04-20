import { forwardRef, useCallback } from 'react';
import { useCarouselContext } from '../../../context';
import { PreviousButton } from '../../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ShortcutLogic } from '../../../business-logic/ShortcutLogic';

type CarouselItemViewerPreviousButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPreviousButton = forwardRef<any, CarouselItemViewerPreviousButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs, toolbarLogic } = useCarouselContext();
    const svgHref = currentSvgs?.itemViewer?.previousButton || '';
    const previousItemShortcuts = new ShortcutLogic(options).getPreviousItem();

    const onClickToUse = useCallback(() => {
        onClick && onClick();
        previousItemShortcuts.onActionCompleted();
    }, [onClick, previousItemShortcuts.onActionCompleted])
    

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={previousItemShortcuts.keys} shortcutPosition={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickToUse} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} /> :
                <PreviousButton ref={ref} onClick={onClickToUse} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} />}
        </CarouselItemViewerShortcutIndicator>
    )
})
