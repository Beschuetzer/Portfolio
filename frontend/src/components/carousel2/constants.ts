import { getClassname } from "./utils";

export const CLASSNAME__ROOT = 'thumbnail-carousel';
export const CLASSNAME__BUTTON = `${CLASSNAME__ROOT}-button`;
export const CLASSNAME__CAROUSEL_ITEM = getClassname({ elementName: 'item' });
export const CLASSNAME__ITEM_VIEWER = 'item-viewer';
export const CLASSNAME__ITEM_VIEWER_BUTTON = `${CLASSNAME__ITEM_VIEWER}-button`;
export const CLASSNAME__OVERLAY_BUTTON_TOP = `${CLASSNAME__ROOT}-video-overlay-custom-button-top`;
export const CLASSNAME__OVERLAY_BUTTON_RIGHT = `${CLASSNAME__ROOT}-video-overlay-custom-button-right`;
export const CAROUSEL_DOT_OPACITY_DEFAULT = .5;
export const CAROUSEL_DOT_COLOR_DEFAULT = "black";
export const CAROUSEL_ITEM_SIZE_DEFAULT = 150;  //in px
export const CAROUSEL_ITEM_SPACING_DEFAULT = 10; //in px
export const CAROUSEL_ITEM_SPACING_UNIT = 'px'
export const MOBILE_PIXEL_WIDTH = 655;
export const NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS = 2;
export const EMPTY_STRING = "";
export const VIDEO_EXTENSIONS = ["mp4", "ogv", "webm", "ogg"];