import React from 'react';

class SkillsItemSection extends React.Component {
  render() {
    const { children, title } = this.props;
    return (
      <div className="skills__section">

        <span className="skills__section-title">{title}:</span>
        {children}
      </div>
    );
  }
}

export default SkillsItemSection;