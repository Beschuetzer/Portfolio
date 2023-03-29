import React, { useEffect, useRef } from 'react'
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItem, CarouselItemProps } from './CarouselItem';
import { CLASSNAME_ROOT } from './constants';
import { useCarouselContext } from './context';
import { getGuid } from './utils';

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
	const { currentItemSrc, svgHrefsRef } = useCarouselContext();
	const idRef = useRef<string>(getGuid());

	//#endregion

	//#region Functions/Handlers
	function setHrefs() {
	console.log({id: idRef.current});

		if (svgHrefsRef?.current?.[idRef.current] && svgHrefs) {
			svgHrefsRef.current[idRef.current] = svgHrefs;
		}
	}
	//#endregion

	//#region Side Fx
	useEffect(() => {
		onItemChange && onItemChange(currentItemSrc);
	}, [currentItemSrc])

	useEffect(() => {
		if (svgHrefsRef?.current) {
			setHrefs();
		} else {
			setTimeout(() => setHrefs(), 1000);
		}
	}, [])
	//#endregion

	//#region JSX
	const renderItems = () =>{
		return items.map((item, index) => <CarouselItem key={index} {...item}/>);
	}

	return (
		<CarouselInstanceProvider id={idRef.current}>
			<div className={CLASSNAME_ROOT}>
				{renderItems()}
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

