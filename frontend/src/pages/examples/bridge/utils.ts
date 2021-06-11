import { RefObject } from "react";
import { ANIMATION_DURATION, BODY_BACKGROUND_CSS_CLASSNAME, bridgeSectionHeightDefault, bridgeSectionPaddingDefault, computedStyle, HIDDEN_CLASSNAME, Reference } from "../../../components/constants";
import { scrollToSection } from "../../../components/utils";

export const SECOND_INFO_BUTTON_DELAY = 500;
export const BRIDGE_CLASSNAME = 'bridge';
export const BRIDGE_HERO_CLASSNAME = 'hero';
export const BRIDGE_CARD_SECTION_CLASSNAME = `${BRIDGE_CLASSNAME}__card-section`;
export const BRIDGE_CURRENT_SECTION_CLASSNAME = `${BRIDGE_CLASSNAME}__current-section`;
export const BRIDGE_PAGE_NAV_LINK_CLASSNAME = `${BRIDGE_CLASSNAME}__page-nav-link`;
export const BRIDGE_SECTION_TITLES_CLASSNAME = `${BRIDGE_CLASSNAME}__section-titles`;
export const BRIDGE_PAGE_NAV_LINK_CLASSNAMES = `${BRIDGE_PAGE_NAV_LINK_CLASSNAME} page-nav__section`;
export const BRIDGE_BACKDROP_CLASSNAME = `${BRIDGE_CLASSNAME}__backdrop`;

export const BRIDGE_HERO_CLICKED_CLASSNAME = "hero--clicked";
export const BRIDGE_HERO_MORE__CLICKED_CLASSNAME = "hero__more--clicked";
export const bridgeSections = [
  "Intro",
  "Features",
  "Details",
  "Lessons",
];

export const COLOR_PRIMARY_BRIDGE_1 = computedStyle.getPropertyValue('--color-primary-bridge-1');
export const COLOR_PRIMARY_BRIDGE_2 = computedStyle.getPropertyValue('--color-primary-bridge-2');
export const COLOR_PRIMARY_BRIDGE_3 = computedStyle.getPropertyValue('--color-primary-bridge-3');
export const COLOR_PRIMARY_BRIDGE_4 = computedStyle.getPropertyValue('--color-primary-bridge-4');

export const BRIDGE_PAGE_NAV_LINKS_COLORS: {
  [key: string]: {
    normal: string,
    hover: string,
  }
} = {
  0: {
    normal: COLOR_PRIMARY_BRIDGE_4,
    hover: COLOR_PRIMARY_BRIDGE_1,
  },
  1: {
    normal: COLOR_PRIMARY_BRIDGE_1,
    hover: COLOR_PRIMARY_BRIDGE_4,
  },
  2: {
    normal: COLOR_PRIMARY_BRIDGE_1,
    hover: COLOR_PRIMARY_BRIDGE_2,
  },
  3: {
    normal: COLOR_PRIMARY_BRIDGE_4,
    hover: COLOR_PRIMARY_BRIDGE_1,
  },
}
export const setLinearGradientCssCustomProp = () => {
    const newLinearGradient = `
      linear-gradient(to right, var(--color-primary-1), var(--color-primary-1));
    `;
		document.documentElement.style.setProperty(
			BODY_BACKGROUND_CSS_CLASSNAME,
			newLinearGradient,
		);
    console.log('newLinearGradient =', newLinearGradient);
}

export const toggleSecondInfoButtonClick = (hero: HTMLElement, heroMore: HTMLElement, isMobile: boolean, shouldWaitToHideHero = true, span: HTMLElement | null = null) => {

  heroMore?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  setTimeout(() => {
    (heroMore.parentNode as HTMLElement)?.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);
  }, ANIMATION_DURATION);

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
      if (arrowButtonRight) arrowButtonRight.classList.remove('d-none');
    }, SECOND_INFO_BUTTON_DELAY)
  }
}

export const showBridgeHero = (heroMore: Reference) => {
  let docStyle = getComputedStyle(document.documentElement);
  const defaultFontSize = docStyle.getPropertyValue('--default-font-size')
  const defaultFontSizeFloat = parseFloat(defaultFontSize);
  
  document.querySelector('.page-nav')?.classList?.remove(HIDDEN_CLASSNAME);
  document.documentElement.style.setProperty('--bridge-section-height', '100vh');
  document.documentElement.style.setProperty('--bridge-section-padding', `${defaultFontSizeFloat * 1.5 }rem`);
  

  heroMore.current?.classList.add(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  (heroMore.current?.parentNode as HTMLElement)?.classList.add(BRIDGE_HERO_CLICKED_CLASSNAME);
}

export const resetBridgeHero = (heroMore: Reference) => {
  document.querySelector('.page-nav')?.classList?.add(HIDDEN_CLASSNAME);
  document.documentElement.style.setProperty('--bridge-section-height', bridgeSectionHeightDefault);
  document.documentElement.style.setProperty('--bridge-section-padding', bridgeSectionPaddingDefault);
  

  heroMore.current?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  (heroMore.current?.parentNode as HTMLElement)?.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);

}

export const handleBridgeHeroSounds = (checkBox: HTMLInputElement, background: HTMLElement, sounds: {play: (name: string) => void}, isMobile: boolean, headerHeight: number) => {
  if (!checkBox?.checked) {
    sounds.play('doorFast');

    if (!background) return;
    background?.classList.add('visible');
    background?.classList.add('reverse-ease');
  }
  else {
    sounds.play('doorNormal');
    scrollToSection(document.getElementById(bridgeSections[0].toLowerCase()) as HTMLElement, !isMobile ? 0 : headerHeight)
    if (background)  {
      background?.classList.remove('visible');
      background?.classList.remove('reverse-ease');
    }
  }
}

export const handleMoreClick = (
  clickedBridgeInfoButtonCount: number,
  headerHeight: number,
  isMobile: boolean,
  heroMore: Reference,
  hero: Reference,
  checkBoxRef: RefObject<HTMLInputElement>,
  backgroundRef: Reference,
  sounds: {play: (sound: string) => void},
  setClickedBridgeInfoButtonCount: (value: number) => void,
) => {
  if (clickedBridgeInfoButtonCount % 2 === 0) {
    showBridgeHero(heroMore);
  } else if (clickedBridgeInfoButtonCount > 0) {
    toggleSecondInfoButtonClick(hero.current, heroMore.current, isMobile);
  }

  handleBridgeHeroSounds(
    checkBoxRef.current as any,
    backgroundRef.current,
    sounds,
    isMobile,
    headerHeight,
  );
  setClickedBridgeInfoButtonCount(clickedBridgeInfoButtonCount + 1);
}