import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { getClassname } from '../../utils';
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { CURRENT_ITEMS_INITIAL, CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../../context';
import { ItemDisplayLocationLogic } from '../../business-logic/ItemDisplayLocationLogic';

type CarouselItemViewerProps = {}
export const CarouselItemViewer = forwardRef<any, CarouselItemViewerProps> ((props, ref) => {
    //#region Init
    //todo: needs to be hidden until an item is clicked
    const { currentItem, setCurrentItems, setCurrentItemIndex, options } = useCarouselContext();
    const [isVisible, setisVisible] = useState(Object.keys(currentItem || {})?.length > 0);
    const innerRef = useRef<HTMLElement>(null);
    const itemDisplayLocationLogic = new ItemDisplayLocationLogic(options, currentItem);
    useImperativeHandle(ref, () => innerRef.current);
    //#endregion

    //#region Function/Handlers
    
    //#endregion

    //#region Side Fx
    useEffect(() => {
        function handleFullScreenChange(e: Event) {
            const target = (e.target || e.currentTarget) as HTMLElement;
            if (!target?.className?.match(/hidden/)) {
                setCurrentItemIndex(CURRENT_ITEM_INDEX_INITIAL);
                setCurrentItems(CURRENT_ITEMS_INITIAL);
            }
        }

        if (innerRef.current) {
            innerRef.current.addEventListener('fullscreenchange', handleFullScreenChange);
        }

        return () => {
            if (innerRef.current) {
                innerRef.current.removeEventListener('fullscreenchange', handleFullScreenChange);
            }
        }
    }, [])

    useEffect(() => {
        setisVisible(!!currentItem?.srcMain);
    }, [currentItem])
    //#endregion
    
    //#region JSX
    const visibilityStyle = isVisible ? getClassname({modifiedName: 'visible'}) : getClassname({modifiedName: 'hidden'});
    const containerClassname = `${getClassname({elementName: CLASSNAME__ITEM_VIEWER})} ${visibilityStyle}`;
    const ItemToRender = itemDisplayLocationLogic.getItemToRender();
  
    if (!itemDisplayLocationLogic.getShouldDisplayItemViewer()) return null;
    return (
        <div ref={innerRef as any} className={containerClassname}>
            <ItemToRender {...currentItem}/>
        </div>
    )
    //#endregion
})
