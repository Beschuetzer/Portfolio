import { CSSProperties } from "react";

//#region note: Add page names here
export const ABOUT_PAGE_NAME = "about";
export const AUTO_BID_PAGE_NAME = "autobid";
export const REPLAY_PAGE_NAME = "replay";
export const BRIDGE_PAGE_NAME = "bridge";
export const BRIDGE_DEMO_PAGE_NAME = "bridge-demo";
export const DOWNLOADER_PAGE_NAME = "downloader";
export const PLAYLIST_SYNCER_PAGE_NAME = "playlist-syncer";
export const RESUME_PAGE_NAME = "resume";

//note: and here
export const PAGE_NAMES = [
	``,
	`/${ABOUT_PAGE_NAME}`,
	`/${AUTO_BID_PAGE_NAME}`,
	`/${BRIDGE_PAGE_NAME}`,
	`/${DOWNLOADER_PAGE_NAME}`,
	`/${PLAYLIST_SYNCER_PAGE_NAME}`,
	`/${REPLAY_PAGE_NAME}`,
	`/${RESUME_PAGE_NAME}`,
];
//#endregion

//#region Internal URLs
export const PLAYLIST_SYNCER_URL = `/examples/${PLAYLIST_SYNCER_PAGE_NAME}`;
export const DOWNLOADER_URL = `/examples/${DOWNLOADER_PAGE_NAME}`;
export const BRIDGE_URL = `/examples/${BRIDGE_PAGE_NAME}`;
export const BRIDGE_DEMO_URL = `/examples/${BRIDGE_PAGE_NAME}/demo`;
export const REPLAY_VIEWER_URL = `/examples/${REPLAY_PAGE_NAME}`;
export const AUTO_BID_URL = `/examples/${AUTO_BID_PAGE_NAME}`;
export const RESUME_URL = `/${RESUME_PAGE_NAME}`;
export const ABOUT_URL = `/${ABOUT_PAGE_NAME}`;
//#endregion

//#region External URLs
export const BOOK_TRUST_URL = "https://www.booktrust.org";
export const AMAJ_BRIDGE_URL = "https://still-bayou-51404.herokuapp.com";
export const GITHUB_URL = "http://github.com/beschuetzer";
export const POWERSHELL_URL = `${GITHUB_URL}/powerShell`;
export const GOOGLE_IT_SPECIALIST_URL =
	"https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ";
export const HERMAN_LIETZ_SCHULE_URL =
	"https://www.lietz-schulen.de/en/haubinda/boarding-school-village/";
export const ISD_622_URL = "https://www.isd622.org/";
export const KH_INSIDER_URL = "https://downloads.khinsider.com";
export const KUALAPUU_URL = "https://www.kualapuucharterschool.org/";
export const OC_REMIX_URL = "https://www.ocremix.org";
export const ODIN_PROJECT_URL = "https://www.theodinproject.com/";
export const OS_10_ISSUE_TRACKER_URL =
	"https://issuetracker.google.com/issues/150054563";
export const REPLAYS_URL = "https://amajreplays.herokuapp.com";
export const RICOH_URL = "https://www.ricoh-usa.com/en";
export const TOYS_R_US_RUL = "https://www.toysrus.com/";
export const QUOTE_API_URL = "https://api.quotable.io";
export const WIKIPEDIA_BRIDGE_URL =
	"https://en.wikipedia.org/wiki/Contract_bridge";
export const WIKIPEDIA_MTP_URL =
	"https://en.wikipedia.org/wiki/Media_Transfer_Protocol";
export const WIKIPEDIA_DRM_URL =
	"https://en.wikipedia.org/wiki/Windows_Media_DRM";
export const UDEMY_BOOTCAMP_URL =
	"https://www.udemy.com/course/the-web-developer-bootcamp/";
export const GERMANY_APP_URL = "/germany-application-letter.pdf";
//#endregion

//#region Globally-relevant Constants
export const ANIMATION_DURATION = 500;
export const MOBILE_BREAK_POINT_WIDTH = 1100;
export const PAGE_NAV_WIDTH_AT_SWITCH_OFFSET = 192;
//#endregion

//#region CSS Property Names
export let computedStyle = getComputedStyle(document.documentElement);
export const PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME =
	"--page-nav-min-column-width";
export const AUDIO_PLAYER_TOGGLER_ROTATION_CLOSED_CSS_PROPERTY_NAME =
	"--audio-player-toggler-rotation-closed";
export const AUDIO_PLAYER_TOGGLER_ROTATION_OPEN_CSS_PROPERTY_NAME =
	"--audio-player-toggler-rotation-open";
