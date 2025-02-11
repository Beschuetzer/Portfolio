import React from "react";
import { LayoutStyledProps } from "./types";
import { styled } from "styled-components";
import { SECTION_WIDTH_IN_PIXELS } from "../styles/constants";
import { respond } from "../styles/breakpoints";
import { useColorScheme } from "../hooks/useColorScheme";
import { PageNav } from "../components/navbar/PageNav";

const Layout = styled.div<LayoutStyledProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr ${SECTION_WIDTH_IN_PIXELS}px 1fr;
  background-color: ${(props) => props.colorscheme?.primary3};
  height: 100000px;
  align-items: start;

  ${respond.navSwitch`
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
`}
`;

type ExampleLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

export function ExampleLayout(props: ExampleLayoutProps) {
  const { children } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme != null ? colorScheme : undefined,
  };

  return (
    <Layout {...propsToAdd}>
      <PageNav />
      {children}
    </Layout>
  );
}
