import { ANIMATION_DURATION, BODY_BACKGROUND_CSS_CLASSNAME, BRIDGE_SECTION_HEIGHT_CSS_PROPERTY_NAME, BRIDGE_SECTION_PADDING_CSS_PROPERTY_NAME, computedStyle, HIDDEN_CLASSNAME, Reference } from "../../../components/constants";
import { scrollToSection } from "../../../components/utils";
import { getComputedStyleCustom, getLinearPercentOfMaxMatchWithinRange } from "../../../helpers";
import { LoadedSounds } from "../../../slices/";

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
export const bridgeSectionNames = [
  "Overview",
  "Features",
  "Details",
  "Lessons",
];

export const COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME = '--color-primary-bridge-1';
export const COLOR_PRIMARY_BRIDGE_2_CSS_PROPERTY_NAME = '--color-primary-bridge-2';
export const COLOR_PRIMARY_BRIDGE_3_CSS_PROPERTY_NAME = '--color-primary-bridge-3';
export const COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME = '--color-primary-bridge-4';

type BridgePageNavLinkColors = {
  normal: () => string;
  hover: () => string;
}
export const BRIDGE_PAGE_NAV_LINKS_COLORS: BridgePageNavLinkColors[] = [
  {
    normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
    hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
  },
  {
    normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
    hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
  },
  {
    normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
    hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_2_CSS_PROPERTY_NAME),
  },
  {
    normal: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
    hover: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
  },
];

export const setLinearGradientCssCustomProp = () => {
    const newLinearGradient = `
      linear-gradient(to right, var(--color-primary-1), var(--color-primary-1));
    `;
		document.documentElement.style.setProperty(
			BODY_BACKGROUND_CSS_CLASSNAME,
			newLinearGradient,
		);
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

  if (span?.textContent !== bridgeSectionNames[bridgeSectionNames.length - 1]){
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
  const computedStyles = window.getComputedStyle(document.documentElement);
  document.querySelector('.page-nav')?.classList?.add(HIDDEN_CLASSNAME);
  document.documentElement.style.setProperty(BRIDGE_SECTION_HEIGHT_CSS_PROPERTY_NAME, computedStyles.getPropertyValue(BRIDGE_SECTION_HEIGHT_CSS_PROPERTY_NAME));
  document.documentElement.style.setProperty(BRIDGE_SECTION_PADDING_CSS_PROPERTY_NAME, computedStyles.getPropertyValue(BRIDGE_SECTION_PADDING_CSS_PROPERTY_NAME));

  heroMore.current?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  (heroMore.current?.parentNode as HTMLElement)?.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);

}

export const handleBridgeHeroSounds = (checkBox: HTMLInputElement, background: HTMLElement, sounds: LoadedSounds, isMobile: boolean, headerHeight: number) => {
  if (!checkBox?.checked) {
    if (sounds?.loaded?.play) sounds.loaded.play('doorFast');

    if (!background) return;
    background?.classList.add('visible');
    background?.classList.add('reverse-ease');
  }
  else {
    if (sounds?.loaded?.play) sounds.loaded.play('doorNormal');

    //min = -27.5 max = 100 from 340 to 1099
    let heightOffset = 0;
    if (isMobile) heightOffset = getLinearPercentOfMaxMatchWithinRange(window.innerWidth, 340, 1099, 27.5, 100);
    scrollToSection(document.getElementById(bridgeSectionNames[0].toLowerCase()) as HTMLElement, -heightOffset);
    if (background)  {
      background?.classList.remove('visible');
      background?.classList.remove('reverse-ease');
    }
  }
}