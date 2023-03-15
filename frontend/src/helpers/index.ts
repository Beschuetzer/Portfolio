import { RefObject } from "react";
import { Z_INDEX_CONTENT_CLASSNAME, CAROUSEL_VIDEO_CLASSNAME, ABOUT_URL, BRIDGE_URL, MAIL_TO_STRING, DOWNLOADER_URL, REPLAY_VIEWER_URL, RESUME_URL, PLAYLIST_SYNCER_URL, AUTO_BID_URL, FULLSCREEN_PARENT_CLASSNAME, CAROUSEL_CLASSNAME, FULLSCREEN_ARROW_BUTTON_CLASSNAME, FILL_RED_CLASSNAME, DEFAULT_FONT_SIZE, MOBILE_BREAK_POINT_WIDTH, HEADER_ID, HEADER_HEIGHT_CUSTOM_PROPERTY_NAME } from "../components/constants";
import history from "../components/history";

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

export const attachProgressListener = (video: HTMLVideoElement, hasProgressEventListener: boolean, handleVideoProgress: () => void) => {
	if(!video) return;
	if (!hasProgressEventListener) {
	  video.addEventListener('timeupdate', handleVideoProgress);
	  return true;
	} 
	return false;
}

export function capitalize(str: string | undefined | null) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function checkForParentOfType(clickedElement: HTMLElement, parentType: string, classPresent = ""): boolean {
  try {
    if (
      clickedElement &&
      clickedElement.parentNode &&
      (clickedElement.parentNode as HTMLElement).localName === parentType &&
      (clickedElement.parentNode as HTMLElement).className.search(classPresent) !== -1
    )
      return true;

    if ((clickedElement.parentNode as HTMLElement).localName.search(/html/i) !== -1) return false;

    const parent = clickedElement.parentNode as HTMLElement;
    return checkForParentOfType(parent, parentType, classPresent);
  } catch (error) {
    return false;
  }
}

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

export const closeVideo = (video: HTMLVideoElement) => {
	if (!video) return;
	video.pause();
	video.currentTime = 0;
};

export function functionToGetContainer(e: Event) {
	return (e.currentTarget as any).parentNode.querySelector(
		`.${CAROUSEL_VIDEO_CLASSNAME}`,
	);
}

export function getAncestorContainsClassname(elementToCheck: HTMLElement | null, classname: string, stoppingElementType = 'body'): boolean {
  try {
    const regex = new RegExp(classname, 'i');
    if (!classname || !elementToCheck) return false;
    if ( elementToCheck?.className?.match(regex)) return true;
    if (elementToCheck?.localName?.toLocaleLowerCase() === stoppingElementType) return false;
    const parent = elementToCheck?.parentElement || null;
    return getAncestorContainsClassname(parent, classname, stoppingElementType);
  } catch (error) {
    return true;
  }
}

export function getComputedStyleCustom(propertyName: string) {
	if (!propertyName) return '';
	return window.getComputedStyle(document.documentElement).getPropertyValue(propertyName);
}

export function getLinearPercentOfMaxMatchWithinRange(currentTrackedValue: number, minTrackedValue: number, maxTrackedValue: number, startOutputValue: number, endOutputValue: number) {
  //returns a value between a given input range that correlates to the value of variable as it changes within a different range.  If the tracked variable goes above the maxCutoff then it assumes the endOutputValue.  If it goes anywhere below the min value, then it assumes the startOutputValue.  Any where inbetween is linearly correlated to the trackedValue.

  if (currentTrackedValue >= maxTrackedValue) return endOutputValue;
  if (currentTrackedValue <= minTrackedValue) return startOutputValue;

  let trackedValueRange = Math.abs(maxTrackedValue - minTrackedValue);
  let outputValueRange = Math.abs(endOutputValue - startOutputValue);
  let amountAboveMin = currentTrackedValue - minTrackedValue;
  let percentOfRange = amountAboveMin / trackedValueRange;

  if (startOutputValue <= endOutputValue) {
    return startOutputValue + percentOfRange * outputValueRange;
  } else {
    return startOutputValue - percentOfRange * outputValueRange;
  }
}

