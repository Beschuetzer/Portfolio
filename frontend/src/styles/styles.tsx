import { css } from "styled-components";
import { hexToRgba } from "../components/navbar/sitenav/helpers";
import { LayoutStyledProps } from "../layouts/types";

export const textShadowStyle = css<LayoutStyledProps>`
  text-shadow: 0 4px 3px
      ${(props) => hexToRgba(props.colorscheme?.primary3, 0.4)},
    0 8px 13px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)},
    0 18px 23px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)};
`;
