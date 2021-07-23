import { CSSProperties } from "react";

export const BOOK_TRUST_URL = "https://www.booktrust.org";
export const BRIDGE_URL = "https://still-bayou-51404.herokuapp.com";
export const GITHUB_URL = "http://github.com/beschuetzer";
export const GOOGLE_IT_SPECIALIST_URL = "https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ";
export const HERMAN_LIETZ_SCHULE_URL = "https://www.lietz-schulen.de/en/haubinda/boarding-school-village/";
export const ISD_622_URL = "https://www.isd622.org/";
export const KH_INSIDER_URL = "https://downloads.khinsider.com";
export const KUALAPUU_URL = "https://www.kualapuucharterschool.org/";
export const OC_REMIX_URL = "https://www.ocremix.org";
export const ODIN_PROJECT_URL = "https://www.theodinproject.com/";
export const OS_10_ISSUE_TRACKER_URL = "https://issuetracker.google.com/issues/150054563"
export const REPLAYS_URL = "https://amajreplays.herokuapp.com";
export const RICOH_URL = "https://www.ricoh-usa.com/en";
export const TOYS_R_US_RUL = "https://www.toysrus.com/";
export const QUOTE_API_URL = 'https://api.quotable.io';
export const WIKIPEDIA_BRIDGE_URL = "https://en.wikipedia.org/wiki/Contract_bridge";
export const WIKIPEDIA_MTP_URL = "https://en.wikipedia.org/wiki/Media_Transfer_Protocol";
export const WIKIPEDIA_DRM_URL = "https://en.wikipedia.org/wiki/Windows_Media_DRM";
export const UDEMY_BOOTCAMP_URL = "https://www.udemy.com/course/the-web-developer-bootcamp/";




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
