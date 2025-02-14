import React from "react";
import { styled } from "styled-components";
import { useSiteNav } from "./SiteNavContext";
import { SiteNavStyledProps } from "./types";
import { hexToRgba } from "./helpers";
import { useColorScheme } from "../../../hooks/useColorScheme";

const SiteNavBackgroundStyled = styled.div<SiteNavStyledProps>`
  height: 200vh;
  left: 0;
  position: fixed;
  top: 0;
  visibility: ${(props) => (props.isopen ? "visible" : "hidden")};
  width: 200vw;
  z-index: -1;
  background-color: ${(props) => hexToRgba(props.colorscheme?.primary1, 0.5)};
  transition: filter 0.5s ease, -webkit-filter 0.5s ease;
`;

type SiteNavBackgroundProps = {};

export function SiteNavBackground(props: SiteNavBackgroundProps) {
  const { isOpen, toggleIsOpen } = useSiteNav();
  const colorScheme = useColorScheme();
  return (
    <SiteNavBackgroundStyled
      colorscheme={colorScheme}
      onClick={toggleIsOpen}
      isopen={isOpen}
    />
  );
}
