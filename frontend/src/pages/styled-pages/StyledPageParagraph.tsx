import React from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import {
    fontSizeFive,
} from "../../styles/constants";
import { SIDE_PADDING } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";

const Paragraph = styled.p<LayoutStyledProps>`
  font-size: ${fontSizeFive};
  font-family: Open Sans, sans-serif;
  color: ${(props) => props.colorscheme?.primary1};
  margin-top: ${SIDE_PADDING};
`;

export function StyledPageParagraph(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const { children, htmlAttributes } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };
  return (
    <Paragraph {...propsToAdd} {...htmlAttributes}>
      {children}
    </Paragraph>
  );
}
