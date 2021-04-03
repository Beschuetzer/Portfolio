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
  static progressPercent = '22.5%';
  // static sectionsBounds = {};

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);

    
  }

  handleScroll = (e) => {
    const scrollY = window.scrollY;
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = `${scrollY / maxScrollY * 100}%`;
    // console.log('window.pageYOffset || document.documentElement.scrollTop =', window.pageYOffset || document.documentElement.scrollTop);
    // console.log('scrollPercent =', scrollPercent);
    // console.log('scrollY =', scrollY);
    // console.log('sectionsBounds =', PageNav.sectionsBounds);

    //get the binding rects for each section
    let currentSection = null;
    let percentThroughSection = '';
    const boundingRects = [];
    const sections = document.querySelectorAll('[data-section]');
    // const sectionsBounds = {};
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const boundingRect = section.getBoundingClientRect();
      boundingRects.push(boundingRect);

      if (boundingRect.top >= 0) {
        if (i === 0) { 
          currentSection = sections[0];
        } else {
          currentSection = sections[i - 1];
        }
        const boundingRectToUse = boundingRects[i === 0 ? 0 : i - 1];
        percentThroughSection = Math.abs(boundingRectToUse.top) / (Math.abs(boundingRectToUse.top) + Math.abs(boundingRectToUse.bottom))  * 100;
        console.log('currentSection =', currentSection.dataset.section);
        console.log('Math.abs(boundingRectToUse.top) =', Math.abs(boundingRectToUse.top));
        console.log('Math.abs(boundingRectToUse.bottom) =', Math.abs(boundingRectToUse.bottom));
        console.log('percentThroughSection =', percentThroughSection);
        break;
      }
      
      // sectionsBounds[section.dataset.section] = boundingRect;
    }

  


    // PageNav.sectionsBounds = sectionsBounds;
  }

  setGradientPercent = () => {
    const newGradient = `
      linear-gradient(to right, 
        ${PageNav.progressColor} 0%, 
        ${PageNav.progressColor} ${PageNav.progressPercent},
        ${PageNav.mainColor} ${PageNav.progressPercent},
        ${PageNav.mainColor} 100%)`
    ;
    document.documentElement.style.setProperty(PageNav.gradientVarName, newGradient);
  }

  renderSections = () => {
    this.setGradientPercent();
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