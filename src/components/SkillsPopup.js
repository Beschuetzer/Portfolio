import React from 'react';
import {useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { checkForParentOfType } from '../helpers';
import { clickSkill, addRepoToReposToDisplay } from '../actions';

const SkillsPopup = ({reposToDisplay, repos, clickedSkill, addRepoToReposToDisplay, clickSkill }) => {
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

  const renderProjects = () => {
    //TODO: calculate the projects but first need to run calculations after fetching in async action creator

    // createdAt(pin):"2020-06-24T17:39:45Z"
    // description(pin):"This was a project that I completed for The Odin Project. My first time using Javascript along with HTML5 and CSS3"
    // name(pin):"PaperRockScissors"
    // updatedAt(pin):"2021-03-15T18:11:05Z"
    // homepageUrl(pin):"https://beschuetzer.github.io/PaperRockScissors/"
    // url(pin):"https://github.com/Beschuetzer/PaperRockScissors"
    console.log('reposToDisplay =', reposToDisplay);
    const keys = ["name", 'description', 'createdAt', ' updatedAt','url'];
    return reposToDisplay.map(repo => {
      return keys.map(key => {
        switch (key) {
          case 'name':
            if (repo['homepageUrl']) {
              return (
                <a href={repo['homepageUrl']} key={key} className=  {`skills-popup__table-item skills-popup__${key} skills-popup__link`}>
                  {repo[key]}
                </a>
              )
            }

            return (
              <div key={key} className={`skills-popup__table-item skills-popup__${key}`}>
                {repo[key]}
              </div>
            );

          case 'url':
            return (
              <a 
                key={key} 
                rel="noreferrer" 
                target="_blank" 
                href={repo[key]}
                className={`skills-popup__table-item skills-popup__${key}`}
              >
                <svg>
                  <use xlinkHref="/sprite.svg#icon-chain"></use>
                </svg>
              </a>
            );
          default:
            return (
              <div key={key} className={`skills-popup__table-item skills-popup__${key}`}>
                {repo[key]}
              </div>
            );
        }
        
      })
    })
  }

  const renderTableHeaders = () => {
    //TODO: name description created updated URL
    const headers = ['Name', 'Description', 'Created', 'Updated', 'Repository'];
    return headers.map(header => {
      return (
        <div className="skills-popup__table-header">{header}</div>
      );
    })
  }
  
  return (
    ReactDOM.createPortal(
      <div className='skills-popup__content'>
        <svg onClick={onCloseClick} className='skills-popup__close'>
          <use xlinkHref="/sprite.svg#icon-close"></use>
        </svg>
        <div className='skills-popup__header'>
          Projects that use '
          <span className="skills-popup__header-skill">{clickedSkill}</span>
          ':
        </div>
        <div className='skills-popup__table'>
          {renderTableHeaders()}
          {renderProjects()}
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
    reposToDisplay: state.reposToDisplay,
    clickedSkill: state.clickedSkill,
  }
}

export default connect(mapStateToProps, {
  clickSkill,
  addRepoToReposToDisplay,
})(SkillsPopup);
