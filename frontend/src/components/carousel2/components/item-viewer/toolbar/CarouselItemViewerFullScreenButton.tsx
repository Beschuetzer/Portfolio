import { forwardRef, useCallback } from 'react'
import { CLASSNAME__BUTTON_SCALE_ON_HOVER } from '../../../constants';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { useCarouselContext } from '../../../context';
import { FullscreenButton } from '../../buttons/FullscreenButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

//note: Full-screen button doesn't have any shortcuts since it is only visible when itemDisplayLocation is not 'none'
type CarouselItemViewerFullscreenButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerFullscreenButton = forwardRef<any, CarouselItemViewerFullscreenButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    position = 'right',
}, ref) => {
    const { elementStylings, setIsFullscreenMode, isFullscreenMode } = useCarouselContext();
    const { stylingLogic } = useBusinessLogic({});
    const { svgHref, style } = elementStylings?.fullscreenButton || {};
    const fillColor = stylingLogic.getButtonColor(CarouselElement.fullscreenButton);

    const onClickLocal = useCallback(async () => {
        onClick && onClick();
        setIsFullscreenMode(true);
    }, [
        setIsFullscreenMode,
        onClick
    ]);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionName}
            isShortcutVisible={isShortcutVisible}
            position={position}
            showButton={!isFullscreenMode}
        >
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClickLocal}
                    xlinkHref={svgHref}
                    useElementStyle={style}
                    fillColor={fillColor}
                    classNamesToInclude={[CLASSNAME__BUTTON_SCALE_ON_HOVER]}
                /> :
                <FullscreenButton
                    ref={ref}
                    onClick={onClickLocal}
                    fillColor={fillColor}
                    childStyle={style}
                />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})