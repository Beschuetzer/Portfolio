import { css } from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { defaultFontSize } from "../../../../styles/constants";

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
