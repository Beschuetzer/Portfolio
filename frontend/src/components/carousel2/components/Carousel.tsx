import { useEffect, useRef } from 'react'
import { CURRENT_ITEM_INDEX_INITIAL, CarouselProvider, useCarouselContext } from '../context';
import { getClassname } from '../utils';
import { CarouselItemProps } from './CarouselItem';
import { CarouselOptions } from '../types';
import { CarouselContent } from './CarouselContent';
import { StylingLogic } from '../business-logic/StylingLogic';

export type CarouselProps = {
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
		items,
		options,
		onItemChange = () => null,  //todo: remove this from tests as not really necessary
	} = props;
	const carouselContainerRef = useRef<HTMLDivElement>();
	const stylingLogic = new StylingLogic({ options });
	//#endregion

	//#region JSX
	return (
		<CarouselProvider
			items={items}
			carouselContainerRef={carouselContainerRef as any}
			options={options || {}}
		>
			<div
				ref={carouselContainerRef as any}
				className={getClassname({ elementName: "" })}
				style={
					{
						...stylingLogic.carouselStyle,
						...stylingLogic.fontFamilyNavigationStyle,
					}
				}
			>
				<CarouselContent {...props} carouselContainerRef={carouselContainerRef} />
			</div>
		</CarouselProvider>
	)
	//#endregion
}

