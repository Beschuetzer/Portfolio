import React from "react";
import styled from "styled-components";
import { respond } from "../../styles/breakpoints";

type NavbarHeaderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const NavbarHeaderNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000000;   

  ${respond.navSwitch`
            top: 0;
        `}
`;
export function NavbarHeader(props: NavbarHeaderProps) {
  const { children } = props;
  return <NavbarHeaderNav>{children}</NavbarHeaderNav>;
}
