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
          <p dangerouslySetInnerHTML={{__html: bullet}}></p>
        </li>
      );
    })
  }

  createTitle = (title) => {
    return {
      __html: `${title}:`
    }
  }

  render (){
    const { startDate, endDate, title, number } = this.props
    return (
      <div className="work-history__item">
        {/* <div className="work-history__title"> */}
          <span className='work-history__item-number'>{number}.</span>
          <h6 className="work-history__title-header heading--six" dangerouslySetInnerHTML={this.createTitle(title)}></h6>
          <div className="work-history__title-dates">
            <div> {startDate} </div>
            <div> &ndash; </div>
            <div> {endDate} </div>
          </div>
        {/* </div> */}
       
        {this.renderSections()}    
      </div>        
    );
  }
}

export default WorkHistoryItem;