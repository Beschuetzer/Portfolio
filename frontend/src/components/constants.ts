import { getComputedStyleCustom } from "../helpers";
import { BridgeColors as BridgeSectionColors, MaxCharCount, MaxCharCounts } from "../types";

//#region note: Add page names here
export const ABOUT_PAGE_NAME = "about";
export const AUTO_BID_PAGE_NAME = "autobid";
export const BIG_FIVE_PAGE_NAME = "the-big-five";
export const BRIDGE_DEMO_PAGE_NAME = "bridge-demo";
export const BRIDGE_PAGE_NAME = "bridge";
export const DOWNLOADER_PAGE_NAME = "downloader";
export const PLAYLIST_SYNCER_PAGE_NAME = "playlist-syncer";
export const REPLAY_PAGE_NAME = "replay";
export const RESUME_PAGE_NAME = "resume";

//note: and here
export const PAGE_NAMES = [
  ``,
  `/${ABOUT_PAGE_NAME}`,
  `/${AUTO_BID_PAGE_NAME}`,
  `/${BRIDGE_PAGE_NAME}`,
  `/${BRIDGE_DEMO_PAGE_NAME}`,
  `/${DOWNLOADER_PAGE_NAME}`,
  `/${PLAYLIST_SYNCER_PAGE_NAME}`,
  `/${REPLAY_PAGE_NAME}`,
  `/${RESUME_PAGE_NAME}`,
  `/${BIG_FIVE_PAGE_NAME}`,
];
//#endregion

//#region Internal URLs
export const ABOUT_URL = `/${ABOUT_PAGE_NAME}`;
export const AUTO_BID_URL = `/examples/${AUTO_BID_PAGE_NAME}`;
export const BRIDGE_DEMO_URL = `/${BRIDGE_DEMO_PAGE_NAME}`;
export const BRIDGE_URL = `/examples/${BRIDGE_PAGE_NAME}`;
export const BRIDGE_LIVE_URL = `/${BRIDGE_PAGE_NAME}`;
export const DOWNLOADER_URL = `/examples/${DOWNLOADER_PAGE_NAME}`;
export const PERSONALITY_URL = `/${BIG_FIVE_PAGE_NAME}`;
export const PLAYLIST_SYNCER_URL = `/examples/${PLAYLIST_SYNCER_PAGE_NAME}`;
export const REPLAY_VIEWER_URL = `/examples/${REPLAY_PAGE_NAME}`;
export const REPLAY_LIVE_URL = `/${REPLAY_PAGE_NAME}`;
export const RESUME_URL = `/${RESUME_PAGE_NAME}`;
//#endregion

//#region External URLs
export const BEST_BUY_URL = "http://www.bestbuy.com";
export const BOOK_TRUST_URL = "https://www.booktrust.org";
export const GERMANY_APP_URL = "/germany-application-letter.pdf";
export const GITHUB_URL = "http://github.com/beschuetzer";
export const GOOGLE_IT_SPECIALIST_URL = "https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ";
export const HARMONY_URL = "https://www.isd622.org/harmony";
export const HERMAN_LIETZ_SCHULE_URL = "https://www.lietz-schulen.de/en/haubinda/boarding-school-village/";
export const HUBB_CENTER_URL = "https://www.spps.org/hubbs";
export const ISD_622_URL = "https://www.isd622.org/";
export const KH_INSIDER_URL = "https://downloads.khinsider.com";
export const KUALAPUU_URL = "https://www.kualapuucharterschool.org/";
export const LIVE_BRIDGE_URL = "https://adammajorbridge-fd17369edc04.herokuapp.com/";
export const LIVE_REPLAYS_URL = "https://amajreplays.herokuapp.com";
export const OC_REMIX_URL = "https://www.ocremix.org";
export const ODIN_PROJECT_URL = "https://www.theodinproject.com/";
export const OS_10_ISSUE_TRACKER_URL = "https://issuetracker.google.com/issues/150054563";
export const POWERSHELL_URL = `${GITHUB_URL}/powerShell`;
export const RICOH_URL = "https://www.ricoh-usa.com/en";
export const TOYS_R_US_RUL = "https://www.toysrus.com/";
export const UDEMY_BOOTCAMP_URL = "https://www.udemy.com/course/the-web-developer-bootcamp/";
export const WIKIPEDIA_BRIDGE_URL = "https://en.wikipedia.org/wiki/Contract_bridge";
export const WIKIPEDIA_DRM_URL = "https://en.wikipedia.org/wiki/Windows_Media_DRM";
export const WIKIPEDIA_MTP_URL = "https://en.wikipedia.org/wiki/Media_Transfer_Protocol";
export const YORK_B2E_URL = "https://yorksolutions.net/b2e-career-seekers/"
//#endregion

