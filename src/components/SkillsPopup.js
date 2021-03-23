import React from 'react';
import { connect } from 'react-redux';

class SkillsPopup extends React.Component {
  relevantProjects = []

  componentDidMount() {
    //TODO: Filter
    nodes {
      createdAt: "2020-06-16T05:21:24Z"
      description: "This was a module in The Odin Project."
      homepageUrl: ""
      name: "git_test"
      repositoryTopics: {nodes: [{topic: {name: "git"}}]}
      nodes: [{topic: {name: "git"}}]
      0: {topic: {name: "git"}}
      updatedAt: "2021-03-15T18:03:40Z"
      url: "https://github.com/Beschuetzer/git_test"
    }


    this.relevantProjects = this.props.projects.filter(project => project.)
  }

  renderProjects = (skill) => {
    //TODO: calculate the projects but first need to run calculations after fetching in async action creator
  }

  renderTableHeaders = () => {
    //TODO
  }
  
  render() {
    const { position, skill } = this.props;
    return (
      <div className={`skills-popup skills-popup${position}`}>
        <div className='skills-popup__header'>'{skill}' Projects:</div>
        <div className='skills-popup__table'>
          {this.renderTableHeaders()}
          {this.renderProjects(skill)}
        </div>
      </div>
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