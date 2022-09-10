import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { connect, RootStateOrAny } from "react-redux";

import {
	viewPortPixelToRem,
	headerTogglerWidth,
} from "../constants";
import { HEADER_TOGGLER_ACTIVE_CLASSNAME, HEADER_TOGGLER_CLASSNAME, HEADER_TOGGLER_CSS_CLASSNAME } from "./SiteNav/utils";
import { setHeaderHeaderCSSPropertyValue as setHeaderHeightCSSPropertyValue, toggleSiteNavMinimal } from "./utils";

interface NavTogglerProps {
	headerHeight: number;
	viewPortWidth: number;
}

const NavToggler: React.FC<NavTogglerProps> = ({
	headerHeight,
	viewPortWidth,
}) => {
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
	}, [headerHeight, viewPortWidth]);

	const handleOnClick = (e: MouseEvent) => {
		const toggler = e.currentTarget as HTMLElement;
		const togglerParent = toggler.parentNode as HTMLElement;

		togglerParent?.classList?.toggle(
			HEADER_TOGGLER_ACTIVE_CLASSNAME,
		);

		if (!togglerParent.classList.contains(HEADER_TOGGLER_ACTIVE_CLASSNAME)) setHeaderHeightCSSPropertyValue();
		else setHeaderHeightCSSPropertyValue(0);

		toggleSiteNavMinimal();
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

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		headerHeight: state.general.headerHeight,
		viewPortWidth: state.general.viewPortWidth,
	};
};

export default connect(mapStateToProps, {})(NavToggler);