//#region Globally-relevant Constants
export const ANIMATION_DURATION = 500;
export const ANIMATION_DURATION_WAIT_FACTOR = 1.1;
export const MOBILE_BREAK_POINT_WIDTH = 1100;
export const PAGE_NAV_WIDTH_AT_SWITCH_OFFSET = 192;
//#endregion

//#region CSS classnames
export const BRIDGE_CLASSNAME = 'bridge';
export const BRIDGE_BACKDROP_CLASSNAME = `${BRIDGE_CLASSNAME}__backdrop`;
export const BRIDGE_CARD_SECTION_CLASSNAME = `${BRIDGE_CLASSNAME}__card-section`;
export const BRIDGE_CURRENT_SECTION_CLASSNAME = `${BRIDGE_CLASSNAME}__current-section`;
export const BRIDGE_HERO_CLASSNAME = 'hero';
export const BRIDGE_HERO_CLICKED_CLASSNAME = "hero--clicked";
export const BRIDGE_HERO_MORE__CLICKED_CLASSNAME = "hero__more--clicked";
export const BRIDGE_PAGE_NAV_LINK_CLASSNAME = `${BRIDGE_CLASSNAME}__page-nav-link`;
export const BRIDGE_PAGE_NAV_LINK_CLASSNAMES = `${BRIDGE_PAGE_NAV_LINK_CLASSNAME} page-nav__section`;
export const BRIDGE_SECTION_TITLES_CLASSNAME = `${BRIDGE_CLASSNAME}__section-titles`;
export const C_SHARP_CLASSNAME = "csharp";
export const C_SHARP_CARD_SECTION_CLASSNAME = `${C_SHARP_CLASSNAME}__card-section`
export const C_SHARP_CARD_SECTION_TITLE_CLASSNAME = `${C_SHARP_CLASSNAME}__card-section-title`;
export const C_SHARP_CARD_SECTION_CONTENT_CLASSNAME = `${C_SHARP_CLASSNAME}__section-content`;
export const CARD_DEFAULT_CLASSNAME = "card card--hoverable";
export const CARD_DONE_CLASSNAME = "card--done";
export const CARD_OPEN_CLASSNAME = "card--open";
export const CARD_PLAYING_CLASSNAME = "card--playing";
export const CARD_STOPPED_CLASSNAME = "card--stopped";
export const CAROUSEL_CLASSNAME = "carousel";
export const CAROUSEL_ARROW_BUTTONS_CLASSNAME = `${CAROUSEL_CLASSNAME}__arrow-button`;
export const CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--left`;
export const CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--right`;
export const CAROUSEL_ITEM_CLASSNAME = `${CAROUSEL_CLASSNAME}__item`;
export const CAROUSEL_DOT_CLASSNAME = `${CAROUSEL_CLASSNAME}__dot`;
export const CAROUSEL_DESCRIPTION_CLASSNAME = `${CAROUSEL_ITEM_CLASSNAME}-description`;
export const CAROUSEL_DOT_ACTIVE_CLASSNAME = `${CAROUSEL_DOT_CLASSNAME}--active`;
export const CAROUSEL_IMAGE_CLASSNAME = `${CAROUSEL_CLASSNAME}__image`;
export const CAROUSEL_TRANSITION_CLASSNAME = "carousel-transition";
export const CAROUSEL_VIDEO_CLASSNAME = `${CAROUSEL_CLASSNAME}__video`;
export const CONTAINS_CAROUSEL_CLASSNAME = "contains-carousel";
export const DISPLAY_NONE_CLASSNAME = "d-none";
export const DONE_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--done`;
export const EDUCATION_CLASSNAME = "education";
export const FILL_RED_CLASSNAME = "fill-red";
export const FULLSCREEN_ARROW_BUTTON_CLASSNAME = `${CAROUSEL_CLASSNAME}__arrow-button--full-screen`;
export const FULLSCREEN_CLASSNAME = "full-screen";
export const FULLSCREEN_PARENT_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--full-screen`;
export const HIDDEN_CLASSNAME = "hidden";
export const HOME_CANVAS_CLASSNAME = "home__canvas";
export const NO_MARGIN_CLASSNAME = "margin-0";
export const OVERFLOW_HIDDEN_ALWAYS_CLASSNAME = "overflow-hidden";
export const OVERFLOW_HIDDEN_CLASSNAME = "overflow--hidden";
export const PAGE_NAV_CLASSNAME = "page-nav";
export const PAGE_NAV_ACTIVE_CLASSNAME = "page-nav--active";
export const PLAYING_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--playing`;
export const REFERENCES_CLASSNAME = "references";
export const SITE_NAV_BUTTON_WIDTH_CSS_CLASSNAME = "--site-nav-button-width";
export const SKILLS_CLASSNAME = "skills";
export const SKILLS_SECTION_CLASSNAME = `${SKILLS_CLASSNAME}__section`;
export const SKILLS_SECTION_OPEN_CLASSNAME = `${SKILLS_CLASSNAME}__section--open`;
export const SLIDING_CLASSNAME = "sliding";
export const STOPPED_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--stopped`;
export const TRANSFORM_NONE_CLASSNAME = "transform-none";
export const TRANSFORM_REMOVED_CLASSNAME = "transform-removed";
export const TRANSITION_NONE_CLASSNAME = "transition-none";
export const TRANSPARENT_CLASSNAME = "transparent";
export const UNCLICKABLE_CLASSNAME = "unclickable";
export const Z_INDEX_CONTENT_CLASSNAME = "z-index-content";
export const Z_INDEX_HIGHEST_CLASSNAME = "z-index-highest";
export const Z_INDEX_NAVBAR_CLASSNAME = "z-index-navbar";
//#endregion

