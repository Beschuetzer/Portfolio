import React from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { SiteNavStyledProps } from "./SiteNav";
import { useSiteNav } from "./SiteNavContext";
import { BREAK_POINTS } from "../../../styles/breakpoints";

type SiteNavDrawerProps = {};

const Drawer = styled.div<SiteNavStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: #fff;
  transform: translateX(${(props) => (props.isopen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
`;

export function SiteNavDrawer(props: SiteNavDrawerProps) {
  const colorScheme = useColorScheme();
  const { isOpen } = useSiteNav();
  const isRelevant = window.innerWidth <= parseInt(BREAK_POINTS.navSwitch, 10);
  const propsToAdd: SiteNavStyledProps = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
    isopen: isOpen != null ? isOpen && isRelevant : undefined,
  };

  return (
    <Drawer {...propsToAdd}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Drawer>
  );
}
