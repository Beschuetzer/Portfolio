import React from 'react';

interface SectionContainerProps {
  name: string,
  pageName: string,
  children: any,
  styles?: any,
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  name,
  pageName,
  children,
  styles,
}) => {

  return (
    <section
      style={styles ? styles : {}}
      id={name.toLowerCase()}
      data-section={name.toLowerCase()}
      className={`${pageName}__section ${pageName}__section-${name.toLowerCase()}`}
    >
      {children}
    </section>
  );
}

export default SectionContainer;