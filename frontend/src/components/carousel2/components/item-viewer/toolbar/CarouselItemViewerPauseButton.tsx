import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { PauseButton } from '../../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerPauseButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPauseButton = forwardRef<any, CarouselItemViewerPauseButtonProps>((props, ref) => {
    const {
        actionName = '',
        isShortcutVisible = false,
        isVisible = true,
        onClick = () => null,
        position = 'center',
    } = props;
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.pauseButton || {};
    const { optionsLogic, stylingLogic, toolbarActionsLogic } = useBusinessLogic();
    const pauseAction = toolbarActionsLogic.getPause();
    const fillColor = optionsLogic.getButtonColor(CarouselElement.pauseButton);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionName}
            shortcuts={pauseAction.keys}
            position={position}
            isShortcutVisible={isShortcutVisible}
            isVisible={isVisible}
        >
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClick}
                    xlinkHref={svgHref}
                    style={stylingLogic.getCarouselElementChildSizeStlye({ buttonName: CarouselElement.pauseButton, subElementName: null })}
                    useElementStyle={style}
                    fillColor={fillColor}
                /> :
                <PauseButton
                    ref={ref}
                    onClick={onClick}
                    childStyle={style}
                    fillColor={fillColor}
                />}
        </CarouselItemViewerShortcutIndicator>
    )
})