//#region CSS Property Names
export const AUDIO_PLAYER_TOGGLER_ROTATION_CLOSED_CUSTOM_PROPERTY_NAME = "--audio-player-toggler-rotation-closed";
export const AUDIO_PLAYER_TOGGLER_ROTATION_OPEN_CUSTOM_PROPERTY_NAME = "--audio-player-toggler-rotation-open";
export const BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME = "--bridge-arrow-button-left-fill";
export const BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME = "--bridge-arrow-button-right-fill";
export const BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME = "--bridge-link-svg-fill";
export const BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME = "--bridge-link-text-fill";
export const BRIDGE_PAGE_NAV_LINK_COLOR_CUSTOM_PROPERTY_NAME = "--bridge-page-nav-link-color";
export const COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME = '--color-primary-bridge-1';
export const COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME = '--color-primary-bridge-2';
export const COLOR_PRIMARY_BRIDGE_3_CUSTOM_PROPERTY_NAME = '--color-primary-bridge-3';
export const COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME = '--color-primary-bridge-4';
export const BODY_BACKGROUND_CUSTOM_PROPERTY_NAME = "--body-background";
export const BRIDGE_GRADIENT_DIRECTION_CUSTOM_PROPERTY_NAME = "--bridge-gradient-direction";
export const BRIDGE_SECTION_HEIGHT_CUSTOM_PROPERTY_NAME = "--bridge-section-height";
export const BRIDGE_SECTION_PADDING_CUSTOM_PROPERTY_NAME = "--bridge-section-padding";
export const CAROUSEL_GRID_WIDTH_CUSTOM_PROPERTY_NAME = "--carousel-grid-width";
export const CAROUSEL_TRANSLATION_CUSTOM_PROPERTY_NAME = `--${CAROUSEL_CLASSNAME}-item-translation-x`;
export const HEADER_HEIGHT_CUSTOM_PROPERTY_NAME = '--header-height';
export const HEADER_TOGGLER_CUSTOM_PROPERTY_NAME = "--header-toggler-height";
export const NAVBAR_LOGO_WIDTH_CUSTOM_PROPERTY_NAME = '--navbar-logo-width';
export const PAGE_NAV_MIN_COLUMN_WIDTH_CUSTOM_PROPERTY_NAME = "--page-nav-min-column-width";
export const QUOTE_POPUP_TRANSFORM_DEFAULT_CUSTOM_PROPERTY_NAME = "--quote-popup-transform-default";
//#endregion

//#region Email Contact
export const EMAIL = "adam.j.major@gmail.com";
const SUBJECT = "";
const BODY = "";
export const MAIL_TO_STRING =
	"mailto:" + EMAIL + "&subject=" + SUBJECT + "&body=" + BODY;
