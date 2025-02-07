//#region Font Sizes and Text Stuff
export const defaultFontSize = '1.4rem';
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

export function getFontSizeCustom(size: number) {
  return `calc(${defaultFontSize} * ${size})`;
}

export const lineHeight = 1.5;
export const fontFamilyFancyBridge = '"New Tegomin", serif';
export const fontFamilyText = '"Open Sans", sans-serif';
export const fontFamilyHeaders = '"Merriweather", serif';
//#endregion

//#region M<edia query breakpoints
export const navListBreakMaxWidth = '23.125em';
export const smallFontMaxWidth = '29.3125em';
export const navBreakMaxWidth = '35.0625em';
export const phoneMaxWidth = '40.9375em';
export const tabPortMaxWidth = '52.6875em';
export const tabLandMaxWidth = '58.5625em';
export const navSwitchWidth = '68.75em';
export const largerThanNavSwitch = `calc(${navSwitchWidth} + 0.001em)`;
export const bigDesktopMinWidth = '112.5em';
//#endregion

//#region Colors
export const colors = {
    greyLight1: '#faf9f9',
    greyLight2: '#f3f1f1',
    greyLight3: '#f1efef',
  
    black: '#111111',
    grey20: '#333333',
    grey40: '#666666',
    grey60: '#999999',
    grey80: '#cccccc',
    white: '#ffffff',
  
    primary1: '#28537b',
    primary1Light: '#999999',
  
    primary2: '#8ac6d0',
    primary3: '#f4d262',
    primary4: '#fbeeac',
    primaryRed: '#7B2853',
  
    primaryResume1: '#28537b',
    primaryResume2: '#8ac5d0',
    primaryResume3: '#f4d262',
    primaryResume4: '#fbeeac',
    primaryResumeRed: '#7B2853',
  
    resumeColorOpacity: 0.95,
  
    primaryBridge1: '#00406b',
    primaryBridge2: '#f59229',
    primaryBridge3: '#e4e0c9',
    primaryBridge4: '#f5f1db',
    primaryBridgeRed: '#6b0700',
    bridgeSectionSvg1: '#23f5f1db',
    bridgeSectionSvg2: '#23f5f1db',
    bridgeSectionSvg3: '#00406b80',
    bridgeSectionSvg4: '#23f5f1db',
  
    primaryDownloader1: '#f9f7f7',
    primaryDownloader2: '#dbe2ef',
    primaryDownloader3: '#3f72af',
    primaryDownloader4: '#112d4e',
    primaryDownloaderRed: '#b05840',
  
    downloaderSectionSvg1: '#f9f7f7db',
    downloaderSectionSvg2: '#dbe2efdb',
    downloaderSectionSvg3: '#3f72afdb',
    downloaderSectionSvg4: '#112d4edb',
  
    primaryPlaylistSyncer1: '#ffc996',
    primaryPlaylistSyncer2: '#ff8474',
    primaryPlaylistSyncer3: '#9f5f80',
    primaryPlaylistSyncer4: '#583d72',
    primaryPlaylistSyncerRed: '#ff8474',
  
    primaryAutobid1: '#e6e6e6',
    primaryAutobid2: '#c5a880',
    primaryAutobid3: '#532e1c',
    primaryAutobid4: '#0f0f0f',
    primaryAutobidRed: '#541c2f',
  
    primaryReplay1: '#28537b',
    primaryReplay2: '#8ac6d0',
    primaryReplay3: '#f4d262',
    primaryReplay4: '#fbeeac',
    primaryReplayRed: '#7B5028',
  
    primaryAbout1: '#161616',
    primaryAbout2: '#c84b31',
    primaryAbout3: '#31C9B0',
    primaryAbout4: '#ecdbba',
    primaryAboutRed: '#c84b31',
  
    primaryTheBigFive1: '#7D5A50',
    primaryTheBigFive2: '#B4846C',
    primaryTheBigFive3: '#E5B299',
    primaryTheBigFive4: '#FCDEC0',
    primaryTheBigFiveRed: '#111111', // Assuming $color-black is #111111
  };
//#endregion
