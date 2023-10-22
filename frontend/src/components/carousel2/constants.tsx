import { KeyInput, ValidKey, ModifierKey, CarouselItemViewerAspectRatioPreset } from "./types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StylingLogic } from './business-logic/StylingLogic';
import { getClassname } from "./utils/utils";

export const AUTO_CHANGE_PAGE_DEFAULT = true;
export const AUTO_HIDE_DISABLED_VALUE = 0;
export const AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT = 2500;
export const CURRENT_ITEM_INDEX_INITIAL = 0;
export const CURRENT_PAGE_INITIAL = 0;
export const DISABLE_WRAPPING_DEFAULT = false;
export const EMPTY_STRING = "";
export const FONT_WEIGHT_DEFAULT = 400;
export const GET_CURRENT_VALUE_DEFAULT = 0;
export const IMAGE_EXTENSIONS = [
    "apng",
    "avif",
    "gif",
    "jpg",
    "jpeg",
    "jfif",
    "pjpeg",
    "pjp",
    "png",
    "svg",
    "webp",
];
export const IS_LAST_PAGE_FLUSH_DEFAULT = true;
export const ITEM_CONTAINER_HEIGHT_INITIAL = 'auto';
export const ITEM_CONTAINER_MIN_DEFAULT = 125;
export const ITEM_VIEWER_USE_RECOMMENDED_ASPECT_RATIO = true;
export const ITEM_VIEWER_HEIGHT_DEFAULT = "widescreen";
export const ITEM_VIEWER_ASPECT_RATIOS_TO_DECIMAL_MAPPINGratioValues: { [key in CarouselItemViewerAspectRatioPreset]: number } = {
    widescreen: .5625, //16:9
    fullscreen: .75, //4:3
}
export const MAX_CLICK_THRESHOLD_DEFAULT = 15;
export const MODAL_IS_MINIMIZED_INITIAL = false;
export const MODAL_TEXT_TAG_DEFAULT = 'p';
export const MODAL_TITLE_TAG_DEFAULT = 'h3';
export const MODAL_MINIMIZE_ON_CLICK_DEFAULT = true;
export const MODAL_MAINTAIN_MINIMIZED_STATE_DEFAULT = false;
export const NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS = 2;
export const NUMBER_OF_MS_IN_A_SECOND = 1000;
export const NUMBER_OF_SECONDS_IN_A_MINUTE = 60;
export const NUMBER_OF_PAGES_INITIAL = 0;
export const PROGRESS_BAR_PERCENT_INITIAL_VALUE = -1;
export const PROGRESS_BAR_SHOW_CURRENT_POSITION_ON_CHANGE_DEFAULT = false;
export const SEEK_AMOUNT_DEFAULT = 5000;
export const TOOLBAR_TIME_STRING_SECTION_DIVIDER = ':';
export const TOOLBAR_MARGIN_RIGHT_OFFSET = 1;
export const THUMBNAIL_OVERLAY_IS_HIDDEN_DEFAULT = true;
export const TRANSLATION_AMOUNT_INITIAL = 0;
export const VIDEO_EXTENSIONS = ["mp4", "ogv", "webm", "ogg"];
export const USE_RECOMMENDEDED_ASPECT_RATIO_INITIAL = Number.MAX_SAFE_INTEGER;
export const WINDOW_RESIZE_DEBOUNCE = 250;


