import React from 'react';
import { connect } from 'react-redux';

class SkillsPopupName extends React.Component {
  
  render() {
    const { repo, href, isMobile } = this.props
    return (
      <div className="skills-popup__table-item skills-popup__name">
        {isMobile ?
          <span className={`skills-popup__name-title`}>Name:</span>
          :
          null
        }
        <a 
          href={href}  
          className=  {`skills-popup__link skills__title--animating`}
          target="_blank"
          rel="noreferrer"
        >
          <div 
            className="skills-popup__link-text"
          >
            {repo['name']}
          </div>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isMobile: state.general.isMobile,
  }
}

export default connect(mapStateToProps, {

})(SkillsPopupName);