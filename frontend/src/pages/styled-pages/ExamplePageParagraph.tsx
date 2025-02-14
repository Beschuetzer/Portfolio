import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { FONT_SIZE } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";
import { paragraphMarginTop } from "../../styles/styles";

const Paragraph = styled.p<LayoutStyledProps>`
  font-size: ${FONT_SIZE};
  color: ${(props) => props.colorscheme?.primary1};
  ${paragraphMarginTop}
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