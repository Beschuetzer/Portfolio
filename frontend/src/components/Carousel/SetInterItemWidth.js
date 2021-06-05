import { useEffect } from "react";
import { connect } from "react-redux";

const SetInterItemWidth = ({
	leftArrowRef,
	rightArrowRef,
	itemsRef,
	itemsWidthRef,
	arrowButtonRightClassname,
	arrowButtonLeftClassname,
	itemClassname,
	viewPortWidth,
}) => {
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

const mapStateToProps = (state, ownProps) => {
	return {
		viewPortWidth: state.general.viewPortWidth,
	};
};

export default connect(mapStateToProps, {})(SetInterItemWidth);
