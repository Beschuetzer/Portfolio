import { RefObject } from "react";
import { checkForParentOfType } from "../../../helpers";
import { LoadedSounds } from "../../../reducers/soundsReducer";
import {
	ANIMATION_DURATION,
	MOBILE_BREAK_POINT_WIDTH,
	OVERFLOW_HIDDEN_CLASSNAME,
	TRANSPARENT_CLASSNAME,
	DISPLAY_NONE_CLASSNAME,
	Z_INDEX_HIGHEST_CLASSNAME,
	PAGE_NAMES,
	DEFAULT_PAGE_NAME_INDEX,
	PAGE_NAV_CLASSNAME,
	PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME,
	UNCLICKABLE_CLASSNAME,
	ANIMATION_DURATION_WAIT_FACTOR,
} from "../../constants";
import { toggleScrollability } from "../../utils";
import {
	PAGE_NAV_MIN_WIDTH_DEFAULT,
	PAGE_NAV_MIN_WIDTH_THRESHOLD,
	setPageNavMinWidth,
} from "../PageNav/utils";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_IS_ANIMATING_CLASSNAME,
	NAVBAR_CONTENT_CLASSNAME,
	NAVBAR_CLASSNAME,
	NAVBAR_DEFAULT_CLASSNAME,
} from "../utils";

export const HEADER_ID = "#header";
export const HEADER_TOGGLER_CLASSNAME = "header-toggler";
export const HEADER_TOGGLER_ACTIVE_CLASSNAME = `${HEADER_TOGGLER_CLASSNAME}--active`;
export const HEADER_TOGGLER_CSS_CLASSNAME = "--header-toggler-height";

const BODY_BACKGROUND_CLASSNAME = "body-background";
const SET_INITIAL_HEADER_HEIGHT_DELAY = 100;
const CHECK_SHOULD_RESET_OVERFLOW_HIDDEN_FREQUENCY = 3; //used as quotient of ANIMATION_DURATION so 2 means it checks every 1/2 or half of ANIMATION_DURATION
let resetAnimatingId: any;
let zIndexHighestTimeoutId: any;
let resetUnclickableTimeoutId: any;
let checkShouldOpenNavBarIntervalId: any;
let checkShouldResetOverflowHiddenIntervalId: any;
let removerOverFlowHiddenTimeoutId: any;
let removeOverFlowHiddenAfterOpeningTimeoutId: any;
let numberOfOverflowHiddenChecksMade = 0;

export type NavRef = RefObject<HTMLElement>;

const onBodyClick = (navRef: NavRef, e: Event) => {
	const isNavClick = (e.target as any)?.classList?.contains(
		NAVBAR_ACTIVE_CLASSNAME,
	)
		? true
		: false;
	if (!isNavClick) {
		navRef?.current?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
	}
};

export const init = (
	navRef: NavRef,
	setHeaderHeight: (value: number) => void,
) => {
	document.body.addEventListener("click", onBodyClick.bind(null, navRef));

	setTimeout(() => {
		const headerHeight = (
			document.querySelector(HEADER_ID) as HTMLElement
		).getBoundingClientRect().height;
		setHeaderHeight(headerHeight);
	}, SET_INITIAL_HEADER_HEIGHT_DELAY);
};

export const destroy = (navRef: NavRef) => {
	document.body.removeEventListener("click", onBodyClick.bind(null, navRef));
};

export const startAnimating = (
	navRef: NavRef,
	isAnimating: boolean,
	waitDurationFactor: number,
) => {
	const navBar = navRef.current as any;
	navBar?.classList?.add(NAVBAR_IS_ANIMATING_CLASSNAME);

	resetAnimatingId = setTimeout(() => {
		navBar?.classList?.remove(NAVBAR_IS_ANIMATING_CLASSNAME);
		if (isAnimating && navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME)) {
			navBar.classList?.add(NAVBAR_DONE_CLASSNAME);
		} else {
			navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
		}
	}, ANIMATION_DURATION * waitDurationFactor);
};

export const getResetAnimatingId = () => {
	return resetAnimatingId;
};

export const changePage = (newUrl: string) => {
	const headerElement = document.querySelector(HEADER_ID);
	const headerTogglerElement = document.querySelector(
		`.${HEADER_TOGGLER_CLASSNAME}`,
	);
	if (!headerElement || !headerTogglerElement) return;
	if (newUrl === "/") {
		headerElement.classList.add(TRANSPARENT_CLASSNAME);
		headerTogglerElement.classList.add(DISPLAY_NONE_CLASSNAME);
	} else {
		headerElement.classList.remove(TRANSPARENT_CLASSNAME);
		headerTogglerElement.classList.remove(DISPLAY_NONE_CLASSNAME);
	}
};

