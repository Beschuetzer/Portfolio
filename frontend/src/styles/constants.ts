import {
  ABOUT_URL,
  AUTO_BID_URL,
  BRIDGE_URL,
  DOWNLOADER_URL,
  PERSONALITY_URL,
  PLAYLIST_SYNCER_URL,
  REPLAY_VIEWER_URL,
  RESUME_URL,
} from "../components/constants";

//#region Font Sizes and Text Stuff
export const defaultFontSize = "1.4rem";
export const fontSizeOne = `calc(${defaultFontSize} * 0.511875)`;
export const fontSizeTwo = `calc(${defaultFontSize} * 0.64)`;
export const fontSizeThree = `calc(${defaultFontSize} * 0.8)`;
export const fontSizeFour = `calc(${defaultFontSize} * 1)`;
export const fontSizeFive = `calc(${defaultFontSize} * 1.25)`;
export const fontSizeSix = `calc(${defaultFontSize} * 1.5625)`;
export const fontSizeSeven = `calc(${defaultFontSize} * 1.953125)`;
export const fontSizeEight = `calc(${defaultFontSize} * 2.44125)`;
export const fontSizeNine = `calc(${defaultFontSize} * 3.051875)`;
export const fontSizeTen = `calc(${defaultFontSize} * 3.815)`;
export const fontSizeEleven = `calc(${defaultFontSize} * 4.768)`;
export const fontSizeTwelve = `calc(${defaultFontSize} * 5.96)`;
export const fontSizeThirteen = `calc(${defaultFontSize} * 7.451)`;
export const fontSizeFourteen = `calc(${defaultFontSize} * 9.313)`;

export function getFontSizeCustom(factor = 1, startingFontSize = defaultFontSize) {
  return `calc(${startingFontSize} * ${factor})`;
}

export const lineHeight = 1.5;
export const fontFamilyFancyBridge = '"New Tegomin", serif';
export const fontFamilyText = '"Open Sans", sans-serif';
export const fontFamilyHeaders = '"Merriweather", serif';
//#endregion

//#region M<edia query breakpoints
export const navListBreakMaxWidth = "23.125em";
export const smallFontMaxWidth = "29.3125em";
export const navBreakMaxWidth = "35.0625em";
export const phoneMaxWidth = "40.9375em";
export const tabPortMaxWidth = "52.6875em";
export const tabLandMaxWidth = "58.5625em";
export const navSwitchWidth = "68.75em";
export const largerThanNavSwitch = `calc(${navSwitchWidth} + 0.001em)`;
export const bigDesktopMinWidth = "112.5em";
//#endregion

//#region Colors
export type ColorScheme = {
    primary1: string;
    primary2: string;
    primary3: string;
    primary4: string;
    primaryRed: string;
    sectionSvg1?: string;
    sectionSvg2?: string;
    sectionSvg3?: string;
    sectionSvg4?: string;
  }
  
  // Define the Colors type
  export type Colors = {
    [key: string]: ColorScheme | {
      greyLight1: string;
      greyLight2: string;
      greyLight3: string;
      primary1Light: string;
      resumeColorOpacity: number;
      black: string;
      grey20: string;
      grey40: string;
      grey60: string;
      grey80: string;
      white: string;
    } & ColorScheme;
  };

export const colors: Colors = {
  [ABOUT_URL]: {
    primary1: "#161616",
    primary2: "#c84b31",
    primary3: "#31C9B0",
    primary4: "#ecdbba",
    primaryRed: "#c84b31",
  },
  [AUTO_BID_URL]: {
    primary1: "#e6e6e6",
    primary2: "#c5a880",
    primary3: "#532e1c",
    primary4: "#0f0f0f",
    primaryRed: "#541c2f",
  },
  [PERSONALITY_URL]: {
    primary1: "#7D5A50",
    primary2: "#B4846C",
    primary3: "#E5B299",
    primary4: "#FCDEC0",
    primaryRed: "#111111", // Assuming $color-black is #111111
  },
  [BRIDGE_URL]: {
    primary1: "#00406b",
    primary2: "#f59229",
    primary3: "#e4e0c9",
    primary4: "#f5f1db",
    primaryRed: "#6b0700",
    sectionSvg1: "#23f5f1db",
    sectionSvg2: "#23f5f1db",
    sectionSvg3: "#00406b80",
    sectionSvg4: "#23f5f1db",
  },
  [DOWNLOADER_URL]: {
    primary1: "#f9f7f7",
    primary2: "#dbe2ef",
    primary3: "#3f72af",
    primary4: "#112d4e",
    primaryRed: "#b05840",
    sectionSvg1: "#f9f7f7db",
    sectionSvg2: "#dbe2efdb",
    sectionSvg3: "#3f72afdb",
    sectionSvg4: "#112d4edb",
  },
  general: {
    greyLight1: "#faf9f9",
    greyLight2: "#f3f1f1",
    greyLight3: "#f1efef",

    black: "#111111",
    grey20: "#333333",
    grey40: "#666666",
    grey60: "#999999",
    grey80: "#cccccc",
    white: "#ffffff",

    primary1: "#28537b",
    primary1Light: "#999999",
    primary2: "#8ac6d0",
    primary3: "#f4d262",
    primary4: "#fbeeac",
    primaryRed: "#7B2853",
    resumeColorOpacity: 0.95,
  },
  [PLAYLIST_SYNCER_URL]: {
    primary1: "#ffc996",
    primary2: "#ff8474",
    primary3: "#9f5f80",
    primary4: "#583d72",
    primaryRed: "#ff8474",
  },
  [REPLAY_VIEWER_URL]: {
    primary1: "#28537b",
    primary2: "#8ac6d0",
    primary3: "#f4d262",
    primary4: "#fbeeac",
    primaryRed: "#7B5028",
  },
  [RESUME_URL]: {
    primary1: "#28537b",
    primary2: "#8ac5d0",
    primary3: "#f4d262",
    primary4: "#fbeeac",
    primaryRed: "#7B2853",
  },
};
//#endregion

//#region Layout Stuff
export const BUTTON_RADIUS = fontSizeEleven;
export const SCROLL_BAR_WIDTH_IN_REM = 1.4;
export const SECTION_WIDTH_IN_PIXELS = 744;
//#endregion