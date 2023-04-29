import { replaceCharacters } from "../../helpers";
import { ItemDisplayLocationLogic } from "./business-logic/ItemDisplayLocationLogic";
import { StylingLogic } from "./business-logic/StylingLogic";
import { CarouselItemProps } from "./components/CarouselItem";
import { CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT, CLASSNAME__ROOT, NUMBER_OF_PAGES_INITIAL, VIDEO_EXTENSIONS } from "./constants";
import { KeyInput, ValidKey } from "./hooks/useKeyboardShortcuts";
import { Point } from "./types";
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
        if (color.length == 3) {
            color = [color[0], color[0], color[1], color[1], color[2], color[2]];
        }
        color = '0x' + color.join('');
        return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')},${opacity > 1 ? 1 : opacity < 0 ? 0 : opacity})`;
    }

    return hexToUse;
}

export function getClassname({ elementName, modifiedName }: GetClassname) {
    return `${CLASSNAME__ROOT}${elementName ? `__${elementName}` : ``}${modifiedName ? `--${modifiedName}` : ``}`;
}

export function getContainerWidth(htmlElement: HTMLElement, stylingLogic: StylingLogic) {
    return (htmlElement?.getBoundingClientRect()?.width || 0) - (stylingLogic.navigationContainerHorizontalPadding);
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

export function getNumberOfItemsThatCanFit(
    htmlElement: HTMLElement,
    stylingLogic: StylingLogic,
    itemDisplayLocationLogic: ItemDisplayLocationLogic
) {
    const containerWidth = getContainerWidth(htmlElement, stylingLogic);
    const itemSize = itemDisplayLocationLogic.carouselItemSize;

    return {
        containerWidth,
        itemSize,
        numberOfWholeItemsThatCanFit: Math.floor(containerWidth / itemSize),
        numberOfItemsThatCanFit: containerWidth / itemSize,
    }
}

export function getNumberOfPages(
    carouselContainerElement: HTMLElement,
    itemsLength: number,
    stylingLogic: StylingLogic,
    itemDisplayLocationLogic: ItemDisplayLocationLogic
) {
    if (!carouselContainerElement) return NUMBER_OF_PAGES_INITIAL;
    const { numberOfWholeItemsThatCanFit: numberOfItemsThatCanFit } = getNumberOfItemsThatCanFit(
        carouselContainerElement, stylingLogic, itemDisplayLocationLogic
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


export function getGuid() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function getShortcutsString(shortcuts: KeyInput[]) {
    const replacements = [
        [ValidKey.arrowDown, '↓'],
        [ValidKey.arrowUp, '↑'],
        [ValidKey.arrowLeft, '←'],
        [ValidKey.arrowRight, '→'],
        [ValidKey.spacebar, 'spacebar'],
        [ValidKey.escape, 'esc'],
    ] as [string, string][];

    let result = "";
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

export function setCssCustomProperty(propertyName: string, newValue: string) {
    document.documentElement.style.setProperty(
        `--${propertyName}`,
        newValue,
    );
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