import React from 'react';

class SkillsItemSection extends React.Component {
  render() {
    const { children, title } = this.props;
    return (
      <React.Fragment>
        <div className="skills__section-title">{title}:</div>
        <div className="skills__section">
          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default SkillsItemSection;