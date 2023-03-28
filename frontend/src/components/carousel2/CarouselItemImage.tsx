import React from 'react'
import { CarouselItemProps } from './CarouselItem'

export const CarouselItemImage = (props: CarouselItemProps) => {
    const { 
        description,
        srcMain,
    } = props;
    
    console.log({props});

    return (
        <img
            src={srcMain}
            alt={description}
        />
    )
}