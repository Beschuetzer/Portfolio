import React, { useMemo } from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { SiteNavStyledProps } from "../types";
import { useSiteNav } from "../SiteNavContext";
import { BREAK_POINTS } from "../../../../styles/breakpoints";
import SiteNavDrawerContent from "./SiteNavDrawerContent";
import { hexToRgba } from "../helpers";

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
  background-color: ${props => hexToRgba(props.colorscheme?.primary4, .875)};
  transform: translate3d(${(props) => (props.isopen === 'true' ? "0" : "-100%")}, 0, 0);
  transition: transform 0.3s ease-in-out;
`;

export function SiteNavDrawer(props: SiteNavDrawerProps) {
  const colorScheme = useColorScheme();
  const { isOpen } = useSiteNav();
  const isRelevant = window.innerWidth <= parseInt(BREAK_POINTS.navSwitch, 10);
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      isopen: isOpen && isRelevant ? "true" : undefined,
    }),
    [colorScheme, isOpen, isRelevant]
  );

  if (!isRelevant) return null;
  return (
    <Drawer {...propsToAdd}>
      <SiteNavDrawerContent />
    </Drawer>
  );
}
