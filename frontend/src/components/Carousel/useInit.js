import { useEffect } from "react";

const useInit = (
	leftArrowRef,
	rightArrowRef,
	arrowButtonRightClassname,
	arrowButtonLeftClassname,
	itemClassname,
	itemsRef,
) => {
	useEffect(() => {
		leftArrowRef.current = document.querySelectorAll(
			`.${arrowButtonLeftClassname}`,
		);
		rightArrowRef.current = document.querySelectorAll(
			`.${arrowButtonRightClassname}`,
		);
		itemsRef.current = document.querySelectorAll(`.${itemClassname}`);
	}, [
		leftArrowRef,
		rightArrowRef,
		arrowButtonRightClassname,
		arrowButtonLeftClassname,
		itemClassname,
	]);

	return null;
};

export default useInit;
