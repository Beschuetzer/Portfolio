import { forwardRef, useCallback } from 'react'
import { EMPTY_STRING } from '../../../constants';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { enterFullScreen, exitFullScreen, getIsInFullscreen } from '../../../utils';
import { useCarouselInstanceContext } from '../../CarouselInstanceProvider';
import { StylingLogic } from '../../../business-logic/StylingLogic';
import { OPTIONS_DEFAULT, useCarouselContext } from '../../../context';
import { FullscreenButton } from '../../buttons/FullscreenButton';
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic';

type CarouselItemViewerFullscreenButtonProps = {} & CarouselItemViewerButtonProps;
export const CarouselItemViewerFullscreenButton = forwardRef<any, CarouselItemViewerFullscreenButtonProps>(({
    onClick = () => null,
    options = {},
}, ref) => {
    const { setOptions, setCurrentCarouselId, setCurrentButtons, setCurrentItemIndex, currentButtons: currentButtonsGlobal, itemViewerRef } = useCarouselContext();
    const { currentItemInInstanceIndex, currentButtons: currentButtonsLocal, id: carouselId } = useCarouselInstanceContext();
    const currentSvgs = currentButtonsLocal || currentButtonsGlobal;
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({options, currentItemIndex: currentItemInInstanceIndex})
    const stylingLogic = new StylingLogic({ options, itemDisplayLocationLogic });
    const { svgHref, style } = currentSvgs?.closeButton || {};  //todo: change
    const fillColor = stylingLogic.getButtonColor(CarouselElement.closeButton); //todo: change

    const onClickLocal = useCallback(async () => {
        setOptions(options || OPTIONS_DEFAULT);
        setCurrentCarouselId(carouselId);
        setCurrentButtons(options?.styling?.elements);
        setCurrentItemIndex(currentItemInInstanceIndex || 0);
        onClick && onClick();
        enterFullScreen(itemViewerRef.current);
    }, [
        setOptions,
        setCurrentButtons,
        setCurrentCarouselId,
        setCurrentItemIndex,
        exitFullScreen,
        enterFullScreen,
        EMPTY_STRING,
        onClick
    ]);

    return (
        !!svgHref ?
            <CarouselItemViewerCustomButton ref={ref} onClick={onClickLocal} xlinkHref={svgHref} useElementStyle={style} fillColor={fillColor} /> :
            <FullscreenButton ref={ref} onClick={onClickLocal} fillColor={fillColor} childStyle={style} />
    )
})