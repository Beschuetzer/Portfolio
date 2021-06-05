import React from 'react';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initializing props to keep track of here
    };
    //you have to create a ref for each element you are planning to interact with in the DOM for each component
    this.imageRef = React.createRef();
  }

  componentDidMount = async () => {
   
  }

  render() {
    return (
      <div>Projects</div>
    );
  }
}

export default Projects;