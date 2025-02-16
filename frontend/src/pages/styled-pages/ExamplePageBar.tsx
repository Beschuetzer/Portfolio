import React, { HtmlHTMLAttributes } from "react";
import { useColorScheme } from "../../hooks/useColorScheme";
import { LayoutStyledProps } from "../../layouts/types";
import styled from "styled-components";
import { defaultFontSize, getFontSizeCustom } from "../../styles/constants";
import { hexToRgba } from "../../components/navbar/sitenav/helpers";

const GRADIENT_START_PERCENT = .33;

const Container = styled.div<LayoutStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary4};
  width: 100%;
  height: ${defaultFontSize};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${getFontSizeCustom(0.5)};
  overflow: hidden;
`;

const InnerBar = styled.div<LayoutStyledProps>`
  background: linear-gradient(
    to right,
    ${(props) =>
      hexToRgba(props.colorscheme?.primary1, GRADIENT_START_PERCENT)},
    ${(props) =>
      hexToRgba(
        props.colorscheme?.primary1,
          Math.max(GRADIENT_START_PERCENT, ((props.percentage || 0)) / 100)
      )}
  );

  height: 100%;
  width: ${(props) => props.percentage}%;
  z-index: 1000;
`;

type ExamplePageBarProps = {
  containerProps?: HtmlHTMLAttributes<HTMLDivElement>;
  percentage?: number;
};

export function ExamplePageBar(props: ExamplePageBarProps) {
  const { containerProps, percentage } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
    percentage: percentage,
  };

  if (!percentage) return null;
  return (
    <Container {...propsToAdd} {...containerProps}>
      <InnerBar {...propsToAdd} />
    </Container>
  );
}
