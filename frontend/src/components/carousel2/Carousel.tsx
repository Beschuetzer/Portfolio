import React, { useEffect } from 'react'
import { CarouselItem, CarouselItemProps } from './CarouselItem';
import { CLASSNAME_ROOT } from './constants';
import { useCarouselContext } from './context';


type CarouselProps = {
	/*
	* if undefined, a standard 'X' will be used for the close button
	*/
	closeButtonSvgXlinkHref?: string;
    items: CarouselItemProps[];
	onClose?: () => void;
	onItemChange?: (currentItemSrc?: string) => void;
	onOpen?: () => void;
	/*
	*The number of items to display in the carousel at any given time
	*/
	rowWidth?: number;
}

export const Carousel = ({
	closeButtonSvgXlinkHref,
	items,
	onClose = () => null,
	onItemChange = () => null,
	onOpen = () => null,
}: CarouselProps) => {
	//#region Init
	const { currentItemSrc, closeButtonSvgXlinkHrefRef } = useCarouselContext();
	//#endregion

	//#region Side Fx
	useEffect(() => {
		onItemChange && onItemChange(currentItemSrc);
	}, [currentItemSrc])

	useEffect(() => {
		closeButtonSvgXlinkHrefRef.current = closeButtonSvgXlinkHref;
	}, [])
	//#endregion

	//#region JSX
	const renderItems = () =>{
		return items.map((item, index) => <CarouselItem key={index} {...item}/>);
	}

	return (
		<div className={CLASSNAME_ROOT}>
			{renderItems()}
		</div>
	)
	//#endregion
}

