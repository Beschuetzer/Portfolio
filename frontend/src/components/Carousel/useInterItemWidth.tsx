import { useEffect } from "react";

const useInterItemWidth = (
	viewPortWidth: number,
	itemsRef: any,
	itemsWidthRef: any,
) => {
	useEffect(() => {
		const image1Left = itemsRef.current[0]?.children[0]?.getBoundingClientRect().left;
		const image2Left = itemsRef.current[1]?.children[0]?.getBoundingClientRect().left;
		itemsWidthRef.current = Math.abs(image1Left - image2Left);
	}, [
		viewPortWidth,
		itemsRef,
		itemsWidthRef,
	]);

};

export default useInterItemWidth;
