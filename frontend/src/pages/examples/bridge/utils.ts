import {
  ANIMATION_DURATION,
  BODY_BACKGROUND_CUSTOM_PROPERTY_NAME,
  BRIDGE_HERO_CLASSNAME,
  BRIDGE_HERO_CLICKED_CLASSNAME,
  BRIDGE_HERO_MORE__CLICKED_CLASSNAME,
  BRIDGE_SECTION_HEIGHT_CUSTOM_PROPERTY_NAME,
  BRIDGE_SECTION_PADDING_CUSTOM_PROPERTY_NAME,
  bridgeSectionNames,
  HIDDEN_CLASSNAME,
  NAVBAR_LOGO_WIDTH_CUSTOM_PROPERTY_NAME,
  PAGE_NAV_CLASSNAME,
  SECOND_INFO_BUTTON_DELAY,
} from "../../../components/constants";
import { getComputedStyleCustom, replaceCharacters, scrollToSection } from "../../../helpers";
import { LoadedSounds } from "../../../slices/";
import { Reference } from "../../../types";

export const handleBridgeNavigation = (checkBox: HTMLInputElement, background: HTMLElement, sounds: LoadedSounds, isMobile: boolean) => {
  if (!checkBox?.checked) {
    if (sounds?.loaded?.play) sounds.loaded.play('doorFast');

    if (!background) return;
    background?.classList.add('visible');
    background?.classList.add('reverse-ease');
  }
  else {
    if (sounds?.loaded?.play) sounds.loaded.play('doorNormal');

    const navbarLogoWidthProp = getComputedStyleCustom(NAVBAR_LOGO_WIDTH_CUSTOM_PROPERTY_NAME);
    const remToPixelFactor = 10;
    const offset = 13; //this is needed to get the exact lining up to work
    const navbarLogoWidth = parseFloat(replaceCharacters(navbarLogoWidthProp, [['rem', '']])) * remToPixelFactor - offset;
    const heightOffset = isMobile ? navbarLogoWidth : -100000;
    scrollToSection(document.getElementById(bridgeSectionNames[0].toLowerCase()) as HTMLElement, -heightOffset);
    if (background)  {
      background?.classList.remove('visible');
      background?.classList.remove('reverse-ease');
    }
  }
}

export const resetBridgeHero = (bridgeHeroRef: React.RefObject<Element>) => {
  const heroMore = bridgeHeroRef.current?.querySelector(
		`.${BRIDGE_HERO_CLASSNAME}__more`,
	);
  document.querySelector(PAGE_NAV_CLASSNAME)?.classList?.add(HIDDEN_CLASSNAME);
  document.documentElement.style.setProperty(BRIDGE_SECTION_HEIGHT_CUSTOM_PROPERTY_NAME, getComputedStyleCustom(BRIDGE_SECTION_HEIGHT_CUSTOM_PROPERTY_NAME));
  document.documentElement.style.setProperty(BRIDGE_SECTION_PADDING_CUSTOM_PROPERTY_NAME, getComputedStyleCustom(BRIDGE_SECTION_PADDING_CUSTOM_PROPERTY_NAME));

  heroMore?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  (heroMore?.parentNode as HTMLElement)?.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);
}

export const setLinearGradientCssCustomProp = () => {
    const newLinearGradient = `
      linear-gradient(to right, var(--color-primary-1), var(--color-primary-1));
    `;
		document.documentElement.style.setProperty(
			BODY_BACKGROUND_CUSTOM_PROPERTY_NAME,
			newLinearGradient,
		);
}

export const showBridgeHero = (heroMore: Reference) => {
  let docStyle = getComputedStyle(document.documentElement);
  const defaultFontSize = docStyle.getPropertyValue('--default-font-size')
  const defaultFontSizeFloat = parseFloat(defaultFontSize);
  
  document.querySelector(PAGE_NAV_CLASSNAME)?.classList?.remove(HIDDEN_CLASSNAME);
  document.documentElement.style.setProperty('--bridge-section-height', '100vh');
  document.documentElement.style.setProperty('--bridge-section-padding', `${defaultFontSizeFloat * 1.5 }rem`);
  

  heroMore?.current?.classList?.add(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  (heroMore?.current?.parentNode as HTMLElement)?.classList?.add(BRIDGE_HERO_CLICKED_CLASSNAME);
}

export const toggleSecondInfoButtonClick = (hero: HTMLElement, heroMore: HTMLElement, isMobile: boolean, shouldWaitToHideHero = true, span: HTMLElement | null = null) => {
  heroMore?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  setTimeout(() => {
    (heroMore?.parentNode as HTMLElement)?.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);
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