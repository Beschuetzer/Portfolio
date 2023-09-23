import { forwardRef, useMemo } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { SeekForwardButton } from '../../buttons/SeekForwardButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerSeekForwardButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekForwardButton = forwardRef<any, CarouselItemViewerSeekForwardButtonProps>((props, ref) => {
    const {
        actionName = '',
        isShortcutVisible = false,
        onClick = () => null,
        position = 'center',
    } = props;
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.seekForwardButton || {};
    const { optionsLogic, stylingLogic, toolbarActionsLogic } = useBusinessLogic();
    const seekForwardAction = toolbarActionsLogic.getSeekForwards();
    const fillColor = optionsLogic.getButtonColor(CarouselElement.seekForwardButton);
    const actionNameToUse = useMemo(() => `${actionName} ${optionsLogic.videoSeekAmount} seconds`, [actionName, optionsLogic.videoSeekAmount]);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionNameToUse}
            shortcuts={seekForwardAction.keys}
            position={position}
            isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClick}
                    style={stylingLogic.getCarouselElementChildSizeStlye({ buttonName: CarouselElement.seekForwardButton, subElementName: null })}
                    xlinkHref={svgHref}
                    useElementStyle={style}
                    fillColor={fillColor}
                /> :
                <SeekForwardButton
                    ref={ref}
                    onClick={onClick}
                    childStyle={style}
                    fillColor={fillColor}
                />}
        </CarouselItemViewerShortcutIndicator>
    )
})