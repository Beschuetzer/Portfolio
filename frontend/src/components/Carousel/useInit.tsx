import { RefObject, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import { CarouselItemProps, CAROUSEL_CLASSNAME, setCarouselGridMaxColumnWidth } from "./util";

const useInit = (
	leftArrowRef: any,
	rightArrowRef: any,
	arrowButtonRightClassname: string,
	arrowButtonLeftClassname: string,
	itemClassname: string,
	itemsRef: RefObject<NodeListOf<Element>>,
	items: any[],
) => {
	useEffect(() => {
		let firstItem = document.querySelector(`[src="${(items[0] as CarouselItemProps).itemThumbnailSrc}"]`) as HTMLElement;

		if (!firstItem) firstItem = document.querySelector(`[src="${(items[0] as CarouselItemProps).itemSrc}"]`) as HTMLElement;

		const parentCarousel = firstItem?.closest(`.${CAROUSEL_CLASSNAME}`);
		const csharpCarouselContainer = firstItem?.closest(`.csharp__${CAROUSEL_CLASSNAME}`);

		if (itemsRef && parentCarousel) (itemsRef as any).current = parentCarousel.querySelectorAll(`.${itemClassname}`);

		if (leftArrowRef && csharpCarouselContainer) (leftArrowRef as any).current = csharpCarouselContainer.querySelector(
			`.${arrowButtonLeftClassname}`,
		);
		if (rightArrowRef && csharpCarouselContainer) (rightArrowRef as any).current = csharpCarouselContainer.querySelector(
			`.${arrowButtonRightClassname}`,
		);

		setCarouselGridMaxColumnWidth(itemsRef);
	}, [
		leftArrowRef,
		rightArrowRef,
		arrowButtonRightClassname,
		arrowButtonLeftClassname,
		itemClassname,
		itemsRef,
		items,
	]);

	return null;
};

export default useInit;
