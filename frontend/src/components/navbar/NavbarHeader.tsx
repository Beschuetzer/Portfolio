import React from "react";
import styled from "styled-components";
import { respond } from "../../styles/breakpoints";
import { fontSizeOne } from "../../styles/constants";

type NavbarHeaderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const NavbarHeaderNav = styled.nav`
  pointer-events: none;
  position: fixed;
  top: 2.1rem;
  width: 100%;

  ${respond.navSwitch`
        box-shadow: 0 1.4rem 2.8rem hsla(0, 0%, 7%, .33);
        padding: ${fontSizeOne};
        top: 0;    
        `}
`;
export function NavbarHeader(props: NavbarHeaderProps) {
  const { children } = props;
  return <NavbarHeaderNav>{children}</NavbarHeaderNav>;
}
