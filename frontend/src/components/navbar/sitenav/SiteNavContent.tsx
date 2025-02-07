import React from 'react'
import { styled } from 'styled-components'
import { useSiteNav } from './SiteNavContext';

type SiteNavContentProps = {}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    `

export function SiteNavContent(props: SiteNavContentProps) {
      const { isOpen} = useSiteNav();
    
  return (
    <ContentContainer>
        <div>isOpen: {isOpen.toString()}</div>
    </ContentContainer>
  )
}