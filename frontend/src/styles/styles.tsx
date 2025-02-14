import { css } from "styled-components";
import { hexToRgba } from "../components/navbar/sitenav/helpers";
import { LayoutStyledProps } from "../layouts/types";
import { SIDE_PADDING } from "../pages/styled-pages/constants";

export const getTextShadowStyle = (x = 0) => css<LayoutStyledProps>`
  text-shadow: ${x}px 4px 3px
      ${(props) => hexToRgba(props.colorscheme?.primary3, 0.4)},
    ${x}px 8px 13px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)},
    ${x}px 18px 23px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)};
`;

export const getTextShadowPageNavStyle = (x = 0) => css<LayoutStyledProps>`
  text-shadow: ${x}px 7px 6px rgba(0, 0, 0, 0.2),
    ${x}px -5px 35px hsla(0, 0%, 100%, 0.3);
`;

export const linkStyles = css<LayoutStyledProps>`
  text-decoration: underline;
  font-weight: bold;
  transition: color 0.25s ease-in-out;
  cursor: pointer;
  color: ${(props) => hexToRgba(props.colorscheme?.primary1, .875)};
  &:hover {
    color: ${(props) => props.colorscheme?.primary1};
  }
`;

export const paragraphMarginTop = css<LayoutStyledProps>`
  margin-top: calc(${SIDE_PADDING} / 2);
`;
