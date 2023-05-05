import { useRef } from 'react'
import { CarouselProvider } from '../context';
import { getClassname } from '../utils';
import { CarouselItemProps } from './CarouselItem';
import { CarouselOptions } from '../types';
import { CarouselContent } from './CarouselContent';
import { useBusinessLogic } from '../hooks/useBusinessLogic';

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
	const { stylingLogic } = useBusinessLogic({options});
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

