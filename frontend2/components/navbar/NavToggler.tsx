import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setHeaderHeightCSSPropertyValue } from "../../hooks/useSetHeaderCssStyle";
import { headerHeightSelector, isSiteNavMinimizedSelector, setIsSiteNavMinimized, viewPortWidthSelector } from "../../slices/generalSlice";
import { HEADER_TOGGLER_ACTIVE_CLASSNAME, HEADER_TOGGLER_CLASSNAME, HEADER_TOGGLER_CUSTOM_PROPERTY_NAME } from "../constants";

interface NavTogglerProps {}

export const NavToggler: React.FC<NavTogglerProps> = () => {
	const dispatch = useAppDispatch();
	const headerHeight = useAppSelector(headerHeightSelector);
	const viewPortWidth = useAppSelector(viewPortWidthSelector);
	const isSiteNavMinimized = useAppSelector(isSiteNavMinimizedSelector);

	//Adjusting NavToggler height to match header height as it changes on resizes
	useEffect(() => {
		const pixelToRemConversionToUse = 10;
		const headerHeightInRem = headerHeight / pixelToRemConversionToUse;
		const newWidth = `${
			headerHeightInRem}rem`;
		
		document.documentElement.style.setProperty(
			HEADER_TOGGLER_CUSTOM_PROPERTY_NAME,
			newWidth,
		);
	}, [headerHeight, viewPortWidth]);

	const handleOnClick = (e: MouseEvent) => {
		const toggler = e.currentTarget as HTMLElement;
		const togglerParent = toggler.parentNode as HTMLElement;

		togglerParent?.classList?.toggle(
			HEADER_TOGGLER_ACTIVE_CLASSNAME,
		);

		if (!togglerParent.classList.contains(HEADER_TOGGLER_ACTIVE_CLASSNAME)) setHeaderHeightCSSPropertyValue();
		else setHeaderHeightCSSPropertyValue(0);
		
		dispatch(setIsSiteNavMinimized(!isSiteNavMinimized));
	};

	return ReactDOM.createPortal(
		<svg
			onClick={(e: any) => handleOnClick(e)}
			className={`${HEADER_TOGGLER_CLASSNAME}__svg`}>
			<use xlinkHref="/sprite.svg#icon-angle-double-down"></use>
		</svg>,
		document.body.querySelector(`.${HEADER_TOGGLER_CLASSNAME}`)!,
	);
};