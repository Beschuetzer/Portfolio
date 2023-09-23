import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { NextButton } from '../../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerNextButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerNextButton = forwardRef<any, CarouselItemViewerNextButtonProps>((props, ref) => {
    const {
        actionName = '',
        isShortcutVisible,
        onClick = () => null,
        position = 'center',
    } = props;
    const { stylingLogic } = useBusinessLogic();
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.nextButton || {};
    const {
        optionsLogic,
        toolbarActionsLogic,
        toolbarLogic
    } = useBusinessLogic();
    const nextItemAction = toolbarActionsLogic.getNextItem();
    const fillColor = optionsLogic.getButtonColor(CarouselElement.nextButton);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionName}
            shortcuts={nextItemAction.keys}
            position={position}
            isShortcutVisible={isShortcutVisible}
        >
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClick}
                    xlinkHref={svgHref}
                    showButton={toolbarLogic.getShouldDisplayNextAndBackButton()}
                    style={stylingLogic.getCarouselElementChildSizeStlye({ buttonName: CarouselElement.nextButton, subElementName: null })}
                    useElementStyle={style}
                    fillColor={fillColor}
                /> :
                <NextButton
                    ref={ref}
                    onClick={onClick}
                    showButton={toolbarLogic.getShouldDisplayNextAndBackButton()}
                    childStyle={style}
                    fillColor={fillColor}
                />}
        </CarouselItemViewerShortcutIndicator>
    )
})