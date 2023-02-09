import { useAppSelector } from '../../hooks';
import { headerHeightSelector } from '../../slices/generalSlice';
import { sectionsToSkipAnimationSelector } from '../../slices/resumeSlice';
import { MOBILE_BREAK_POINT_WIDTH } from '../constants';
import { scrollToSection } from '../utils';
import { SKILLS_CLASSNAME, SKILLS_SECTION_OPEN_CLASSNAME, toggleItem } from './utils';

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
    toggleItem(e, sectionsToSkipAnimation);
    (e.target as HTMLElement)?.classList?.toggle(SKILLS_SECTION_OPEN_CLASSNAME);
    const clickedElement = e.currentTarget;
    if (clickedElement && (clickedElement as HTMLElement).classList.contains(SKILLS_SECTION_OPEN_CLASSNAME)) {
      const shouldAddHeaderHeight = window.innerWidth <= MOBILE_BREAK_POINT_WIDTH;
	    const topOffset = (window.innerHeight - headerHeight) / 2 - (window.innerHeight / (shouldAddHeaderHeight ? 4 : 10));
      scrollToSection(clickedElement as HTMLElement, -topOffset)
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