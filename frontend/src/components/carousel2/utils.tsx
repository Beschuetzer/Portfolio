import { replaceCharacters } from "../../helpers";
import { OptionsLogic } from "./business-logic/OptionsLogic";
import { StylingLogic } from "./business-logic/StylingLogic";
import { CarouselItemProps } from "./components/CarouselItem";
import {
    CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT,
    CLASSNAME__ROOT,
    MOBILE_PIXEL_WIDTH,
    NUMBER_OF_PAGES_INITIAL,
    VIDEO_EXTENSIONS
} from "./constants";
import { KeyInput, ValidKey } from "./hooks/useKeyboardShortcuts";
import { Coordinate, Point, ArrowButtonDirection, CarouselElementSizeTuple } from "./types";
type GetClassname = {
    elementName?: string;
    modifiedName?: string;
}

export function capitalize(str: string | undefined | null) {
    if (!str) return "";
    return str
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

export function convertHexToRgba(hex: string, opacity = CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT) {

    let color: any;
    const hexToUse = hex.trim();
    if (hex && /^#([A-Fa-f0-9]{3}){1,2}$/.test(hexToUse)) {
        color = hexToUse.substring(1).split('');
        if (color.length === 3) {
            color = [color[0], color[0], color[1], color[1], color[2], color[2]];
        }
        color = '0x' + color.join('');
        return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')},${opacity > 1 ? 1 : opacity < 0 ? 0 : opacity})`;
    }

    return hexToUse;
}

export function getAncestorContainsClassname(elementToCheck: HTMLElement | null, classname: string, stoppingElementType = 'body'): boolean {
    try {
        const regex = new RegExp(classname, 'i');
        if (!classname || !elementToCheck) return false;
        if (elementToCheck?.className?.match(regex)) return true;
        if (elementToCheck?.localName?.toLocaleLowerCase() === stoppingElementType) return false;
        const parent = elementToCheck?.parentElement || null;
        return getAncestorContainsClassname(parent, classname, stoppingElementType);
    } catch (error) {
        return true;
    }
}

export function getClassname({ elementName, modifiedName }: GetClassname) {
    return `${CLASSNAME__ROOT}${elementName ? `__${elementName}` : ``}${modifiedName ? `--${modifiedName}` : ``}`;
}

export function getContainerWidth(htmlElement: HTMLElement | undefined, stylingLogic: StylingLogic) {
    return (htmlElement?.getBoundingClientRect()?.width || 0) - (stylingLogic.navigationContainerHorizontalPadding);
}

export function getCoordinateDifference(mostRecentCoordinate: Coordinate, previousCoordinate: Coordinate) {
    if (
        !mostRecentCoordinate ||
        !previousCoordinate ||
        mostRecentCoordinate.x === undefined ||
        mostRecentCoordinate.y === undefined ||
        previousCoordinate.x === undefined ||
        previousCoordinate.y === undefined
    ) return {
        distance: 0,
        xDiff: 0,
        yDiff: 0,
    }

    const xDiff = mostRecentCoordinate.x - previousCoordinate.x;
    const yDiff = mostRecentCoordinate.y - previousCoordinate.y;
    return {
        distance: Math.hypot(xDiff, yDiff),
        xDiff,
        yDiff,
    }
}

export function getIsMobile() {
    return window.innerWidth <= MOBILE_PIXEL_WIDTH;
}

export function getFormattedTimeString(seconds: number) {
    if (!seconds || seconds < 0) return '00:00';
    const hours = Math.floor(seconds / 3600);
    let remaining = seconds % 3600;
    const minutes = Math.floor(remaining / 60);
    remaining %= 60;
    const second = Math.floor(remaining);
    return `${hours ? `${hours.toString()}:` : ''}${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

export function getIsPointInsideElement(point: Point, element: HTMLElement | null) {
    if (!point || !point.x || !point.y || !element) return false;
    const { top, bottom, left, right } = element.getBoundingClientRect();
    const { x, y } = point;
    const isValidX = x >= left && x <= right;
    const isValidY = y >= top && y <= bottom;
    return isValidX && isValidY;
}

export function getIsVideo(item: CarouselItemProps | undefined) {
    const currentItemSrc = item?.srcMain || '';
    return currentItemSrc?.match(
        getRegexStringFromStringArray(VIDEO_EXTENSIONS),
    );
}

export function getIsVideoPlaying(videoRef: HTMLVideoElement | undefined) {
    if (!videoRef) return false;
    return !videoRef.paused && !videoRef.ended && videoRef.currentTime > 0
}

export function getNumberOfItemsThatCanFit(
    htmlElement: HTMLElement | undefined,
    stylingLogic: StylingLogic,
    optionsLogic: OptionsLogic
) {
    const containerWidth = getContainerWidth(htmlElement, stylingLogic);
    const itemSize = optionsLogic.carouselItemSize;
    const calculatedNumberOfWholeItemsThatCanFit = Math.floor(containerWidth / itemSize);

    return {
        containerWidth,
        itemSize,
        //logic needed to prevent crashing at smaller viewport
        numberOfWholeItemsThatCanFit: calculatedNumberOfWholeItemsThatCanFit <= 0 ? 1 : calculatedNumberOfWholeItemsThatCanFit,
        numberOfItemsThatCanFit: containerWidth / itemSize,
    }
}

export function getNumberOfPages(
    carouselContainerElement: HTMLElement,
    itemsLength: number,
    stylingLogic: StylingLogic,
    optionsLogic: OptionsLogic
) {
    if (!carouselContainerElement) return NUMBER_OF_PAGES_INITIAL;
    const { numberOfWholeItemsThatCanFit: numberOfItemsThatCanFit } = getNumberOfItemsThatCanFit(
        carouselContainerElement, stylingLogic, optionsLogic
    );
    const numberOfPages = Math.ceil(itemsLength / numberOfItemsThatCanFit);
    return numberOfPages;
}

export function getRegexStringFromStringArray(fileExtensions: string[]) {
    const mapped = fileExtensions.map((ext, index) => {
        let orChar = "|";
        if (index === 0) orChar = "";
        return `${orChar}(.${ext})`;
    });
    const result = ".+" + mapped.join("") + "$";
    return result;
}

export function getShortcutsString(shortcuts: KeyInput[]) {
    let result = "";
    if (!shortcuts || shortcuts.length === 0) return result;

    const replacements = [
        [ValidKey.arrowDown, '↓'],
        [ValidKey.arrowUp, '↑'],
        [ValidKey.arrowLeft, '←'],
        [ValidKey.arrowRight, '→'],
        [ValidKey.spacebar, 'spacebar'],
        [ValidKey.escape, 'esc'],
    ] as [string, string][];

    for (let i = 0; i < shortcuts.length; i++) {
        const shortcut = shortcuts[i];
        const isLastItem = i === shortcuts.length - 1;

        if (isLastItem) {
            result += ' or '
        }

        if (Array.isArray(shortcut)) {
            const replaced = shortcut.map(sc => replaceCharacters(sc, replacements))
            result += replaced.join('+');
        } else {
            result += replaceCharacters(shortcut, replacements);
        }

        if (shortcuts.length > 2 && !isLastItem) {
            result += ', '
        }
    }

    return result;
}

/*
*The idea here is to get the current value for the current window width from the list of tuples
*/
export function getCurrentValue<T>(valueTuple: CarouselElementSizeTuple<T>[] | undefined, defaultSize: T) {
    const windowWidth = window.innerWidth;

    for (const tuple of valueTuple || []) {
        const [value, breakpoint, breakpointType] = tuple || [];
        let valueToUse;

        switch (typeof value) {
            case "number":
                valueToUse = value >= 0 ? value : defaultSize;
                break;
            default:
                valueToUse = value || defaultSize;
        }

        const breakpointTypeToUse = breakpointType || "max-width";

        if (!breakpoint) {
            return valueToUse;
        }

        if (breakpointTypeToUse === "max-width") {
            if (windowWidth <= breakpoint) return valueToUse;
        } else if (breakpointTypeToUse === "min-width") {
            if (windowWidth >= breakpoint) return valueToUse;
        }
    }

    return defaultSize;
}

export async function enterFullScreen(element: HTMLElement | null) {
    try {
        const isFullScreenPossible = document.fullscreenEnabled;
        if (!isFullScreenPossible || !element) return;
        return await element.requestFullscreen();
    } catch (e) { }
}

export async function exitFullScreen(element: HTMLElement | null) {
    try {
        const isFullScreenPossible = document.fullscreenEnabled;
        if (!isFullScreenPossible || !element) return;
        return await document.exitFullscreen();
    } catch (e) { }
}

export function onArrowButtonClick(
    direction: ArrowButtonDirection,
    currentPage: number,
    numberOfPages: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) {
    if (direction === ArrowButtonDirection.previous) {
        setCurrentPage(currentPage <= 0 ? numberOfPages - 1 : currentPage - 1);
    } else if (direction === ArrowButtonDirection.next) {
        setCurrentPage(currentPage >= numberOfPages - 1 ? 0 : currentPage + 1);
    }
}

export function setCssCustomProperty(propertyName: string, newValue: string) {
    document.documentElement.style.setProperty(
        `--${propertyName}`,
        newValue,
    );
}

export function stopPropagation(e?: Event) {
    let event = e || window.event;
    if (!event) return;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
}

export async function tryPlayingVideo(videoRef: HTMLVideoElement | undefined, onSuccess?: () => void, onFailure?: () => void) {
    const playPromise = videoRef?.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            onSuccess && onSuccess();
        }).catch(() => {
            onFailure && onFailure();
        })
    }
}