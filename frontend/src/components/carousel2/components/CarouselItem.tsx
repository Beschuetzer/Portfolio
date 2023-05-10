import { useCarouselContext } from '../context';
import { CarouselVideoProps } from './CarouselVideo';
import { CLASSNAME__CAROUSEL_ITEM, CLASSNAME__CAROUSEL_ITEM_THUMBNAIL } from '../constants';
import { useBusinessLogic } from '../hooks/useBusinessLogic';

export type CarouselItemProps = {
  /*
  *This is displayed in the thumbnail and in the item viewer
  */
  description: string | undefined;
  /*
  *This is generated automatically if omitted.  
  *If given, it will determine the 'next'/'previous' item to go to when clicking the next/previousButton
  */
  index?: number;
  /*
  * This is the source of the image to be used in full-size viewing as well as thumbnail viewing if no thumbnail is provided
  */
  srcMain: string | undefined;
  /*
  * This is the source of the thumbnail image to be used when viewing thumbnails only
  */
  srcThumbnail?: string | undefined;
  /*
  *Props for optional overlay when item is a video
  */
  video?: CarouselVideoProps;
}

export const CarouselItem = (props: CarouselItemProps) => {
  //#region Init
  const {
    description,
    index,
    srcMain,
    srcThumbnail,
  } = props;
  const { setCurrentItemIndex, currentItemIndex, setIsFullscreenMode } = useCarouselContext();
  const { stylingLogic, itemDisplayLocationLogic } = useBusinessLogic({ isCurrentItem: index === currentItemIndex });
  //#endregion

  //#region Functions/Handlers
  async function onPress(e: MouseEvent) {
      setCurrentItemIndex(index as any);

      if (itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
        setIsFullscreenMode(true);
      }
  }
  //#endregion

  //#region JSX
  return (
    <div onClick={(e) => onPress(e as any)} className={CLASSNAME__CAROUSEL_ITEM} style={stylingLogic.carouselItemStyle}>
      {description ? (
        <div style={stylingLogic.thumbnailOverlayBackgroundStyle}>
          <p style={stylingLogic.thumbnailOverlayTextStyle}>{description}</p>
        </div>
      ) : null}
      <img
        data-index={index}
        draggable={false}
        style={stylingLogic.carouselItemCursorStyle}
        className={CLASSNAME__CAROUSEL_ITEM_THUMBNAIL}
        src={srcThumbnail || srcMain}
        alt={description || 'user picture or video'}
      />
    </div>
  )
  //#endregion
}