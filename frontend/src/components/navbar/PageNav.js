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
    desktop: {min: 1.75, max: 1.5},
    mobile: {min: 1.25, max: 1.05},
    min: 1.5,
    max: 1.75,
  };
	static scrollSectionDelimiterOffset = window.innerHeight / 6;
	static previousSectionBottom = 0;
	static scrollRefreshLimit = 50;
	static maxScrollOffsetPercent = 1;
	static shouldHandleScroll = true;
  static progressPercent = '0%';
  static selectedClass = 'page-nav--active';

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    this.updateActiveScaleRange();
  }

	componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
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

  getLinearGradient = (percent, docStyle) => {
		const mainColor = docStyle.getPropertyValue('--color-primary-4')
		const progressColor = docStyle.getPropertyValue('--color-primary-2').trim();
    
		// const valueRange = {
    //   min: .5,
    //   max: 1,
    // }

    // const percentToUse = valueRange.min + ((valueRange.max - valueRange.min) * (percent / 100))

    return `
      linear-gradient(to right, 
        ${progressColor.trim()} 0%, 
        ${progressColor.trim()} ${percent}%,
        ${mainColor} ${percent}%,
        ${mainColor} 100%)`
      ;
  }

  handleScroll = (e) => {
		if (!PageNav.shouldHandleScroll) return;
		PageNav.shouldHandleScroll = false;
    const scrollY = window.scrollY;
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
		const maxScrollOffset = document.body.scrollHeight * PageNav.maxScrollOffsetPercent / 100;
    const isEnd = scrollY >= maxScrollY - maxScrollOffset;
    const boundingRects = [];
    const sections = document.querySelectorAll('[data-section]');

    let currentSection = null;
    let indexOfCurrentSection = -1;
    let percentThroughSection = '';

    //Reseting the top to 0
    if (scrollY < 10) PageNav.previousSectionBottom = 0;

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
        let boundingRectToUse = boundingRects[i < 1 ? 0 : indexOfCurrentSection];
				
				
				if ((boundingRectToUse.bottom <= PageNav.scrollSectionDelimiterOffset && i > 0) || i === 0) {
					currentSection = sections[indexOfCurrentSection + 1];
					if (!PageNav.previousSectionBottom) PageNav.previousSectionBottom = window.scrollY;
					
					let boundingRectNext = boundingRects[i < 1 ? 0 : indexOfCurrentSection + 1]
					
					const addedPercent = PageNav.scrollSectionDelimiterOffset / Math.abs(boundingRectNext.bottom - boundingRectNext.top) * 100;

					const amountProgressed = window.scrollY - PageNav.previousSectionBottom;
					const endAmount = PageNav.scrollSectionDelimiterOffset;
					
					//TODO: here the percent through section is not correct when going backwards
					percentThroughSection = amountProgressed / endAmount * addedPercent

					// console.log('percentThroughSection =', percentThroughSection);
					if (percentThroughSection >= addedPercent)  percentThroughSection = addedPercent;

				} else {
					PageNav.previousSectionBottom = null;
					const addedPercent = PageNav.scrollSectionDelimiterOffset / Math.abs(boundingRectToUse.bottom - boundingRectToUse.top) * 100;

					percentThroughSection = Math.abs(boundingRectToUse.top) / (Math.abs(boundingRectToUse.top) + Math.abs(boundingRectToUse.bottom))  * 100;

					percentThroughSection += addedPercent;
				}
				break;
      }
    }
    this.setGradientPercent(sections, currentSection, percentThroughSection, isEnd, indexOfCurrentSection);
		setTimeout(() => {
			PageNav.shouldHandleScroll = true;
		}, PageNav.scrollRefreshLimit);
  }

  setGradientPercent = (sections, currentSection, percentThroughSection, isEnd, indexOfCurrentSection) => {
		let docStyle = getComputedStyle(document.documentElement);
    const selectedGradient = this.getLinearGradient(percentThroughSection, docStyle);
    const isEndGradient = this.getLinearGradient(100, docStyle);
    const normalGradient = this.getLinearGradient(0, docStyle);
    
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