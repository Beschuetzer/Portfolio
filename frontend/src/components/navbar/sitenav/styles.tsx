import { css } from "styled-components";
import {
  defaultFontSize,
  fontSizeFive,
  fontSizeSeven,
  fontSizeSix,
  getFontSizeCustom,
} from "../../../styles/constants";
import { SiteNaveItemOrientation } from "./SiteNavItem";
import { SiteNavStyledProps } from "./types";

export const linkStyles = css<SiteNavStyledProps>`
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
  padding: ${getFontSizeCustom()} 0;
  width: calc(100% - calc(${(props) => props.scrollbarwidth} * 2));
`;
