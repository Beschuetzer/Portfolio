import { forwardRef, useCallback } from 'react';
import { useCarouselContext } from '../../../context';
import { NextButton } from '../../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { ShortcutLogic } from './ToolbarShortcutLogic';

type CarouselItemViewerNextButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerNextButton = forwardRef<any, CarouselItemViewerNextButtonProps>(({
    actionName = '',
    onClick = () => null,
    options = {},
    shortcutPosition: position = 'center',
}, ref) => {
    const { currentSvgs, toolbarLogic } = useCarouselContext();
    const svgHref = currentSvgs?.itemViewer?.nextButton || '';
    const nextItemShortcuts = new ShortcutLogic(options).getNextItem();

    const onClickToUse = useCallback(() => {
        onClick && onClick();
        nextItemShortcuts.onActionCompleted();
    }, [onClick, nextItemShortcuts.onActionCompleted])
    
    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={nextItemShortcuts.keys} shortcutPosition={position}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClickToUse} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} /> :
                <NextButton ref={ref} onClick={onClickToUse} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} />}
        </CarouselItemViewerShortcutIndicator>
    )
})