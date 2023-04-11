import { CSSProperties, useEffect, useRef } from 'react'
import { CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../context';
import { getClassname, getGuid, toggleFullScreenMode } from '../utils';
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItemProps } from './CarouselItem';
import { CarouselOptions, CarouselSvgHrefs } from '../types';
import { CarouselContent } from './CarouselContent';

export type CarouselProps = {
	style?: CSSProperties;
	/*
	* if undefined, the default css version for each button will be used
	*/
	svgHrefs?: CarouselSvgHrefs;
	items: CarouselItemProps[];
	options?: CarouselOptions;
	onItemChange?: (isViewerOpen?: boolean) => void;
}

export const Carousel = (props: CarouselProps) => {
	//#region Init
	const {
		style = {},
		svgHrefs = {},
		items,
		options,
		onItemChange = () => null,
	} = props;
	const { currentItemIndex, currentItems, setCurrentItems, currentCarouselId, itemViewerRef } = useCarouselContext();
	const idRef = useRef<string>(getGuid());
	const carouselContainerRef = useRef<HTMLDivElement>();
	const isCurrentCarousel = currentCarouselId === idRef.current;
	//#endregion

	//#region Side Fx
	useEffect(() => {
		if (!isCurrentCarousel) return;
		onItemChange && onItemChange(!!currentItems?.[currentItemIndex] || false);
		toggleFullScreenMode(itemViewerRef.current, currentItemIndex);
	}, [currentItemIndex, currentItems, isCurrentCarousel, itemViewerRef])

	useEffect(() => {
		if (!isCurrentCarousel || currentItems?.length === items?.length || currentItemIndex === CURRENT_ITEM_INDEX_INITIAL) return;
		setCurrentItems(items);
	}, [isCurrentCarousel, currentCarouselId, currentItems, items, currentItemIndex, CURRENT_ITEM_INDEX_INITIAL])
	//#endregion

	//#region JSX
	return (
		<CarouselInstanceProvider
			carouselContainerRef={carouselContainerRef as any}
			id={idRef.current}
			options={options}
			svgHrefInstance={svgHrefs}>
			<div ref={carouselContainerRef as any} className={getClassname({ elementName: "" })} style={style}>
				<CarouselContent {...props} carouselContainerRef={carouselContainerRef} />
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

