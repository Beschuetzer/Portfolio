import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { checkForParentOfType } from '../../../../helpers';
import { clickSkill, addRepoToReposToDisplay } from '../../../../actions';
import SkillsPopupName from './SkillsPopupName';

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

  const getIndexOfItem = (target, items) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (target.localName === 'a' && item.localName === 'a')  {
        if (target.href === item.href) return i;
      }
      else if (target.innerText === item.innerText) return i;
    }
  }

  const onTableItemMouseEvent = (e) => {
    const table = document.querySelector('.skills-popup__table')
    const skillsPopupItems = document.querySelectorAll('.skills-popup__table-item');
    const indexOfTarget = getIndexOfItem(e.target, skillsPopupItems);
    const classNameToAddToItems = 'skills-popup__item-js--hover';
    const classNameToAddToLinks = 'skills-popup__link-js--hover';
    const headerCount = document.querySelectorAll('.skills-popup__table-header').length;
    const classList = e.target.classList;
    
    let rowsNameElement = null;
    let min = -1;
    let max = -1;
    let isRowsNameElementALink = false;
    let indexOffset = 0;

    if (classList?.contains('skills-popup__link-text') || classList?.contains('skills-popup__name')) {
      min = headerCount + indexOfTarget + 0;
      max = headerCount + indexOfTarget + 4;
    }
    else if (classList?.contains('skills-popup__description')) {
      min = headerCount + indexOfTarget + -1;
      max = headerCount + indexOfTarget + 3;
      indexOffset = 1;
    }
    else if (classList?.contains('skills-popup__createdAt')) {
      min = headerCount + indexOfTarget + -2;
      max = headerCount + indexOfTarget + 2;
      indexOffset = 2;
    }
    else if (classList?.contains('skills-popup__updatedAt')) {
      min = headerCount + indexOfTarget + -3;
      max = headerCount + indexOfTarget + 1;
      indexOffset = 3;
    }
    else if (classList?.contains('skills-popup__url')) {
      min = headerCount + indexOfTarget + -4;
      max = headerCount + indexOfTarget + 0;
      indexOffset = 4;
    }

    //Removing or Adding css class to get border-bottom and box-shadow
    for (let i = min; i <= max; i++) {
      if (e.type === 'mouseleave') {
        table.children[i]?.classList.remove(classNameToAddToItems)
      }
      else {
        table.children[i]?.classList.add(classNameToAddToItems);
      }
    }

    //Adding or Removing class to trigger link animation when hovering over a row with a link name element
    rowsNameElement = skillsPopupItems[indexOfTarget - indexOffset];
    isRowsNameElementALink = rowsNameElement.classList?.contains('skills-popup__link') ? true : false;

    if (isRowsNameElementALink) {
      if (e.type === 'mouseenter') rowsNameElement.classList?.add(classNameToAddToLinks)
      else rowsNameElement.classList?.remove(classNameToAddToLinks);
    }
  }

  const onCloseClick = (e) => {
    skillsPopupDiv?.classList?.remove('skills-popup--active');
    clickSkill(null);
    addRepoToReposToDisplay([]);
  }

  const returnDate = (key, repo) => {
    const date = new Date(repo[key]).toLocaleString();
    const index = date.lastIndexOf(':');
    const dateToShow = date.slice(0, index) + ' ' + date.slice(index + 4);
    return (
      <div 
        key={key} 
        className={`skills-popup__table-item skills-popup__${key}`}
        onMouseEnter={onTableItemMouseEvent}
        onMouseLeave={onTableItemMouseEvent}
      >
        {
          dateToShow
        }
      </div>
    );
  }

  const renderProjects = () => {
    const keys = ["name", 'description', 'createdAt', 'updatedAt','url'];
    return reposToDisplay.map(repo => {
      return keys.map((key, index) => {
        switch (key) {
          case 'name':
            if (repo['homepageUrl']) {
              return (
                <SkillsPopupName
                  key={key}
                  href={repo['homepageUrl']}
                  repo={repo}
                  onTableItemMouseEvent={onTableItemMouseEvent}
                />
              )
            }
            else if (repo["name"].match(/playlist.*sync/i) || repo["name"].match(/downloader/i)) {
              //TODO: add c# links to works/csharp
              return (
                <SkillsPopupName
                  key={key}
                  href={`/works/csharp#${repo['name'].replace('-','')}`}
                  repo={repo}
                  onTableItemMouseEvent={onTableItemMouseEvent}
                />
              )
            }

            return (
              <div 
                key={key} 
                onMouseEnter={onTableItemMouseEvent} 
                onMouseLeave={onTableItemMouseEvent} 
                className={`skills-popup__table-item skills-popup__${key}`}
              >
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
                onMouseEnter={onTableItemMouseEvent}
                onMouseLeave={onTableItemMouseEvent}
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
          case 'description':
            return (
              <div 
                key={key} 
                onMouseEnter={onTableItemMouseEvent} 
                onMouseLeave={onTableItemMouseEvent} 
                className={`skills-popup__table-item skills-popup__${key}`}
                dangerouslySetInnerHTML={{__html: repo[key]}}
                
              >
              </div>
            );
          default:
            return null;
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
          <span className='skills-popup__header-text'>
            Github Projects that use '<span className="skills-popup__header-skill">{clickedSkill}</span>':
          </span>
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