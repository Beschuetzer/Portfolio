import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clickSkill } from '../../../actions';

const SkillsItem = ({ title, percent, href, clickSkill }) => {
  const skillsPopupDiv = document.querySelector('#skillsPopup');
  const percentDiv = useRef();
  const [isDivSet, setIsDivSet] = useState(false);

  const onParagraphClick = (e) => {
    skillsPopupDiv?.classList?.toggle('skills-popup--active');
    clickSkill(e.target);
  }

  useEffect(() => {
    percentDiv.current.style.width = `${percent}%`;
    setIsDivSet(true);
  }, [percentDiv, percent])

  return (
    <React.Fragment>
      <li className='skills__item' >
        <svg className="skills__section-svg">
          <use xlinkHref="/sprite.svg#icon-circle"></use>
        </svg>
        {href ?
          <a target="_blank" rel="noreferrer" className="skills__title" href={href}>
            {title}:
          </a>
        :
          <div onClick={onParagraphClick} className="skills__title">
            {title}:
          </div>
        }
        
      </li>
      <div  className="skills__percent-outer">
        <div ref={percentDiv} className="skills__percent-inner"></div>
        <div className="skills__percent-outer-left"></div>
        <div className="skills__percent-outer-center"></div>
        <div className="skills__percent-outer-right"></div>
      </div>
   </React.Fragment>
  );
}

export default connect(null, {
  clickSkill,
})(SkillsItem);
