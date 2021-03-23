import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ResumeSection from './ResumeSection';
import Paragraph from '../../typography/Paragraph';
import SkillsItemSection from './SkillsItemSection';
import SkillsItemSectionLabels from './SkillsItemSectionLabels';
import SkillsItem from './SkillsItem';

import { getRepositories } from '../../../actions';
import SkillsPopup from '../../SkillsPopup';


class Resume extends React.Component {
  componentDidMount() {
    console.log('this.props =', this.props);
    if (this.props.repos?.length > 0) return;
    this.props.getRepositories();
    
  }
  
  popupUrl = '/resume#skillsPopup';
  content = [
    [
      'summary', 
      <React.Fragment>
        <Paragraph size="four">
          I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out&nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I decided to change careers.  
        </Paragraph>
        <Paragraph size="four">
          There you will find code examples, projects, and demos highlighting my journey to become a web developer.
        </Paragraph>
      </React.Fragment>
    ],
    [
      'skills', 
      <React.Fragment>
        <ul className="skills">
          <SkillsItemSection title="Web Development">
            <SkillsItemSectionLabels 
              left="Novice"
              center="Proficient"
              right="Advanced"
            />
            <SkillsItem title="HTML5" percent="50"/>
            <SkillsItem title="CSS3" percent="65"/>
            <SkillsItem title="SCSS" percent="51"/>
            <SkillsItem title="Javascript" percent="67"/>
            <SkillsItem title="PaperJS" percent="44"/>
            <SkillsItem title="ThreeJS" percent="13"/>
            <SkillsItem title="Express" percent="59"/>
            <SkillsItem title="socket.io" percent="47.5"/>
            <SkillsItem title="React" percent="55"/>
            <SkillsItem title="Redux" percent="36"/>
            <SkillsItem title="Python" percent="33"/>
            <SkillsItem title="Ruby" percent="25"/>
            <SkillsItem title="C#" percent="30"/>
            <SkillsItem title="Mongoose" percent="35"/>
            <SkillsItem title="GraphQL" percent="32"/>
            <SkillsItem title="EJS" percent="48"/>
            <SkillsItem title="BEM" percent="42"/>
          </SkillsItemSection>
  
          <SkillsItemSection title="IT Support">
            <SkillsItemSectionLabels 
              left="Novice"
              center="Proficient"
              right="Advanced"
            />
            <SkillsItem title="A+" percent="100"/>
            <SkillsItem title="Network+" percent="100"/>
            <SkillsItem href="https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ" title="Google IT Support Specialist" percent="100"/>
            <SkillsItem title="Add Udemy Courses link to certs" percent="67"/>
            
          </SkillsItemSection>
          <SkillsItemSection title="Human Skills">
            <SkillsItemSectionLabels 
              left="Adept"
              center="Advanced"
              right="Master"
            />
            <SkillsItem title="Empathy" percent="68"/>
            <SkillsItem title="Written Communication" percent="85"/>
            <SkillsItem title="Oral Communication" percent="75"/>
            <SkillsItem title="Self-Starter" percent="75"/>
            <SkillsItem title="Team Player" percent="85"/>
          </SkillsItemSection>
        </ul>
      </React.Fragment>
    ],
    [
      'work History', 
      <React.Fragment>
        <Paragraph size="four">
          I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
        </Paragraph>
      </React.Fragment>
    ],
    [
      'education', 
      <React.Fragment>
        <Paragraph size="four">
          I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
        </Paragraph>
      </React.Fragment>
    ],
    [
      'references', 
      <React.Fragment>
        <Paragraph size="four">
          I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
        </Paragraph>
      </React.Fragment>
    ],
    [
      'certifications', 
      <React.Fragment>
        <Paragraph size="four">
          I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
        </Paragraph>
      </React.Fragment>
    ],
  ];
  
  headerSideContent = {
    summary: 
      <div className="thumbnail">
        <img src="/self-2.png" alt="Adam Major"/>
      </div>
    ,
  }

  renderSections = () => {
    return this.content.map((contentArray, index) => {
      //Returning if there is headerSideContent for this section
      if (this.headerSideContent[contentArray[0]]) {
        return (
          <ResumeSection key={index}
            name={contentArray[0]}
            headerSideContent={this.headerSideContent[contentArray[0]]}
          >
            {contentArray[1]}
          </ResumeSection>
        );
      }

      //no headerSideContent for this section
      return (
        <ResumeSection key={index}
          name={contentArray[0]}
        >
          {contentArray[1]}
        </ResumeSection>
      );
    })
  }

  render() {
    return (
      <React.Fragment>
        <section className="resume">
          <h2 className="heading heading--two">Resume</h2>
          {this.renderSections()}
        </section>
        <SkillsPopup/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    repos: state.repos,
  }
}

export default connect(mapStateToProps, {
  getRepositories,
})(Resume);