import { css } from "styled-components";
import { SiteNavStyledProps } from "./SiteNav";
import { fontSizeFive, fontSizeSeven, fontSizeSix } from "../../../styles/constants";

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
