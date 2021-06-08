import React from 'react';
import { connect } from 'react-redux';
import { SKILLS_CLASSNAME } from './utils';

class SkillsPopupName extends React.Component {
  
  render() {
    const { repo, href, isMobile } = this.props
    return (
      <div className={`${SKILLS_CLASSNAME}-popup__table-item ${SKILLS_CLASSNAME}-popup__name`}>
        {isMobile ?
          <span className={`${SKILLS_CLASSNAME}-popup__name-title`}>Name:</span>
          :
          null
        }
        <a 
          href={href}  
          className=  {`${SKILLS_CLASSNAME}-popup__link ${SKILLS_CLASSNAME}__title--animating`}
          target="_blank"
          rel="noreferrer"
        >
          <div 
            className={`${SKILLS_CLASSNAME}-popup__link-text`}
          >
            {repo['name']}
          </div>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.general.isMobile,
  }
}

export default connect(mapStateToProps, {

})(SkillsPopupName);