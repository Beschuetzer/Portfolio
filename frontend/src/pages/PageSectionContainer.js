import React from 'react';

const PageSectionContainer = ({children, name}) => {
  return (
    <section className={`root ${name}`}>
      {children}
    </section>
  );
}

export default PageSectionContainer;