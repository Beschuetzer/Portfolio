import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setPreviousUrl, setScrollPercent } from '../../actions';
import { capitalize } from '../../helpers';

class PageNav extends React.Component {
  static cssClass = 'page-nav';
  static gradientVarName = '--site-nav-linear-gradient';
  static mainColor = '#f4d160';
  static progressColor = '#8ac4d0';
  static progressPercent = '0%';

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  getLinearGradient = (percent) => {
    return `
      linear-gradient(to right, 
        ${PageNav.progressColor} 0%, 
        ${PageNav.progressColor} ${percent}%,
        ${PageNav.mainColor} ${percent}%,
        ${PageNav.mainColor} 100%)`
      ;
  }

  handleScroll = (e) => {
    const scrollY = window.scrollY;
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    const isEnd = scrollY >= maxScrollY;

    //get the binding rects for each section
    let currentSection = null;
    let indexOfCurrentSection = -1;
    let percentThroughSection = '';
    const boundingRects = [];
    const sections = document.querySelectorAll('[data-section]');
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const boundingRect = section.getBoundingClientRect();
      boundingRects.push(boundingRect);
      indexOfCurrentSection = i - 1;

      if (boundingRect.top >= 0) {
        if (i === 0) { 
          currentSection = sections[0];
        } else {
          currentSection = sections[indexOfCurrentSection];
        }
        const boundingRectToUse = boundingRects[i === 0 ? 0 : indexOfCurrentSection];
        percentThroughSection = Math.abs(boundingRectToUse.top) / (Math.abs(boundingRectToUse.top) + Math.abs(boundingRectToUse.bottom))  * 100;
        break;
      }
    }
    this.setGradientPercent(sections, currentSection, percentThroughSection, isEnd, indexOfCurrentSection);
  }

  setGradientPercent = (sections, currentSection, percentThroughSection, isEnd, indexOfCurrentSection) => {
    console.log('isEnd =', isEnd);
    console.log('indexOfCurrentSection =', indexOfCurrentSection);
    const selectedGradient = this.getLinearGradient(percentThroughSection);
    const isEndGradient = this.getLinearGradient(100);
    const normalGradient = this.getLinearGradient(0);
    
    for (let i = 0; i < sections.length; i++) {
      let gradientToUse = selectedGradient;
      const section = sections[i];
      const pageNavSectionName = capitalize(section.dataset.section);
      const pageNavSectionElement = document.querySelector(`.page-nav__section-${pageNavSectionName}`)


      if (isEnd && i >= indexOfCurrentSection) {
        gradientToUse = isEndGradient;
      }
      else if (!currentSection.className.match(new RegExp(pageNavSectionName, 'ig'))) {
        gradientToUse = normalGradient;
      }
      
      pageNavSectionElement.style.backgroundImage = gradientToUse;
    }
  }

  renderSections = () => {
    const { previousUrl } = this.props;
    const currentUrl = this.props.match?.url;

    if (!previousUrl || previousUrl !== currentUrl) this.props.setPreviousUrl(currentUrl);

    let sectionNames = [];
    const sections = document.querySelectorAll('[data-section]');
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const capitalized = capitalize(section.dataset.section);
      sectionNames.push(capitalized)
    }
    
    return sectionNames.map((sectionName, index, array) => {
      return (
        <li 
          key={sectionName} 
          className={`${PageNav.cssClass}__section-group`}
        >
          <a 
            href={`${this.props.match.url}#${sectionName?.toLowerCase()}`} 
            className={`${PageNav.cssClass}__section ${PageNav.cssClass}__section-${sectionName}`}
          >
            {sectionName}
            &nbsp;
          </a>
          {/* {index < (array.length - 1) ?
            <span>/</span>
          : 
            null
          } */}
          &nbsp;
        </li>
      );
    });
  }

  render() {
    return (
      ReactDOM.createPortal(
        //The idea behind this component is to have a nav element that has quick links  to the sections of each page
        <React.Fragment>
          {this.renderSections()}
        </React.Fragment>
      ,
        document.querySelector('.page-nav')
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    previousUrl: state.general.previousUrl
  }
}

export default connect(mapStateToProps, {
  setPreviousUrl,
  setScrollPercent,
})(PageNav);