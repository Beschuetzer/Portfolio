import { HEADER_HEIGHT_CSS_PROPERTY_NAME } from "../constants";
import { HEADER_ID } from "./SiteNav/utils";

export const NAVBAR_Z_INDEX_CLASSNAME = "z-index-navbar";
export const NAVBAR_CLASSNAME = "navbar";
export const NAVBAR_ACTIVE_CLASSNAME = `${NAVBAR_CLASSNAME}--active`;
export const NAVBAR_DONE_CLASSNAME = `${NAVBAR_CLASSNAME}--done`;
export const NAVBAR_IS_ANIMATING_CLASSNAME = `${NAVBAR_CLASSNAME}--isAnimating`;
export const NAVBAR_CONTENT_CLASSNAME = `${NAVBAR_CLASSNAME}__content`;

export function setHeaderHeaderCSSPropertyValue() {
	const header = document.querySelector(`${HEADER_ID}`) as HTMLElement;
	const newHeaderHeight = header.getBoundingClientRect().height;
	document.documentElement.style.setProperty(
		HEADER_HEIGHT_CSS_PROPERTY_NAME,
		`${newHeaderHeight}px`,
	);
}
