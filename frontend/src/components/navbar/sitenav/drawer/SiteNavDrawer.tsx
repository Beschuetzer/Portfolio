import React, { useMemo } from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { SiteNavStyledProps } from "../types";
import { useSiteNav } from "../SiteNavContext";
import { BREAK_POINTS } from "../../../../styles/breakpoints";
import SiteNavDrawerContent from "./SiteNavDrawerContent";

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
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Frosted glass effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transform: translateX(${(props) => (props.isopen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;

  &::before {
    content: "A";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10rem; /* Adjust the size as needed */
    color: rgba(0, 0, 0, 0.025); /* Semi-transparent black color */
    z-index: 2; /* Ensure it is on top of the glass */
  }
`;

export function SiteNavDrawer(props: SiteNavDrawerProps) {
  const colorScheme = useColorScheme();
  const { isOpen } = useSiteNav();
  const isRelevant = window.innerWidth <= parseInt(BREAK_POINTS.navSwitch, 10);
  const propsToAdd: SiteNavStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      isopen: isOpen != null ? isOpen && isRelevant : undefined,
    }),
    [colorScheme, isOpen, isRelevant]
  );

  return (
    <Drawer {...propsToAdd}>
      <SiteNavDrawerContent />
    </Drawer>
  );
}
