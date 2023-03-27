import React, { useEffect } from 'react'
import { CarouselItem, CarouselItemProps } from './CarouselItem';
import { useCarouselContext } from './context';


type CarouselProps = {
    items: CarouselItemProps[];
	onClose?: () => void;
	onItemChange?: (currentItemSrc?: string) => void;
	onOpen?: () => void;
	/*
	*The number of items to display in the carousel at any given time
	*/
	rowWidth?: number;
}

const styles = {
	container: {
		
	} as React.CSSProperties,
};

export const Carousel = ({
	items,
	onClose = () => null,
	onItemChange = () => null,
	onOpen = () => null,
}: CarouselProps) => {
	//#region Init
	const { currentItemSrc } = useCarouselContext();
	//#endregion

	//#region Side Fx
	useEffect(() => {
		onItemChange && onItemChange(currentItemSrc);
	}, [currentItemSrc])
	//#endregion

	//#region JSX
	const renderItems = () =>{
		return items.map((item, index) => <CarouselItem key={index} {...item}/>);
	}

	return (
		<div style={styles.container}>
			{renderItems()}
		</div>
	)
	//#endregion
}

