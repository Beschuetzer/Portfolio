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

  const id = name.toLowerCase().replace(' ', '-');
  return (
    <section
      style={styles ? styles : {}}
      id={id}
      data-section={id}
      className={`${pageName}__section ${pageName}__section-${name.toLowerCase()}`}
    >
      {children}
    </section>
  );
}

export default SectionContainer;