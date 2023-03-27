import React from 'react'
import { CarouselItemProps } from './CarouselItem'
import { CarouselItemVideoOverlay } from './CarouselItemVideoOverlay'

export const CarouselItemVideo = (props: CarouselItemProps) => {
    const {} = props;
  return (
    <div>
        CarouselVideo Here
        <CarouselItemVideoOverlay {...props.videoOverlayProps}/>
    </div>
  )
}