import React, { useMemo } from "react";
import styled from "styled-components";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { LayoutStyledProps } from "../../../layouts/types";
import { BUTTON_WIDTH } from "../../../styles/constants";

const Svg = styled.svg<LayoutStyledProps>`
  fill: ${(props) => props.colorscheme?.primary4};
`;

export const LinkedInIcon = () => {
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={`calc(${BUTTON_WIDTH} * .75)`}
      height={`calc(${BUTTON_WIDTH} * .75)`}
      {...propsToAdd}
    >
      <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm15.11 12.87h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.49v6.25z" />
    </Svg>
  );
};
