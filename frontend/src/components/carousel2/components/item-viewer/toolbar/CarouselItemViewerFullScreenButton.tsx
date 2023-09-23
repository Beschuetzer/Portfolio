import { forwardRef, useCallback } from 'react'
import { CLASSNAME__BUTTON_SCALE_ON_HOVER, CURRENT_VIDEO_CURRENT_TIME_DEFAULT } from '../../../constants';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { useCarouselContext } from '../../../context';
import { FullscreenButton } from '../../buttons/FullscreenButton';
import { CarouselItemViewerShortcutIndicator } from './CarouselItemViewerShortcutIndicator';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from './CarouselItemViewerToolbar';

//note: Full-screen button doesn't have any shortcuts since it is only visible when itemDisplayLocation is not 'none'
type CarouselItemViewerFullscreenButtonProps = {} & CarouselItemViewerButtonProps & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;
export const CarouselItemViewerFullscreenButton = forwardRef<any, CarouselItemViewerFullscreenButtonProps>((props, ref) => {
    const {
        actionName = '',
        isShortcutVisible = false,
        onClick = () => null,
        position = 'right',
        style = {},
        videoRef,
    } = props;
    const { elementStylings, setIsFullscreenMode, isFullscreenMode, setCurrentVideoCurrentTime } = useCarouselContext();
    const { optionsLogic, stylingLogic } = useBusinessLogic();
    const { svgHref, style: buttonStyle } = elementStylings?.fullscreenButton || {};
    const fillColor = optionsLogic.getButtonColor(CarouselElement.fullscreenButton);

    const onClickLocal = useCallback(async () => {
        onClick && onClick();
        setIsFullscreenMode(true);
        setCurrentVideoCurrentTime(videoRef?.current?.currentTime || CURRENT_VIDEO_CURRENT_TIME_DEFAULT);
    }, [onClick, setIsFullscreenMode, setCurrentVideoCurrentTime, videoRef]);

    return (
        <CarouselItemViewerShortcutIndicator
            actionName={actionName}
            isShortcutVisible={isShortcutVisible}
            position={position}
            showButton={!isFullscreenMode}
            style={style}
        >
            {!!svgHref ?
                <CarouselItemViewerCustomButton
                    ref={ref}
                    onClick={onClickLocal}
                    xlinkHref={svgHref}
                    style={stylingLogic.getCarouselElementChildSizeStlye({ buttonName: CarouselElement.fullscreenButton, subElementName: null })}
                    useElementStyle={buttonStyle}
                    fillColor={fillColor}
                    classNamesToInclude={[CLASSNAME__BUTTON_SCALE_ON_HOVER]}
                /> :
                <FullscreenButton
                    ref={ref}
                    onClick={onClickLocal}
                    fillColor={fillColor}
                    childStyle={buttonStyle}
                />
            }
        </CarouselItemViewerShortcutIndicator>
    )
})