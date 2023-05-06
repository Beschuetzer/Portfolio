import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { SeekForwardButton } from '../../buttons/SeekForwardButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerSeekForwardButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekForwardButton = forwardRef<any, CarouselItemViewerSeekForwardButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    options = {},
    onClick = () => null,
    position = 'center',
}, ref) => {
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.seekForwardButton || {};
    const { stylingLogic, toolbarActionsLogic } = useBusinessLogic({});
    const seekForwardAction = toolbarActionsLogic.getSeekForwards();
    const fillColor = stylingLogic.getButtonColor(CarouselElement.seekForwardButton);

    return (
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcuts={seekForwardAction.keys} position={position} isShortcutVisible={isShortcutVisible}>
            {!!svgHref ?
                <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
                <SeekForwardButton ref={ref} onClick={onClick} childStyle={style} fillColor={fillColor} />}
        </CarouselItemViewerShortcutIndicator>
    )
})