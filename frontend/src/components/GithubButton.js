import React from 'react';
import ReactDOM from 'react-dom';

class GithubButton extends React.Component {
  render() {
    return (
      ReactDOM.createPortal(
        <React.Fragment>
          <a target="_blank" rel="noreferrer" className="github__link" href="https://github.com/Beschuetzer">
            <span className="github__text github__text-top">View</span>
            {/* <span className="github__text github__text-middle">My</span> */}
            <span className="github__text github__text-bottom">GitHub</span>
            <iframe title='Github Button' src="/sprite.svg#icon-github-square"></iframe>
            <svg className="github__svg">
              <use xlinkHref="/sprite.svg#icon-github-square"></use>
            </svg>
          </a>

        </React.Fragment>
      ,
        document.querySelector('#github')
      )
    );
  }
}

export default GithubButton;