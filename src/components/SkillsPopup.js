import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { checkForParentOfType } from '../helpers';
import { clickSkill } from '../actions';

class SkillsPopup extends React.Component {
  relevantProjects = []
  skillsPopupDiv = document.querySelector('#skillsPopup');

  componentDidMount() {
    console.log('this.props =', this.props);

    const handleClickBody = (e) => {
      e.stopPropagation();
      const isBodyClick = !checkForParentOfType(e.target, 'div', 'skills-popup');
      if (isBodyClick) {
        this.skillsPopupDiv?.classList?.remove('skills-popup--active');
        this.props.clickSkill(null);
      }
    }

    this.skillsPopupDiv.addEventListener('click', handleClickBody);
  }

  onCloseClick = (e) => {
    this.skillsPopupDiv?.classList?.remove('skills-popup--active');
    this.props.clickSkill(null);
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
          <svg onClick={this.onCloseClick} className='skills-popup__close'>
            <use xlinkHref="/sprite.svg#icon-close"></use>
          </svg>
          <div className='skills-popup__header'>'{skill}' Projects:</div>
          <div className='skills-popup__table'>
            {this.renderTableHeaders()}
            {this.renderProjects(skill)}
          </div>
        </div>
        ,
        document.querySelector('#skillsPopup')
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.projects,
    clickedSkill: state.clickedSkill,
  }
}

export default connect(mapStateToProps, {
  clickSkill,
})(SkillsPopup);


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