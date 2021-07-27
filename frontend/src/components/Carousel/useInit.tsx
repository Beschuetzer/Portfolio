import { RefObject, useEffect } from "react";

const useInit = (
	leftArrowRef: any,
	rightArrowRef: any,
	arrowButtonRightClassname: string,
	arrowButtonLeftClassname: string,
	itemClassname: string,
	itemsRef: any,
) => {
	useEffect(() => {
		if (leftArrowRef) (leftArrowRef as any).current = document.querySelectorAll(
			`.${arrowButtonLeftClassname}`,
		);
		if (rightArrowRef) (rightArrowRef as any).current = document.querySelectorAll(
			`.${arrowButtonRightClassname}`,
		);
		if (itemsRef) (itemsRef as any).current = document.querySelectorAll(`.${itemClassname}`);

		
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
