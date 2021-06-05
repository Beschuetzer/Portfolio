import React from 'react';
import { connect } from 'react-redux';

import { 
  SKILLS_SECTION_CLASSNAME,
} from '../../../components/constants';

class SkillsItemSection extends React.Component {
  static timeOutDifferential = 50;
  static openClassName = 'skills__section--open';

  onTitleClick = (e) => {
    e.stopPropagation();
    this.toggleItem(e, !e.target?.classList?.contains(SkillsItemSection.openClassName));
    e.target?.classList?.toggle(SkillsItemSection.openClassName);
  }

  toggleItem = (e, isOpening) => {
    const clickedSection = e.target;
    if (!clickedSection.nextSibling) return;
    if (clickedSection.parentNode.querySelector(`.${SKILLS_SECTION_CLASSNAME}`)) return;

    const items = clickedSection.nextSibling.querySelectorAll('.skills__percent-outer');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setTimeout(() => {
        item.classList.toggle('scale-1');

        if (this.props.sectionsToSkipAnimation.indexOf(clickedSection.textContent) === -1) {
          const previousElementChildren = item.previousElementSibling?.children;
          previousElementChildren[previousElementChildren.length - 1]?.classList?.add('skills__title--animating')
        }

      }, SkillsItemSection.timeOutDifferential * i);
    }
  }

  render() {
    const { children, title } = this.props;
    return (
      <div className='skills__section'>
        <div onClick={this.onTitleClick} className="skills__section-title skills__title--animating">
          {title}
          <svg className="skills__section-title-svg">
              <use xlinkHref="/sprite.svg#icon-angle-right"></use>
            </svg>
        </div>
        <div className="skills__section-content">
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