import { getClassname } from '../../utils';
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useCarouselContext } from '../../context';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type CarouselItemViewerProps = {}
export const CarouselItemViewer = forwardRef<any, CarouselItemViewerProps>((props, ref) => {
    //#region Init
    //todo: needs to be hidden until an item is clicked
    const { currentItem, isFullscreenMode } = useCarouselContext();
    const innerRef = useRef<HTMLElement>(null);
    const { optionsLogic, stylingLogic } = useBusinessLogic({});
    const isVisible = Object.keys(currentItem || {})?.length > 0 && isFullscreenMode;
    useImperativeHandle(ref, () => innerRef.current);
    //#endregion

    //#region Function/Handlers
    //#endregion

    //#region Side Fx
    //#endregion

    //#region JSX
    const visibilityStyle = isVisible ? getClassname({ modifiedName: 'visible' }) : getClassname({ modifiedName: 'hidden' });
    const containerClassname = `${getClassname({ elementName: CLASSNAME__ITEM_VIEWER })} ${visibilityStyle}`;
    const ItemToRender = optionsLogic.itemToRender;

    return (
        <div ref={innerRef as any} className={containerClassname} style={stylingLogic.carouselItemViewerStyle}>
            <ItemToRender {...currentItem} />
        </div>
    )
    //#endregion
})
