import { css } from "styled-components";
import {
  BUTTON_WIDTH,
  defaultFontSize,
  fontSizeFive,
  fontSizeSeven,
  fontSizeSix,
  getFontSizeCustom,
  SITE_NAV_TOP,
} from "../../../styles/constants";
import { SiteNaveItemOrientation } from "./SiteNavItem";
import { SiteNavStyledProps } from "./types";
import { respond } from "../../../styles/breakpoints";
import { SITE_NAV_NAV_SWITCH_TOP } from "../../../styles/constants";

export const NAVBAR_HEADER_NAV_SWITCH_HEIGHT = `calc(${SITE_NAV_NAV_SWITCH_TOP} * 2 + ${BUTTON_WIDTH})`;
export const buttonPlacementStyles = css<SiteNavStyledProps>`
  position: absolute;
  top: ${SITE_NAV_TOP};
  left: ${(props) => props.sitenavleft};
  display: flex;

  ${respond.navSwitch`
    top: ${SITE_NAV_NAV_SWITCH_TOP};
    left: ${SITE_NAV_NAV_SWITCH_TOP};
    `}
`;

export const siteNavLinkStyles = css<SiteNavStyledProps>`
  display: flex;
  align-items: center;
  color: ${(props) => props.colorscheme?.primary1};
  font-size: ${fontSizeSix};
  font-weight: 300;
  height: 100%;
  justify-content: center;
  padding: ${fontSizeFive} ${fontSizeSeven};
  text-decoration: none;
  transition: padding 0.5s ease, opacity 0.25s ease 0.25s;
  width: 100%;
`;

export const itemStyles = css<SiteNavStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary4};
  height: 100%;
  position: relative;
  width: 100%;
  border-radius: ${(props) =>
    props.islast
      ? props.orientation === SiteNaveItemOrientation.horizontal
        ? `0 14rem 14rem 0`
        : `0 0 ${defaultFontSize} ${defaultFontSize}`
      : "0"};
  overflow: hidden;
`;

export const triangleRotateStyles = css<SiteNavStyledProps>`
  transform: rotate(90deg);
`;

export const dropDownContainerItemStyles = css<SiteNavStyledProps>`
  padding: ${getFontSizeCustom()} ${getFontSizeCustom(2)};
  background-color: ${(props) => props.colorscheme?.primary4};
  color: ${(props) => props.colorscheme?.primary1};
  font-size: ${fontSizeSix};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

export const itemTransformStyles = css<SiteNavStyledProps & { index: number }>`
  ${(props) => (props.isopen ? `transition: transform 0.5s ease;` : "")}
  transition-delay: ${(props) =>
    props.isopen ? `${props.index * 0.05 + 0}s` : "0"};
`;

export const navbarHeaderNavSwitchHeightStyles = css<SiteNavStyledProps>`
  height: ${NAVBAR_HEADER_NAV_SWITCH_HEIGHT};
`;
