import { useRef, useState } from 'react'
import { CarouselProvider } from '../context';
import { getClassname } from '../utils';
import { CarouselItemProps } from './CarouselItem';
import { CarouselOptions } from '../types';
import { CarouselContent } from './CarouselContent';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useOnResize } from '../hooks/useOnResize';

export type CarouselProps = {
	items: CarouselItemProps[];
	options?: CarouselOptions;
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
	useOnResize(() => setShouldRerender((current) => !current));
	//#endregion

	//#region JSX
	return (
		<CarouselProvider
			items={items}
			carouselContainerRef={carouselContainerRef as any}
			hiddenInputRef={hiddenInputRef as any}
			options={options || {}}
		>
			<input ref={hiddenInputRef as any} style={stylingLogic.carouselHiddenInputStyle}/>
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
		</CarouselProvider>
	)
	//#endregion
}

