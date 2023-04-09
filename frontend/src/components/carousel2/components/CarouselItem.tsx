import React from 'react'
import { OPTIONS_DEFAULT, useCarouselContext } from '../context';
import { getClassname } from '../utils';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { CarouselVideoProps } from './CarouselVideo';

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

  //#region JSX

  //todo: 
  //  use a blank icon if srcThumbnail not present or require srcThumbnail? 
  //  need to put default size in comment above for thumbnail once decided upon
  return (
    <article onClick={(e) => onPress(e as any)} className={getClassname({ elementName: 'item' })}>
      {description ? (
        <div>
          <p>{description}</p>
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