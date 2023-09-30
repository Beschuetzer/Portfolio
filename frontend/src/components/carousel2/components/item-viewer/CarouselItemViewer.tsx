import { getClassname } from '../../utils/utils';
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { forwardRef, useRef, useImperativeHandle, useMemo } from 'react';
import { useCarouselContext } from '../../context';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';
import { CarouselItemToRender } from '../CarouselItemToRender';

type CarouselItemViewerProps = {}
export const CarouselItemViewer = forwardRef<any, CarouselItemViewerProps>((props, ref) => {
    //#region Init
    const { currentItem, isFullscreenMode } = useCarouselContext();
    const { stylingLogic } = useBusinessLogic();
    const isVisible = useMemo(() => Object.keys(currentItem || {})?.length > 0 && isFullscreenMode, [currentItem, isFullscreenMode]);
    const innerRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => innerRef.current);
    //#endregion

    //#region JSX
    const visibilityStyle = isVisible ? getClassname({ modifiedName: 'visible' }) : getClassname({ modifiedName: 'hidden' });
    const containerClassname = `${CLASSNAME__ITEM_VIEWER} ${visibilityStyle}`;

    return (
        <div ref={innerRef as any} className={containerClassname} style={stylingLogic.carouselItemViewerStyle}>
            <CarouselItemToRender />
        </div>
    )
    //#endregion
})
