import { capitalize } from "../../../helpers";

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