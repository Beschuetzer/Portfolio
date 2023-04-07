import React, { useEffect, useRef } from 'react'
import { CLASSNAME__ROOT } from '../constants';
import { CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../context';
import { getGuid, toggleFullScreenMode } from '../utils';
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItemProps, CarouselItem } from './CarouselItem';
import { CarouselOptions, CarouselSvgHrefs } from '../types';

type CarouselProps = {
	/*
	* if undefined, the default css version for each button will be used
	*/
	svgHrefs?: CarouselSvgHrefs;
	items: CarouselItemProps[];
	options?: CarouselOptions;
	onClose?: () => void;
	onItemChange?: (isViewerOpen?: boolean) => void;
	onOpen?: () => void;
	/*
	*The number of items to display in the carousel at any given time
	*/
	rowWidth?: number;
}

export const Carousel = ({
	svgHrefs = {},
	items,
	options,
	onClose = () => null,
	onItemChange = () => null,
	onOpen = () => null,
}: CarouselProps) => {
	//#region Init
	const { currentItemIndex, currentItems, setCurrentItems, currentCarouselId, itemViewerRef } = useCarouselContext();
	const idRef = useRef<string>(getGuid());

	//#endregion

	//#region Functions/Handlers
	//#endregion

	//#region Side Fx
	useEffect(() => {
		if (currentCarouselId !== idRef.current) return;
		onItemChange && onItemChange(!!currentItems?.[currentItemIndex] || false);
		toggleFullScreenMode(itemViewerRef.current, currentItemIndex);
	}, [currentItemIndex, currentItems])

	useEffect(() => {
		if (idRef.current !== currentCarouselId || currentItems?.length === items?.length || currentItemIndex === CURRENT_ITEM_INDEX_INITIAL) return;
		setCurrentItems(items);
	}, [currentCarouselId, currentCarouselId, currentItems, currentItemIndex])
	//#endregion

	//#region JSX
	const renderItems = () => {
		return items.map((item, index) => <CarouselItem key={index} index={index} {...item} />);
	}

	return (
		<CarouselInstanceProvider
			id={idRef.current}
			options={options}
			svgHrefInstance={svgHrefs}>
			<div className={CLASSNAME__ROOT}>
				{renderItems()}
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

