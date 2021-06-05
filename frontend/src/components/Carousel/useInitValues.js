import { useEffect } from "react";

const useInitValues = (
	viewPortWidth,
	leftArrowRef,
	rightArrowRef,
	itemsRef,
	itemsWidthRef,
	arrowButtonRightClassname,
	arrowButtonLeftClassname,
	itemClassname,
) => {
	useEffect(() => {
		leftArrowRef.current = document.querySelectorAll(
			`.${arrowButtonLeftClassname}`,
		);
		rightArrowRef.current = document.querySelectorAll(
			`.${arrowButtonRightClassname}`,
		);
		itemsRef.current = document.querySelectorAll(`.${itemClassname}`);
		const image1Left =
			itemsRef.current[0]?.children[0]?.getBoundingClientRect().left;
		const image2Left =
			itemsRef.current[1]?.children[0]?.getBoundingClientRect().left;
		itemsWidthRef.current = Math.abs(image1Left - image2Left);
	}, [
		viewPortWidth,
		leftArrowRef,
		rightArrowRef,
		itemsRef,
		itemsWidthRef,
		arrowButtonRightClassname,
		arrowButtonLeftClassname,
		itemClassname,
	]);

	return null;
};

export default useInitValues;
