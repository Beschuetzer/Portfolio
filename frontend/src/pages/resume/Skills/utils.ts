export interface Repository {
  [key: string]: any,
}

export interface SkillsItemLabel {
  left: string;
  center: string;
  right: string;
}

export const SKILLS_CLASSNAME = "skills";
export const SKILLS_SECTION_CLASSNAME = `${SKILLS_CLASSNAME}__section`;
export const SKILLS_SECTION_OPEN_CLASSNAME = `${SKILLS_CLASSNAME}__section--open`;
export const TIME_OUT_DIFFERENTIAL = 50;

export const toggleItem = (
  e: MouseEvent,
  sectionsToSkipAnimation: any[],
) => {
  const clickedSection = e.target as HTMLElement;
  if (!clickedSection.nextSibling) return;
  if (clickedSection.parentNode?.querySelector(`.${SKILLS_SECTION_CLASSNAME}`)) return;

  const items = (clickedSection.nextSibling as HTMLElement)?.querySelectorAll(`.${SKILLS_CLASSNAME}__percent-outer`);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    setTimeout(() => {
      item.classList.toggle('scale-1');

      if (sectionsToSkipAnimation.indexOf(clickedSection.textContent) === -1) {
        const previousElementChildren = item.previousElementSibling?.children;
        if (previousElementChildren) previousElementChildren[previousElementChildren.length - 1]?.classList?.add(`${SKILLS_CLASSNAME}__title--animating`)
      }

    }, TIME_OUT_DIFFERENTIAL * i);
  }
}