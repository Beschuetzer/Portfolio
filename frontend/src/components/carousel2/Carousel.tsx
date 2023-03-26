import React from 'react'
import { CarouselItem, CarouselItemProps } from './CarouselItem';


type CarouselProps = {
    items: CarouselItemProps[];
	onClose?: () => void;
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
	onOpen = () => null,
}: CarouselProps) => {
	//#region Init

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