export const setBodyStyle = (currentUrl: string) => {
	const setBodyStyle = (page: string) => {
		document.body.className = `${BODY_BACKGROUND_CLASSNAME} ${page.slice(
			1,
		)}-page`;
	};

	if (!currentUrl)
		return (document.body.className = `${BODY_BACKGROUND_CLASSNAME} home-page`);

	let docStyle = getComputedStyle(document.documentElement);
	const colorVarRoot = "--color-primary";
	const colorSuffixes = ["-1", "-2", "-3", "-4", "-red"];
	const lastIndexOfSlash = (currentUrl as any).lastIndexOf("/");
	const pageName = (currentUrl as any).slice(lastIndexOfSlash);
	const temp = PAGE_NAMES.indexOf(pageName);

	if (temp === -1) return;
	let index = temp !== -1 ? temp : DEFAULT_PAGE_NAME_INDEX;
	if (currentUrl === "/") index = 0;
	setBodyStyle(PAGE_NAMES[index]);
	const colorVarSuffix = PAGE_NAMES[index].slice(1);

	for (let i = 0; i < colorSuffixes.length; i++) {
		const colorVarNumber = colorSuffixes[i];
		let colorVarToChange = `${colorVarRoot}${colorVarNumber}`;
		const colorVarTarget = `${colorVarRoot}${
			colorVarSuffix !== "" ? `-${colorVarSuffix}` : ""
		}${colorVarNumber}`;
		const targetValue = docStyle.getPropertyValue(colorVarTarget);
		document.documentElement.style.setProperty(colorVarToChange, targetValue);

		const colorRGBTarget = colorVarTarget + "-rgb";
		if (colorVarToChange) colorVarToChange += "-rgb";
		const targetValueRGB = docStyle.getPropertyValue(colorRGBTarget);
		document.documentElement.style.setProperty(
			colorVarToChange,
			targetValueRGB,
		);
	}
};

export const setHeaderHeightOnViewPortChange = (
	viewPortWidth: number,
	setHeaderHeight: (value: number) => void,
) => {
	const navbarContent = document.querySelector(
		`.${NAVBAR_CONTENT_CLASSNAME}`,
	) as HTMLElement;
	const header = document.querySelector(HEADER_ID) as HTMLElement;
	const headerBoundingRect = header.getBoundingClientRect();

	let newTop = `calc(${headerBoundingRect.height}px)`;
	if (viewPortWidth > MOBILE_BREAK_POINT_WIDTH) {
		newTop = "auto";
	}
	navbarContent.style.top = newTop;

	const headerHeight = header.getBoundingClientRect().height;
	setHeaderHeight(headerHeight);
};

export const hide = (navRef: NavRef) => {
	navRef.current?.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
};

const handleSound = (sounds: LoadedSounds, e: MouseEvent) => {
	const isActive = (e.currentTarget as HTMLElement).className.match(
		/--active/i,
	) as RegExpMatchArray;
	const isMenu = (e.target as HTMLElement)?.className?.match(
		/navbar__menu/i,
	) as RegExpMatchArray;
	const isNavbar = (e.target as HTMLElement).classList.contains(
		NAVBAR_CLASSNAME,
	);

	if (!isActive && isMenu)
		if (sounds?.loaded?.play) sounds.loaded.play("siteNavOpen");
		else if ((!isActive && !isNavbar) || (isActive && isMenu))
	if (sounds?.loaded?.play) sounds.loaded.play("siteNavClose");
};

export const handleMouseEnter = (navRef: NavRef) => {
	if (
		!navRef.current ||
		!navRef.current?.classList.contains(NAVBAR_ACTIVE_CLASSNAME) ||
		navRef.current.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME)
	) {
		navRef.current?.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
		return;
	} else if (navRef.current.classList.contains(NAVBAR_DONE_CLASSNAME)) {
		navRef.current?.classList.remove(OVERFLOW_HIDDEN_CLASSNAME);
	}
};

export const handleNavClick = (
	navRef: NavRef,
	sounds: LoadedSounds,
	setIsAnimating: (value: boolean) => void,
	e: MouseEvent,
) => {
	const navBar = navRef.current;
	const isOpening =
		navBar?.classList.contains(UNCLICKABLE_CLASSNAME) &&
		!navBar?.classList.contains(NAVBAR_DONE_CLASSNAME);

	if (!navBar || isOpening) {
		clearInterval(checkShouldOpenNavBarIntervalId);
		navBar?.classList.remove(UNCLICKABLE_CLASSNAME);
		return;
	}

	clearIntervalsAndTimeouts();
	startIntervalsAndTimeouts(navBar);
	// handleSound(sounds, e);

	navBar.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
	navBar.classList.add(UNCLICKABLE_CLASSNAME);

	const IS_CHILD_OF_NAVBAR = getIsChildOfNavBar(e);
	const IS_NAV_ITEM_CLICK = (e.target as HTMLElement)?.localName === "a";

	if (
		!navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME) &&
		IS_CHILD_OF_NAVBAR
	) {
		// toggleScrollability(false);
		if (navBar.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME)) {
			checkShouldOpenNavBarIntervalId = setInterval(() => {
				if (!navBar.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME)) {
					openNavBar(navBar, setIsAnimating);
				}
			}, 100);
		} else {
			openNavBar(navBar, setIsAnimating);
		}
	} else {
		// toggleScrollability(true);
		if (IS_NAV_ITEM_CLICK) {
			setTimeout(() => {
				closeNavBar(navBar, setIsAnimating);
			}, 1);
		} else {
			closeNavBar(navBar, setIsAnimating);
		}
	}
};

