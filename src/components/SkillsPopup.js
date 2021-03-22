import React from 'react';
import { connect } from 'react-redux';
imprt {}

class SkillsPopup extends React.Component {

  componentDidMount() {

  }
  
  render() {
    const { position, skill } = this.props;
    return (
      <div className={`skills-popup skills-popup${position}`}>
        <div className='skills-popup__title'>{skill}</div>
        {projects}

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  skills: state.projects.skills[ownProps.skill],
}

export default connect(mapStateToProps, {

}(SkillsPopup);