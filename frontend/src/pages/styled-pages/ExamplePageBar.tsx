import React, { HtmlHTMLAttributes } from "react";
import { useColorScheme } from "../../hooks/useColorScheme";
import { LayoutStyledProps } from "../../layouts/types";
import styled from "styled-components";
import { defaultFontSize } from "../../styles/constants";

const Container = styled.div<LayoutStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary4};
  margin-top: ${defaultFontSize};
`;

const InnerBar = styled.div<LayoutStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary1};
  padding: ${defaultFontSize};
  width: 10%;
`;

type ExamplePageBarProps = {
  containerProps?: HtmlHTMLAttributes<HTMLDivElement>;
};

export function ExamplePageBar(props: ExamplePageBarProps) {
  const { containerProps } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = { colorscheme: colorScheme };
  return (
    <Container {...propsToAdd} {...containerProps}>
      <InnerBar />
    </Container>
  );
}
