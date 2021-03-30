import * as THREE from 'three';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ResumeSection from './ResumeSection';
import Paragraph from '../../typography/Paragraph';
import SkillsItemSection from './Skills/SkillsItemSection';
import SkillsItemSectionLabels from './Skills/SkillsItemSectionLabels';
import SkillsItem from './Skills/SkillsItem';

import { getRepositories } from '../../../actions';
import SkillsPopup from './Skills/SkillsPopup/SkillsPopup';
import WorkHistoryItem from './WorkHistory/WorkHistoryItem';


class Resume extends React.Component {
  componentDidMount() {
    // this.renderTHREE();
    if (this.props.repos?.length > 0) return;
    this.props.getRepositories();
  }
  
  popupUrl = '/resume#skillsPopup';
  skillsLabels = {
    web: {
      left:"Novice",
      center:"Proficient",
      right:"Master",
    },
    it: {
      left:"Familiar",
      center:"Knowledgeable",
      right:"Expert",
    },
    human: {
      left:"Needs Work",
      center:"Average",
      right:"Excels",
    },
  }
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
              labels={this.skillsLabels.web}
            />
            <SkillsItem labels={this.skillsLabels.web} title="HTML5" percent="50" /> {//hours="800"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="CSS3" percent="65" /> {//hours="900"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Bootstrap" percent="34" /> {//hours="200"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Semantic-UI" percent="28" /> {//hours="30"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="SCSS" percent="51" /> {//hours="250"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Javascript" percent="67" /> {//hours="900"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="jQuery" percent="31" /> {//hours="40"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="PaperJS" percent="44" /> {//hours="600"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="ThreeJS" percent="40" /> {//hours="90"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Express" percent="59" /> {//hours="120"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="socket.io" percent="47.5" /> {//hours="200"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="React" percent="55" /> {//hours="200"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Redux" percent="36" /> {//hours="150"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Python" percent="33" /> {//hours="175"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Ruby" percent="25" /> {//hours="80"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="C#" percent="30" /> {//hours="400"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="Mongoose" percent="38" /> {//hours="80"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="GraphQL" percent="32" /> {//hours="10"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="EJS" percent="48" /> {//hours="80"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} title="BEM" percent="42" /> {//hours="250"/> 
                                                      }
            <SkillsItem labels={this.skillsLabels.web} href='/certs/sql.png' title="SQL" percent="20"/>
          </SkillsItemSection>
  
