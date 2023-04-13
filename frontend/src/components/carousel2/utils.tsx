import { CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT, CLASSNAME__ROOT, VIDEO_EXTENSIONS } from "./constants";
import { CURRENT_ITEM_INDEX_INITIAL } from "./context";
import { Point } from "./types";
type GetClassname = {
    elementName?: string;
    modifiedName?: string;
}
export function getClassname({ elementName, modifiedName }: GetClassname) {
    return `${CLASSNAME__ROOT}${elementName ? `__${elementName}` : ``}${modifiedName ? `--${modifiedName}` : ``}`;
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

export function getIsVideo(pathname: string) {
    return pathname?.match(
		getRegexStringFromStringArray(VIDEO_EXTENSIONS),
	);
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

export function convertHexToRgba(hex: string, opacity = CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT){
    let color: any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        color= hex.substring(1).split('');
        if(color.length== 3){
            color= [color[0], color[0], color[1], color[1], color[2], color[2]];
        }
        color= '0x'+color.join('');
        return `rgba(${[(color>>16)&255, (color>>8)&255, color&255].join(',')},${opacity > 1 ? 1 : opacity < 0 ? 0 : opacity})`;
    }
    return hex;
}

export function setCssCustomProperty(propertyName: string, newValue: string) {
    document.documentElement.style.setProperty(
        `--${propertyName}`,
        newValue,
    );
}

export async function toggleFullScreenMode(element: HTMLElement | null, currentItemIndex: number) {
    try {
        const isFullScreenPossible = document.fullscreenEnabled;
    
        if (!isFullScreenPossible || !element) return;
        const itemInFullScreenMode = document.fullscreenElement;
        if (itemInFullScreenMode) {
            if (currentItemIndex === CURRENT_ITEM_INDEX_INITIAL) {
                document.exitFullscreen();
            }
        } else {
            await element.requestFullscreen();
        }
    } catch(e) {}
	
}