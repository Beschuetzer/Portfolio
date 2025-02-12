import React, { useMemo } from "react";
import { LayoutStyledProps } from "./types";
import { styled } from "styled-components";
import {
  SECTION_WIDTH_IN_PIXELS,
  SITE_NAV_NAV_SWITCH_TOP,
  SITE_NAV_TOP,
} from "../styles/constants";
import { respond } from "../styles/breakpoints";
import { useColorScheme } from "../hooks/useColorScheme";
import { PageNav } from "../components/navbar/PageNav";
import { NAVBAR_HEADER_NAV_SWITCH_HEIGHT } from "../components/navbar/sitenav/styles";

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  grid-column: 2;
  margin-top: ${SITE_NAV_TOP};

  ${respond.navSwitch`
      margin-top: calc(${NAVBAR_HEADER_NAV_SWITCH_HEIGHT} + ${SITE_NAV_NAV_SWITCH_TOP});
  `}
`;

const Layout = styled.div<LayoutStyledProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr ${SECTION_WIDTH_IN_PIXELS}px 1fr;
  background: ${(props) => props.colorscheme?.primary1};
  background-image: url("${(props) => props.backgroundsvg}");

  ${respond.navSwitch`
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
`}
`;

type ExampleLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  backgroundSvg?: string;
  urls?: {
    code?: string;
    demo?: string;
    liveSite?: string;
  };
};

export function PageNavLayout(props: ExampleLayoutProps) {
  const { children, backgroundSvg = "", urls } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
      backgroundsvg: backgroundSvg,
    }),
    [backgroundSvg, colorScheme]
  );

  return (
    <Layout {...propsToAdd}>
      <PageNav />
      <ChildrenContainer>{children}</ChildrenContainer>
      <div />
    </Layout>
  );
}