//#endregion

//#region Breakpoint Stuff
export const headerTogglerWidth = parseFloat(
	computedStyle.getPropertyValue("--header-toggler-width"),
);
export const smallFontMaxWidth = parseFloat(
	computedStyle.getPropertyValue("--small-font-max-width"),
);
export const navBreakMaxWidth = parseFloat(
	computedStyle.getPropertyValue("--nav-break-max-width"),
);
export const phoneMaxWidth = parseFloat(
	computedStyle.getPropertyValue("--phone-max-width"),
);
export const tabPortMaxWidth = parseFloat(
	computedStyle.getPropertyValue("--tab-port-max-width"),
);
export const tabLandMaxWidth = parseFloat(
	computedStyle.getPropertyValue("--tab-land-max-width"),
);
export const navSwitchWidth = parseFloat(
	computedStyle.getPropertyValue("--nav-switch-width"),
);
export const largerThanNavSwitchWidth = parseFloat(
	computedStyle.getPropertyValue("--larger-than-nav-switch"),
);
export const bigDesktopPixelMin = parseFloat(
	computedStyle.getPropertyValue("--big-desktop-min-width"),
);
export const siteNavOriginalButtonWidth = computedStyle.getPropertyValue(
	"--site-nav-button-width",
);
export const bridgeSectionHeightDefault = computedStyle.getPropertyValue(
	"--bridge-section-height",
);
export const bridgeSectionPaddingDefault = computedStyle.getPropertyValue(
	"--bridge-section-padding",
);
export const carouselGridWidth = computedStyle.getPropertyValue(
	"--carousel-grid-width",
);
export const quotePopupTransformDefault = computedStyle.getPropertyValue(
	"--quote-popup-transform-default",
);

const offset = 0.00000000000001;
export const viewPortPixelToRem: {
	[wide: string]: {
		pixelsToRem: number;
		max: number;
		min: number;
	};
} = {
	wide: {
		pixelsToRem: 12,
		max: 10000,
		min: bigDesktopPixelMin * 16,
	},
	full: {
		pixelsToRem: 10,
		max: (bigDesktopPixelMin - offset) * 16,
		min: (tabPortMaxWidth + offset) * 16,
	},
	tabPort: {
		pixelsToRem: 9,
		max: tabPortMaxWidth * 16,
		min: (navBreakMaxWidth + offset) * 16,
	},
	navBreak: {
		pixelsToRem: 8,
		max: navBreakMaxWidth * 16,
		min: 0,
	},
};

export const EMAIL = "adam.j.major@gmail.com";
const SUBJECT = "";
const BODY = "";
export const MAIL_TO_STRING =
	"mailto:" + EMAIL + "&subject=" + SUBJECT + "&body=" + BODY;
export const SLIDING_CLASSNAME = "sliding";
export const FILL_RED_CLASSNAME = "fill-red";
export const TRANSITION_NONE_CLASSNAME = "transition-none";
export const TRANSFORM_NONE_CLASSNAME = "transform-none";
export const Z_INDEX_HIGHEST_CLASSNAME = "z-index-highest";
export const Z_INDEX_CONTENT_CLASSNAME = "z-index-content";
export const Z_INDEX_NAVBAR_CLASSNAME = "z-index-navbar";
export const OVERFLOW_HIDDEN_CLASSNAME = "overflow--hidden";
export const OVERFLOW_HIDDEN_ALWAYS_CLASSNAME = "overflow-hidden";
export const TRANSPARENT_CLASSNAME = "transparent";
export const DISPLAY_NONE_CLASSNAME = "d-none";
export const HIDDEN_CLASSNAME = "hidden";
export const BODY_BACKGROUND_CSS_CLASSNAME = "--body-background";
export const SITE_NAV_BUTTON_WIDTH_CSS_CLASSNAME = "--site-nav-button-width";
export const NO_MARGIN_CLASSNAME = "margin-0";
export const PAGE_NAV_CLASSNAME = "page-nav";

//determines which class name gets applied to body by default (index of PAGE_NAMES);
//only applies if you forget to add page name to PAGE_NAMES
export const DEFAULT_PAGE_NAME_INDEX = 2;

//#endregion

//#region Global Types and Interfaces
export interface CSharpSection {
	name: string;
	pageName: string;
	children: any[];
	hasCarousel?: boolean;
	styles?: CSSProperties;
}

export interface Reference {
	current: HTMLElement;
}

export type ArrowButtonDirection = "left" | "right";
//#endregion
