export const NAVBAR_ACTIVE_CLASSNAME = 'navbar--active';
export const NAVBAR_DONE_CLASSNAME = 'navbar--done';
export const NAVBAR_IS_ANIMATING_CLASSNAME = 'navbar--isAnimating';
export const ANIMATION_DURATION = 500;
export const MOBILE_BREAK_POINT_WIDTH = 1100;
export const CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION =  75;
export const SECOND_INFO_BUTTON_DELAY = 500;

//#region bridge stuff
export const BRIDGE_CURRENT_SECTION_CLASSNAME = 'bridge__current-section';
export const BRIDGE_PAGE_NAV_LINK_CLASSNAME = 'bridge__page-nav-link';
export const BRIDGE_SECTION_TITLES_CLASSNAME = 'bridge__section-titles';
export const BRIDGE_PAGE_NAV_LINK_CLASSNAMES = `${BRIDGE_PAGE_NAV_LINK_CLASSNAME} page-nav__section`;

export const bridgeSections = [
  "Background",
  "Features",
  "Lessons",
];

//#region colors
let computedStyle = getComputedStyle(document.documentElement);
export const COLOR_PRIMARY_1 = computedStyle.getPropertyValue('--color-primary-1');
export const COLOR_PRIMARY_2 = computedStyle.getPropertyValue('--color-primary-2');
export const COLOR_PRIMARY_3 = computedStyle.getPropertyValue('--color-primary-3');
export const COLOR_PRIMARY_4 = computedStyle.getPropertyValue('--color-primary-4');
export const COLOR_PRIMARY_BRIDGE_1 = computedStyle.getPropertyValue('--color-primary-bridge-1');
export const COLOR_PRIMARY_BRIDGE_2 = computedStyle.getPropertyValue('--color-primary-bridge-2');
export const COLOR_PRIMARY_BRIDGE_3 = computedStyle.getPropertyValue('--color-primary-bridge-3');
export const COLOR_PRIMARY_BRIDGE_4 = computedStyle.getPropertyValue('--color-primary-bridge-4');

export const BRIDGE_PAGE_NAV_LINKS_COLORS = {
  0: {
    normal: COLOR_PRIMARY_BRIDGE_4,
    hover: COLOR_PRIMARY_BRIDGE_4,
  },
  1: {
    normal: COLOR_PRIMARY_BRIDGE_1,
    hover: COLOR_PRIMARY_BRIDGE_1,
  },
  2: {
    normal: COLOR_PRIMARY_BRIDGE_1,
    hover: COLOR_PRIMARY_BRIDGE_1,
  },
}
//#endregion
//#region breakpoints and breakpoint stuff
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
//#endregion
//#region Misc CSS Custom Props


//#endregion
export function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  console.log('id =', id);
  console.log('phase =', phase);
  console.log('actualDuration =', actualDuration);
  console.log('baseDuration =', baseDuration);
  // console.log('startTime =', startTime);
  // console.log('commitTime =', commitTime);
  // console.log('interactions =', interactions);
}

//#region shared functions
export const scrollToSection = (sectionToScrollTo, headerHeight) => {
  const topScrollAmount =  window.scrollY + sectionToScrollTo.getBoundingClientRect().top - headerHeight;
  window.scroll({
    top: topScrollAmount,
    left: 0, 
    behavior: 'smooth' 
  });
}

export const toggleSecondInfoButtonClick = (hero, heroMore, isMobile, shouldWaitToHideHero = true, span = null) => {
  heroMore?.classList.remove('hero__more--clicked');
  if (shouldWaitToHideHero) {
    setTimeout(() => {
      if (!isMobile) hero?.classList.add('d-none');
    }, SECOND_INFO_BUTTON_DELAY)
  }
  else {
    hero?.classList.add('d-none');
  }

  if (span?.textContent !== bridgeSections[bridgeSections.length - 1]){
    setTimeout(() => {
      const arrowButtonRight = document.querySelector('.arrow-button--right');
      arrowButtonRight.classList.remove('d-none');
    }, SECOND_INFO_BUTTON_DELAY)
  }
}

export const showBridgeHero = (heroMore) => {
  let docStyle = getComputedStyle(document.documentElement);
  const defaultFontSize = docStyle.getPropertyValue('--default-font-size')
  const defaultFontSizeFloat = parseFloat(defaultFontSize);
  
  document.querySelector('.page-nav').classList?.remove('hidden');
  document.documentElement.style.setProperty('--bridge-section-height', '100vh');
  document.documentElement.style.setProperty('--bridge-section-padding', `${defaultFontSizeFloat * 1.5 }rem`);
  
  console.log('add heromore clicked------------------------------------------------');
  heroMore.current?.classList.add('hero__more--clicked');
}

export const handleBridgeHeroSounds = (checkBoxRef, backgroundRef, sounds, isMobile, headerHeight) => {
  if (!checkBoxRef?.checked) {
    sounds.play('doorFast');

    if (!backgroundRef) return;
    backgroundRef?.classList.add('visible');
    backgroundRef?.classList.add('reverse-ease');
  }
  else {
    sounds.play('doorNormal');
    scrollToSection(document.getElementById(bridgeSections[0].toLowerCase()), headerHeight)
    if (backgroundRef)  {
      backgroundRef?.classList.remove('visible');
      backgroundRef?.classList.remove('reverse-ease');
    }
  }
}

export const addSpaceAfterPunctuationMarks = (string) => {
  const puncuationMarks = ['.', '?', '!']
  let shouldAdd = false;
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (shouldAdd && !puncuationMarks.includes(char)) {
      //add &nbsp here in front of current char
      shouldAdd = false;
      if (char === '<' || string[i+1] !== '') newString += char;
      else newString += '&nbsp' + char;
      continue;
    }
    if (puncuationMarks.includes(char)) shouldAdd = true;  
    newString += char;
  }
  return newString;
}
//#endregion