import React, { useEffect, useRef } from 'react'
import { CLASSNAME_ROOT } from '../constants';
import { useCarouselContext } from '../context';
import { getGuid } from '../utils';
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItemProps, CarouselItem } from './CarouselItem';

export type CarouselSvgHrefs = {
	closeButton?: string;
	nextButton?: string;
	pauseButton?: string;
	playButton?: string;
	previousButton?: string;
	restartButton?: string;
	stopButton?: string;
}

type CarouselProps = {
	/*
	* if undefined, the default css version for each button will be used
	*/
	svgHrefs?: CarouselSvgHrefs;
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
	svgHrefs = {},
	items,
	onClose = () => null,
	onItemChange = () => null,
	onOpen = () => null,
}: CarouselProps) => {
	//#region Init
	const { currentItemSrc, currentSvgHrefs: svgHrefsRef } = useCarouselContext();
	const idRef = useRef<string>(getGuid());

	//#endregion

	//#region Functions/Handlers
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
		<CarouselInstanceProvider 
			id={idRef.current}
			svgHrefInstance={svgHrefs}>
			<div className={CLASSNAME_ROOT}>
				{renderItems()}
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

