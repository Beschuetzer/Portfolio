import React from 'react';
import {useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { checkForParentOfType } from '../helpers';
import { clickSkill, addRepoToReposToDisplay } from '../actions';

const SkillsPopup = ({clickSkill, skill, repos, clickedSkill, addRepoToReposToDisplay }) => {
  const skillsPopupDiv = document.querySelector('#skillsPopup');

  //on initial load
  useEffect(() => {
    const handleClickBody = (e) => {
      e.stopPropagation();
      const isBodyClick = !checkForParentOfType(e.target, 'div', 'skills-popup');
      if (isBodyClick) {
        skillsPopupDiv?.classList?.remove('skills-popup--active');
        clickSkill(null);
        addRepoToReposToDisplay([]);
      }
    }
    skillsPopupDiv.addEventListener('click', handleClickBody);
  }, [clickSkill, skillsPopupDiv, addRepoToReposToDisplay]) 

  //when clickedSkillUpdate
  useEffect(() => {
    for (let i = 0; i < repos.length; i++) {
      const repo = repos[i];
      for (let j = 0; j < repo.repositoryTopics.nodes?.length; j++) {
        const node = repo.repositoryTopics.nodes[j];
        if (clickedSkill && node?.topic?.name === clickedSkill) {
          addRepoToReposToDisplay(repos[i]);
          break;
        }
      }
    }

  }, [clickedSkill, repos, addRepoToReposToDisplay]);

  const onCloseClick = (e) => {
    skillsPopupDiv?.classList?.remove('skills-popup--active');
    clickSkill(null);
  }

  const renderProjects = (skill) => {
    //TODO: calculate the projects but first need to run calculations after fetching in async action creator
  }

  const renderTableHeaders = () => {
    //TODO
  }
  
  return (
    ReactDOM.createPortal(
      <div className='skills-popup__content'>
        <svg onClick={onCloseClick} className='skills-popup__close'>
          <use xlinkHref="/sprite.svg#icon-close"></use>
        </svg>
        <div className='skills-popup__header'>'{skill}' Projects:</div>
        <div className='skills-popup__table'>
          {renderTableHeaders()}
          {renderProjects(skill)}
        </div>
      </div>
      ,
      document.querySelector('#skillsPopup')
    )
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    repos: state.repos,
    clickedSkill: state.clickedSkill,
  }
}

export default connect(mapStateToProps, {
  clickSkill,
  addRepoToReposToDisplay,
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