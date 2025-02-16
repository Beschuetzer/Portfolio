import React from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { respond } from "../../styles/breakpoints";
import {
  getFontSizeCustom,
  SECTION_WIDTH_IN_PIXELS,
} from "../../styles/constants";
import { INTER_SECTION_PADDING } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";
import { hexToRgba } from "../../components/navbar/sitenav/helpers";

const Section = styled.section<LayoutStyledProps>`
  width: 100%;
  border-radius: ${getFontSizeCustom(2)};
  border: 1px solid ${(props) => hexToRgba(props.colorscheme?.primary1, 0.33)};
  background: ${(props) => props.colorscheme?.primary4};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: ${INTER_SECTION_PADDING};
  overflow: hidden;
  max-width: ${SECTION_WIDTH_IN_PIXELS}px;
  z-index: 1;
  box-shadow: ${(props) => hexToRgba(props.colorscheme?.primary4, 0.06)} 0px 0px
    1rem 1rem;

  ${respond.navSwitch`
    margin: 0 auto ${INTER_SECTION_PADDING} auto;  
  `}

  ${respond.contentFullWithPadding`
    max-width: none;
  `}
`;

export function ExamplePageSection(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const { children, htmlAttributes } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };
  return (
    <Section {...propsToAdd} {...htmlAttributes}>
      {children}
    </Section>
  );
}
