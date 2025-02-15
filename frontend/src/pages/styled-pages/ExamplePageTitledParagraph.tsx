import { StyledPageProps } from "./types";
import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import { ExamplePageParagraph } from "./ExamplePageParagraph";
import { fontSizeFive } from "../../styles/constants";
import { paragraphMarginTop } from "../../styles/styles";
import { HTMLAttributes } from "react";

const Container = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  ${paragraphMarginTop}
`;

const Header = styled.h4<LayoutStyledProps>`
  font-size: ${fontSizeFive};
  color: ${(props) => props.colorscheme?.primary1};
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ExamplePageTitledParagraphProps = StyledPageProps & {
  containerStyles?: HTMLAttributes<HTMLDivElement>;
  title: string;
};
export function ExamplePageTitledParagraph(
  props: ExamplePageTitledParagraphProps
) {
  const colorScheme = useColorScheme();
  const { containerStyles, children, htmlAttributes, title } = props;
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
  };

  return (
    <Container {...propsToAdd} {...containerStyles} >
      <Header {...propsToAdd} {...htmlAttributes}>
        {title}
      </Header>
      <ExamplePageParagraph {...propsToAdd} htmlAttributes={{style: {
        marginTop: "0",
        ...htmlAttributes?.style,
      }}}>{children}</ExamplePageParagraph>
    </Container>
  );
}
