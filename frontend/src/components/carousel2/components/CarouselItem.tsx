import React from 'react'
import { EMPTY_STRING } from '../constants';
import { useCarouselContext } from '../context';
import { getClassname } from '../utils';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { CarouselVideoProps } from './CarouselVideo';

export type CarouselItemProps = {
  /*
  * If undefined, there will be no 
  */
  description?: string | undefined;

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
  videoProps?: CarouselVideoProps;
}

export const CarouselItem = (props: CarouselItemProps) => {
  //#region Init
  const {
    description,
    srcMain,
    srcThumbnail,
  } = props;
  const { setCurrentItemProps, setCurrentItemSrc, setCurrentSvgHrefs } = useCarouselContext();
  const { svgHrefInstance } = useCarouselInstanceContext();
  //#endregion

  //#region Functions/Handlers
  function onPress(e: MouseEvent) {
    setCurrentItemSrc(srcMain || EMPTY_STRING);
    setCurrentItemProps(props);
    setCurrentSvgHrefs(svgHrefInstance);
  }
  //#endregion

  //#region JSX

  //todo: 
  //  use a blank icon if srcThumbnail not present or require srcThumbnail? 
  //  need to put default size in comment above for thumbnail once decided upon
  return (
    <article onClick={(e) => onPress(e as any)} className={getClassname({elementName: 'item'})}>
      <img
        className={getClassname({elementName: 'item-thumbnail'})}
        src={srcThumbnail}
        alt={description}
      />
		</article>
  )
  //#endregion
}