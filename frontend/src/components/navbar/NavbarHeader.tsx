import React from "react";
import styled from "styled-components";
import { respond } from "../../styles/breakpoints";
import { SiteNavStyledProps } from "./sitenav/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import { navbarHeaderNavSwitchHeightStyles } from "./sitenav/styles";
import { hexToRgba } from "./sitenav/helpers";

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
      hexToRgba(props.colorscheme?.primary4, 1)};
    border-radius: 0;
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
