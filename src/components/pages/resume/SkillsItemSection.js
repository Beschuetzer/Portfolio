import React from 'react';

class SkillsItemSection extends React.Component {
  onSectionClick = (e) => {
    e.target?.classList?.toggle('skills__section--open')
  }

  render() {
    const { children, title } = this.props;
    return (
      <div onClick={this.onSectionClick} className="skills__section">
        <div className="skills__section-title">{title}:</div>
        <div className="skills__section-content">
          {children}
        </div>
      </div>
    );
  }
}

export default SkillsItemSection;