import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../context';
import { convertRemToPixels, getClassname, getGuid, toggleFullScreenMode } from '../utils';
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItemProps, CarouselItem } from './CarouselItem';
import { CarouselOptions, CarouselSvgHrefs } from '../types';
import { CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SPACING_DEFAULT } from '../constants';

type CarouselProps = {
	style?: CSSProperties;
	/*
	* if undefined, the default css version for each button will be used
	*/
	svgHrefs?: CarouselSvgHrefs;
	items: CarouselItemProps[];
	options?: CarouselOptions;
	onItemChange?: (isViewerOpen?: boolean) => void;
}

export const Carousel = ({
	style = {},
	svgHrefs = {},
	items,
	options,
	onItemChange = () => null,
}: CarouselProps) => {
	//#region Init
	const { currentItemIndex, currentItems, setCurrentItems, currentCarouselId, itemViewerRef } = useCarouselContext();
	const idRef = useRef<string>(getGuid());
	const carouselContainerRef = useRef<HTMLDivElement>();
	const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
	const [interItemSpacing, setInterItemSpacing] = useState(`${options?.thumbnail?.itemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}rem`);
	const isCurrentCarousel = currentCarouselId === idRef.current;
	//#endregion

	//#region Functions/Handlers
	const getInterItemSpacing = useCallback(() => {
		//if there is itemSpacing is defined, the dynamic behavior is disabled
		if (options?.thumbnail?.itemSpacing) return `${options?.thumbnail?.itemSpacing}rem`;
		//todo: figure out what the interitem spacing should be and set it here
		const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
		const itemSize = options?.thumbnail?.size || CAROUSEL_ITEM_SIZE_DEFAULT;
		const numberOfItemsThatCanFit = Math.floor(containerWidth / itemSize);
		const newInterItemSpacing = (containerWidth - (numberOfItemsThatCanFit * itemSize) / (currentItems?.length - 1));
		
		console.log({ containerWidth, itemSize, numberOfItemsThatCanFit, newInterItemSpacing, test: convertRemToPixels(10) });
		return `${newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}rem`;
	}, [options?.thumbnail?.itemSpacing, carouselContainerRef]);
	//#endregion

	//#region Side Fx
	useEffect(() => {
		if (!isCurrentCarousel) return;
		onItemChange && onItemChange(!!currentItems?.[currentItemIndex] || false);
		toggleFullScreenMode(itemViewerRef.current, currentItemIndex);
	}, [currentItemIndex, currentItems])

	useEffect(() => {
		if (!isCurrentCarousel || currentItems?.length === items?.length || currentItemIndex === CURRENT_ITEM_INDEX_INITIAL) return;
		setCurrentItems(items);
	}, [currentCarouselId, currentItems, currentItemIndex])

	useEffect(() => {
		if (!hasForcedRender) setHasForcedRender(true);
		setInterItemSpacing(getInterItemSpacing());
	}, [hasForcedRender])
	//#endregion

	//#region JSX
	const interItemSpacingStyle = {
		columnGap: interItemSpacing,
	} as CSSProperties
	const containerStyle = {
		...interItemSpacingStyle,
	}
	return (
		<CarouselInstanceProvider
			carouselContainerRef={carouselContainerRef as any}
			id={idRef.current}
			options={options}
			svgHrefInstance={svgHrefs}>
			<div ref={carouselContainerRef as any} className={getClassname({ elementName: "" })} style={style}>
				<div style={containerStyle} className={getClassname({ elementName: "container" })}>
					{
						items.map((item, index) => <CarouselItem key={index} index={index} {...item} />)
					}
				</div>
				<div className={getClassname({ elementName: "navigation" })}>
					<h3>Add back arrow here</h3>
					<h3>Add dots here</h3>
					<h3>Add back arrow here</h3>
				</div>
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

