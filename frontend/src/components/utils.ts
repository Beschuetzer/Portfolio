import history from "../history";
import {
	FULLSCREEN_ARROW_BUTTON_CLASSNAME,
	FULLSCREEN_PARENT_CLASSNAME,
} from "./Carousel/CarouselItem";
import { CAROUSEL_CLASSNAME, CAROUSEL_VIDEO_CLASSNAME } from "./Carousel/util";
import {
	ABOUT_URL,
	AUTO_BID_URL,
	BRIDGE_URL,
	DOWNLOADER_URL,
	EMAIL,
	FILL_RED_CLASSNAME,
	MAIL_TO_STRING,
	MOBILE_BREAK_POINT_WIDTH,
	OVERFLOW_HIDDEN_CLASSNAME,
	PLAYLIST_SYNCER_URL,
	REPLAY_VIEWER_URL,
	RESUME_URL,
	Z_INDEX_CONTENT_CLASSNAME,
} from "./constants";
import { HEADER_ID } from "./navbar/SiteNav/utils";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
} from "./navbar/utils";

//#region Helper Functions
export const keypressHandler = (
	isAnimating: boolean,
	setIsAnimating: (value: boolean) => void,
	e: KeyboardEvent,
) => {
	if (!e.altKey || !e.ctrlKey) return;
	switch (e.key) {
		case "a":
			history.push(ABOUT_URL);
			break;
		case "b":
			history.push(BRIDGE_URL);
			break;
		case "c":
			window.location.href = MAIL_TO_STRING;
		break;
		case "d":
			history.push(DOWNLOADER_URL);
			break;
		case "o":
			const navbar = document.querySelector(`.${NAVBAR_CLASSNAME}`);
			const root = document.querySelector("#root");
			setIsAnimating(!isAnimating);
			if (isAnimating) {
				navbar?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
				root?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
			} else {
				navbar?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
				navbar?.classList?.remove(NAVBAR_DONE_CLASSNAME);
				navbar?.classList?.add(OVERFLOW_HIDDEN_CLASSNAME);
				root?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
			}
			break;
		case "p":
			history.push(REPLAY_VIEWER_URL);
			break;
		case "r":
			history.push(RESUME_URL);
			break;
		case "s":
			history.push(PLAYLIST_SYNCER_URL);
			break;
		case "u":
			history.push(AUTO_BID_URL);
			break;
		default:
			break;
	}
};

export const removeClassFromAllChildren = (
	parent: HTMLElement,
	classNameToRemove: string,
) => {
	const childrenWithClassname = parent.querySelectorAll(
		`.${classNameToRemove}`,
	);

	for (let j = 0; j < childrenWithClassname.length; j++) {
		const childWithClassname = childrenWithClassname[j];
		childWithClassname.classList.remove(classNameToRemove);
	}
};

// export function onRenderCallback(
//   id, // the "id" prop of the Profiler tree that has just committed
//   phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
//   actualDuration, // time spent rendering the committed update
//   baseDuration, // estimated time to render the entire subtree without memoization
//   startTime, // when React began rendering this update
//   commitTime, // when React committed this update
//   interactions // the Set of interactions belonging to this update
// ) {
//   console.log('id =', id);
//   console.log('phase =', phase);
//   console.log('actualDuration =', actualDuration);
//   console.log('baseDuration =', baseDuration);
//   // console.log('startTime =', startTime);
//   // console.log('commitTime =', commitTime);
//   // console.log('interactions =', interactions);
// }

export const scrollToSection = (sectionToScrollTo: HTMLElement) => {
	const shouldAddHeaderHeight = window.innerWidth <= MOBILE_BREAK_POINT_WIDTH;
	const headerHeight = document
		.querySelector(HEADER_ID)!
		.getBoundingClientRect().height;
	const topScrollAmount =
		window.scrollY +
		sectionToScrollTo.getBoundingClientRect().top -
		(shouldAddHeaderHeight ? headerHeight : 0);
	window.scroll({
		top: topScrollAmount,
		left: 0,
		behavior: "smooth",
	});
};

export const addSpaceAfterPunctuationMarks = (string: string) => {
	const punctuationMarks = [".", "?", "!"];
	let shouldAdd = false;
	let newString = "";
	for (let i = 0; i < string.length; i++) {
		const char = string[i];

		if (shouldAdd && !punctuationMarks.includes(char)) {
			//add &nbsp here in front of current char
			shouldAdd = false;
			if (char === "<" || string[i + 1] !== "") newString += char;
			else newString += "&nbsp" + char;
			continue;
		}
		if (punctuationMarks.includes(char)) shouldAdd = true;
		newString += char;
	}
	return newString;
};

export function closeCarouselItem(
	item: HTMLElement,
	additionalSelector: string,
	shouldAddZIndex = false,
) {
	let sectionAbove: HTMLElement | null;
	let sectionAboveThat: HTMLElement | null;

	if (item === null) {
		item = document.querySelector(additionalSelector) as HTMLElement;
		sectionAboveThat = item;
	} else {
		sectionAbove = item.closest("section");
		sectionAboveThat = (sectionAbove?.parentNode as HTMLElement)?.closest(
			"section",
		);
	}

	if (sectionAboveThat) {
		if (shouldAddZIndex)
			sectionAboveThat.classList.add(Z_INDEX_CONTENT_CLASSNAME);
		else sectionAboveThat.classList.remove(Z_INDEX_CONTENT_CLASSNAME);
	}

	resetArrowButtonClassnames();
}

export function resetArrowButtonClassnames() {
	setTimeout(() => {
		const carouselItemsFullScreen = document.querySelectorAll(
			`.${FULLSCREEN_PARENT_CLASSNAME}`,
		);

		if (carouselItemsFullScreen.length > 0) return;
		const arrowButtons = document.querySelectorAll(
			`.${CAROUSEL_CLASSNAME}__arrow-button`,
		);

		for (let i = 0; i < arrowButtons.length; i++) {
			const arrowButton = arrowButtons[i];
			const svg = arrowButton.querySelector("svg");
			arrowButton.classList.remove(FULLSCREEN_ARROW_BUTTON_CLASSNAME);
			svg?.classList.remove(FILL_RED_CLASSNAME);
		}
	}, 1);
}

export function functionToGetContainer(e: Event) {
	return (e.currentTarget as any).parentNode.querySelector(
		`.${CAROUSEL_VIDEO_CLASSNAME}`,
	);
}

export function getSentencesFromString(
	str: string,
	punctuationMarks: string[],
) {
	const toReturn: string[] = [];
	const indexLocations = [];

	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		if (punctuationMarks.includes(char)) indexLocations.push(i);
	}

	for (let i = 0; i < indexLocations.length; i++) {
		const endIndex = indexLocations[i] + 1;
		let startIndex = 0;
		if (i !== 0) startIndex = indexLocations[i - 1] + 1;

		toReturn.push(str.substring(startIndex, endIndex)?.trim());
	}

	return toReturn;
}

//#endregion
