import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { FONT_SIZE, SIDE_PADDING } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";

const SectionContent = styled.div<LayoutStyledProps>`
  padding: 0 ${SIDE_PADDING} ${FONT_SIZE} ${SIDE_PADDING};
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export function ExamplePageSectionContent(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const { children, htmlAttributes } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };
  return (
    <SectionContent {...propsToAdd} {...htmlAttributes}>
      {children}
    </SectionContent>
  );
}
