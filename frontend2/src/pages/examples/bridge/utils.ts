import { ANIMATION_DURATION, BODY_BACKGROUND_CSS_CLASSNAME, bridgeSectionNames, BRIDGE_HERO_CLICKED_CLASSNAME, BRIDGE_HERO_MORE__CLICKED_CLASSNAME, BRIDGE_SECTION_HEIGHT_CSS_PROPERTY_NAME, BRIDGE_SECTION_PADDING_CSS_PROPERTY_NAME, HIDDEN_CLASSNAME, PAGE_NAV_CLASSNAME, SECOND_INFO_BUTTON_DELAY } from "../../../components/constants";
import { getComputedStyleCustom, getLinearPercentOfMaxMatchWithinRange, scrollToSection } from "../../../helpers";
import { LoadedSounds } from "../../../slices/";
import { Reference } from "../../../types";

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

export const resetBridgeHero = (heroMore: Reference) => {
  document.querySelector(PAGE_NAV_CLASSNAME)?.classList?.add(HIDDEN_CLASSNAME);
  document.documentElement.style.setProperty(BRIDGE_SECTION_HEIGHT_CSS_PROPERTY_NAME, getComputedStyleCustom(BRIDGE_SECTION_HEIGHT_CSS_PROPERTY_NAME));
  document.documentElement.style.setProperty(BRIDGE_SECTION_PADDING_CSS_PROPERTY_NAME, getComputedStyleCustom(BRIDGE_SECTION_PADDING_CSS_PROPERTY_NAME));

  heroMore.current?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  (heroMore.current?.parentNode as HTMLElement)?.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);
}

export const setLinearGradientCssCustomProp = () => {
    const newLinearGradient = `
      linear-gradient(to right, var(--color-primary-1), var(--color-primary-1));
    `;
		document.documentElement.style.setProperty(
			BODY_BACKGROUND_CSS_CLASSNAME,
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
  

  heroMore.current?.classList.add(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
  (heroMore.current?.parentNode as HTMLElement)?.classList.add(BRIDGE_HERO_CLICKED_CLASSNAME);
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