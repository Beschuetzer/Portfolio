import { RefObject, useEffect } from "react";
import { CONTAINS_CAROUSEL_CLASSNAME } from "../constants";
import { CarouselItemProps, getArrangedItems, getFirstItemAndParentCarousels, setCarouselGridMaxColumnWidth } from "./util";

const useInit = (
	leftArrowRef: any,
	rightArrowRef: any,
	arrowButtonRightClassname: string,
	arrowButtonLeftClassname: string,
	itemClassname: string,
	itemsRef: RefObject<NodeListOf<Element>>,
	items: CarouselItemProps[],
	shouldRearrange: boolean,
	numberOfItemsInCarouselWidthWise: number
) => {
	useEffect(() => {
		const {csharpParentCarousel, parentCarousel }= getFirstItemAndParentCarousels(items);

		if (parentCarousel) {
			const parentSection = parentCarousel.closest('section.csharp__section');
			parentSection?.classList.add(CONTAINS_CAROUSEL_CLASSNAME)
		}

		if (itemsRef && parentCarousel) {
			const items = parentCarousel.querySelectorAll(`.${itemClassname}`);
			const arrangedItems = getArrangedItems(items, shouldRearrange, numberOfItemsInCarouselWidthWise);
			(itemsRef as any).current = arrangedItems;
		}

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
		shouldRearrange,
		numberOfItemsInCarouselWidthWise,
	]);

	return null;
};

export default useInit;
