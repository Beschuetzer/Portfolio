import React from 'react';
import ReactDOM from 'react-dom';
import { GITHUB_URL } from './constants';

export class GithubButton extends React.Component {
  render() {
    return (
      ReactDOM.createPortal(
        <React.Fragment>
          <a target="_blank" rel="noreferrer" className="github__link" href={GITHUB_URL}>
            <span className="github__text github__text-top">View</span>
            {/* <span className="github__text github__text-middle">My</span> */}
            <span className="github__text github__text-bottom">GitHub</span>
            <svg className="github__svg">
              <use className="github__top" xlinkHref="/sprite.svg#icon-github-with-circle"></use>
              <use className='github__bottom' xlinkHref="/sprite.svg#icon-github"></use>
            </svg>
          </a>

        </React.Fragment>
      ,
        document.querySelector('#github')!
      )
    );
  }
}