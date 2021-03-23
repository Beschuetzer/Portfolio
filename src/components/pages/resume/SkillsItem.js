import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SkillsItem = ({ title, percent, href, to }) => {
  const skillsPopupDiv = document.querySelector('#skillsPopup');
  const percentDiv = useRef();
  const [isDivSet, setIsDivSet] = useState(false);

  const onParagraphClick = (e) => {
    skillsPopupDiv?.classList?.toggle('skills-popup--active')
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
              onClick={onParagraphClick} 
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
