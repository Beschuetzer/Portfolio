import React from 'react'
import { styled } from 'styled-components'

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
  return (
    <ContentContainer>
        <div>Testing</div>
    </ContentContainer>
  )
}