import React, { ReactChildren } from 'react';

interface SectionContainerProps {
  name: string,
  pageName: string,
  children: any,
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  name,
  pageName,
  children
}) => {

  return (
    <section
      id={name.toLowerCase()}
      data-section={name.toLowerCase()}
      className={`${pageName}__section ${pageName}__section-${name.toLowerCase()}`}
    >
      {children}
    </section>
  );
}

export default SectionContainer;