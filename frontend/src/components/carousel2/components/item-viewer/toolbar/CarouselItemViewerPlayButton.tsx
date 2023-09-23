import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { PlayButton } from '../../buttons/PlayButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerPlayButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerPlayButton = forwardRef<any, CarouselItemViewerPlayButtonProps>((props, ref) => {
    const {
        actionName = '',
        isShortcutVisible = false,
        isVisible = true,
        onClick = () => null,
        position = 'center',
    } = props;
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.playButton || {};
    const { optionsLogic, stylingLogic, toolbarActionsLogic } = useBusinessLogic();
    const playAction = toolbarActionsLogic.getPlay();
    const fillColor = optionsLogic.getButtonColor(CarouselElement.playButton);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionName}
            shortcuts={playAction.keys}
            position={position}
            isShortcutVisible={isShortcutVisible}
            isVisible={isVisible}
        >
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClick}
                    style={stylingLogic.getCarouselElementChildSizeStlye({ buttonName: CarouselElement.playButton, subElementName: null })}
                    xlinkHref={svgHref}
                    useElementStyle={style}
                    fillColor={fillColor}
                /> :
                <PlayButton
                    ref={ref}
                    onClick={onClick}
                    childStyle={style}
                    fillColor={fillColor}
                />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})