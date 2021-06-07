import { RefObject } from "react";
import { CAROUSEL_TRANSLATION_CSS_CLASSNAME } from "../../Carousel/util";
import {
	ANIMATION_DURATION,
	HEADER_ID,
	HEADER_TOGGLER_CLASSNAME,
	MOBILE_BREAK_POINT_WIDTH,
	OVERFLOW_HIDDEN_CLASSNAME,
	TRANSPARENT_CLASSNAME,
  DISPLAY_NONE_CLASSNAME,
  BODY_BACKGROUND_CLASSNAME,
} from "../../constants";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_IS_ANIMATING_CLASSNAME,
} from "../util";

const SET_ANIMATING_DONE_FACTOR = 1.2;
const SET_INITIAL_HEADER_HEIGHT_DELAY = 100;
let resetAnimatingId: any;

const onBodyClick = (navRef: RefObject<HTMLElement>, e: Event) => {
	console.log("e =", e);
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
	navRef: RefObject<HTMLElement>,
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

export const destroy = (navRef: RefObject<HTMLElement>) => {
	document.body.removeEventListener("click", onBodyClick.bind(null, navRef));
};

export const startAnimating = (
	navRef: RefObject<HTMLElement>,
	isAnimating: boolean,
) => {
	const navBar = navRef.current as any;
	resetAnimatingId = setTimeout(() => {
		navBar?.classList?.remove(NAVBAR_IS_ANIMATING_CLASSNAME);
		navBar?.classList?.remove(OVERFLOW_HIDDEN_CLASSNAME);
		if (isAnimating && navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME)) {
			navBar.classList?.add(NAVBAR_DONE_CLASSNAME);
		} else {
			navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
		}
	}, ANIMATION_DURATION * SET_ANIMATING_DONE_FACTOR);
	navBar?.classList?.add(NAVBAR_IS_ANIMATING_CLASSNAME);
};

export const getResetAnimatingId = () => {
	return resetAnimatingId;
};

export const changePage = (newUrl: string) => {
	//resetting Carousel scrolling
	const newValue = `${CAROUSEL_TRANSLATION_CSS_CLASSNAME}: 0px`;
	document.documentElement.style.cssText += newValue;

	const headerElement = document.querySelector(HEADER_ID);
	const headerTogglerElement = document.querySelector(HEADER_TOGGLER_CLASSNAME);
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
		if (page === "") document.body.className = BODY_BACKGROUND_CLASSNAME;
		else {
			document.body.className = `${BODY_BACKGROUND_CLASSNAME} ${page.slice(1)}-page`;
		}
	};

	if (!currentUrl) return;

	let docStyle = getComputedStyle(document.documentElement);
	const colorVarRoot = "--color-primary";
	const colorVarPages = [
		"",
		"/bridge",
		"/resume",
		"/downloader",
		"/playlist-syncer",
	];
	const colorVarNumbers = ["-1", "-2", "-3", "-4"];
	const lastIndexOfSlash = (currentUrl as any).lastIndexOf("/");
	const pageName = (currentUrl as any).slice(lastIndexOfSlash);
	const temp = colorVarPages.indexOf(pageName);
	const index = temp !== -1 ? temp : 0;
	setBodyStyle(colorVarPages[index]);
	const colorVarSuffix = colorVarPages[index].slice(1);

	for (let i = 0; i < colorVarNumbers.length; i++) {
		const colorVarNumber = colorVarNumbers[i];
		const colorVarToChange = `${colorVarRoot}${colorVarNumber}`;
		const colorVarTarget = `${colorVarRoot}${
			colorVarSuffix !== "" ? `-${colorVarSuffix}` : ""
		}${colorVarNumber}`;
		const targetValue = docStyle.getPropertyValue(colorVarTarget);
		document.documentElement.style.setProperty(colorVarToChange, targetValue);
	}
};

export const setHeaderHeightOnViewPortChange = (
	viewPortWidth: number,
	setHeaderHeight: (value: number) => void,
) => {
	const navbarContent = document.querySelector(
		".navbar__content",
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
