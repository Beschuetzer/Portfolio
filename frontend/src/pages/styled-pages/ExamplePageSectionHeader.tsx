import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { SIDE_PADDING } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";
import { defaultFontSize, fontSizeSix } from "../../styles/constants";

const SectionHeader = styled.h3<LayoutStyledProps>`
  width: 100%;
  padding: ${defaultFontSize} ${SIDE_PADDING};
  font-size: ${fontSizeSix};
  color: ${(props) => props.colorscheme?.primary4};
  background: linear-gradient(
    to bottom right,
    ${(props) => props.colorscheme?.primary2},
    ${(props) => props.colorscheme?.primary1}
  );
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export function ExamplePageSectionHeader(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const { children, htmlAttributes } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };
  return (
    <SectionHeader {...propsToAdd} {...htmlAttributes}>
      {children}
    </SectionHeader>
  );
}
