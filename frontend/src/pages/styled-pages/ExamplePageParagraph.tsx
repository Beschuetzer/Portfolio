import styled, { css } from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { FONT_SIZE } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";
import { paragraphMarginTop } from "../../styles/styles";

const commonStyles = css<LayoutStyledProps>`
  font-size: ${FONT_SIZE};
  color: ${(props) => props.colorscheme?.primary1};
  width: 100%;
  ${paragraphMarginTop}
`;

const Paragraph = styled.p<LayoutStyledProps>`
  ${commonStyles}
`;

const ContainerDiv = styled.div<LayoutStyledProps>`
  ${commonStyles}
`;

export function ExamplePageParagraph(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const { children, htmlAttributes } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };
  const ContainerToUse =
    typeof children === "string" ? Paragraph : ContainerDiv;
  return (
    <ContainerToUse {...propsToAdd} {...htmlAttributes}>
      {children}
    </ContainerToUse>
  );
}