export function getMaxLengthString(str: string, maxCharCount = 30, addElliplse = true) {	
	if (!str) {
		return '';
	}

	let isEllipseNeeded = false;
	if (str.length > maxCharCount) {
		isEllipseNeeded = true;
	}

	return `${str.slice(0, maxCharCount)}${isEllipseNeeded && addElliplse ? '...' : ''}`;
}

export function getMinuteAndSecondsString(songLengthInSeconds: number) {
  const secondsPerMinute = 60;
  const hours = Math.floor(songLengthInSeconds / secondsPerMinute / secondsPerMinute);
  let minutes = Math.floor(songLengthInSeconds / secondsPerMinute);
  
  let seconds = Math.ceil(songLengthInSeconds % secondsPerMinute);
  if (seconds === 60)  {
    seconds = 0;
    minutes += 1;
  }

  return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export const getIsVideoPlaying = (video: HTMLVideoElement) => {
	return (
	  video.currentTime > 0 &&
	  !video.paused &&
	  !video.ended &&
	  video.readyState > 2
	);
};

export const getPercentOfProgressBar = (progressBar: HTMLProgressElement, clientX: number) => {
	const progressBarBoundingRect = progressBar.getBoundingClientRect();
	const progressBarLeftX = progressBarBoundingRect.left;
	const progressBarRightX = progressBarBoundingRect.right;
	const amountPastLeft = (clientX - progressBarLeftX);
	const percent = amountPastLeft / (progressBarRightX - progressBarLeftX);
	return percent;
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

export const handleVideoProgress = (videoRef: RefObject<HTMLVideoElement> | Event, progressBarRef: RefObject<HTMLProgressElement>, e: Event) => {
	const video = (videoRef as any).current || (videoRef as any).target as HTMLVideoElement;
	if (!video) return;
	const percent = video.currentTime / video.duration;
  
	if (progressBarRef.current) {
	  (progressBarRef.current as HTMLProgressElement).value = percent;
	}
};

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

export const keypressHandler = (
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

export const replaceCharacters = (str: string, characterMappings: [string, string][] = []) => {
  const replacements = [
    ["-", " "],
    ["_", " "],
  ];

  let strToUse = str;
  let replacementsToUse = replacements;
  if (characterMappings.length > 0) replacementsToUse = characterMappings;

  for (let i = 0; i < replacementsToUse.length; i++) {
    const characterMapping = replacementsToUse[i];
    const splitStr = strToUse.split(characterMapping[0]);
    strToUse = splitStr.join(characterMapping[1]);
  }
  return strToUse;
};

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

export function rgbToHex(r: number, g: number, b: number) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export const scrollToSection = (sectionToScrollTo: HTMLElement | null, addedHeight?: number ) => {
	if (!sectionToScrollTo) {
		return window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	const isMobile = window.innerWidth <= MOBILE_BREAK_POINT_WIDTH;
	const addedHeightToUse = addedHeight || -DEFAULT_FONT_SIZE * (isMobile ? 4 : 100);
	const headerHeight = isMobile ? parseFloat(getComputedStyleCustom(HEADER_HEIGHT_CUSTOM_PROPERTY_NAME) || "0") : 0;
	const topScrollAmount =
		window.scrollY +
		sectionToScrollTo.getBoundingClientRect().top +
		(-headerHeight + addedHeightToUse);
		
	window.scroll({
		top: topScrollAmount,
		left: 0,
		behavior: "smooth",
	});
};

export function toggleScrollability(isScrollable = true) {
	if (isScrollable) {
		document.body.style.overflowY = 'visible';
	} else {
		document.body.style.overflowY = 'hidden';
	}
}