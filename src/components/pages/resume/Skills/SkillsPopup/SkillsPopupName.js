import React from 'react';

class SkillsPopupName extends React.Component {
  
  render() {
    const { repo, onTableItemMouseEvent, href } = this.props
    return (
      <a 
        href={href}  
        className=  {`skills-popup__table-item skills-popup__name skills-popup__link skills__title--animating`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={onTableItemMouseEvent} 
        onMouseLeave={onTableItemMouseEvent} 
      >
        <div 
          onMouseEnter={onTableItemMouseEvent} 
          onMouseLeave={onTableItemMouseEvent} 
          className="skills-popup__link-text"
        >
          {repo['name']}
        </div>
      </a>
    );
  }
}

export default SkillsPopupName;