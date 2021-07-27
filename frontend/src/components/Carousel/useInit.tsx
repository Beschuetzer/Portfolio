import { RefObject, useEffect } from "react";
import { setCarouselGridMaxColumnWidth } from "./util";

const useInit = (
	leftArrowRef: any,
	rightArrowRef: any,
	arrowButtonRightClassname: string,
	arrowButtonLeftClassname: string,
	itemClassname: string,
	itemsRef: RefObject<NodeListOf<Element>>,
) => {
	useEffect(() => {
		if (leftArrowRef) (leftArrowRef as any).current = document.querySelectorAll(
			`.${arrowButtonLeftClassname}`,
		);
		if (rightArrowRef) (rightArrowRef as any).current = document.querySelectorAll(
			`.${arrowButtonRightClassname}`,
		);
		if (itemsRef) (itemsRef as any).current = document.querySelectorAll(`.${itemClassname}`);

		setCarouselGridMaxColumnWidth(itemsRef);
	}, [
		leftArrowRef,
		rightArrowRef,
		arrowButtonRightClassname,
		arrowButtonLeftClassname,
		itemClassname,
		itemsRef,
	]);

	return null;
};

export default useInit;
