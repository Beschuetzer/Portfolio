import React from 'react'
import { styled } from 'styled-components';
import { SiteNavItem, SiteNavStyledProps } from '../types';

type SiteNavDrawerContextDropDownProps = SiteNavItem & {
}

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  position: relative;
`;

export function SiteNavDrawerContentDropDown(props: SiteNavDrawerContextDropDownProps) {
  const { drownDownItems, text, isDropdownItem } = props
  return (
    <DropDownContainer>
      {text}
      {isDropdownItem && drownDownItems?.map((item, index) => {
        return (
          <div key={index}>
            {item.text}
          </div>
        )
      })}
    </DropDownContainer>  )
}