import React from 'react';
import BackgroundVideo from '../BackgroundVideo';

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
      <section className="home">
        <BackgroundVideo/>

        <div className="home__portrait">
          {/* <img src='../../img/self-2.png' alt="Adam Major"/> */}
        </div>
      </section>
    );
  }
}

export default Home;