
export const ANIMATION_DURATION = 500;
export const MOBILE_BREAK_POINT_WIDTH = 1100;
export let computedStyle = getComputedStyle(document.documentElement);

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

export const headerTogglerWidth = parseFloat(computedStyle.getPropertyValue('--header-toggler-width'));
export const smallFontMaxWidth = parseFloat(computedStyle.getPropertyValue('--small-font-max-width'));
export const navBreakMaxWidth = parseFloat(computedStyle.getPropertyValue('--nav-break-max-width'));
export const phoneMaxWidth = parseFloat(computedStyle.getPropertyValue('--phone-max-width'));
export const tabPortMaxWidth = parseFloat(computedStyle.getPropertyValue('--tab-port-max-width'));
export const tabLandMaxWidth = parseFloat(computedStyle.getPropertyValue('--tab-land-max-width'));
export const navSwitchWidth = parseFloat(computedStyle.getPropertyValue('--nav-switch-width'));
export const largerThanNavSwitchWidth = parseFloat(computedStyle.getPropertyValue('--larger-than-nav-switch'));
export const bigDesktopPixelMin = parseFloat(computedStyle.getPropertyValue('--big-desktop-min-width'));

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
//#endregion