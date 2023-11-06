import { OptionsLogic } from "../business-logic/OptionsLogic";
import { RegexpPattern } from "../business-logic/RegexpPattern";
import { StylingLogic } from "../business-logic/StylingLogic";
import { CarouselItemProps } from "../components/CarouselItem";
import {
    CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT,
    CAROUSEL_MAX_HEIGHT_DEFAULT,
    CLASSNAME__ROOT,
    MOBILE_PIXEL_WIDTH,
    NUMBER_OF_MS_IN_A_SECOND,
    NUMBER_OF_PAGES_INITIAL,
    NUMBER_OF_SECONDS_IN_A_MINUTE,
    TOOLBAR_TIME_STRING_SECTION_DIVIDER,
} from "../constants";
import {
    Coordinate,
    Point,
    ArrowButtonDirection,
    KeyInput,
    ValidKey,
    CarouselModalGetCodeSectionInput,
    CarouselModalGetCodeSectionsInput,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CarouselModalSectionProps,
} from "../types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselModal } from '../components/modal/CarouselModal';
import { getIsItemOfType } from "./getIsItemOfType";

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

export function convertColorNameToHex(color: string) {
    if (!color) return undefined;
    const colors = {
        "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
        "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
        "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080",
        "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
        "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00", "yellowgreen": "#9acd32"
    } as { [key: string]: string };

    if (typeof colors[color?.toLowerCase()] !== 'undefined')
        return colors[color?.toLowerCase()];

    return undefined;
}

export function convertHexToRgba(hex: string, opacity = CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT) {

    let color: any;
    const hexToUse = hex?.trim();

    if (hexToUse && RegexpPattern.hexColor.test(hexToUse)) {
        color = hexToUse.substring(1).split('');
        if (color.length === 3) {
            color = [color[0], color[0], color[1], color[1], color[2], color[2]];
        }
        color = '0x' + color.join('');
        return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')},${opacity > 1 ? 1 : opacity < 0 ? 0 : opacity})`;
    }

    return hexToUse;
}

/**
*Takes a time stamp that uses the following format `mm:ss:ms`.  
*Will display an alert if the value for that section is invalid
*@returns a number representing the number of ms that a time string represents
*@example
*'999' // => 999 milliseconds
*'23:920' // => 23 seconds and 920 milliseconds
*'1:23:920' // => 1 minute 23 seconds and 920 milliseconds
*'01:23:920' // => 1 minute 23 seconds and 920 milliseconds
*'01:63:920' // throws since 63 seconds is larger than 59 (max for seconds)
*'01:59:1000' // throws since 1000 seconds is larger than 999 (max for milliseconds)
**/
export function convertTimeStringToMilliseconds(timestamp: string) {
    if (!timestamp) {
        return 0;
    }

    if (typeof timestamp !== 'string') {
        try {
            return parseInt(timestamp, 10)
        } catch (error) {
            return 0;
        }
    }

    const split = timestamp?.split(TOOLBAR_TIME_STRING_SECTION_DIVIDER);
    const milliseconds = parseInt(split[split?.length - 1], 10) || 0;
    const seconds = parseInt(split[split?.length - 2], 10) || 0;
    const minutes = parseInt(split[split?.length - 3], 10) || 0;

    if (milliseconds >= 1000 || milliseconds < 0) {
        alert(`The number of milliseconds must be between 0 and 999.  ${timestamp} has ${milliseconds}`);
    } else if (seconds >= 60 || seconds < 0) {
        alert(`The number of seconds must be between 0 and 59.  ${timestamp} has ${seconds}`);
    } else if (minutes >= 60 || minutes < 0) {
        alert(`The number of minutes must be between 0 and 59.  ${timestamp} has ${minutes}`);
    }

    const toReturn = minutes * NUMBER_OF_MS_IN_A_SECOND * NUMBER_OF_SECONDS_IN_A_MINUTE + seconds * NUMBER_OF_MS_IN_A_SECOND + milliseconds;
    return toReturn;
}

/**
*Checks whether any nodes above `elementToCheck` contain `classname`.  Stops when node matches `stoppingElementType`, which defaults to `body`.
**/
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

/**
*Returns a value that is within the min and max values.
**/
export function getBoundValue(value: NonNullable<number>, min: NonNullable<number>, max: NonNullable<number>) {
    if (value === undefined || min === undefined || max === undefined) return value;
    return value >= max ? max : value <= min ? min : value;
}

export function getClassname({ elementName, modifiedName }: GetClassname) {
    return `${CLASSNAME__ROOT}${elementName ? `__${elementName}` : ``}${modifiedName ? `--${modifiedName}` : ``}`;
}

