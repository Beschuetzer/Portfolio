import { useAppSelector } from '../../hooks';
import { headerHeightSelector } from '../../slices/generalSlice';
import { sectionsToSkipAnimationSelector } from '../../slices/resumeSlice';
import { MOBILE_BREAK_POINT_WIDTH, SKILLS_CLASSNAME, SKILLS_SECTION_CLASSNAME, SKILLS_SECTION_OPEN_CLASSNAME, TIME_OUT_DIFFERENTIAL } from '../constants';
import { PERCENT_BAR_OUTER_CLASSNAME } from '../PercentBar/PercentBar';
import { scrollToSection } from '../utils';

interface SkillsItemSectionProps {
  title: string,
  children: any,
}

export const SkillsItemSection: React.FC<SkillsItemSectionProps> = ({
  title,
  children,
}) => {
  const sectionsToSkipAnimation = useAppSelector(sectionsToSkipAnimationSelector);
  const headerHeight = useAppSelector(headerHeightSelector);

  const onTitleClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggleItem(e);
    (e.target as HTMLElement)?.classList?.toggle(SKILLS_SECTION_OPEN_CLASSNAME);
    const clickedElement = e.currentTarget;
    if (clickedElement && (clickedElement as HTMLElement).classList.contains(SKILLS_SECTION_OPEN_CLASSNAME)) {
      const shouldAddHeaderHeight = window.innerWidth <= MOBILE_BREAK_POINT_WIDTH;
	    const topOffset = (window.innerHeight - headerHeight) / 2 - (window.innerHeight / (shouldAddHeaderHeight ? 4 : 10));
      scrollToSection(clickedElement as HTMLElement, -topOffset)
    }
  }

  const toggleItem = (
    e: MouseEvent,
  ) => {
    const clickedSection = e.target as HTMLElement;
    if (!clickedSection.nextSibling) return;
    if (clickedSection.parentNode?.querySelector(`.${SKILLS_SECTION_CLASSNAME}`)) return;
  
    const items = (clickedSection.nextSibling as HTMLElement)?.querySelectorAll(`.${PERCENT_BAR_OUTER_CLASSNAME}`);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setTimeout(() => {
        item.classList.toggle('scale-1');
  
        if (sectionsToSkipAnimation.indexOf(clickedSection?.textContent || '') === -1) {
          const previousElementChildren = item.previousElementSibling?.children;
          if (previousElementChildren) previousElementChildren[previousElementChildren.length - 1]?.classList?.add(`${SKILLS_CLASSNAME}__title--animating`)
        }
  
      }, TIME_OUT_DIFFERENTIAL * i);
    }
  }

  return (
    <li className={`${SKILLS_CLASSNAME}__section`}>
      <h4 onClick={(e: any) => onTitleClick(e)} className={`${SKILLS_CLASSNAME}__section-title ${SKILLS_CLASSNAME}__title--animating`}>
        {title}
        <svg className={`${SKILLS_CLASSNAME}__section-title-svg`}>
            <use xlinkHref="/sprite.svg#icon-angle-right"></use>
          </svg>
      </h4>
      <ul className={`${SKILLS_CLASSNAME}__section-content`}>
        {children}
      </ul>
    </li>
  );
}