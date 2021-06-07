import { capitalize } from "../../../helpers";
import { BRIDGE_CURRENT_SECTION_CLASSNAME, BRIDGE_PAGE_NAV_LINKS_COLORS, BRIDGE_PAGE_NAV_LINK_CLASSNAME } from "../../../pages/examples/bridge/utils";

export const selectedClass = "page-nav--active";
export const docStyle = getComputedStyle(document.documentElement);

export const getLinearGradient = (percent: number, docStyle: any) => {
  const mainColor = docStyle.getPropertyValue("--color-primary-4");
  const progressColor = docStyle.getPropertyValue("--color-primary-2").trim();

  return `
    linear-gradient(to right, 
      ${progressColor.trim()} 0%, 
      ${progressColor.trim()} ${percent}%,
      ${mainColor} ${percent}%,
      ${mainColor} 100%)`;
};

export const setGradientPercent = (
  sections: any,
  currentSection: Element | null,
  percentThroughSection: number,
  isEnd: boolean,
  indexOfCurrentSection: number,
) => {
  for (let i = 0; i < sections.length; i++) {
    let gradientToUse = getLinearGradient(percentThroughSection, docStyle);
    let shouldAddActiveClass = true;
    const section = sections[i];
    const pageNavSectionName = capitalize(section.dataset.section);
    const pageNavSectionElement = document.querySelector(
      `.page-nav__section-${pageNavSectionName}`,
    ) as HTMLElement;

    if (!pageNavSectionElement || !pageNavSectionElement.parentNode) return;

    const shouldSetEnd = isEnd && i >= indexOfCurrentSection;
    if (shouldSetEnd) {
      gradientToUse = getLinearGradient(100, docStyle);
    } else if (
      !currentSection?.className.match(new RegExp(pageNavSectionName, "ig"))
    ) {
      gradientToUse = getLinearGradient(0, docStyle);
      shouldAddActiveClass = false;
    }

    pageNavSectionElement.style.backgroundImage = gradientToUse;

    if (shouldAddActiveClass) {
      (pageNavSectionElement.parentNode as any).classList.add(selectedClass);
    } else (pageNavSectionElement.parentNode as any).classList.remove(selectedClass);
  }
};

export const checkShouldSetPreviousUrl = (match: {url: string}, previousUrl: string, setPreviousUrl: (value: string) => void) => {
  const currentUrl = match?.url;

  if (!previousUrl || previousUrl !== currentUrl) setPreviousUrl(currentUrl);
};

export const getSectionNames = () => {
  const sectionNames = [];
  const sections = document.querySelectorAll("[data-section]");
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const capitalized = capitalize((section as any).dataset.section);
    sectionNames.push(capitalized);
  }
  return sectionNames;
};

export const setBridgeColors = (currentBridgeSection: number, clickedBridgeInfoButtonCount: number) => {
  //get the currentBridgeSection and run through all of the
  const sectionNames = document.querySelectorAll(
    `.${BRIDGE_PAGE_NAV_LINK_CLASSNAME}`,
  );

  //Setting BRIDGE_CURRENT_SECTION_CLASSNAME CSS class
  for (let i = 0; i < sectionNames.length; i++) {
    const sectionName = sectionNames[i];
    if (!sectionName) return;

    if (clickedBridgeInfoButtonCount >= 2) {
      sectionName.classList.remove("full-opacity");
      if (i === currentBridgeSection)
        sectionName.classList.add(BRIDGE_CURRENT_SECTION_CLASSNAME);
      else sectionName.classList.remove(BRIDGE_CURRENT_SECTION_CLASSNAME);
    } else {
      sectionName.classList.add("full-opacity");
    }
  }

  //change CSS color var depending on currentBridgeSection
  const newNormalValue = `--bridge-page-nav-link-color: ${BRIDGE_PAGE_NAV_LINKS_COLORS[currentBridgeSection].normal}`;
  document.documentElement.style.cssText += newNormalValue;

  const newHoverValue = `--bridge-page-nav-link-color-hover: ${BRIDGE_PAGE_NAV_LINKS_COLORS[currentBridgeSection].hover}`;
  document.documentElement.style.cssText += newHoverValue;
};