import React from 'react';
import react from 'react';

const EducationItem = ({startDate, endDate, degree, location, gpa, href, note}) => {

  return (
    <li className="education__item">
      <span className='education__date'> 
        {endDate ? 
          <React.Fragment>
            <span>{startDate}</span>
            <span>&nbsp; &#8211; &nbsp;</span>
            <span>{endDate}</span>
          </React.Fragment>
        :
          startDate
        }
        : 
      </span>
      <a 
        href={href}
        className='education__degree skills-popup__link-text skills__title--animating'
        target='_blank'
        rel='noreferrer'
      > 
        {degree}
      </a>
      <span className='education__location'> from {location}  </span>
      <span className='education__gpa'> ({gpa} GPA). </span>
    </li>
  )
}

export default EducationItem;