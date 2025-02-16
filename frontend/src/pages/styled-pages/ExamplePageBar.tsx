import React, { HtmlHTMLAttributes, useCallback } from "react";
import { useColorScheme } from "../../hooks/useColorScheme";
import { LayoutStyledProps } from "../../layouts/types";
import styled from "styled-components";
import {
  defaultFontSize,
  fontSizeThree,
  getFontSizeCustom,
} from "../../styles/constants";
import { hexToRgba } from "../../components/navbar/sitenav/helpers";

const GRADIENT_START_PERCENT = 0.33;
const GRADIENT_MAX_PERCENT = 0.75;

const Container = styled.div<LayoutStyledProps>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${getFontSizeCustom(0.5)};
  overflow: hidden;
`;

const OuterBar = styled.div<LayoutStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary4};
  height: ${defaultFontSize};
  width: 100%;
  position: relative;
`;

const InnerBar = styled.div<LayoutStyledProps>`
  background: linear-gradient(
    to right,
    ${(props) =>
      hexToRgba(props.colorscheme?.primary1, GRADIENT_START_PERCENT)},
    ${(props) =>
      hexToRgba(
        props.colorscheme?.primary1,
        (GRADIENT_MAX_PERCENT - GRADIENT_START_PERCENT) * ((props.percentage || 50) / 100) + GRADIENT_START_PERCENT
      )}
  );

  background-color: ${(props) => props.colorscheme?.primary4};
  height: ${defaultFontSize};
  width: ${(props) => props.percentage}%;
  z-index: 1000;
`;

const Divider = styled.div<LayoutStyledProps>`
  width: 2px;
  height: 100%;
  background-color: ${(props) => hexToRgba(props.colorscheme?.primary1, GRADIENT_MAX_PERCENT)};
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.percentage}%;
`;

const Labels = styled.div<LayoutStyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: ${fontSizeThree};
`;

const LabelItem = styled.div<LayoutStyledProps>`
  transform: translate3d(${props => props.percentage}%, 0, 0);
`;

type ExamplePageBarProps = {
  containerProps?: HtmlHTMLAttributes<HTMLDivElement>;
  labels?: string[];
  percentage?: number;
};

export function ExamplePageBar(props: ExamplePageBarProps) {
  const { containerProps, percentage, labels = ["0", "50", "100"] } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
    percentage: percentage,
  };

  const getPercentage = useCallback((index: number) => {
    if (index === labels.length - 1 || index === 0) return 0;
    return (index / (labels.length - 1)) * 100;
    }, [labels.length]);

  if (!percentage) return null;
  return (
    <Container {...propsToAdd} {...containerProps}>
      <Labels>
        {labels.map((label, i) => {
            return <LabelItem percentage={getPercentage(i)} key={i}>{label}</LabelItem>
        })}
      </Labels>
      <OuterBar {...propsToAdd}>
        <InnerBar {...propsToAdd} />
        {labels.map((label, i) => {
          if (i === labels.length - 1 || i === 0) {
            return null;
          }
          return <Divider {...propsToAdd} key={i} percentage={getPercentage(i)} />;
        })}
      </OuterBar>
    </Container>
  );
}
