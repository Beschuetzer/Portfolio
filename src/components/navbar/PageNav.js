import React from 'react';

class PageNav extends React.Component {
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
      //The idea behind this component is to have a nav element that has quick links to the sections of each page
      <div>PageNav</div>
    );
  }
}

export default PageNav;