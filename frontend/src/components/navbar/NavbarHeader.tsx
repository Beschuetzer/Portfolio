import React from "react";
import styled from "styled-components";
import { respond } from "../../styles/breakpoints";

type NavbarHeaderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const NavbarHeaderNav = styled.nav`
  position: fixed;
  top: 2.1rem;
  width: 100%;

  ${respond.navSwitch`
            top: 0;
            z-index: 1000000;   
        `}
`;
export function NavbarHeader(props: NavbarHeaderProps) {
  const { children } = props;
  return <NavbarHeaderNav>{children}</NavbarHeaderNav>;
}
