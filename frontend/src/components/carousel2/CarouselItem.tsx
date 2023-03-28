import React from 'react'
import { CarouselItemImage } from './CarouselItemImage';
import { CarouselItemVideo, CarouselItemVideoProps } from './CarouselItemVideo';
import { CarouselItemVideoOverlayProps } from './CarouselItemVideoOverlay';
import { EMPTY_STRING, VIDEO_EXTENSIONS } from './constants';
import { useCarouselContext } from './context';
import { CssStyles } from './types';
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
  videoProps?: CarouselItemVideoProps;
}

export const CarouselItem = (props: CarouselItemProps) => {
  //#region Init
  const {
    description,
    srcMain,
    srcThumbnail,
  } = props;
  const { setCurrentItemProps, setCurrentItemSrc } = useCarouselContext();
  
  //#endregion

  //#region Functions/Handlers
	

  function onPress(e: MouseEvent) {
    console.log({srcMain, e});
    
    setCurrentItemSrc(srcMain || EMPTY_STRING);
    setCurrentItemProps(props);
  }
  //#endregion

  //#region JSX

  //todo: 
  //  use a blank icon if srcThumbnail not present or require srcThumbnail? 
  //  need to put default size in comment above for thumbnail once decided upon
  return (
    <article onClick={(e) => onPress(e as any)} style={styles.container}>
      <img
        style={styles.image}
        src={srcThumbnail}
        alt={description}
      />
		</article>
  )
  //#endregion
}

const styles = {
  container: {
    position: "relative",
    height: "150px",
    width: "150px",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "border-radius 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease",
  },
  image: {
    objectFit: "cover",
    objectPosition: "top",
    height: "100%",
    width: "100%",
  }
} as CssStyles