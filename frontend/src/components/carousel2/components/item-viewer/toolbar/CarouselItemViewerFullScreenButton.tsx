import { forwardRef, useCallback } from 'react'
import { CLASSNAME__BUTTON_SCALE_ON_HOVER, EMPTY_STRING } from '../../../constants';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { enterFullScreen, exitFullScreen } from '../../../utils';
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { useCarouselContext } from '../../../context';
import { FullscreenButton } from '../../buttons/FullscreenButton';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';

//note: Full-screen button doesn't have any shortcuts since it is only visible when itemDisplayLocation is not 'none'
type CarouselItemViewerFullscreenButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerFullscreenButton = forwardRef<any, CarouselItemViewerFullscreenButtonProps>(({
    actionName = '',
    isShortcutVisible = false,
    onClick = () => null,
    options = {},
    shortcutPosition = 'right',
}, ref) => {
    const { elementStylings, currentItemIndex, setIsFullscreenMode } = useCarouselContext();
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options, currentItemIndex })
    const stylingLogic = new StylingLogic({ options, itemDisplayLocationLogic });
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
        <CarouselItemViewerShortcutIndicator actionName={actionName} shortcutPosition={shortcutPosition} isShortcutVisible={isShortcutVisible}>
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