import React from 'react';
import { Link } from 'react-router-dom';
import ResumeSection from './ResumeSection';
import Paragraph from '../../typography/Paragraph';
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
        <SkillsItem title="HTML5" percent="66"/>
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