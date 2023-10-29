import { useCarouselContext } from '../context';
import { CarouselVideo, CarouselVideoOptions } from './CarouselVideo';
import { CLASSNAME__CAROUSEL_ITEM, CLASSNAME__CAROUSEL_ITEM_THUMBNAIL } from '../constants';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { CarouselModalProps } from './modal/CarouselModal';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OptionsLogic } from '../business-logic/OptionsLogic';
import { CarouselElementValue } from '../types';
import { resolveSrcMain } from '../utils/getCarouselVideo';

export type CarouselItemSourceMain = string | CarouselVideo;
export type CarouselItemProps = {
  /**
  *These stylings are passed to the underlying item tag (e.g. <img> and <video>).
  *Most useful for setting an item's {@link React.CSSProperties.objectFit objectFit} and {@link React.CSSProperties.objectPosition objectPosition} styles.
  *See {@link OptionsLogic.itemStyles} for details.
  **/
  itemStyles?: CarouselElementValue<React.CSSProperties>;
  /**
  *A summary of the item.  This is displayed in the thumbnail and in the item viewer.
  **/
  description: string | undefined;
  /**
  *This is generated automatically if omitted.  
  *If given, it will determine the next/previous item to go to when clicking the next/previous button
  **/
  index?: number;
  /**
  *Props used to modify the modal displayed for this item.  If undefined, then modal is not displayed.
  **/
  modal?: CarouselModalProps;
  /**
  * This is the source of the image/video.  If item is a video, then adding a {@link CarouselItemProps.srcThumbnail thumbnail} is needed.  Otherwise the main image will be used as a thumbnail.
  **/
  srcMain: CarouselItemSourceMain;
  /**
  * This is the source of the thumbnail image to be used when viewing thumbnails only.
  **/
  srcThumbnail?: string | undefined;
  /**
  *The options for video items.
  **/
  video?: CarouselVideoOptions;
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
  const { stylingLogic, optionsLogic } = useBusinessLogic({ isCurrentItem: index === currentItemIndex });
  //#endregion

  //#region Functions/Handlers
  async function onPress(e: MouseEvent) {
    setCurrentItemIndex(index as any);

    if (optionsLogic.isDefaultItemDisplayLocation) {
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
        src={srcThumbnail || resolveSrcMain(srcMain)}
        alt={description || 'user picture or video'}
      />
    </div>
  )
  //#endregion
}