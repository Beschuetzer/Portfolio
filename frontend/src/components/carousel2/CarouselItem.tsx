import React from 'react'
import { CarouselItemImage } from './CarouselItemImage';
import { CarouselItemVideo } from './CarouselItemVideo';
import { CarouselItemVideoOverlayProps } from './CarouselItemVideoOverlay';
import { EMPTY_STRING, VIDEO_EXTENSIONS } from './constants';
import { useCarouselContext } from './context';
import { getRegexStringFromStringArray } from './utils';

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
  videoOverlayProps?: CarouselItemVideoOverlayProps;
}

export const CarouselItem = (props: CarouselItemProps) => {
  //#region Init
  const {
    description,
    srcMain,
    srcThumbnail,
  } = props;
  const { setCurrentItemSrc } = useCarouselContext();
  const isVideo = srcMain?.match(
		getRegexStringFromStringArray(VIDEO_EXTENSIONS),
	);
  //#endregion

  //#region Functions/Handlers
	

  function onPress() {
    setCurrentItemSrc(srcMain || EMPTY_STRING);
  }
  //#endregion

  //#region JSX
  const ItemToRender = isVideo ? CarouselItemVideo : CarouselItemImage;

  return (
    <article onClick={onPress}>
      <br></br>
			<ItemToRender {...props}/>
			{/* <p className={descriptionClassname}>{imageAlt}</p>
			{renderControls(isVideo as RegExpMatchArray)} */}
		</article>
  )
  //#endregion
}