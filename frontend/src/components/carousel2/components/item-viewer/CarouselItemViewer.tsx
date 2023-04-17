import { useEffect, useState, forwardRef } from 'react'
import { CarouselImage } from '../CarouselImage';
import { CarouselVideo } from '../CarouselVideo';
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { useCarouselContext } from '../../context'
import { getClassname, getIsVideo } from '../../utils';

type CarouselItemViewerProps = {}
export const CarouselItemViewer = forwardRef<HTMLElement, CarouselItemViewerProps> ((props, ref) => {
    //#region Init
    //todo: needs to be hidden until an item is clicked
    const { currentItem } = useCarouselContext();
    const [isVisible, setisVisible] = useState(Object.keys(currentItem || {})?.length > 0);
    const currentItemSrc = currentItem?.srcMain || '';
    const isVideo = getIsVideo(currentItemSrc);
    //#endregion

    //#region Function/Handlers
    
    //#endregion

    //#region Side Fx
    useEffect(() => {
        setisVisible(!!currentItemSrc);
    }, [currentItemSrc])
    //#endregion
    
    //#region JSX
    //todo: need to use stying here instead for smooth transitions?
    const ItemToRender = isVideo ? CarouselVideo : CarouselImage;
    const visibilityStyle = isVisible ? getClassname({modifiedName: 'visible'}) : getClassname({modifiedName: 'hidden'});
    const containerClassname = `${getClassname({elementName: CLASSNAME__ITEM_VIEWER})} ${visibilityStyle}`;
  
    return (
        <section ref={ref} className={containerClassname}>
            <ItemToRender {...currentItem}/>
        </section>
    )
    //#endregion
})
