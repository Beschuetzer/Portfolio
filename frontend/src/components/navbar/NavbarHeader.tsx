import React from "react";
import styled from "styled-components";
import { respond } from "../../styles/breakpoints";
import { SiteNavStyledProps } from "./sitenav/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import { navbarHeaderNavSwitchHeightStyles } from "./sitenav/styles";

type NavbarHeaderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const NavbarHeaderNav = styled.nav<SiteNavStyledProps>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000000;

  ${respond.navSwitch`
    background-color: ${(props: SiteNavStyledProps) =>
      props.colorscheme?.primary1};
    border-radius: 0;
    border-bottom: 1px solid
      ${(props: SiteNavStyledProps) => props.colorscheme?.primary4};
    ${navbarHeaderNavSwitchHeightStyles}
  `}  
`;
export function NavbarHeader(props: NavbarHeaderProps) {
  const { children } = props;
  const colorScheme = useColorScheme();

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
  };
  return <NavbarHeaderNav {...propsToAdd}>{children}</NavbarHeaderNav>;
}
