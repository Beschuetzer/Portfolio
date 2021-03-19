import React from 'react';
import { capitalize } from '../../../helpers';

class ResumeSection extends React.Component {
  render () {
    const { name, children, headerSideContent } = this.props;
    return (
      <div className={`resume__section resume__section-${name}`}>
          <div className="resume__card">
            <div className="resume__content">
              <div className="resume__header">
                <h3 className="heading--three resume__header-title">{capitalize(name)?.replace('-', ' ')}</h3>
                {
                  headerSideContent ? 
                  <div className="resume__header-side">
                    {headerSideContent}
                  </div>
                  :
                  null
                }
              </div>
              {children}
            </div>
          </div>
        </div>
    );
  }
}

export default ResumeSection;