          <SkillsItemSection title="IT Support">
            <SkillsItemSectionLabels 
              labels={this.skillsLabels.it}
            />
            <SkillsItem labels={this.skillsLabels.it} href='/certs/a-plus.png' title="A+" percent="80"/>
            <SkillsItem labels={this.skillsLabels.it} href='/certs/network-plus.png' title="Network+" percent="70"/>
            <SkillsItem labels={this.skillsLabels.it} href="https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ" title="Google IT Support" percent="66"/>
            <SkillsItem labels={this.skillsLabels.it} href='/certs/server2016.png' title="Window's Server 2016" percent="40" />
            <SkillsItem labels={this.skillsLabels.it} href='/certs/sccm.jpg' title="SCCM" percent="35"/>
            <SkillsItem labels={this.skillsLabels.it} href='/certs/group-policy.jpg' title="Group Policy" percent="38"/>
            <SkillsItem labels={this.skillsLabels.it} href='/certs/powershell-active-directory-admin.jpg' title="Powershell" percent="50"/>
          </SkillsItemSection>
          <SkillsItemSection title="Human Skills">
            <SkillsItemSectionLabels 
              labels={this.skillsLabels.human}
            />
            {/* https://www.youtube.com/watch?v=p0zB-aw-vQg */}
            <SkillsItem labels={this.skillsLabels.human} title="Listening" percent="85"/>
            <SkillsItem labels={this.skillsLabels.human} title="Giving Feedback" percent="48"/>
            <SkillsItem labels={this.skillsLabels.human} title="Receiving Feedback" percent="66"/>
            <SkillsItem labels={this.skillsLabels.human} title="Empathizing" percent="68"/>
            <SkillsItem labels={this.skillsLabels.human} title="Having Difficult Conversations" percent="75"/>
            <SkillsItem labels={this.skillsLabels.human} title="Written Communication" percent="85"/>
            <SkillsItem labels={this.skillsLabels.human} title="Oral Communication" percent="75"/>
            <SkillsItem labels={this.skillsLabels.human} title="Self-Starter" percent="78"/>
          </SkillsItemSection>
        </ul>
      </React.Fragment>
    ],
    [
      'work History', 
      <React.Fragment>
        <div className="work-history">
          <WorkHistoryItem
            startDate="07/2019"
            endDate="06/2020"
            title="<span class='work-history__item-number'>01.</span><span>Technology Services Support Representative at <a target='_blank' rel='noreferrer'
            class='skills-popup__link-text skills__title--animating' href='https://www.ricoh-usa.com/en'> Ricoh Ltd </a>:</span>"
            sections={
              [
                {
                  title: "Responsibilities",
                  bullets: [
                    "Worked with clients to resolve issues related to their multi-function devices.",
                    "Configured, troubleshot, installed, and repaired multi-function devices.",      
                  ]
                },
                {
                  title: "Highlights",
                  bullets: [
                    "Secured two contracts with clients by going the extra mile to ensure customer satisfaction.",
                    "Increased productivity by 10% by <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://github.com/Beschuetzer/PowerShell'> automating repetitive tasks.</a> ",
                  ]
                },
              ]
            }
          />

          <WorkHistoryItem
            startDate="07/2018"
            endDate="06/2019"
            title="<span class='work-history__item-number'>02.</span><span>Second Grade Education Assistant at <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.kualapuucharterschool.org/'> <span>Kualapuu Charter School <span></a>:</span>"
            sections={
              [
                {
                  title: "Note",
                  bullets: [
                    "I wasn't officially employed by the school, rather I assisted my fiance who was the second grade teacher by volunteering in her classroom and assisting with grading.",
                  ]
                },
                {
                  title: "Highlights",
                  bullets: [
                    "Created a <a class='skills-popup__link-text skills__title--animating' href='/macroexamples/macroExampleMathGrader.xlsm'> grading tool</a> to facilitate grading of math assessments.",
                    "Created a <a class='skills-popup__link-text skills__title--animating' href='/macroexamples/macroExampleBookTrust.xlsm'>Book Trust tool</a> to facilitate monthly <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.booktrust.org'>Book Trust </a> ordering process.",
                    "Used my time to study Bash, Powershell, Windows Active Directory, get the Google IT Support Specialist Certificate, and other IT Support related skills (IT support was the direction I wanted to go in at that point in time)."
                  ]
                },
              ]
            }
          />
          <WorkHistoryItem
            startDate="07/2007"
            endDate="07/2018"
            title="<span class='work-history__item-number'>03.</span><span>PearsonVue Test Admin / Office Admin at <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.isd622.org/'> ISD622 </a>:</span>"
            sections={
              [
                {
                  title: "Responsibilities",
                  bullets: [
                    "Offered technical support to teachers and other staff members.",
                    "Guide learners throughout the registration process.",
                    "Created reports and documents, provided recommendations, etc.",
                    "Served a diverse set of individuals including seniors learning how to read, single-parent mothers, incarcerated youth earning their G.E.D., refugees learning English, and professionals looking to earn certifications.",
                    "Administered G.E.D. tests in a minimum-security correctional facility for 4 years.",
                  ]
                },
                {
                  title: "Highlights",
                  bullets: [
                    "Created VBA macros to automate report generation, reducing the time-to-complete by more than 80%.",
                    "Created <a class='skills-popup__link-text skills__title--animating' href='/macroexamples/macroExampleScoring.xlsm'>custom grading forms</a> using Excel userForms and macros in order to reduce the time it took to grade assessment tests by 75%.",
                    "Created a tool that used testing data to produce reports that the teachers could use to understand the areas in which their students were having difficulties, preventing the purchase of dedicated software.",                    
                  ]
                },
              ]
            }
          />
        </div>
        
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
  ];
  
  headerSideContent = {
    summary: 
      <div className="thumbnail">
        <img src="/self-2.png" alt="Adam Major"/>
      </div>
    ,
  }

  renderTHREE = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 2;


    var animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
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