import React from 'react';

class Resume extends React.Component {
  constructor() {
    super();
    this.state = {
      //initializing props to keep track of here
    };
    //you have to create a ref for each element you are planning to interact with in the DOM for each component
    this.imageRef = React.createRef();
  }
  render() {
    return (
      <section className="resume">
        <div className="resume__section resume__section-summary">
          <h3 className="heading--three resume__header-summary">Summary</h3>
          <div className="resume__content">

          </div>
        </div>
        <div className="resume__section resume__section-skills">
          <h3 className="heading--three resume__header-skills">Skills</h3>

        </div>
        <div className="resume__section resume__section-work-history">
          <h3 className="heading--three resume__header-work">Work History</h3>

        </div>
        <div className="resume__section resume__section-education">
          <h3 className="heading--three resume__header-education">Education</h3>

        </div>
      </section>
    );
  }
}

export default Resume;