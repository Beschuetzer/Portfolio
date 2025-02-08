import React from "react";
import styled from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import SiteNavItem, { SiteNavItemProps } from "./SiteNavItem";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { useSiteNav } from "./SiteNavContext";

const DropDownContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const SiteNavTriangle = styled.div<SiteNavStyledProps>`
  border-color: transparent transparent transparent
    ${(props) => props.colorscheme?.primary1};
  border-style: solid;
  border-width: 0.462rem 0 0.462rem 1.05rem;
  height: 0;
  margin-left: 0.7rem;
  width: 0;
  transition: transform 0.25s ease, -webkit-transform 0.25s ease;
`;

type SiteNavDropDownProps = {
  isLast?: boolean;
  items: SiteNavItemProps[];
};

export function SiteNavDropDown(props: SiteNavDropDownProps) {
  const colorScheme = useColorScheme();
  const { isOpen } = useSiteNav();
  const { isLast } = props;

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme !== null ? colorScheme : undefined,
    isopen: isOpen,
    islast: isLast,
  };

  return (
    <DropDownContainer {...propsToAdd}>
      <SiteNavTriangle {...propsToAdd} className="triangle" />
      <DropDownContainer {...propsToAdd}>
        {props.items.map((item, index) => (
          <SiteNavItem key={index} {...item} />
        ))}
      </DropDownContainer>
    </DropDownContainer>
  );
}
