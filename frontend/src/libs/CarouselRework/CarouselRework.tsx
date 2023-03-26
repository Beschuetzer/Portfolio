import React from 'react'
import { CarouselReworkItem } from './CarouselReworkItem';

type CarouselReworkProps = {
    items: CarouselReworkItem[];
	numberOfItemsInCarouselWidthWise?: string;
	numberOfItemsToScrollOnClick?: string;
	onOpen?: () => void;
	onClose?: () => void;
	shouldRearrangeItems?: boolean;
}

export const CarouselRework = ({

}: CarouselReworkProps) => {
  return (
    <div>CarouselRework</div>
  )
}