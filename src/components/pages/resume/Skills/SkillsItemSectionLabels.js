import React from 'react';

class SkillsItemSectionLabels extends React.Component {
  render() {
    const { labels } = this.props;
    return (
      <React.Fragment>
        <div></div>
        <div className="skills__labels">
          <span className="skills__label skills__label-left">{labels?.left}</span>
          <span className="skills__label skills__label-center">{labels?.center}</span>
          <span className="skills__label skills__label-right">{labels?.right}</span>
        </div>
      </React.Fragment>
    );
  }
}

export default SkillsItemSectionLabels;