/**
*This is used to convert the {@link CarouselModalSectionProps.codeSection codeSections} object 
*into a code block/section inside the {@link CarouselModal}.
**/
export function getCodeSections(input: CarouselModalGetCodeSectionsInput) {
    const {
        marginTop = undefined,
        lines,
        startTabCount = 0,
        tabSpacing = undefined,
    } = input;

    if (!lines || lines.length === 0) return [];

    const toReturn = [];
    for (let index = 0; index < lines.length; index++) {
        const text = lines[index];
        const isComment = !!text.match(/^\s*\/\/.*/); //checks for '//' at the beginning
        const numberOfInitialSpaces = text.search(/\S|$/) || 0;
        toReturn.push(getCodeSection({
            text: text.trim(),
            isComment,
            marginTop,
            tabCount: numberOfInitialSpaces + startTabCount,
            tabSpacing
        }))
    }

    return toReturn;
}

export function getCodeSection(input: CarouselModalGetCodeSectionInput) {
    const {
        text,
        tabCount = 0,
        tabSpacing = 10,
        marginTop = 0,
        isComment = false,
    } = input

    return {
        textElementType: 'code',
        text,
        textStyles: {
            fontWeight: isComment ? 400 : 800,
            fontStyle: 'italic',
        },
        textContainerStyles: {
            padding: `${marginTop}px 0 0 ${tabCount * tabSpacing}px`,
        },
    } as CarouselModalSectionProps
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
    const hasTouchEvent = (('ontouchstart' in window) ||
        (navigator?.maxTouchPoints > 0) ||
        ((navigator as any)?.msMaxTouchPoints > 0));
    return hasTouchEvent && window.innerWidth <= MOBILE_PIXEL_WIDTH;
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

export function getIsPointInsideElement(point: Point, element: Element | null | undefined) {
    if (!point || !point.x || !point.y || !element) return false;
    const { top, bottom, left, right } = element.getBoundingClientRect();
    const { x, y } = point;
    const isValidX = x >= left && x <= right;
    const isValidY = y >= top && y <= bottom;
    return isValidX && isValidY;
}

export function getIsVideo(item: CarouselItemProps | undefined) {
    return getIsItemOfType(item, 'video');
}


export function getIsVideoPlaying(video: HTMLVideoElement | undefined) {
    if (!video) return false;
    return !video.paused && !video.ended && video.currentTime > 0
}

export function getMostFrequentItem(numbers: number[], defaultToUse = CAROUSEL_MAX_HEIGHT_DEFAULT) {
    if (!numbers || numbers.length === 0) return defaultToUse;
    const counts: {[key: string]: number} = {};

    for (const item of numbers) {
        const currentCount = counts?.[item.toString()];
        if (!currentCount) {
            counts[item] = 1;
        } else {
            counts[item]++;
        }
    }
    
    let toReturn = -1;
    let highestCount = Number.MIN_SAFE_INTEGER;
    for (const [key, count] of Object.entries(counts)) {
        if (count >= highestCount) {
            highestCount = count;
            const number = Number(key);
            if (number > toReturn) {
                toReturn = number;
            }
        }
    }
    return toReturn;
}


export function getNumberOfItemsThatCanFit(
    itemsLength: number,
    htmlElement: HTMLElement | undefined,
    stylingLogic: StylingLogic,
    optionsLogic: OptionsLogic
) {
    const containerWidth = getContainerWidth(htmlElement, stylingLogic);
    const itemSize = optionsLogic.thumbnailSize;
    const itemSpacing = optionsLogic.getThumbnailSpacingBasedOnThumbnailPositioning();
    const numberOfItemsThatCanFitWithZeroSpacing = containerWidth / itemSize;
    let calculatedNumberOfWholeItemsThatCanFitWithZeroSpacing = Math.floor(numberOfItemsThatCanFitWithZeroSpacing);
    const itemSpacingStrategy = optionsLogic.thumbnailSpacingStrategy;

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

export function getPoint(e: TouchEvent | MouseEvent | undefined) {
    const mouseEvent = e as MouseEvent;
    const touchEvent = e as TouchEvent;

    return {
        x: touchEvent?.changedTouches?.[0]?.clientX || mouseEvent?.x || mouseEvent?.clientX || 0,
        y: touchEvent?.changedTouches?.[0]?.clientY || mouseEvent?.y || mouseEvent?.clientY || 0,
    } as Point;
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

export const replaceCharacters = (
    str: string,
    characterMappings: [string, string][] = []
  ) => {
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