import { css } from "styled-components";
import { LayoutStyledProps } from "./types";
import { hexToRgba } from "../components/navbar/sitenav/helpers";
import { BUTTON_WIDTH } from "../styles/constants";
import { PAGE_NAV_LAYOUT_LINK_ON_HOVER_FILL } from "./constants";
import { textShadowStyle } from "../styles/styles";

export const pageNavLayoutLinkStyles = css<LayoutStyledProps>`
  color: ${(props) => props.colorscheme?.primary4};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const pageNavLayoutLinkHoverTransitionStyle = css<LayoutStyledProps>`
  transition: transform 0.125s, color 0.125s, fill 0.125s, text-shadow 0.125s;
`;

export const pageNavLayoutLinkTransitionStyle = css<LayoutStyledProps>`
  transition: transform .5s ease-out, color .5s ease-out, fill .5s ease-out, text-shadow .5s ease-out;
`;

export const pageNavLayoutLinkHoverCommonStyles = css<LayoutStyledProps>`
  svg {
    ${pageNavLayoutLinkTransitionStyle}
  }
  span {
    ${pageNavLayoutLinkTransitionStyle}
  }

  &:hover {
    & > * > svg {
      ${pageNavLayoutLinkHoverTransitionStyle}
      fill: ${(props) =>
        hexToRgba(props.svgfillcolor, PAGE_NAV_LAYOUT_LINK_ON_HOVER_FILL)};
    }
    & > span {
      ${pageNavLayoutLinkHoverTransitionStyle}
      ${textShadowStyle}
      color: ${(props) => hexToRgba(props.textcolor, 1)};
    }
  }
`;

export const pageNavLayoutLinkHoverRotateStyle = css<LayoutStyledProps>`
  &:hover {
    & > span {
      transform: rotate(270deg) translate(25%, calc(${BUTTON_WIDTH} / 4));
    }
  }
  ${pageNavLayoutLinkHoverCommonStyles}
`;

export const pageNavLayoutLinkHoverExplodeStyle = css<LayoutStyledProps>`
  &:hover {
    & > span {
      transform: translate(-50%, 25%) scale(1.5625);
    }
  }
  ${pageNavLayoutLinkHoverCommonStyles}
`;
