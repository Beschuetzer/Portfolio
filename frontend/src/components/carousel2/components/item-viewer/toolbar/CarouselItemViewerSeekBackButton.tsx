import { forwardRef, useMemo } from 'react';
import { useCarouselContext } from '../../../context';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { SeekBackButton } from '../../buttons/SeekBackButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerSeekBackButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerSeekBackButton = forwardRef<any, CarouselItemViewerSeekBackButtonProps>((props, ref) => {
    const {
        actionName = '',
        isShortcutVisible = false,
        onClick = () => null,
        position = 'center',
    } = props;
    const { elementStylings } = useCarouselContext();
    const { svgHref, style } = elementStylings?.seekBackButton || {};
    const { optionsLogic, stylingLogic, toolbarActionsLogic } = useBusinessLogic();
    const seekBackwardsAction = toolbarActionsLogic.getSeekBackwards();
    const fillColor = optionsLogic.getButtonColor(CarouselElement.seekBackButton);
    const actionNameToUse = useMemo(() => `${actionName} ${optionsLogic.videoSeekAmount} seconds`, [actionName, optionsLogic.videoSeekAmount]);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionNameToUse}
            shortcuts={seekBackwardsAction.keys}
            position={position}
            isShortcutVisible={isShortcutVisible}
        >
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClick}
                    style={stylingLogic.getCarouselElementChildSizeStlye({ buttonName: CarouselElement.seekBackButton, subElementName: null })}
                    xlinkHref={svgHref}
                    useElementStyle={style}
                    fillColor={fillColor}
                /> :
                <SeekBackButton
                    ref={ref}
                    onClick={onClick}
                    childStyle={style}
                    fillColor={fillColor}
                />}
        </CarouselItemViewerShortcutIndicator>
    )
})