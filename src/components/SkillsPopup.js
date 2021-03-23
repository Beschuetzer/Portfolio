import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { checkForParentOfType } from '../helpers';
import history from '../history';

class SkillsPopup extends React.Component {
  relevantProjects = []

  componentDidMount() {
    //TODO: Filter
    // nodes {
    //   createdAt: "2020-06-16T05:21:24Z"
    //   description: "This was a module in The Odin Project."
    //   homepageUrl: ""
    //   name: "git_test"
    //   repositoryTopics: {nodes: [{topic: {name: "git"}}]}
    //   nodes: [{topic: {name: "git"}}]
    //   0: {topic: {name: "git"}}
    //   updatedAt: "2021-03-15T18:03:40Z"
    //   url: "https://github.com/Beschuetzer/git_test"
    // }


    // this.relevantProjects = this.props.projects.filter(project => project.)

    const handleClickBody = (e) => {
      e.stopPropagation();
      const isBodyClick = !checkForParentOfType(e.target, 'div', 'skills-popup');
      console.log('isBodyClick =', isBodyClick);
      if (isBodyClick) history.push('/resume')
    }

    document.querySelector('#skills-popup').addEventListener('click', handleClickBody);
  }

  renderProjects = (skill) => {
    //TODO: calculate the projects but first need to run calculations after fetching in async action creator
  }

  renderTableHeaders = () => {
    //TODO
  }
  
  render() {
    const { skill } = this.props;
    return (
      ReactDOM.createPortal(
        <div className='skills-popup__content'>
          <div className='skills-popup__header'>'{skill}' Projects:</div>
          <div className='skills-popup__table'>
            {this.renderTableHeaders()}
            {this.renderProjects(skill)}
          </div>
        </div>
        ,
        document.querySelector('#skills-popup')
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.projects,
  }
}

export default connect(mapStateToProps, {

})(SkillsPopup);