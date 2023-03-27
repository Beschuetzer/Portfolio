import React from 'react'
import { CarouselItemProps } from './CarouselItem'

export const CarouselItemImage = (props: CarouselItemProps) => {
    const { 
        description,
        srcMain,
        srcThumbnail,
        videoProps,
    } = props;
    
    console.log({props});

    return (
        <div>CarouselItemImage Here</div>
    )
}