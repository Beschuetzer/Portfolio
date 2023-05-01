import { getClassname } from '../../utils';
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { ItemDisplayLocationLogic } from '../../business-logic/ItemDisplayLocationLogic';
import { StylingLogic } from '../../business-logic/StylingLogic';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useCarouselContext } from '../../context';

type CarouselItemViewerProps = {}
export const CarouselItemViewer = forwardRef<any, CarouselItemViewerProps>((props, ref) => {
    //#region Init
    //todo: needs to be hidden until an item is clicked
    const { currentItem, options, isFullscreenMode } = useCarouselContext();
    const innerRef = useRef<HTMLElement>(null);
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options, currentItem });
    const stylingLogic = new StylingLogic({ options, isFullscreenMode })
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
    const ItemToRender = itemDisplayLocationLogic.itemToRender;

    return (
        <div ref={innerRef as any} className={containerClassname} style={stylingLogic.carouselItemViewerStyle}>
            <ItemToRender {...currentItem} />
        </div>
    )
    //#endregion
})
