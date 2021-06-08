import React from 'react';
import { connect } from 'react-redux';
import { SKILLS_CLASSNAME } from './utils';

class SkillsItemSection extends React.Component {
  static skillsSectionClassname = `${SKILLS_CLASSNAME}__section`;
  static skillsSectionOpenClassName = `${SKILLS_CLASSNAME}__section--open`;
  static timeOutDifferential = 50;

  onTitleClick = (e) => {
    e.stopPropagation();
    this.toggleItem(e, !e.target?.classList?.contains(SkillsItemSection.skillsSectionOpenClassName));
    e.target?.classList?.toggle(SkillsItemSection.skillsSectionOpenClassName);
  }

  toggleItem = (e, isOpening) => {
    const clickedSection = e.target;
    if (!clickedSection.nextSibling) return;
    if (clickedSection.parentNode.querySelector(`.${SkillsItemSection.skillsSectionClassname}`)) return;

    const items = clickedSection.nextSibling.querySelectorAll(`.${SKILLS_CLASSNAME}__percent-outer`);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setTimeout(() => {
        item.classList.toggle('scale-1');

        if (this.props.sectionsToSkipAnimation.indexOf(clickedSection.textContent) === -1) {
          const previousElementChildren = item.previousElementSibling?.children;
          previousElementChildren[previousElementChildren.length - 1]?.classList?.add(`${SKILLS_CLASSNAME}__title--animating`)
        }

      }, SkillsItemSection.timeOutDifferential * i);
    }
  }

  render() {
    const { children, title } = this.props;
    return (
      <div className={`${SKILLS_CLASSNAME}__section`}>
        <div onClick={this.onTitleClick} className={`${SKILLS_CLASSNAME}__section-title skills__title--animating`}>
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    sectionsToSkipAnimation: state.resume.sectionsToSkipAnimation,
  }
}

export default connect(mapStateToProps,
{

})(SkillsItemSection);