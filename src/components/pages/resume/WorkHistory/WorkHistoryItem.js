import React from 'react';
import WorkHistoryItemSection from './WorkHistoryItemSection';

class WorkHistoryItem extends React.Component {
  renderSections = () => {
    return this.props.sections.map((section, index) => {
      return (
        <WorkHistoryItemSection key={index} title={section.title}>
          {this.renderItemSectionBullets(section.bullets)}
        </WorkHistoryItemSection>
      );
    })
  }

  renderItemSectionBullets = (bullets) => {
    return bullets.map((bullet,index) => {
      return (
        <li key={index} className="work-history__item-section-bullet">
          <p>{bullet}</p>
        </li>
      );
    })
  }

  render (){
    const { startDate, endDate, title } = this.props
    return (
      <div className="work-history__item">
        <div className="work-history__title">
          <h6 className="work-history__title-header heading--six" dangerouslySetInnerHTML={{__html: title}}></h6>
          <div className="work-history__title-dates">
            <div> {startDate} </div>
            <div> &ndash; </div>
            <div> {endDate} </div>
          </div>
        </div>
       
        {this.renderSections()}    
      </div>        
    );
  }
}

export default WorkHistoryItem;