import { css } from "styled-components";
import { LayoutStyledProps } from "./types";
import { hexToRgba } from "../components/navbar/sitenav/helpers";
import { BUTTON_WIDTH } from "../styles/constants";
import { PAGE_NAVE_LAYOUT_LINK_ON_HOVER_FILL } from "./constants";

export const pageNavLayoutLinkStyles = css<LayoutStyledProps>`
  color: ${(props) => props.colorscheme?.primary4};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const pageNavLayoutLinkHoverStyleOne = css<LayoutStyledProps>`
 &:hover {
    & > * > svg {
      fill: ${(props) => hexToRgba(props.svgfillcolor, PAGE_NAVE_LAYOUT_LINK_ON_HOVER_FILL)};
    }
    & > span {
      transform: rotate(270deg) translate(25%, calc(${BUTTON_WIDTH} / 4));
    }
  }
`;