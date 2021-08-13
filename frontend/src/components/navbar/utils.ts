import { HEADER_HEIGHT_CSS_PROPERTY_NAME } from "../constants";
import { HEADER_ID, HEADER_TOGGLER_CLASSNAME } from "./SiteNav/utils";

export const NAVBAR_Z_INDEX_CLASSNAME = "z-index-navbar";
export const NAVBAR_CLASSNAME = "navbar";
export const NAVBAR_ACTIVE_CLASSNAME = `${NAVBAR_CLASSNAME}--active`;
export const NAVBAR_DONE_CLASSNAME = `${NAVBAR_CLASSNAME}--done`;
export const NAVBAR_IS_ANIMATING_CLASSNAME = `${NAVBAR_CLASSNAME}--isAnimating`;
export const NAVBAR_CONTENT_CLASSNAME = `${NAVBAR_CLASSNAME}__content`;

export function setHeaderHeaderCSSPropertyValue(valueToUse = -1) {
	let newHeaderHeight = valueToUse;
	if (newHeaderHeight === -1) {
		const header = document.querySelector(`${HEADER_ID}`) as HTMLElement;
		newHeaderHeight = header.getBoundingClientRect().height;
		console.log('newHeaderHeight =', newHeaderHeight);
	}
	document.documentElement.style.setProperty(
		HEADER_HEIGHT_CSS_PROPERTY_NAME,
		`${newHeaderHeight}px`,
	);
}
