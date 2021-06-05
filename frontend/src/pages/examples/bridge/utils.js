import { computedStyle } from "../../../components/constants";
import { scrollToSection } from "../../../components/helpers";

export const SECOND_INFO_BUTTON_DELAY = 500;
export const BRIDGE_CARD_SECTION_CLASSNAME = 'bridge__card-section';
export const BRIDGE_CURRENT_SECTION_CLASSNAME = 'bridge__current-section';
export const BRIDGE_PAGE_NAV_LINK_CLASSNAME = 'bridge__page-nav-link';
export const BRIDGE_SECTION_TITLES_CLASSNAME = 'bridge__section-titles';
export const BRIDGE_PAGE_NAV_LINK_CLASSNAMES = `${BRIDGE_PAGE_NAV_LINK_CLASSNAME} page-nav__section`;
export const BRIDGE_BACKDROP_CLASSNAME = 'bridge__backdrop';
export const bridgeSections = [
  "Why",
  "Features",
  "How",
  "Lessons",
];

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
  3: {
    normal: COLOR_PRIMARY_BRIDGE_4,
    hover: COLOR_PRIMARY_BRIDGE_4,
  },
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
    scrollToSection(document.getElementById(bridgeSections[0].toLowerCase()), !isMobile ? 0 : headerHeight)
    if (backgroundRef)  {
      backgroundRef?.classList.remove('visible');
      backgroundRef?.classList.remove('reverse-ease');
    }
  }
}