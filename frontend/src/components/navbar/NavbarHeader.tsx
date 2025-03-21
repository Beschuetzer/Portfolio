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
  z-index: ${props => props.isopen === 'true' ? '10000000' : '1'};
  border-bottom: 1px solid ${(props: SiteNavStyledProps) =>
    props.colorscheme?.primary1};
    transition: z-index .25s;

  ${respond.navSwitch`
    background-color: ${(props: SiteNavStyledProps) =>
      hexToRgba(props.colorscheme?.primary4, 1)};
    border-radius: 0;
    z-index: 10;
    ${navbarHeaderNavSwitchHeightStyles}
  `}  
`;
export function NavbarHeader(props: NavbarHeaderProps) {
  const { children } = props;
  const { isOpen } = useSiteNav();
  const colorScheme = useColorScheme();

  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
    isopen: isOpen ? "true" : undefined, 
  };
  return <NavbarHeaderNav {...propsToAdd}>{children}</NavbarHeaderNav>;
}
