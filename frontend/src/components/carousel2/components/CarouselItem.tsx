import React from 'react'
import { OPTIONS_DEFAULT, useCarouselContext } from '../context';
import { convertHexToRgba, getClassname } from '../utils';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { CarouselVideoProps } from './CarouselVideo';
import { CAROUSEL_DOT_OPACITY_DEFAULT, CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT, CLASSNAME__CAROUSEL_ITEM } from '../constants';

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
  const { setCurrentItemIndex, setCurrentSvgHrefs, setOptions, setCurrentCarouselId } = useCarouselContext();
  const { id: carouselId, svgHrefInstance, options } = useCarouselInstanceContext();
  //#endregion

  //#region Functions/Handlers
  function onPress(e: MouseEvent) {
    setOptions(options || OPTIONS_DEFAULT);
    setCurrentCarouselId(carouselId);
    setCurrentItemIndex(index as any);
    setCurrentSvgHrefs(svgHrefInstance);
  }
  //#endregion

  //#region JSX
  const fontSizeStyle = options?.thumbnail ? {
    fontSize: `${options.thumbnail.fontSize}px`,
  } as React.CSSProperties : {};
  const maxLineCountStyle = {
    WebkitLineClamp: options?.thumbnail?.maxLineCount || 2,
  } as React.CSSProperties;
  const backgroundColorStyle =  options?.thumbnail?.backgroundColor ? {
    backgroundColor: convertHexToRgba(options.thumbnail?.backgroundColor?.trim() || '#000', options.thumbnail?.backgroundOpacity || CAROUSEL_DOT_OPACITY_DEFAULT),
  } as React.CSSProperties : {};
  const textColorStyle =  options?.thumbnail?.textColor ? {
    color: options.thumbnail.textColor,
  } as React.CSSProperties : {};
  const bottomStyle =  options?.thumbnail?.hideOverlayUnlessHovered === undefined || options.thumbnail.hideOverlayUnlessHovered ? {
    bottom: '-100%',
  } as React.CSSProperties : {};
  const thumbnailBackgroundStyle = {
    ...bottomStyle,
    ...backgroundColorStyle,
  } as React.CSSProperties
  const itemStyle = options?.thumbnail?.size ? {
    width: `${options.thumbnail?.size}px`,
    height: `${options.thumbnail?.size}px`,
  } as React.CSSProperties : {
    width: `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
    height: `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
  };
  
  return (
    <article onClick={(e) => onPress(e as any)} className={CLASSNAME__CAROUSEL_ITEM} style={itemStyle}>
      {description ? (
        <div style={thumbnailBackgroundStyle}>
          <p style={{...maxLineCountStyle, ...fontSizeStyle, ...textColorStyle}}>{description}</p>
        </div>
      ) : null}
      <img
        className={getClassname({ elementName: 'item-thumbnail' })}
        src={srcThumbnail || srcMain}
        alt={description || 'user picture or video'}
      />
    </article>
  )
  //#endregion
}