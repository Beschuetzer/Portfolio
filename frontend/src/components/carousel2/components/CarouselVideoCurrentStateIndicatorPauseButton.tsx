import { forwardRef, useCallback, useMemo } from 'react';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { PauseButton } from './buttons/PauseButton';
import { CarouselVideoCurrentStateIndicatorButtonName } from '../types';

type CarouselVideoCurrentStateIndicatorPauseButtonProps = {};
export const CarouselVideoCurrentStateIndicatorPauseButton = forwardRef<any, CarouselVideoCurrentStateIndicatorPauseButtonProps>((props, ref) => {
    const { options } = useCarouselContext();
    const { svgHref, style } = options.styling?.videoCurrentStateIndicator?.pauseIcon || {};
    const { stylingLogic } = useBusinessLogic();
    const fillColor = useMemo(() => stylingLogic.getVideoCurrentStateIndicatorForegroundColor(CarouselVideoCurrentStateIndicatorButtonName.pauseIcon),
        [stylingLogic]
    );
    const onClick = useCallback(() => null, []);
    
    return (!!svgHref ?
        <CarouselItemViewerCustomButton
            style={stylingLogic.carouselVideoCurrentStateIndicatorButtonStyle}
            ref={ref}
            onClick={onClick}
            xlinkHref={svgHref}
            useElementStyle={style}
            fillColor={fillColor}
        /> :
        <PauseButton
            style={stylingLogic.carouselVideoCurrentStateIndicatorButtonStyle}
            ref={ref}
            onClick={onClick}
            childStyle={style} fillColor={fillColor}
        />
    )
})