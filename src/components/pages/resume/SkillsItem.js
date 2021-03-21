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
    <li className='skills__item'>
      <div className="skills__title">{title}:</div>
      <div  className="skills__percent-outer">
        <div ref={percentDiv} className="skills__percent-inner"></div>
      </div>
    </li>
  );
}

export default SkillsItem;
