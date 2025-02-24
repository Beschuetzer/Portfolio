import React from "react";
import styled from "styled-components";
import { respond } from "../../styles/breakpoints";
import { SiteNavStyledProps } from "./sitenav/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import { navbarHeaderNavSwitchHeightStyles } from "./sitenav/styles";
import { hexToRgba } from "./sitenav/helpers";
import { useSiteNav } from "./sitenav/SiteNavContext";

type NavbarHeaderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const NavbarHeaderNav = styled.nav<SiteNavStyledProps>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${props => props.isopen ? '10000000' : '1000000'};
  border-bottom: 1px solid ${(props: SiteNavStyledProps) =>
    props.colorscheme?.primary1};

  ${respond.navSwitch`
    background-color: ${(props: SiteNavStyledProps) =>
      hexToRgba(props.colorscheme?.primary4, 1)};
    border-radius: 0;
    ${navbarHeaderNavSwitchHeightStyles}
  `}  
`;
export function NavbarHeader(props: NavbarHeaderProps) {
  const { children } = props;
  const { isOpen } = useSiteNav();
  const colorScheme = useColorScheme();

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
    isopen: isOpen, 
  };
  return <NavbarHeaderNav {...propsToAdd}>{children}</NavbarHeaderNav>;
}
