import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SkillsItem = ({ title, percent, href, to }) => {
  const skillsPopupDiv = document.querySelector('#skills-popup');
  const percentDiv = useRef();
  const [isDivSet, setIsDivSet] = useState(false);

  const onMouseEnter = (e) => {
    const borderRectOfSkill = e.target.getBoundingClientRect();
    console.log('borderRectOfSkill =', borderRectOfSkill);
    const yCoordinate = e.clientY;
    const maxHeight = window.innerHeight / 2;
    let classToAdd = 'top';
    if (yCoordinate <= maxHeight) classToAdd = 'bottom';
    if (skillsPopupDiv) {
      skillsPopupDiv.className = "skills-popup skills-popup--active";
      skillsPopupDiv.classList.add(classToAdd);
    }

    skillsPopupDiv.style.top = `${window.scrollY + borderRectOfSkill.top}px`;
    // skillsPopupDiv.style.left = `${borderRectOfSkill.x + borderRectOfSkill.width / 2}px`;
    skillsPopupDiv.style.left = `${borderRectOfSkill.x}px`;
  }

  const onMouseLeave = (e) => {
    skillsPopupDiv.className = "skills-popup";
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
        {to ?
          <Link className="skills__title" to={to}>
            <h3 className="">{title}:</h3>
          </Link>
        :
          <a target="_blank" rel="noreferrer" className="skills__title" href={href}>
            <p 
              onMouseEnter={onMouseEnter} 
              onMouseLeave={onMouseLeave} 
              className="">{title}:</p>
          </a>
        }
        
      </li>
      <div  className="skills__percent-outer">
        <div className="skills__percent-outer-left"></div>
        <div className="skills__percent-outer-center"></div>
        <div className="skills__percent-outer-right"></div>
        <div ref={percentDiv} className="skills__percent-inner"></div>
      </div>
   </React.Fragment>
  );
}

export default SkillsItem;
