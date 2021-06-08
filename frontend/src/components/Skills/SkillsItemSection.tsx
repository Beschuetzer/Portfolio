import { connect, RootStateOrAny } from 'react-redux';
import { SKILLS_CLASSNAME, SKILLS_SECTION_OPEN_CLASSNAME, toggleItem } from './utils';

interface SkillsItemSectionProps {
  title: string,
  children: any,
  sectionsToSkipAnimation: any[],
}

const SkillsItemSection: React.FC<SkillsItemSectionProps> = ({
  title,
  children,
  sectionsToSkipAnimation
}) => {

  const onTitleClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggleItem(e, sectionsToSkipAnimation);
    (e.target as HTMLElement)?.classList?.toggle(SKILLS_SECTION_OPEN_CLASSNAME);
  }

  return (
    <div className={`${SKILLS_CLASSNAME}__section`}>
      <div onClick={(e: any) => onTitleClick(e)} className={`${SKILLS_CLASSNAME}__section-title ${SKILLS_CLASSNAME}__title--animating`}>
        {title}
        <svg className={`${SKILLS_CLASSNAME}__section-title-svg`}>
            <use xlinkHref="/sprite.svg#icon-angle-right"></use>
          </svg>
      </div>
      <div className={`${SKILLS_CLASSNAME}__section-content`}>
        {children}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    sectionsToSkipAnimation: state.resume.sectionsToSkipAnimation,
  }
}

export default connect(mapStateToProps,
{

})(SkillsItemSection);