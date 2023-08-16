import { forwardRef, useCallback, useMemo } from 'react';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { PlayButton } from './buttons/PlayButton';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { CarouselVideoCurrentStateIndicatorButtonName } from '../types';

type CarouselVideoCurrentStateIndicatorPlayButtonProps = {};
export const CarouselVideoCurrentStateIndicatorPlayButton = forwardRef<any, CarouselVideoCurrentStateIndicatorPlayButtonProps>((props, ref) => {
    const { options } = useCarouselContext();
    const { svgHref, style } = options.styling?.videoCurrentStateIndicator?.playIcon || {};
    const { stylingLogic } = useBusinessLogic();
    const fillColor = useMemo(() => stylingLogic.getVideoCurrentStateIndicatorForegroundColor(CarouselVideoCurrentStateIndicatorButtonName.playIcon),
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
        <PlayButton
            style={stylingLogic.carouselVideoCurrentStateIndicatorButtonStyle}
            ref={ref}
            onClick={onClick}
            childStyle={style} fillColor={fillColor}
        />
    )
})