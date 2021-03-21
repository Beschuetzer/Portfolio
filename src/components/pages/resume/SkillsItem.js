import React from 'react';
import { useRef, useState, useEffect } from 'react';

const SkillsItem = ({ title, percent }) => {
  const percentDiv = useRef();
  const [isDivSet, setIsDivSet] = useState(false);

  useEffect(() => {
    percentDiv.current.style.width = `${percent}%`;
    setIsDivSet(true);
  }, [percentDiv, percent])

  return (
    <React.Fragment>
      <li className='skills__item'>
        <div className="skills__title">{title}:</div>
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
