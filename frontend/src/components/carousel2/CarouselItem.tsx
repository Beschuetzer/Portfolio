import React from 'react'

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
}

export const CarouselItem = ({
  description,
  srcMain,
  srcThumbnail,
}: CarouselItemProps) => {
  return (
    <div>
      <p>
        Desc: {description || "N/A"}
      </p>
      <p>
        SrcMain: {srcMain || "N/A"}
      </p>
      <p>
        SrcThumb: {srcThumbnail || "N/A"}
      </p>
      <br></br>
    </div>
  )
}