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
      <div>Resume</div>
    );
  }
}

export default Resume;