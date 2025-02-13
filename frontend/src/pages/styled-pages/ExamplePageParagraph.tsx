import React from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { FONT_SIZE, SIDE_PADDING } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";

const Paragraph = styled.p<LayoutStyledProps>`
  font-size: ${FONT_SIZE};
  font-family: Open Sans, sans-serif;
  color: ${(props) => props.colorscheme?.primary1};
  margin-top: calc(${SIDE_PADDING} / 2);
`;

export function ExamplePageParagraph(props: StyledPageProps) {
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
