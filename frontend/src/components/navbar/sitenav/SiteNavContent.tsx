import React from 'react'
import { styled } from 'styled-components'
import { useSiteNav } from './SiteNavContext';
import SiteNavItem from './SiteNavItem';

type SiteNavContentProps = {}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    `

export function SiteNavContent(props: SiteNavContentProps) {
      const { isOpen} = useSiteNav();
    
  return (
    <ContentContainer>
        <SiteNavItem />
        <SiteNavItem />
        <SiteNavItem />
        <SiteNavItem />
        <SiteNavItem />
        <SiteNavItem />
    </ContentContainer>
  )
}