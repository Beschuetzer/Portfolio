import { getClassname } from "./utils";
import { KeyInput, ModifierKey, ValidKey } from "./hooks/useKeyboardShortcuts";

export const AUTO_HIDE_DISABLED_VALUE = 0;
export const AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT = 2500;
export const CURRENT_ITEM_INDEX_INITIAL = 0;
export const CURRENT_PAGE_INITIAL = 0;
export const GET_CURRENT_VALUE_DEFAULT = 0;
export const EMPTY_STRING = "";
export const MAX_CLICK_THRESHOLD_DEFAULT = 15;
export const NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS = 2;
export const NUMBER_OF_PAGES_INITIAL = 0;
export const SEEK_AMOUNT_DEFAULT = 5000;
export const TRANSLATION_AMOUNT_INITIAL = 0;
export const VIDEO_EXTENSIONS = ["mp4", "ogv", "webm", "ogg"];
export const WINDOW_RESIZE_DEBOUNCE = 250;

//#region ClassNames
export const CLASSNAME__ROOT = 'thumbnail-carousel';
export const CLASSNAME__BUTTON = `${CLASSNAME__ROOT}-button`;
export const CLASSNAME__BUTTON_SCALE_ON_HOVER = `${CLASSNAME__BUTTON}--scale-on-hover`
export const CLASSNAME__CAROUSEL_ITEM = getClassname({ elementName: 'item' });
export const CLASSNAME__CAROUSEL_ITEM_THUMBNAIL = getClassname({ elementName: 'item-thumbnail' });
export const CLASSNAME__DISPLAY_NONE = getClassname({ modifiedName: 'd-none' });
export const CLASSNAME__GRABBING = 'grabbing';
export const CLASSNAME__HIDDEN = getClassname({ modifiedName: 'hidden' });
export const CLASSNAME__ITEM_CONTAINER_NO_TOOLBAR = getClassname({ elementName: `item-container--no-toolbar` });
export const CLASSNAME__ITEM_VIEWER = 'item-viewer';
export const CLASSNAME__ITEM_VIEWER_BUTTON = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-button` });
export const CLASSNAME__ITEM_VIEWER_TOOLBAR = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar` });
export const CLASSNAME__TOOLBAR_CONTAINER = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-container` });
export const CLASSNAME__TOOLBAR_LEFT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-left` });
export const CLASSNAME__TOOLBAR_RIGHT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-right` });
export const CLASSNAME__VIDEO_MODAL_BUTTON_TOP = `${CLASSNAME__ROOT}-video-modal-custom-button-top`;
export const CLASSNAME__VIDEO_MODAL_BUTTON_RIGHT = `${CLASSNAME__ROOT}-video-modal-custom-button-right`;
//#endregion

//#region Styling
export const CAROUSEL_COLOR_ONE = "#1d0e0b";
export const CAROUSEL_COLOR_TWO = "#774023";
export const CAROUSEL_COLOR_THREE = "#d88c51";
export const CAROUSEL_COLOR_FOUR = "#f3e7c9";
export const CAROUSEL_COLOR_FIVE = "#fff9f5";
export const CAROUSEL_DOT_OPACITY_DEFAULT = .5;
export const CAROUSEL_DOT_HEIGHT_DEFAULT = 24;
export const CAROUSEL_DOT_WIDTH_DEFAULT = 16;
export const CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT = 500;  //in px
export const CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT = 4; //in px
export const CAROUSEL_ITEM_SIZE_DEFAULT = 150;  //in px
export const CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT = 50;  //in px
export const CAROUSEL_ITEM_SPACING_DEFAULT = 10; //in px
export const CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT = .66;
export const CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT = 2;
export const CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT = 0;  //in px
export const CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT = 20;  //in px
export const CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_DEFAULT = `1px solid ${CAROUSEL_COLOR_FIVE}`;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_CENTER_LINE_OPACITY_DEFAULT = .66;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_RADIUS_DEFAULT = 5;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_FIT_DEFAULT = 'cover';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_NO_SWAP_DEFAULT = 'left';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_SWAP_DEFAULT = 'right';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IS_VISIBLE_DEFAULT = false;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_OPACITY_DEFAULT = .9;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_SWAP_IMAGE_AND_TEXT_DEFAULT = false;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_PADDING_DEFAULT = {top: 0, bottom: 0, left: 0, right: 0};
export const CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_VERTICAL_ALIGNMENT_DEFAULT = 'flex-start';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT = 300;
export const CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT = 14;  //in px
export const CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT = 12;  //in px
export const CAROUSEL_OVERLAY_ITEM_PADDING_TOP = 10;  //in px
export const CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT = 20;  //in px
export const CAROUSEL_SPACING_UNIT = 'px'
export const CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT = 24;
export const CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT = 18;
export const CAROUSEL_VIDEO_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT = 18;
export const CURRENT_VIDEO_CURRENT_TIME_DEFAULT = 0;
export const MOBILE_PIXEL_WIDTH = 655;
//#endregion

//#region ItemViewer Shortcuts
export const ITEM_VIEWER_CLOSE_SHORTCUTS: KeyInput[] = [ValidKey.c, ValidKey.x, ValidKey.escape];
export const ITEM_VIEWER_PLAY_SHORTCUTS: KeyInput[] = [ValidKey.k, ValidKey.spacebar];
export const ITEM_VIEWER_SEEK_BACKWARDS_SHORTCUTS: KeyInput[] = [ValidKey.b, [ModifierKey.shift, ValidKey.arrowLeft]];
export const ITEM_VIEWER_SEEK_FORWARDS_SHORTCUTS: KeyInput[] = [ValidKey.f, [ModifierKey.shift, ValidKey.arrowRight]];
export const ITEM_VIEWER_NEXT_ITEM_SHORTCUTS: KeyInput[] = [ValidKey.arrowRight, ValidKey.n];
export const ITEM_VIEWER_PREVIOUS_ITEM_SHORTCUTS: KeyInput[] = [ValidKey.arrowLeft, ValidKey.p];
//#endregion