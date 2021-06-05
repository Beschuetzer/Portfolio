export const SECOND_INFO_BUTTON_DELAY = 500;
export const BRIDGE_CARD_SECTION_CLASSNAME = 'bridge__card-section';
export const BRIDGE_CURRENT_SECTION_CLASSNAME = 'bridge__current-section';
export const BRIDGE_PAGE_NAV_LINK_CLASSNAME = 'bridge__page-nav-link';
export const BRIDGE_SECTION_TITLES_CLASSNAME = 'bridge__section-titles';
export const BRIDGE_PAGE_NAV_LINK_CLASSNAMES = `${BRIDGE_PAGE_NAV_LINK_CLASSNAME} page-nav__section`;

export const bridgeSections = [
  "Why",
  "Features",
  "How",
  "Lessons",
];

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