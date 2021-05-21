import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { setPreviousUrl, setScrollPercent } from '../../actions';
import { capitalize } from '../../helpers';
import { 
  bridgeSections,
  BRIDGE_CURRENT_SECTION_CLASSNAME,
  BRIDGE_PAGE_NAV_LINK_CLASSNAME,
  BRIDGE_PAGE_NAV_LINKS_COLORS,
  scrollToSection,
} from '../constants';
import BridgeSectionLink from '../pages/examples/Bridge/BridgeSectionLink';

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
  static pageNav = document.querySelector('.page-nav');
  static docStyle = getComputedStyle(document.documentElement);

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    this.updateActiveScaleRange();
  }

	componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
	}

  componentDidUpdate () {
    console.log('componentDidUpdate------------------------------------------------');
    this.updateActiveScaleRange();
    const url = this.props.match.url;
    const pageName = url.slice(url.lastIndexOf('/') + 1);
    PageNav.pageNav.classList = PageNav.cssClass;
    PageNav.pageNav.classList.add(`${PageNav.cssClass}-${pageName}`);

    if (!this.props.isMobile && this.props.clickedBridgeInfoButtonCount <= 0 && url.match(/bridge/i)) PageNav.pageNav.classList.add('hidden');
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
    
    for (let i = 0; i < sections.length; i++) {
      let gradientToUse = this.getLinearGradient(percentThroughSection, PageNav.docStyle);;
      let shouldAddActiveClass = true;
      const section = sections[i];
      const pageNavSectionName = capitalize(section.dataset.section);
      const pageNavSectionElement = document.querySelector(`.page-nav__section-${pageNavSectionName}`);

      if (!pageNavSectionElement || !pageNavSectionElement.parentNode) return;

      const shouldSetEnd = isEnd && i >= indexOfCurrentSection;
      if (shouldSetEnd) {
        gradientToUse = this.getLinearGradient(100, PageNav.docStyle);
      }
      else if (!currentSection?.className.match(new RegExp(pageNavSectionName, 'ig'))) {
        gradientToUse = this.getLinearGradient(0, PageNav.docStyle);
        shouldAddActiveClass = false;
      }

      pageNavSectionElement.style.backgroundImage = gradientToUse;

      if (shouldAddActiveClass) {
        pageNavSectionElement.parentNode.classList.add(PageNav.selectedClass);

        // let amountToScale = PageNav.activeScaleRange.max;
        // if (!shouldSetEnd) {
        //   amountToScale = PageNav.activeScaleRange.min + ((PageNav.activeScaleRange.max - PageNav.activeScaleRange.min) * percentThroughSection / 100);
        // }

        // const newValue = `${PageNav.activeScaleVarName}: ${amountToScale}`;
        // document.documentElement.style.cssText += newValue;

      }
      else pageNavSectionElement.parentNode.classList.remove(PageNav.selectedClass);      
    }
  }

  checkShouldSetPreviousUrl = () => {
    const { previousUrl } = this.props;
    const currentUrl = this.props.match?.url;

    if (!previousUrl || previousUrl !== currentUrl) this.props.setPreviousUrl(currentUrl);
  }

  getSectionNames = () => {
    const sectionNames = [];
    const sections = document.querySelectorAll('[data-section]');
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const capitalized = capitalize(section.dataset.section);
      sectionNames.push(capitalized)
    }
    return sectionNames;
  }

  setBridgeColors = () => {
    //get the currentBridgeSection and run through all of the 
    const sectionNames = document.querySelectorAll(`.${BRIDGE_PAGE_NAV_LINK_CLASSNAME}`);
    
    //Setting BRIDGE_CURRENT_SECTION_CLASSNAME CSS class
    for (let i = 0; i < sectionNames.length; i++) {
      const sectionName = sectionNames[i];
      if (!sectionName) return;

      if (this.props.clickedBridgeInfoButtonCount >= 2) {
        sectionName.classList.remove('visible');
        if (i === this.props.currentBridgeSection) sectionName.classList.add(BRIDGE_CURRENT_SECTION_CLASSNAME)
        else sectionName.classList.remove(BRIDGE_CURRENT_SECTION_CLASSNAME)
      }
      else {
        sectionName.classList.add('visible');
      }
    }

    //change CSS color var depending on currentBridgeSection
    const newNormalValue = `--bridge-page-nav-link-color: ${BRIDGE_PAGE_NAV_LINKS_COLORS[this.props.currentBridgeSection].normal}`;
    document.documentElement.style.cssText += newNormalValue;

    const newHoverValue = `--bridge-page-nav-link-color-hover: ${BRIDGE_PAGE_NAV_LINKS_COLORS[this.props.currentBridgeSection].hover}`;
    document.documentElement.style.cssText += newHoverValue;


    // document.documentElement.style.setProperty('--bridge-page-nav-link-color', BRIDGE_PAGE_NAV_LINKS_COLORS[this.props.currentBridgeSection]);

  }

  // handleMobileBridgeLinkClick = (e) => {
  //   const sectionName = e.currentTarget?.textContent.toLowerCase();
  //   if (!sectionName) return;
  //   const scrollY = window.scrollY;
  //   const sectionToNavigateTo = document.querySelector(`#${sectionName}`);
  //   const top = sectionToNavigateTo.getBoundingClientRect().top;
  //   window.scroll({
  //     top: scrollY + top - (this.props.headerHeight / 2), 
  //     left: 0, 
  //     behavior: 'smooth' 
  //   });
  // }

  renderFullBridge = () => {
    this.setBridgeColors();

    return bridgeSections.map((sectionName, index, array) => {
      return (
        <BridgeSectionLink
          key={index} 
          content={bridgeSections[index]}
          sectionToSkipTo={bridgeSections[index]}
          match={this.props.match}
        />
      );
    });
  }

  renderMobileBridge = () => {
    return this.renderSections();
  }

  renderBridgeSections = () => {
    if (this.props.isMobile) return this.renderMobileBridge();
    else {
      this.checkShouldSetPreviousUrl();
      
      return this.renderFullBridge();
    }
  }

  handleSectionClick = (e) => {
    scrollToSection(document.getElementById(e.currentTarget?.textContent.toLowerCase()), this.props.headerHeight)
  }

  renderSections = () => {
    this.checkShouldSetPreviousUrl();
    const sectionNames = this.getSectionNames();
    
    return sectionNames.map((sectionName, index, array) => {
      return (
        <li 
          key={index} 
          className={`${PageNav.cssClass}__section-group`}
        >
          <span 
            onClick={this.handleSectionClick}
            className={`${PageNav.cssClass}__section ${PageNav.cssClass}__section-${sectionName}`}
          >
            {sectionName}
          </span>
        </li>
      );
    });
  }

  render() {
    const { match } = this.props;
    const isBridgePage = match.url.match(/bridge/i);
    
    return (
      ReactDOM.createPortal(
        //The idea behind this component is to have a nav element that has quick links  to the sections of each page
        <React.Fragment>
          {isBridgePage ?
            this.renderBridgeSections()
          :
            this.renderSections()
          }
        </React.Fragment>
      ,
        PageNav.pageNav
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    previousUrl: state.general.previousUrl,
    isMobile: state.general.isMobile,
    hasClickedALink: state.bridge.hasClickedALink,
    clickedBridgeInfoButtonCount: state.bridge.clickedBridgeInfoButtonCount,
    currentBridgeSection: state.bridge.currentBridgeSection,
    headerHeight: state.general.headerHeight,
  }
}

export default connect(mapStateToProps, {
  setPreviousUrl,
  setScrollPercent,
})(PageNav);