function startIntervalsAndTimeouts(navBar: HTMLElement) {
	resetUnclickableTimeoutId = setTimeout(() => {
		navBar.classList.remove(UNCLICKABLE_CLASSNAME);
	}, ANIMATION_DURATION * ANIMATION_DURATION_WAIT_FACTOR);

	checkShouldResetOverflowHiddenIntervalId = setInterval(() => {
		let shouldClearInterval = false;
		if (
			navBar.classList.contains(OVERFLOW_HIDDEN_CLASSNAME) &&
			!navBar.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME) &&
			!navBar.classList.contains(UNCLICKABLE_CLASSNAME) &&
			!navBar.classList.contains(NAVBAR_DONE_CLASSNAME) &&
			!navBar.classList.contains(NAVBAR_ACTIVE_CLASSNAME)
		) {
			removerOverFlowHiddenTimeoutId = setTimeout(() => {
				navBar.classList.remove(OVERFLOW_HIDDEN_CLASSNAME);
			}, 1);
			shouldClearInterval = true;
		}

		if (
			numberOfOverflowHiddenChecksMade >
			CHECK_SHOULD_RESET_OVERFLOW_HIDDEN_FREQUENCY * 10
		)
			shouldClearInterval = true;

		if (shouldClearInterval) {
			clearInterval(checkShouldResetOverflowHiddenIntervalId);
			// clearTimeout(removerOverFlowHiddenTimeoutId);
			// navBar.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
		}
		numberOfOverflowHiddenChecksMade++;
	}, ANIMATION_DURATION / CHECK_SHOULD_RESET_OVERFLOW_HIDDEN_FREQUENCY);
}

function clearIntervalsAndTimeouts() {
	clearInterval(checkShouldOpenNavBarIntervalId);
	clearInterval(checkShouldResetOverflowHiddenIntervalId);
	clearTimeout(zIndexHighestTimeoutId);
	clearTimeout(resetUnclickableTimeoutId);
	clearTimeout(removerOverFlowHiddenTimeoutId);
	clearTimeout(removeOverFlowHiddenAfterOpeningTimeoutId);
}

export function getIsChildOfNavBar(e: Event) {
	let isChildOfNavBar = (e.currentTarget as HTMLElement)?.classList.contains(
		NAVBAR_CLASSNAME,
	);
	if (!isChildOfNavBar)
		isChildOfNavBar = checkForParentOfType(
			e.target as HTMLElement,
			"nav",
			NAVBAR_CLASSNAME,
		);

	return isChildOfNavBar;
}

export function closeNavBar(
	navBar: HTMLElement,
	setIsAnimating: (value: boolean) => void,
) {
	navBar.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
	navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);

	zIndexHighestTimeoutId = setTimeout(() => {
		const header = document.querySelector(HEADER_ID) as HTMLElement;
		header.classList.remove(Z_INDEX_HIGHEST_CLASSNAME);
	}, ANIMATION_DURATION);

	setIsAnimating(false);
}

export function openNavBar(
	navBar: HTMLElement,
	setIsAnimating: (value: boolean) => void,
) {
	if (!navBar) return;
	navBar.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
	navBar.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
	document.querySelector(HEADER_ID)!.classList.add(Z_INDEX_HIGHEST_CLASSNAME);

	removeOverFlowHiddenAfterOpeningTimeoutId = setTimeout(() => {
		navBar.classList.remove(OVERFLOW_HIDDEN_CLASSNAME);
	}, ANIMATION_DURATION);
	setIsAnimating(true);
}

export function rgbToHex(r: number, g: number, b: number) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgb(hex: string) {
	const result = /^#?([a-fd]{2})([a-fd]{2})([a-fd]{2})$/i.exec(hex);
	if (result) {
		const r = parseInt(result[1], 16);
		const g = parseInt(result[2], 16);
		const b = parseInt(result[3], 16);
		return r + "," + g + "," + b; //return 23,14,45 -> reformat if needed
	}
	throw new Error("Invald Hex Value: " + hex);
}

export function resetPageNavMinWidth(viewPortWidth: number) {
	if (viewPortWidth < PAGE_NAV_MIN_WIDTH_THRESHOLD) {
		if (`${viewPortWidth}px` === PAGE_NAV_MIN_WIDTH_DEFAULT) return;
		const newValue = `${PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME}: ${PAGE_NAV_MIN_WIDTH_DEFAULT}`;
		document.documentElement.style.cssText += newValue;
	} else if (viewPortWidth >= PAGE_NAV_MIN_WIDTH_THRESHOLD) {
		setPageNavMinWidth(document.querySelector(`.${PAGE_NAV_CLASSNAME}` as any));
	}
}
