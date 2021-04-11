import React from 'react';

class WorkHistoryItemSection extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="work-history__item-section">
        <h6 className="heading--six">{title}:</h6>
        <ul className="work-history__item-section-list">
          {children}
        </ul>
      </div>
    );
  }
}

export default WorkHistoryItemSection;