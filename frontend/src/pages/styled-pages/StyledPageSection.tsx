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

const Section = styled.section<LayoutStyledProps>`
  width: 100%;
  border-radius: 0 0 ${getFontSizeCustom(0.33)} ${getFontSizeCustom(0.33)};
  background: ${(props) => props.colorscheme?.primary3};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: ${INTER_SECTION_PADDING};
  overflow: hidden;
  max-width: ${SECTION_WIDTH_IN_PIXELS}px;
  z-index: 1;
  box-shadow: 0 4px 8px hsla(0, 0%, 7%, 0.33);

  ${respond.navSwitch`
    margin: 0 auto ${INTER_SECTION_PADDING} auto;  
  `}
`;

export function StyledPageSection(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const { children, htmlAttributes: propsToSpread } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };
  return (
    <Section {...propsToAdd} {...propsToSpread}>
      {children}
    </Section>
  );
}
