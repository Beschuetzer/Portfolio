import { RefObject, useEffect } from "react";
import { CarouselItemProps, getFirstItemAndParentCarousels, setCarouselGridMaxColumnWidth } from "./util";

const useInit = (
	leftArrowRef: any,
	rightArrowRef: any,
	arrowButtonRightClassname: string,
	arrowButtonLeftClassname: string,
	itemClassname: string,
	itemsRef: RefObject<NodeListOf<Element>>,
	items: CarouselItemProps[],
) => {
	useEffect(() => {
		const {csharpParentCarousel, parentCarousel }= getFirstItemAndParentCarousels(items);

		if (itemsRef && parentCarousel) (itemsRef as any).current = parentCarousel.querySelectorAll(`.${itemClassname}`);

		if (leftArrowRef && csharpParentCarousel) (leftArrowRef as any).current = csharpParentCarousel.querySelector(
			`.${arrowButtonLeftClassname}`,
		);
		if (rightArrowRef && csharpParentCarousel) (rightArrowRef as any).current = csharpParentCarousel.querySelector(
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
