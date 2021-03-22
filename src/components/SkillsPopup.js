import React from 'react';
import { connect } from 'react-redux';

class SkillsPopup extends React.Component {

  renderProjects = (skill) => {
    //TODO: calculate the projects but first need to run calculations after fetching in async action creator
  }
  
  render() {
    const { position, skill } = this.props;
    return (
      <div className={`skills-popup skills-popup${position}`}>
        <div className='skills-popup__title'>{skill}</div>
        {this.renderProjects(skill)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    skills: state.projects.skills[ownProps.skill],
  }
}

export default connect(mapStateToProps, {

})(SkillsPopup);