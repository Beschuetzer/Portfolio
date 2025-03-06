import { css } from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { defaultFontSize } from "../../../../styles/constants";
import { hexToRgba } from "../../../../components/navbar/sitenav/helpers";

export const resumeContainerStyles = css<LayoutStyledProps>`
  ${(props) =>
    props.islast !== "true"
      ? `
        margin-bottom: ${defaultFontSize};
        padding-bottom: ${defaultFontSize};
        border-bottom: 1px solid ${props.colorscheme?.primary1};
      `
      : ""}
`;

export const resumeButtonHoverStyles = css<LayoutStyledProps>`
  transition: background-color 0.33s;
  fill: ${(props) => hexToRgba(props.colorscheme?.primary1, 0.75)};
  background-color: ${(props) => hexToRgba(props.colorscheme?.primary1, 0.75)};
  color: ${(props) => props.colorscheme?.primary4};


  &:hover {
    fill: ${(props) => props.colorscheme?.primary1};
    background-color: ${(props) => props.colorscheme?.primary1};
  }
`;
