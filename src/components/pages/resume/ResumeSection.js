import React from 'react';
import { capitalize } from '../../../helpers';

class ResumeSection extends React.Component {
  

  render () {
    const { name, children, headerSideContent } = this.props;
    return (
      <section id={name} data-section={name} className={`resume__section resume__section-${name}`}>
          <article className="resume__card z-index-content">
            <div className="resume__content">
              <div className="resume__header">
                <h3 className="heading--three resume__header-title">{capitalize(name)?.replace('-', ' ')}</h3>
                {
                  headerSideContent ? 
                  headerSideContent
                  :
                  null
                }
              </div>
              {children}
            </div>
          </article>
        </section>
    );
  }
}

export default ResumeSection;