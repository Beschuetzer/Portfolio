import React from 'react';
import {useEffect} from 'react';
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
    addRepoToReposToDisplay([]);
  }

  const returnDate = (key, repo) => {
    return (
      <div key={key} className={`skills-popup__table-item skills-popup__${key}`}>
        {new Date(repo[key]).toLocaleString()}
      </div>
    );
  }

  const renderProjects = () => {
    const keys = ["name", 'description', 'createdAt', 'updatedAt','url'];
    return reposToDisplay.map(repo => {
      return keys.map(key => {
        switch (key) {
          case 'name':
            if (repo['homepageUrl']) {
              return (
                <a 
                  key={key}
                  href={repo['homepageUrl']}  
                  className=  {`skills-popup__table-item skills-popup__${key} skills-popup__link skills__title--animating`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="skills-popup__link-text">{repo[key]}</div>
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
          case 'createdAt':
            return returnDate(key, repo);
          case 'updatedAt':
            return returnDate(key, repo);
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
    const headers = ['Name', 'Description', 'Created', 'Updated', 'Repository'];
    return headers.map(header => {
      return (
        <div key={header} className="skills-popup__table-header">{header}</div>
      );
    })
  }
  
  return (
    ReactDOM.createPortal(
      <div className='skills-popup__content'>
        
        <div className='skills-popup__header'>
          Highlighted Projects that use '
          <span className="skills-popup__header-skill">{clickedSkill}</span>
          ':
          <svg onClick={onCloseClick} className='skills-popup__close'>
            <use xlinkHref="/sprite.svg#icon-close"></use>
          </svg>
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
