import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initializing props to keep track of here
    };
    //you have to create a ref for each element you are planning to interact with in the DOM for each component
    this.imageRef = React.createRef();
  }
  render() {
    return (
      <div>Home</div>
    );
  }
}

export default Home;