export const NAVBAR_ACTIVE_CLASSNAME = 'navbar--active';
export const NAVBAR_DONE_CLASSNAME = 'navbar--done';
export const NAVBAR_IS_ANIMATING_CLASSNAME = 'navbar--isAnimating';
export const ANIMATION_DURATION = 500;
export const MOBILE_BREAK_POINT_WIDTH = 1100;
export const CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION = 125;

export const COLOR_PRIMARY_1 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-1');
export const COLOR_PRIMARY_2 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-2');
export const COLOR_PRIMARY_3 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-3');
export const COLOR_PRIMARY_4 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-4');
export const COLOR_PRIMARY_BRIDGE_1 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-bridge-1');
export const COLOR_PRIMARY_BRIDGE_2 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-bridge-2');
export const COLOR_PRIMARY_BRIDGE_3 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-bridge-3');
export const COLOR_PRIMARY_BRIDGE_4 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-bridge-4');



export const headerTogglerWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-toggler-width'));
export const smallFontMaxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--small-font-max-width'));
export const navBreakMaxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-break-max-width'));
export const phoneMaxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--phone-max-width'));
export const tabPortMaxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-port-max-width'));
export const tabLandMaxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tab-land-max-width'));
export const navSwitchWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-switch-width'));
export const largerThanNavSwitchWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--larger-than-nav-switch'));
export const bigDesktopPixelMin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--big-desktop-min-width'));

const offset = .00000000000001;
export const viewPortPixelToRem = {
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
