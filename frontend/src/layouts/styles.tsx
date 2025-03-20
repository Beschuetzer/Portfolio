import { css } from "styled-components";
import { LayoutStyledProps } from "./types";
import { hexToRgba } from "../components/navbar/sitenav/helpers";
import { BUTTON_WIDTH, SITE_NAV_NAV_SWITCH_TOP } from "../styles/constants";
import { PAGE_NAV_LAYOUT_LINK_ON_HOVER_FILL } from "./constants";
import { getTextShadowStyle } from "../styles/styles";
import { NAVBAR_HEADER_NAV_SWITCH_HEIGHT } from "../components/navbar/sitenav/styles";

export const pageNavLayoutHeaderMarginTopNavSwitch = `calc(${NAVBAR_HEADER_NAV_SWITCH_HEIGHT} + ${SITE_NAV_NAV_SWITCH_TOP});`;

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
  transition: transform 0.5s ease-out, color 0.5s ease-out, fill 0.5s ease-out,
    text-shadow 0.5s ease-out;
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
      ${getTextShadowStyle(2)}
      color: ${(props) => hexToRgba(props.textcolor, 1)};
    }
  }
`;

export const pageNavLayoutLinkHoverRotateStyle = css<LayoutStyledProps>`
  &:hover {
    & > span {
      transform: rotate(270deg) translate3d(25%, calc(${BUTTON_WIDTH} / 4), 0);
    }
  }
  ${pageNavLayoutLinkHoverCommonStyles}
`;

export const pageNavLayoutLinkHoverExplodeStyle = css<LayoutStyledProps>`
  &:hover {
    & > span {
      transform: translate3d(-50%, 25%, 0) scale(1.5625);
    }
  }
  ${pageNavLayoutLinkHoverCommonStyles}
`;
