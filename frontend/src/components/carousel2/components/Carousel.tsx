import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { CURRENT_ITEM_INDEX_INITIAL, CURRENT_PAGE_INITIAL, useCarouselContext } from '../context';
import { getClassname, getGuid, toggleFullScreenMode } from '../utils';
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItemProps, CarouselItem } from './CarouselItem';
import { CarouselOptions, CarouselSvgHrefs } from '../types';
import { CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SPACING_DEFAULT } from '../constants';
import { CarouselDots } from './CarouselDots';
import { CarouselArrowButton } from './CarouselArrowButton';

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
	const hasCalculatedItemSpacingRef = useRef(false);
	const [hasForcedRender, setHasForcedRender] = useState(false); //used to force layout calculation initially
	const [interItemSpacing, setInterItemSpacing] = useState(`${options?.thumbnail?.itemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}px`);
	const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_INITIAL);
	const isCurrentCarousel = currentCarouselId === idRef.current;
	//#endregion

	//#region Functions/Handlers
	const getInterItemSpacing = useCallback(() => {
		//if there is itemSpacing is defined, the dynamic behavior is disabled
		if (options?.thumbnail?.itemSpacing) return `${options?.thumbnail?.itemSpacing}px`;
		const containerWidth = carouselContainerRef.current?.getBoundingClientRect()?.width || 0;
		const itemSize = options?.thumbnail?.size || CAROUSEL_ITEM_SIZE_DEFAULT;
		const numberOfItemsThatCanFit = Math.floor(containerWidth / itemSize);
		const numberOfGaps = numberOfItemsThatCanFit - 1;
		const remainingSpace = containerWidth - (numberOfItemsThatCanFit * itemSize);
		const newInterItemSpacing = (remainingSpace / numberOfGaps);
		return `${newInterItemSpacing || CAROUSEL_ITEM_SPACING_DEFAULT}px`;
	}, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT]);
	//#endregion

	//#region Side Fx
	//have to reset hasCalculatedItemSpacingRef if the dependencies for the getInterItemSpacing callback change
	useEffect(() => {
		hasCalculatedItemSpacingRef.current = false;
	}, [options?.thumbnail, carouselContainerRef, CAROUSEL_ITEM_SPACING_DEFAULT, hasCalculatedItemSpacingRef])

	useEffect(() => {
		if (!isCurrentCarousel) return;
		onItemChange && onItemChange(!!currentItems?.[currentItemIndex] || false);
		toggleFullScreenMode(itemViewerRef.current, currentItemIndex);
	}, [currentItemIndex, currentItems, isCurrentCarousel, itemViewerRef])

	useEffect(() => {
		if (!isCurrentCarousel || currentItems?.length === items?.length || currentItemIndex === CURRENT_ITEM_INDEX_INITIAL) return;
		setCurrentItems(items);
	}, [isCurrentCarousel, currentCarouselId, currentItems, items, currentItemIndex, CURRENT_ITEM_INDEX_INITIAL])

	useEffect(() => {
		if (!hasForcedRender) return setHasForcedRender(true);
		else if (hasCalculatedItemSpacingRef.current) return;
		hasCalculatedItemSpacingRef.current = true;
		setInterItemSpacing(getInterItemSpacing());
	}, [hasForcedRender, setHasForcedRender, setInterItemSpacing, getInterItemSpacing, currentItems, hasCalculatedItemSpacingRef])
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
					<CarouselArrowButton direction={"left"} onClick={() => console.log('left clicked')} />
					<CarouselDots
						svgHrefs={svgHrefs}
						items={items || []}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
					<CarouselArrowButton direction={"right"} onClick={() => console.log('right clicked')} />
				</div>
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