//#region ClassNames
export const CLASSNAME__ROOT = 'thumbnail-carousel'; //this has to match $carouselClassname in _variables.scss
export const CLASSNAME__DOTS = getClassname({ elementName: 'dots' });
export const CLASSNAME__BUTTON = `${CLASSNAME__ROOT}-button`;
export const CLASSNAME__BUTTON_SCALE_ON_HOVER = `${CLASSNAME__BUTTON}--scale-on-hover`
export const CLASSNAME__CAROUSEL_CONTAINER = `${CLASSNAME__ROOT}-container`; //this has to match $carouselClassname in _variables.scss
export const CLASSNAME__CAROUSEL_ITEM = getClassname({ elementName: 'item' });
export const CLASSNAME__CAROUSEL_ITEMS = getClassname({ elementName: "items" });
export const CLASSNAME__CAROUSEL_ITEMS_CONTAINER = `${CLASSNAME__CAROUSEL_ITEMS}-container`
export const CLASSNAME__CAROUSEL_ITEM_THUMBNAIL = getClassname({ elementName: 'item-thumbnail' });
export const CLASSNAME__DISPLAY_NONE = getClassname({ modifiedName: 'd-none' });
export const CLASSNAME__GRABBING = 'grabbing';
export const CLASSNAME__HIDDEN = getClassname({ modifiedName: 'hidden' });
export const CLASSNAME__ITEM_CONTAINER = getClassname({ elementName: `item-container` });
export const CLASSNAME__ITEM_CONTAINER_NO_TOOLBAR = `${CLASSNAME__ITEM_CONTAINER}--no-toolbar`;
export const CLASSNAME__ITEM_VIEWER = getClassname({ elementName: 'item-viewer' });
export const CLASSNAME__ITEM_VIEWER_BUTTON = `${CLASSNAME__ITEM_VIEWER}-button`;
export const CLASSNAME__ITEM_VIEWER_SHORTCUT_INDICATOR = `${CLASSNAME__ITEM_VIEWER}-shortcut-indicator`;
export const CLASSNAME__ITEM_VIEWER_TOOLBAR = `${CLASSNAME__ITEM_VIEWER}-toolbar`;
export const CLASSNAME__ITEM_VIEWER_TOOLBAR_TEXT = `${CLASSNAME__ITEM_VIEWER_TOOLBAR}-text`;
export const CLASSNAME__LOADING_SPINNER = getClassname({ elementName: 'loading' });
export const CLASSNAME__MODAL = getClassname({ elementName: 'modal' })
export const CLASSNAME__MODAL_CUSTOM = `${CLASSNAME__MODAL}-custom`;
export const CLASSNAME__MODAL_HEADER = `${CLASSNAME__MODAL}-header`;
export const CLASSNAME__MODAL_MINIMIZED = `${CLASSNAME__MODAL}-minimized`;
export const CLASSNAME__NAVIGATION = getClassname({ elementName: "navigation" });
export const CLASSNAME__TOOLBAR_CONTAINER = `${CLASSNAME__ITEM_VIEWER_TOOLBAR}-container`;
export const CLASSNAME__TOOLBAR_LEFT = `${CLASSNAME__ITEM_VIEWER_TOOLBAR}-left`;
export const CLASSNAME__TOOLBAR_PROGRESS = `${CLASSNAME__ITEM_VIEWER_TOOLBAR}-progress`;
export const CLASSNAME__TOOLBAR_RIGHT = `${CLASSNAME__ITEM_VIEWER_TOOLBAR}-right`;
export const CLASSNAME__VIDEO_SCREENSHOT_VIEWER = `${getClassname({ elementName: 'video-screenshot-viewer' })}`;
export const CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER = `${CLASSNAME__VIDEO_SCREENSHOT_VIEWER}-text-container`;
//#endregion

//#region CSS Custom Property Names (see _variables.scss)
export const CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_BACKGROUND_COLOR = `${CLASSNAME__ROOT}-modal-scrollbar-background-color`;
export const CSS_CUSTOM_PROPERTY_MODAL_SCROLLBAR_FOREGROUND_COLOR = `${CLASSNAME__ROOT}-modal-scrollbar-foreground-color`;
export const CSS_CUSTOM_PROPERTY_MODAL_OPACITY_MINIMIZED = `${CLASSNAME__ROOT}-modal-opacity-minimized`;
//#endregion

