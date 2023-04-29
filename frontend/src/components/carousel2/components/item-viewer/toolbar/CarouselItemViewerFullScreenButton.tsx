import { forwardRef, useCallback } from 'react'
import { CLASSNAME__ITEM_VIEWER_BUTTON, CLASSNAME__BUTTON_SCALE_ON_HOVER, EMPTY_STRING } from '../../../constants';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { CarouselElement, CarouselItemViewerButtonProps } from '../../../types';
import { enterFullScreen, exitFullScreen } from '../../../utils';
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
    const { setOptions, setCurrentCarouselId, setCurrentElements, setCurrentItemIndex, currentElements: currentElementsGlobal, itemViewerRef } = useCarouselContext();
    const { currentItemInInstanceIndex, currentElements: currentElementsLocal, id: carouselId } = useCarouselInstanceContext();
    const currentElements = currentElementsLocal || currentElementsGlobal;
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options, currentItemIndex: currentItemInInstanceIndex })
    const stylingLogic = new StylingLogic({ options, itemDisplayLocationLogic });
    const { svgHref, style } = currentElements?.fullscreenButton || {};  //todo: change
    const fillColor = stylingLogic.getButtonColor(CarouselElement.fullscreenButton); //todo: change

    const onClickLocal = useCallback(async () => {
        setOptions(options || OPTIONS_DEFAULT);
        setCurrentCarouselId(carouselId);
        setCurrentElements(options?.styling?.elements);
        setCurrentItemIndex(currentItemInInstanceIndex || 0);
        onClick && onClick();
        enterFullScreen(itemViewerRef.current);
    }, [
        setOptions,
        setCurrentElements,
        setCurrentCarouselId,
        setCurrentItemIndex,
        exitFullScreen,
        enterFullScreen,
        EMPTY_STRING,
        onClick
    ]);

    return (
        !!svgHref ?
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
    )
})