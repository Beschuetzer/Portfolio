import React from 'react';

class SkillsItemSection extends React.Component {
  onTitleClick = (e) => {
    e.target?.classList?.toggle('skills__section--open')
  }

  render() {
    const { children, title } = this.props;
    return (
      <React.Fragment>
        <div onClick={this.onTitleClick} className="skills__section-title">{title}:</div>
        <div className="skills__section-content">
          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default SkillsItemSection;