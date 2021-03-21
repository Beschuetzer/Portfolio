import React from 'react';
import { Link } from 'react-router-dom';
import ResumeSection from './ResumeSection';
import Paragraph from '../../typography/Paragraph';
import SkillsItemSection from './SkillsItemSection';
import SkillsItemSectionLabels from './SkillsItemSectionLabels';
import SkillsItem from './SkillsItem';

const content = {
  summary: 
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out&nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I decided to change careers.  
      </Paragraph>
      <Paragraph size="four">
        There you will find code examples, projects, and demos highlighting my journey to become a web developer.
      </Paragraph>
    </React.Fragment>
  ,
  skills:
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
        </SkillsItemSection>

      </ul>
    </React.Fragment>
  ,
  workHistory:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
  education:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
  references:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
  certifications:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<Link className="link" to='/works'>what I have been building</Link>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
};

const headerSideContent = {
  summary: 
    <div className="thumbnail">
      <img src="/self-2.png" alt="Adam Major"/>
    </div>
  ,
}

class Resume extends React.Component {
  render() {
    return (
      <section className="resume">
        <h2 className="heading heading--two">Resume</h2>
        <ResumeSection
          name="summary"
          headerSideContent={headerSideContent.summary}
        >
          {content.summary}
        </ResumeSection>
        <ResumeSection
          name="skills"
        >
          {content.skills}
        </ResumeSection>

        <ResumeSection
          name="work-history"
        >
          {content.workHistory}
        </ResumeSection>

        <ResumeSection
          name="education"
        >
          {content.education}
        </ResumeSection>
        <ResumeSection
          name="references"
        >
          {content.references}
        </ResumeSection>

        <ResumeSection
          name="certifications"
        >
          {content.certifications}
        </ResumeSection>
      </section>
    );
  }
}

export default Resume;