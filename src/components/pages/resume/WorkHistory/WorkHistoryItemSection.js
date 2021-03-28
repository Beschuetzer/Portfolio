import React from 'react';

class WorkHistoryItemSection extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="work-history__item-section">
        <h5 className="heading--five">{title}</h5>
        <ul className="work-history__item-section-list">
          {children}
        </ul>
      </div>
    );
  }
}

export default WorkHistoryItemSection;