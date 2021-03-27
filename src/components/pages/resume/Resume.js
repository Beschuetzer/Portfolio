import * as THREE from 'three';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ResumeSection from './ResumeSection';
import Paragraph from '../../typography/Paragraph';
import SkillsItemSection from './SkillsItemSection';
import SkillsItemSectionLabels from './SkillsItemSectionLabels';
import SkillsItem from './SkillsItem';

import { getRepositories } from '../../../actions';
import SkillsPopup from './SkillsPopup/SkillsPopup';


class Resume extends React.Component {
  componentDidMount() {
    // this.renderTHREE();
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
              right="Master"
            />
            <SkillsItem title="HTML5" percent="50" hours="1200"/>
            <SkillsItem title="CSS3" percent="65" hours="1400"/>
            <SkillsItem title="Bootstrap" percent="34" hours="700"/>
            <SkillsItem title="Semantic-UI" percent="28" hours="100"/>
            <SkillsItem title="SCSS" percent="51" hours="300"/>
            <SkillsItem title="Javascript" percent="67" hours="1400"/>
            <SkillsItem title="jQuery" percent="31" hours="100"/>
            <SkillsItem title="PaperJS" percent="44" hours="600"/>
            <SkillsItem title="ThreeJS" percent="40" hours="90"/>
            <SkillsItem title="Express" percent="59" hours="200"/>
            <SkillsItem title="socket.io" percent="47.5" hours="350"/>
            <SkillsItem title="React" percent="55" hours="300"/>
            <SkillsItem title="Redux" percent="36" hours="250"/>
            <SkillsItem title="Python" percent="33" hours="200"/>
            <SkillsItem title="Ruby" percent="25" hours="120"/>
            <SkillsItem title="C#" percent="30" hours="800"/>
            <SkillsItem title="Mongoose" percent="38" hours="180"/>
            <SkillsItem title="GraphQL" percent="32" hours="20"/>
            <SkillsItem title="EJS" percent="48" hours="80"/>
            <SkillsItem title="BEM" percent="42" hours="300"/>
            <SkillsItem href='/certs/sql.png' title="SQL" percent="20"/>
          </SkillsItemSection>
  
          <SkillsItemSection title="IT Support">
            <SkillsItemSectionLabels 
              left="Familiar"
              center="Knowledgeable"
              right="Expert"
            />
            <SkillsItem href='/certs/a-plus.png' title="A+" percent="80"/>
            <SkillsItem href='/certs/network-plus.png' title="Network+" percent="70"/>
            <SkillsItem href="https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ" title="Google IT Support" percent="66"/>
            <SkillsItem href='/certs/server2016.png' title="Window's Server 2016" percent="40" />
            <SkillsItem href='/certs/sccm.jpg' title="SCCM" percent="35"/>
            <SkillsItem href='/certs/group-policy.jpg' title="Group Policy" percent="38"/>
            <SkillsItem href='/certs/powershell-active-directory-admin.jpg' title="Powershell" percent="50"/>
          </SkillsItemSection>
          <SkillsItemSection title="Human Skills">
            <SkillsItemSectionLabels 
              left="Lacks"
              center=""
              right="Excels"
            />
            {/* https://www.youtube.com/watch?v=p0zB-aw-vQg */}
            <SkillsItem title="Listening" percent="85"/>
            <SkillsItem title="Giving Feedback" percent="48"/>
            <SkillsItem title="Receiving Feedback" percent="66"/>
            <SkillsItem title="Empathizing" percent="68"/>
            <SkillsItem title="Having Difficult Conversations" percent="75"/>
            <SkillsItem title="Written Communication" percent="85"/>
            <SkillsItem title="Oral Communication" percent="75"/>
            <SkillsItem title="Self-Starter" percent="78"/>
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