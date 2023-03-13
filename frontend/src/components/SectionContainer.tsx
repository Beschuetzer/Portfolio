import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { useBridgeSectionSlidingClassname } from '../hooks/useBridgeSectionSlidingClassname';
import { currentBridgeSectionSelector } from '../slices';
import { BridgeSectionClassname } from '../types';

type SectionContainerProps = {
  index?: number,
  name: string,
  pageName: string,
  children: any,
  styles?: any,
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  index,
  name,
  pageName,
  children,
  styles,
}) => {
  const bridgeSlidingClassname = useBridgeSectionSlidingClassname(index);
  const id = name.toLowerCase().replace(' ', '-');
  
  return (
    <section
      style={styles ? styles : {}}
      id={id}
      data-section={id}
      className={`${pageName}__section ${pageName}__section-${name.toLowerCase()} ${bridgeSlidingClassname}`}
    >
      {children}
    </section>
  );
}