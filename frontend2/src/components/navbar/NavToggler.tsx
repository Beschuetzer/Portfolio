import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { headerHeightSelector, isSiteNavMinimizedSelector, setIsSiteNavMinimized, viewPortWidthSelector } from "../../slices/generalSlice";
import {
	viewPortPixelToRem,
	headerTogglerWidth,
} from "../constants";
import { SITE_NAV_MINIMAL_CLASSNAME } from "./SiteNav/SiteNav";
import { HEADER_TOGGLER_ACTIVE_CLASSNAME, HEADER_TOGGLER_CLASSNAME, HEADER_TOGGLER_CSS_CLASSNAME } from "./SiteNav/utils";
import { setHeaderHeaderCSSPropertyValue as setHeaderHeightCSSPropertyValue } from "./utils";

interface NavTogglerProps {}

export const NavToggler: React.FC<NavTogglerProps> = () => {
	const dispatch = useAppDispatch();
	const headerHeight = useAppSelector(headerHeightSelector);
	const viewPortWidth = useAppSelector(viewPortWidthSelector);
	const isSiteNavMinimized = useAppSelector(isSiteNavMinimizedSelector);

	//Adjusting NavToggler height to match header height as it changes on resizes
	useEffect(() => {
		const getPixelToRemConversionToUse = () => {
			for (const [key, value] of Object.entries(viewPortPixelToRem)) {
				if (
					viewPortWidth >= viewPortPixelToRem[key].min &&
					viewPortWidth <= viewPortPixelToRem[key].max
				)
					return viewPortPixelToRem[key].pixelsToRem;
			}
			return viewPortPixelToRem.full.pixelsToRem;
		};

		const pixelToRemConversionToUse = getPixelToRemConversionToUse();
		const headerHeightInRem = headerHeight / pixelToRemConversionToUse;
		const newWidth = `${
			headerHeightInRem + parseFloat(headerTogglerWidth as any)
		}rem`;
		document.documentElement.style.setProperty(
			HEADER_TOGGLER_CSS_CLASSNAME,
			newWidth,
		);

		//prevents bug regarding toggler being closed when going above nav-switch breakpoint
		if (viewPortWidth >= viewPortPixelToRem?.navBreak.max) {
			const toggler = document.querySelector(`.header-toggler`) as HTMLElement;
			const siteNav = document.querySelector(`.site-nav`) as HTMLElement;
			toggler.classList.remove(HEADER_TOGGLER_ACTIVE_CLASSNAME);
			siteNav.classList.remove(SITE_NAV_MINIMAL_CLASSNAME);
		}

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