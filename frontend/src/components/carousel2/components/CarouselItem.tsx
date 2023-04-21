import React from 'react'
import { OPTIONS_DEFAULT, useCarouselContext } from '../context';
import { convertHexToRgba, enterFullScreen, getClassname } from '../utils';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { CarouselVideoProps } from './CarouselVideo';
import { CAROUSEL_DOT_OPACITY_DEFAULT, CAROUSEL_ITEM_SIZE_DEFAULT, CLASSNAME__CAROUSEL_ITEM } from '../constants';
import { ItemDisplayLocationLogic } from '../business-logic/ItemDisplayLocationLogic';

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
  const { id: carouselId, options, setCurrentItemInInstanceIndex } = useCarouselInstanceContext();
  const itemDisplayLocationLogic = new ItemDisplayLocationLogic({options: options || {}});
  //#endregion

  //#region Functions/Handlers
  async function onPress(e: MouseEvent) {
    setOptions(options || OPTIONS_DEFAULT);
    setCurrentCarouselId(carouselId);
    setCurrentItemIndex(index as any);
    setCurrentItemInInstanceIndex && setCurrentItemInInstanceIndex(index as any);
    setCurrentSvgHrefs(options?.svgs);
    itemDisplayLocationLogic.getShouldDisplayItemViewer() && enterFullScreen(itemViewerRef.current);
  }
  //#endregion

  //#region JSX
  const fontSizeStyle = options?.thumbnail ? {
    fontSize: `${options.thumbnail.fontSize}px`,
  } as React.CSSProperties : {};
  const maxLineCountStyle = {
    WebkitLineClamp: options?.thumbnail?.maxLineCount || 2,
  } as React.CSSProperties;
  const backgroundSolidStyle = options?.thumbnail?.background?.solid?.color ? {
    background: 'none',
    backgroundColor: convertHexToRgba(options.thumbnail?.background?.solid.color?.trim() || '#000', options.thumbnail?.background?.solid?.opacity || CAROUSEL_DOT_OPACITY_DEFAULT),
  } as React.CSSProperties : {};
  const backgroundGradientStyle = options?.thumbnail?.background?.gradient ? {
    background: `linear-gradient(${options.thumbnail.background.gradient?.angle || 180}deg, ${convertHexToRgba(options?.thumbnail?.background?.gradient.start.color || '#fff', options?.thumbnail?.background?.gradient.start?.opacity || 0)} 0%, ${convertHexToRgba(options?.thumbnail?.background?.gradient.end.color || '#000', options?.thumbnail?.background?.gradient.end?.opacity || 1)} 100%)`,
  } as React.CSSProperties : {};
  const textColorStyle = options?.thumbnail?.textColor ? {
    color: options.thumbnail.textColor,
  } as React.CSSProperties : {};
  const bottomStyle = options?.thumbnail?.hideOverlayUnlessHovered === undefined || options.thumbnail.hideOverlayUnlessHovered ? {
    bottom: '-100%',
  } as React.CSSProperties : {};
  const thumbnailBackgroundStyle = {
    ...bottomStyle,
    ...backgroundSolidStyle,
    ...backgroundGradientStyle,
  } as React.CSSProperties
  const itemStyle = options?.thumbnail?.size ? {
    width: `${options.thumbnail?.size}px`,
    height: `${options.thumbnail?.size}px`,
  } as React.CSSProperties : {
    width: `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
    height: `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
  };

  return (
    <div onClick={(e) => onPress(e as any)} className={CLASSNAME__CAROUSEL_ITEM} style={itemStyle}>
      {description ? (
        <div style={thumbnailBackgroundStyle}>
          <p style={{ ...maxLineCountStyle, ...fontSizeStyle, ...textColorStyle }}>{description}</p>
        </div>
      ) : null}
      <img
        className={getClassname({ elementName: 'item-thumbnail' })}
        src={srcThumbnail || srcMain}
        alt={description || 'user picture or video'}
      />
    </div>
  )
  //#endregion
}