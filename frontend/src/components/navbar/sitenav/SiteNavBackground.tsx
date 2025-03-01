import React from "react";
import { styled } from "styled-components";
import { useSiteNav } from "./SiteNavContext";
import { SiteNavStyledProps } from "./types";
import { hexToRgba } from "./helpers";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { COLORS } from "../../../styles/constants";

const SiteNavBackgroundStyled = styled.div<SiteNavStyledProps>`
  height: 200vh;
  left: 0;
  position: fixed;
  top: 0;
  visibility: ${(props) => (props.isopen === 'true' ? "visible" : "hidden")};
  width: 200vw;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    ${(props) => hexToRgba(COLORS.general?.black || "#000", .925)},
    ${(props) => hexToRgba(props.colorscheme?.primary4, .5)}
  );
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
      isopen={isOpen ? "true" : "false"}
    />
  );
}
