import { css } from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";

export const translateItemStyles = css<SiteNavStyledProps>`
  transform: ${(props) => (props.isopen ? "scaleX(1)" : "scaleX(0.5)")};
  transform-origin: left;
  transition: transform 0.5s ease, background-color 0.125s ease,
    -webkit-transform 0.5s ease;
`;