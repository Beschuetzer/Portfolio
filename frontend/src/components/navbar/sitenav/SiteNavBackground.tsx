import React from 'react'
import { styled } from 'styled-components';
import { useSiteNav } from './SiteNavContext';
import { SiteNavStyledProps } from './SiteNav';

const SiteNavBackgroundStyled = styled.div<SiteNavStyledProps>`
  height: 200vh;
  left: 0;
  position: fixed;
  top: 0;
  visibility: ${props => props.isOpen ? "visible" : "hidden"};
  width: 200vw;
  z-index: -1;
  ${props => props.isOpen ? "backdrop-filter: blur(.7rem) brightness(.5) drop-shadow(0 1.4rem 2.8rem var(--color-grey-80));" : ""}
transition: filter .5s ease, -webkit-filter .5s ease;
`;

type SiteNavBackgroundProps = {}

export default function SiteNavBackground(props: SiteNavBackgroundProps) {
    const {isOpen, toggleIsOpen} = useSiteNav();
  return (
    <SiteNavBackgroundStyled onClick={toggleIsOpen} isOpen={isOpen}/>
  )
}