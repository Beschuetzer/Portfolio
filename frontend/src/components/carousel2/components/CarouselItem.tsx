import React from 'react'
import { OPTIONS_DEFAULT, useCarouselContext } from '../context';
import { convertHexToRgba, enterFullScreen, getClassname } from '../utils';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { CarouselVideoProps } from './CarouselVideo';
import { CAROUSEL_DOT_OPACITY_DEFAULT, CLASSNAME__CAROUSEL_ITEM } from '../constants';
import { ItemDisplayLocationLogic } from '../business-logic/ItemDisplayLocationLogic';
import { StylingLogic } from '../business-logic/StylingLogic';

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
  const { setCurrentItemIndex, setCurrentSvgs: setCurrentSvgHrefs, setOptions, setCurrentCarouselId, itemViewerRef, } = useCarouselContext();
  const { id: carouselId, options, setCurrentItemInInstanceIndex, currentItemInInstanceIndex } = useCarouselInstanceContext();
  const itemDisplayLocationLogic = new ItemDisplayLocationLogic({options: options || {}});
  const stylingLogic = new StylingLogic({options: options || {}, isCurrentItem: index === currentItemInInstanceIndex});
  //#endregion

  //#region Functions/Handlers
  async function onPress(e: MouseEvent) {
    setOptions(options || OPTIONS_DEFAULT);
    setCurrentCarouselId(carouselId);
    setCurrentItemIndex(index as any);
    setCurrentItemInInstanceIndex && setCurrentItemInInstanceIndex(index as any);
    setCurrentSvgHrefs(options?.svgs);
    itemDisplayLocationLogic.isDefaultItemDisplayLocation && enterFullScreen(itemViewerRef.current);
  }
  //#endregion

  //#region JSX
  return (
    <div onClick={(e) => onPress(e as any)} className={CLASSNAME__CAROUSEL_ITEM} style={stylingLogic.carouselItemStyle}>
      {description ? (
        <div style={stylingLogic.thumbnailBackgroundStyle}>
          <p style={stylingLogic.thumbnailTextStyle}>{description}</p>
        </div>
      ) : null}
      <img
        style={stylingLogic.carouselItemCursorStyle}
        className={getClassname({ elementName: 'item-thumbnail' })}
        src={srcThumbnail || srcMain}
        alt={description || 'user picture or video'}
      />
    </div>
  )
  //#endregion
}