//#endregion

//determines which class name gets applied to body by default (index of PAGE_NAMES);
//only applies if you forget to add page name to PAGE_NAMES
export const DEFAULT_PAGE_NAME_INDEX = 2;

//#endregion

//#region Styling Stuff
export const DEFAULT_FONT_SIZE = 1.4; //this is in rem
//#endregion

//#region Header and Navigation
export const BODY_BACKGROUND_CLASSNAME = "body-background";
export const HEADER_ID = "#header";
export const HEADER_TOGGLER_CLASSNAME = "header-toggler";
export const HEADER_TOGGLER_ACTIVE_CLASSNAME = `${HEADER_TOGGLER_CLASSNAME}--active`;
export const NAVBAR_Z_INDEX_CLASSNAME = "z-index-navbar";
export const NAVBAR_CLASSNAME = "navbar";
export const NAVBAR_ACTIVE_CLASSNAME = `${NAVBAR_CLASSNAME}--active`;
export const NAVBAR_DONE_CLASSNAME = `${NAVBAR_CLASSNAME}--done`;
export const NAVBAR_IS_ANIMATING_CLASSNAME = `${NAVBAR_CLASSNAME}--isAnimating`;
export const NAVBAR_CONTENT_CLASSNAME = `${NAVBAR_CLASSNAME}__content`;
export const NAVBAR_DEFAULT_CLASSNAME = `${NAVBAR_CLASSNAME} ${NAVBAR_Z_INDEX_CLASSNAME}`;
export const SITE_NAV_CLASSNAME = "site-nav"; //if changing this, change in index.html too
export const SITE_NAV_MINIMAL_CLASSNAME = "site-nav--nav-switch-minimal"; //if changing this, change in index.html too
export const SITE_NAV_CLOSE_DELAY = 250; //delay in how long it takes to close SiteNav aftering clicking an NavItem; fixs overflow glitch
//#endregion

//#region Bridge
export const SECOND_INFO_BUTTON_DELAY = 500;
export const bridgeSectionNames = [
  "Overview",
  "Features",
  "Details",
  "Lessons",
];
//#endregion

//#region Misc
export const BRIDGE_SECTION_COLORS: BridgeSectionColors = {
  0: {
    arrowNormal: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    arrowHover: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
    },
    linkNormal: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_3_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    linkHover: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    pageNav: {
      normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
  },
  1: {
    arrowNormal: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    arrowHover: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME),
    },
    linkNormal: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    linkHover: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    pageNav: {
      normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
      hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
    },
  },
  2: {
    arrowNormal: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_3_CUSTOM_PROPERTY_NAME),
    },
    arrowHover: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME),
    },
    linkNormal: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_3_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
    },
    linkHover: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
    },
    pageNav: {
      normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
      hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME),
    },
  },
  3: {
    arrowNormal: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
    },
    arrowHover: {
      left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME),
      right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    linkNormal: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_3_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    linkHover: {
      svg: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      text: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
    },
    pageNav: {
      normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
      hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CUSTOM_PROPERTY_NAME),
    },
  },
};

export const CAROUSEL_MIN_IMAGE_COUNT = 0;
export const CAROUSEL_GRID_MAX_COLUMN_WIDTH_DEFAULT = "1.6rem";
export const CAROUSEL_GRID_MAX_COLUMN_WIDTHS: [number, string][] = [
	//1st index is number of items and second is the width
	[7, "15rem"],
	[8, "12rem"],
	[12, "10rem"],
	[13, "7rem"],
];

export const MAX_CHAR_COUNTS: MaxCharCounts = {
	[MaxCharCount.song]: () => {
		const windowWidth = window.innerWidth;
		switch (true) {
			case (windowWidth < 410):
				return 27;
			case (windowWidth < 600):
				return 80;
			default: 
				return 1000;
		}
	},
}
export const PAGE_NAV_MIN_WIDTH_THRESHOLD = 500;
export const PAGE_NAV_ITEM_COUNT_DEFAULT = 5;
export const PAGE_NAV_MIN_WIDTH_DEFAULT = "155px";
export const PAGE_NAV_MAX_WIDTH_DEFAULT = "228px";
export const TIME_OUT_DIFFERENTIAL = 50;
//#endregion