import React, { useEffect } from 'react'
import { OPTIONS_DEFAULT, useCarouselContext } from '../context';
import { getClassname, setCssCustomProperty } from '../utils';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { CarouselVideoProps } from './CarouselVideo';
import { CLASSNAME__THUMBNAIL_BACKGROUND_COLOR, CLASSNAME__THUMBNAIL_TEXT_COLOR } from '../constants';

export type CarouselItemProps = {
  /*
  * If undefined, there will be no 
  */
  description?: string | undefined;

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

  //#region Side Fx
  useEffect(() => {
    if (options?.thumbnail) {
      if (options.thumbnail?.backgroundColor) {
          setCssCustomProperty(CLASSNAME__THUMBNAIL_BACKGROUND_COLOR, options.thumbnail.backgroundColor?.trim());
      }

      if (options.thumbnail?.textColor) {
          setCssCustomProperty(CLASSNAME__THUMBNAIL_TEXT_COLOR, options.thumbnail.textColor?.trim());
      }
    }
  }, [options, CLASSNAME__THUMBNAIL_TEXT_COLOR, setCssCustomProperty])
  
  //#endregion

  //#region JSX
  return (
    <article onClick={(e) => onPress(e as any)} className={getClassname({ elementName: 'item' })}>
      {description ? (
        <div>
          <h4>{description}</h4>
        </div>
      ) : null}
      <img
        className={getClassname({ elementName: 'item-thumbnail' })}
        src={srcThumbnail || srcMain}
        alt={description || 'user picture'}
      />
    </article>
  )
  //#endregion
}