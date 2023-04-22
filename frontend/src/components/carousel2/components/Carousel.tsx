import { CSSProperties, useEffect, useRef } from 'react'
import { CURRENT_ITEM_INDEX_INITIAL, useCarouselContext } from '../context';
import { getClassname, getGuid } from '../utils';
import { CarouselInstanceProvider } from './CarouselInstanceProvider';
import { CarouselItemProps } from './CarouselItem';
import { CarouselOptions } from '../types';
import { CarouselContent } from './CarouselContent';
import { StylingLogic } from '../business-logic/StylingLogic';

export type CarouselProps = {
	style?: CSSProperties;
	/*
	* if undefined, the default css version for each button will be used
	*/
	items: CarouselItemProps[];
	options?: CarouselOptions;
	onItemChange?: (isViewerOpen?: boolean) => void;
}

export const Carousel = (props: CarouselProps) => {
	//#region Init
	const {
		style = {},
		items,
		options,
		onItemChange = () => null,
	} = props;
	const { currentItemIndex, currentItems, setCurrentItems, currentCarouselId } = useCarouselContext();
	const idRef = useRef<string>(getGuid());
	const carouselContainerRef = useRef<HTMLDivElement>();
	const isCurrentCarousel = currentCarouselId === idRef.current;
	const stylingLogic = new StylingLogic({options: options || {}});
	//#endregion

	//#region Side Fx
	useEffect(() => {
		if (!isCurrentCarousel) return;
		onItemChange && onItemChange(!!currentItems?.[currentItemIndex] || false);
	}, [currentItemIndex, currentItems, isCurrentCarousel])

	useEffect(() => {
		if (!isCurrentCarousel || currentItems?.length === items?.length || currentItemIndex === CURRENT_ITEM_INDEX_INITIAL) return;
		setCurrentItems(items);
	}, [isCurrentCarousel, currentCarouselId, currentItems, items, currentItemIndex, CURRENT_ITEM_INDEX_INITIAL])
	//#endregion

	//#region JSX
	return (
		<CarouselInstanceProvider
			itemsInInstance={items}
			carouselContainerRef={carouselContainerRef as any}
			id={idRef.current}
			options={options}>
			<div
				ref={carouselContainerRef as any}
				className={getClassname({ elementName: "" })}
				style={
					{
						...stylingLogic.carouselStyle,
						...style,
						...stylingLogic.fontFamilyNavigationStyle,
					}
				}
			>
				<CarouselContent {...props} carouselContainerRef={carouselContainerRef} />
			</div>
		</CarouselInstanceProvider>
	)
	//#endregion
}

