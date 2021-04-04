import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setPreviousUrl, setScrollPercent } from '../../actions';
import { capitalize } from '../../helpers';

class PageNav extends React.Component {
  static cssClass = 'page-nav';
  static gradientVarName = '--site-nav-linear-gradient';
  static activeScaleVarName = '--site-nav-active-scale-amount';
  static activeScaleRange = {
    desktop: {min: 1.5, max: 1.75},
    mobile: {min: 1.25, max: 1.5},
    min: 1.5,
    max: 1.75,
  };
  static mainColor = '#fbeeac';
  static progressColor = '138, 196, 208';
  static progressPercent = '0%';
  static selectedClass = 'page-nav--active';

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    this.updateActiveScaleRange();
  }

  componentDidUpdate () {
    this.updateActiveScaleRange();
  }

  updateActiveScaleRange = () => {
    if (this.props.isMobile) {
      PageNav.activeScaleRange.min = PageNav.activeScaleRange.mobile.min;
      PageNav.activeScaleRange.max = PageNav.activeScaleRange.mobile.max;
    } 
    else { 
      PageNav.activeScaleRange.min = PageNav.activeScaleRange.desktop.min;
      PageNav.activeScaleRange.max = PageNav.activeScaleRange.desktop.max;
    }
  }

  getLinearGradient = (percent) => {
    const valueRange = {
      min: .5,
      max: 1,
    }

    const percentToUse = valueRange.min + ((valueRange.max - valueRange.min) * (percent / 100))

    return `
      linear-gradient(to right, 
        rgba(${PageNav.progressColor}, ${percentToUse}) 0%, 
        rgba(${PageNav.progressColor}, ${percentToUse}) ${percent}%,
        ${PageNav.mainColor} ${percent}%,
        ${PageNav.mainColor} 100%)`
      ;
  }

  handleScroll = (e) => {
    const scrollY = window.scrollY;
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    const isEnd = scrollY >= maxScrollY;
    const boundingRects = [];
    const sections = document.querySelectorAll('[data-section]');

    let currentSection = null;
    let indexOfCurrentSection = -1;
    let percentThroughSection = '';

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const boundingRect = section.getBoundingClientRect();
      boundingRects.push(boundingRect);
      indexOfCurrentSection = i - 1;

      if (boundingRect.top > 1) {
        if (i === 0) { 
          currentSection = null;
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
    const selectedGradient = this.getLinearGradient(percentThroughSection);
    const isEndGradient = this.getLinearGradient(100);
    const normalGradient = this.getLinearGradient(0);
    
    for (let i = 0; i < sections.length; i++) {
      let gradientToUse = selectedGradient;
      let shouldAddActiveClass = true;
      const section = sections[i];
      const pageNavSectionName = capitalize(section.dataset.section);
      const pageNavSectionElement = document.querySelector(`.page-nav__section-${pageNavSectionName}`)
      const shouldSetEnd = isEnd && i >= indexOfCurrentSection;


      if (shouldSetEnd) {
        gradientToUse = isEndGradient;
      }
      else if (!currentSection?.className.match(new RegExp(pageNavSectionName, 'ig'))) {
        gradientToUse = normalGradient;
        shouldAddActiveClass = false;
      }

      pageNavSectionElement.style.backgroundImage = gradientToUse;

      if (shouldAddActiveClass) {
        pageNavSectionElement.parentNode?.classList?.add(PageNav.selectedClass);

        let amountToScale = PageNav.activeScaleRange.max;
        if (!shouldSetEnd) {
          amountToScale = PageNav.activeScaleRange.min + ((PageNav.activeScaleRange.max - PageNav.activeScaleRange.min) * percentThroughSection / 100);
        }

        const newValue = `${PageNav.activeScaleVarName}: ${amountToScale}`;
        document.documentElement.style.cssText += newValue;

      }
      else pageNavSectionElement.parentNode?.classList?.remove(PageNav.selectedClass);

      
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
          </a>
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
    previousUrl: state.general.previousUrl,
    isMobile: state.general.isMobile,
  }
}

export default connect(mapStateToProps, {
  setPreviousUrl,
  setScrollPercent,
})(PageNav);