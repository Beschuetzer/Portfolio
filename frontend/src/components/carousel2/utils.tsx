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
import {
    Coordinate,
    Point,
    ArrowButtonDirection,
    CarouselElementValue,
    CarouselElementValueType,
    CarouselElementViewingMode,
    CarouselElementTuple,
    CarouselElementValueTuple
} from "./types";

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

export function convertColorNameToHex(color: string)
{
    if (!color) return undefined;
    const colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"} as {[key: string]: string};

    if (typeof colors[color?.toLowerCase()] !== 'undefined')
        return colors[color?.toLowerCase()];

    return undefined;
}

export function convertHexToRgba(hex: string, opacity = CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT) {

    let color: any;
    const hexToUse = hex?.trim();
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

export function getIsVideoPlaying(video: HTMLVideoElement | undefined) {
    if (!video) return false;
    return !video.paused && !video.ended && video.currentTime > 0
}

export function getNumberOfItemsThatCanFit(
    itemsLength: number,
    htmlElement: HTMLElement | undefined,
    stylingLogic: StylingLogic,
    optionsLogic: OptionsLogic
) {
    const containerWidth = getContainerWidth(htmlElement, stylingLogic);
    const itemSize = optionsLogic.carouselItemSize;
    const itemSpacing = optionsLogic.getItemSpacing();
    const numberOfItemsThatCanFitWithZeroSpacing = containerWidth / itemSize;
    let calculatedNumberOfWholeItemsThatCanFitWithZeroSpacing = Math.floor(numberOfItemsThatCanFitWithZeroSpacing);
    const itemSpacingStrategy = optionsLogic.itemSpacingStrategy;

    //logic needed for cases when itemSpacing is given and can't be 0
    const numberOfSpaces = calculatedNumberOfWholeItemsThatCanFitWithZeroSpacing - 1;
    const totalSpaceOfItems = calculatedNumberOfWholeItemsThatCanFitWithZeroSpacing * itemSize + numberOfSpaces * itemSpacing;
    if (totalSpaceOfItems > containerWidth) {
        calculatedNumberOfWholeItemsThatCanFitWithZeroSpacing -= 1;
    }

    //logic needed to prevent crashing at smaller viewport
    const numberOfWholeItemsThatCanFit = calculatedNumberOfWholeItemsThatCanFitWithZeroSpacing <= 0
        ? 1
        : calculatedNumberOfWholeItemsThatCanFitWithZeroSpacing;

    return {
        containerWidth,
        itemSize,
        numberOfWholeItemsThatCanFit: itemSpacingStrategy === 'max'
            ? Math.min(itemsLength, numberOfWholeItemsThatCanFit)
            : numberOfWholeItemsThatCanFit,
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
        itemsLength, carouselContainerElement, stylingLogic, optionsLogic
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
*Tuples given are sorted by max-width, then min-width, then unspecified 
*max-width tuples are sorted ascending by breakpoint and min-width descending by breakpoint
*Tuples with a breakpoint specified but no type are considered to be 'max-width' type
*If there is more than one tuple with just a value, the first one in the sorted array is used (e.g. for numbers it is the smallest one)
*When extending the supported types, the only thing that needs to be modified is adding another case in the switch statement for said type
*/
export function getCurrentValue<T>(valueTuple: CarouselElementValue<T> | undefined, defaultValue: T, isFullscreenMode: boolean) {
    let valueTupleToUse: CarouselElementValueTuple<T> | undefined;
    if (typeof (valueTuple) === 'object') {
        valueTupleToUse = ((isFullscreenMode ? (valueTuple as CarouselElementViewingMode<T>)?.fullscreen : (valueTuple as CarouselElementViewingMode<T>)?.nonFullscreen)) || valueTuple as CarouselElementTuple<T>;
        if ((valueTupleToUse as CarouselElementViewingMode<T>)?.fullscreen) {
            valueTupleToUse = isFullscreenMode ? (valueTupleToUse as CarouselElementViewingMode<T>)?.fullscreen : undefined;
        } else if ((valueTupleToUse as CarouselElementViewingMode<T>)?.nonFullscreen) {
            valueTupleToUse = !isFullscreenMode ? (valueTupleToUse as CarouselElementViewingMode<T>)?.nonFullscreen : undefined;
        }
    } else {
        valueTupleToUse = valueTuple;
    }

    if (valueTupleToUse === undefined || valueTupleToUse === null) return defaultValue;
    if (!Array.isArray(valueTupleToUse)) return valueTupleToUse;

    const windowWidth = window.innerWidth;
    let sorted = valueTupleToUse;
    const valueType = typeof valueTupleToUse?.[0]?.[0];

    sorted = valueTupleToUse?.sort((a, b) => {
        const priority = ['max-width', 'min-width', undefined] as (CarouselElementValueType | undefined)[]
        const firstBreakpoint = a?.[1] || 0;
        const secondBreakpoint = b?.[1] || 0;
        const firstType = firstBreakpoint ? a?.[2] || 'max-width' : undefined;
        const secondType = secondBreakpoint ? b?.[2] || 'max-width' : undefined;
        const firstValue = a[0];
        const secondValue = b[0];
        const firstTypeIndex = priority.indexOf(firstType);
        const secondTypeIndex = priority.indexOf(secondType);
        const sortFirstBeforeSecond = -1;
        const sortFirstAfterSecond = 1;
        const keepOrder = 0;
        const sortByMaxWidthBreakpoint = firstBreakpoint < secondBreakpoint ? sortFirstBeforeSecond : sortFirstAfterSecond;
        const sortByMinWidthBreakpoint = firstBreakpoint > secondBreakpoint ? sortFirstBeforeSecond : sortFirstAfterSecond;

        //each type may need to evalute equality differently       
        let sortByValue;
        switch (valueType) {
            //this is the number case
            default:
                sortByValue = firstValue < secondValue ? sortFirstBeforeSecond : sortFirstAfterSecond;
        }

        //assuming the index values are never -1
        if (firstTypeIndex === secondTypeIndex) {
            if (firstTypeIndex === priority.indexOf('max-width')) return sortByMaxWidthBreakpoint;
            else if (firstTypeIndex === priority.indexOf('min-width')) return sortByMinWidthBreakpoint;
            return sortByValue;
        } else if (firstTypeIndex > secondTypeIndex) {
            return sortFirstAfterSecond;
        } else if (firstTypeIndex < secondTypeIndex) {
            return sortFirstBeforeSecond;
        }
        return keepOrder;
    })

    for (const tuple of sorted || []) {
        const [value, breakpoint, breakpointType] = tuple || [];
        let valueToUse;

        switch (typeof value) {
            case "number":
                valueToUse = value >= 0 ? value : defaultValue;
                break;
            case "boolean":
                valueToUse = value;
                break;
            default:
                valueToUse = value || defaultValue;
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

    return defaultValue;
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