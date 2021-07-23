import { CSSProperties } from "react";

export const WEBSITE_BRIDGE_URL = "https://still-bayou-51404.herokuapp.com";
export const WEBSITE_REPLAYS_URL = "https://amajreplays.herokuapp.com";

export const ANIMATION_DURATION = 500;
export const MOBILE_BREAK_POINT_WIDTH = 1100;
export const PAGE_NAV_WIDTH_AT_SWITCH_OFFSET = 192;
export let computedStyle = getComputedStyle(document.documentElement);
export const PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME = '--page-nav-min-column-width';
//#region CSS Colors
// export const COLOR_PRIMARY_1 = computedStyle.getPropertyValue('--color-primary-1');
// export const COLOR_PRIMARY_2 = computedStyle.getPropertyValue('--color-primary-2');
// export const COLOR_PRIMARY_3 = computedStyle.getPropertyValue('--color-primary-3');
// export const COLOR_PRIMARY_4 = computedStyle.getPropertyValue('--color-primary-4');

//#endregion
//#region Breakpoint Stuff
export interface Reference {
  current: HTMLElement;
}

export type CSharpSection = {
	name: string,
	pageName: string,
	children: any[],
	styles?: CSSProperties,
}

export const headerTogglerWidth = parseFloat(computedStyle.getPropertyValue('--header-toggler-width'));
export const smallFontMaxWidth = parseFloat(computedStyle.getPropertyValue('--small-font-max-width'));
export const navBreakMaxWidth = parseFloat(computedStyle.getPropertyValue('--nav-break-max-width'));
export const phoneMaxWidth = parseFloat(computedStyle.getPropertyValue('--phone-max-width'));
export const tabPortMaxWidth = parseFloat(computedStyle.getPropertyValue('--tab-port-max-width'));
export const tabLandMaxWidth = parseFloat(computedStyle.getPropertyValue('--tab-land-max-width'));
export const navSwitchWidth = parseFloat(computedStyle.getPropertyValue('--nav-switch-width'));
export const largerThanNavSwitchWidth = parseFloat(computedStyle.getPropertyValue('--larger-than-nav-switch'));
export const bigDesktopPixelMin = parseFloat(computedStyle.getPropertyValue('--big-desktop-min-width'));
export const siteNavOriginalButtonWidth = computedStyle.getPropertyValue('--site-nav-button-width');
export const bridgeSectionHeightDefault = computedStyle.getPropertyValue('--bridge-section-height');
export const bridgeSectionPaddingDefault = computedStyle.getPropertyValue('--bridge-section-padding');

const offset = .00000000000001;
export const viewPortPixelToRem: {
  [wide: string]: {
    pixelsToRem: number,
    max: number,
    min: number,
  }
} = {
  wide: {
    pixelsToRem: 12,
    max: 10000,
    min: (bigDesktopPixelMin) * 16,
  },
  full: {
    pixelsToRem: 10,
    max: (bigDesktopPixelMin - offset) * 16,
    min: (tabPortMaxWidth + offset) * 16,
  },
  tabPort: {
    pixelsToRem: 9,
    max: (tabPortMaxWidth) * 16,
    min: (navBreakMaxWidth + offset) * 16,
  },
  navBreak: {
    pixelsToRem: 8,
    max: (navBreakMaxWidth) * 16,
    min: 0,
  },
}

export const email = 'adam.j.major@gmail.com';
export const SLIDING_CLASSNAME = 'sliding';
export const TRANSITION_NONE_CLASSNAME = 'transition-none';
export const Z_INDEX_HIGHEST_CLASSNAME = 'z-index-highest';
export const Z_INDEX_CONTENT_CLASSNAME = 'z-index-content';
export const Z_INDEX_NAVBAR_CLASSNAME = 'z-index-navbar';
export const OVERFLOW_HIDDEN_CLASSNAME = 'overflow--hidden';
export const TRANSPARENT_CLASSNAME = 'transparent';
export const DISPLAY_NONE_CLASSNAME = 'd-none';
export const HIDDEN_CLASSNAME = 'hidden';
export const BODY_BACKGROUND_CSS_CLASSNAME = "--body-background";
export const SITE_NAV_BUTTON_WIDTH_CSS_CLASSNAME = "--site-nav-button-width";
export const NO_MARGIN_CLASSNAME = "margin-0";
export const PAGE_NAV_CLASSNAME = 'page-nav';

//determines which class name gets applied to body by default (index of PAGE_NAMES); 
//only applies if you forget to add page name to PAGE_NAMES
export const DEFAULT_PAGE_NAME_INDEX = 2; 
export const PAGE_NAMES = [
  "",
  "/bridge",
  "/resume",
  "/downloader",
  "/playlist-syncer",
  "/autobid",
  "/replay",
];

//#endregion
