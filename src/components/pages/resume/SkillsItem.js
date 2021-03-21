import React from 'react';

class SkillsItem extends React.Component {
  constructor(props) {
    super(props);
    this.percentDiv = React.createRef();
  }
  render() {
    const { title, percent } = this.props;
    debugger
    if (this.percentDiv && this.percentDiv.current) this.percentDiv.current.style.width = `${percent}%`;

    return (
      <li className='skills__item'>
        <div className="skills__title">{title}:</div>
        <div  className="skills__percent-outer">
          <div ref={this.percentDiv} className="skills__percent-inner"></div>
        </div>
      </li>
    );
  }
}

export default SkillsItem;