//#region Styling
export const CAROUSEL_COLOR_ONE = "#1d0e0b";
export const CAROUSEL_COLOR_TWO = "#774023";
export const CAROUSEL_COLOR_THREE = "#d88c51";
export const CAROUSEL_COLOR_FOUR = "#f3e7c9";
export const CAROUSEL_COLOR_FIVE = "#fff9f5";
export const CAROUSEL_COLOR_GREY_ONE = '#9b9b9b';
export const CAROUSEL_DOT_OPACITY_DEFAULT = .5;
export const CAROUSEL_DOT_HEIGHT_DEFAULT = 24;
export const CAROUSEL_DOT_WIDTH_DEFAULT = 16;
export const CAROUSEL_MAX_HEIGHT_DEFAULT = window.innerHeight / .75;  //in px
export const CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT = 4; //in px
export const CAROUSEL_ITEM_SIZE_DEFAULT = 150;  //in px
export const CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT = 50;  //in px
export const CAROUSEL_ITEM_SPACING_DEFAULT = 10; //in px
export const CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT = .66;
export const CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT = 2;
export const CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT = 0;  //in px
export const CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT = 20;  //in px
export const CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_CENTER_LINE_OPACITY_DEFAULT = .66;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_RADIUS_DEFAULT = 5;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_FIT_DEFAULT = 'cover';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_NO_SWAP_DEFAULT = 'left';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_SWAP_DEFAULT = 'right';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_IS_VISIBLE_DEFAULT = false;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_OPACITY_DEFAULT = .9;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_SWAP_IMAGE_AND_TEXT_DEFAULT = false;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_FONT_FAMILY_DEFAULT = 'sans-serif';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_SIZE_DEFAULT = 14;
export const CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_VERTICAL_ALIGNMENT_DEFAULT = 'flex-start';
export const CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT = 300;
export const CAROUSEL_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT = 18;
export const CAROUSEL_MODAL_PADDING_DEFAULT = { top: 20, bottom: 20, left: 20, right: 20 };
export const CAROUSEL_MODAL_MINIMIZED_OPACITY_DEFAULT = .875;
export const CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT = 14;  //in px
export const CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT = 12;  //in px
export const CAROUSEL_OVERLAY_ITEM_PADDING_TOP = 10;  //in px
export const CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT = 20;  //in px
export const CAROUSEL_PADDING_DEFAULT = { top: 0, bottom: 0, left: 0, right: 0 };
export const CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT = 20;
export const CAROUSEL_PROGRESS_BAR_DOT_DIAMETER = 14;
export const CAROUSEL_PROGRESS_BAR_DOT_IS_ALWAYS_VISIBLE = false;
export const CAROUSEL_PROGRESS_BAR_DOT_TRANSITION_DURATION = .25;
export const CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_EMBEDDED = 3;
export const CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_MOBILE = CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT - 4;
export const CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_NOT_EMBEDDED = 5;
export const CAROUSEL_PROGRESS_BAR_HEIGHT_MAX = 13;
export const CAROUSEL_PROGRESS_BAR_HEIGHT_MIN = 3;
export const CAROUSEL_PROGRESS_BAR_SECTION_GAP = 2;
export const CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MULTIPLE_SECTIONS_DEFAULT = 4;
export const CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MOBILE = 1;
export const CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_ONE_SECTION_DEFAULT = 2.5;
export const CAROUSEL_PROGRESS_BAR_SHOULD_SPAN_ENTIRE_WIDTH_DEFAULT = false;
export const CAROUSEL_SPACING_UNIT = 'px'
export const CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_ANGLE_DEFAULT = 180; //in degrees
export const CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_START_OPACITY_DEFAULT = 0;
export const CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_END_OPACITY_DEFAULT = 1;
export const CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MIN_DEFAULT = 10;
export const CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MIN_THESHOLD = 100;
export const CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MAX_DEFAULT = 12;
export const CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT = 24;
export const CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT = 18;
export const CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL = -1;
export const CAROUSEL_VIDEO_SECTION_MIN_LENGTH = 500;
export const CAROUSEL_VIDEO_SCREENSHOT_VIEWER_WIDTH_DEFAULT = 250;
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