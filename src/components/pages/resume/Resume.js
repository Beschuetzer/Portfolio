import React from 'react';
import ResumeSection from './ResumeSection';
import Paragraph from '../../typography/Paragraph';

const content = {
  summary: 
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<a className="resume__link" href='/works'>what I have been building</a>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
  skills:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<a className="resume__link" href='/works'>what I have been building</a>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
  workHistory:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<a className="resume__link" href='/works'>what I have been building</a>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
  education:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<a className="resume__link" href='/works'>what I have been building</a>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
  references:
    <React.Fragment>
      <Paragraph size="four">
        I have created this website to highlight the reasons I believe I would be an excellent canditate for one of the web development programs at Revature.  If you have not yet had the chance, I highly encourage you check out &nbsp;<a className="resume__link" href='/works'>what I have been building</a>&nbsp;since I embarked on this journey.
      </Paragraph>
    </React.Fragment>
  ,
};

const headerSideContent = {
  summary: "Put Photo Here",
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
      </section>
    );
  }
}

export default Resume;