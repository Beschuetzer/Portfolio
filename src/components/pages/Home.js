import React from 'react';
import { connect } from 'react-redux';
import { getRepositories } from '../../actions';
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

  componentDidMount() {
    if (this.props.repos?.length > 0) return;
    this.props.getRepositories();
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

const mapStateToProps = (state, ownProps) => {
  return {
    repos: state.general.repos,
  }
}

export default connect(mapStateToProps, {
  getRepositories,
})(Home);