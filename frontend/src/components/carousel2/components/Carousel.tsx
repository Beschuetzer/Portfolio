import { useRef, useState } from 'react'
import { CarouselProvider } from '../context';
import { getClassname } from '../utils/utils';
import { CarouselItemProps } from './CarouselItem';
import { CarouselOptions, CarouselTitleOptions } from '../types';
import { CarouselContent } from './CarouselContent';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useOnResize } from '../hooks/useOnResize';
import { CarouselContainer } from './CarouselContainer';

export type CarouselProps = {
	items: CarouselItemProps[];
	options?: CarouselOptions;
	title?: CarouselTitleOptions;
}

export const Carousel = (props: CarouselProps) => {
	//#region Init
	const {
		items,
		options,
	} = props;
	const carouselContainerRef = useRef<HTMLDivElement>();
	const hiddenInputRef = useRef<HTMLInputElement>();
	const { stylingLogic } = useBusinessLogic({ options }); //need to pass in options here since it is outside of context
	const [, setShouldRerender] = useState(false);
	useOnResize(() => {
		setShouldRerender((current) => !current);
		document.body?.style?.removeProperty('cursor');
	});
	//#endregion

	//#region JSX
	return (
		<CarouselProvider
			items={items}
			carouselContainerRef={carouselContainerRef as any}
			hiddenInputRef={hiddenInputRef as any}
			options={options || {}}
		>
			<input ref={hiddenInputRef as any} style={stylingLogic.carouselHiddenInputStyle} />
			<CarouselContainer container={options?.container}>
				<div
					ref={carouselContainerRef as any}
					className={getClassname({ elementName: "" })}
					style={
						{
							...stylingLogic.carouselStyle,
						}
					}
				>
					<CarouselContent {...props} carouselContainerRef={carouselContainerRef as any} />
				</div>
			</CarouselContainer>
		</CarouselProvider>
	)
	//#endregion
}

