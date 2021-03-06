import { ANIMATION_DURATION, HEADER_HEIGHT_CSS_PROPERTY_NAME } from "../constants";
import { SITE_NAV_CLASSNAME, SITE_NAV_MINIMAL_CLASSNAME } from "./SiteNav/SiteNav";
import { HEADER_ID, HEADER_TOGGLER_ACTIVE_CLASSNAME, HEADER_TOGGLER_CLASSNAME } from "./SiteNav/utils";

export const NAVBAR_Z_INDEX_CLASSNAME = "z-index-navbar";
export const NAVBAR_CLASSNAME = "navbar";
export const NAVBAR_ACTIVE_CLASSNAME = `${NAVBAR_CLASSNAME}--active`;
export const NAVBAR_DONE_CLASSNAME = `${NAVBAR_CLASSNAME}--done`;
export const NAVBAR_IS_ANIMATING_CLASSNAME = `${NAVBAR_CLASSNAME}--isAnimating`;
export const NAVBAR_CONTENT_CLASSNAME = `${NAVBAR_CLASSNAME}__content`;

export function setHeaderHeaderCSSPropertyValue(valueToUse = -1) {
	let newHeaderHeight = valueToUse;

	const headerTogglerActive = document.querySelector(`.${HEADER_TOGGLER_ACTIVE_CLASSNAME}`);
	if (headerTogglerActive) newHeaderHeight = 0;
	else if (newHeaderHeight === -1) {
		const header = document.querySelector(`${HEADER_ID}`) as HTMLElement;
		newHeaderHeight = header.getBoundingClientRect().height;
	}

	document.documentElement.style.setProperty(
		HEADER_HEIGHT_CSS_PROPERTY_NAME,
		`${newHeaderHeight}px`,
	);
}

export function toggleSiteNavMinimal() {
	const siteNav = document.querySelector(`.${SITE_NAV_CLASSNAME}`) as HTMLElement;
	 if (!siteNav) return;

	let waitDurationToUse = ANIMATION_DURATION;
	if (siteNav.classList.contains(SITE_NAV_MINIMAL_CLASSNAME)) waitDurationToUse = 0;

	setTimeout(() => {
		siteNav.classList.toggle(SITE_NAV_MINIMAL_CLASSNAME);
	}, waitDurationToUse);
}
