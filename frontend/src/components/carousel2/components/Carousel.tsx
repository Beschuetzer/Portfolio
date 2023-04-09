import React, { CSSProperties, useEffect, useRef } from 'react'
import { CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../context';
import { getClassname, getGuid, toggleFullScreenMode } from '../utils';
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItemProps, CarouselItem } from './CarouselItem';
import { CarouselOptions, CarouselSvgHrefs } from '../types';

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
	const interItemSpacingStyle = options?.layout?.interItemSpacing ? {
		columnGap: `${options.layout.interItemSpacing}rem`,
	} as CSSProperties : {}
	const containerStyle = {
		...interItemSpacingStyle,
	}
	return (
		<CarouselInstanceProvider
			carouselContainerRef={carouselContainerRef as any}
			id={idRef.current}
			options={options}
			svgHrefInstance={svgHrefs}>
			<div ref={carouselContainerRef as any} className={getClassname({elementName: ""})} style={style}>
				<div style={containerStyle} className={getClassname({elementName: "container"})}>
					{
						items.map((item, index) => <CarouselItem key={index} index={index} {...item} />)
					}
				</div>
				<div className={getClassname({elementName: "navigation"})}>
					<h3>Add back arrow here</h3>
					<h3>Add dots here</h3>
					<h3>Add back arrow here</h3>
				</div>
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

