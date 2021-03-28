import React from 'react';
import WorkHistoryItemSection from './WorkHistoryItemSection';

class WorkHistoryItem extends React.Component {
  renderSections = () => {
    return this.props.sections.map(section => {
      return (
        <WorkHistoryItemSection title={section.title}>
          {this.renderItemSectionBullets(section.bullets)}
        </WorkHistoryItemSection>
      );
    })
  }

  renderItemSectionBullets = (bullets) => {
    return bullets.map(bullet => {
      return (
        <li className="work-history__item-section-bullet">
          <p>{bullet}</p>
        </li>
      );
    })
  }

  render (){
    const { startDate, endDate, title } = this.props
    return (
      <div className="work-history__item">
        <div className="work-history__dates">
          <div>{startDate}</div>
          <div>to</div>
          <div>{endDate}</div>
        </div>
        <h6 className="work-history__title heading--six">{title}</h6>
        {this.renderSections()}    
      </div>        
    );
  }
}

export default WorkHistoryItem;