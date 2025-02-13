import { ReactNode, useMemo } from "react";
import { PageNavLayout } from "../../layouts/PageNavLayout";
import styled, { CSSProperties } from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import {
  BUTTON_WIDTH,
  fontSizeEight,
  SITE_NAV_NAV_SWITCH_TOP,
} from "../../styles/constants";

import { respond } from "../../styles/breakpoints";
import { hexToRgba } from "../../components/navbar/sitenav/helpers";
import { SIDE_PADDING } from "./constants";
import { ExamplePageSection } from "./ExamplePageSection";
import { ExamplePageSectionContent } from "./ExamplePageSectionContent";
import { ExamplePageSectionHeader } from "./ExamplePageSectionHeader";


const Content = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;

  ${respond.navSwitch`
    padding: 0 ${SITE_NAV_NAV_SWITCH_TOP};
  `}
`;

const Header = styled.h2<LayoutStyledProps>`
  font-size: ${fontSizeEight};
  color: ${(props) => props.colorscheme?.primary4};
  height: ${BUTTON_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${SIDE_PADDING};
  text-shadow: 0 4px 3px
      ${(props) => hexToRgba(props.colorscheme?.primary3, 0.4)},
    0 8px 13px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)},
    0 18px 23px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)};
`;

type ExamplePageProps = {
  sections: ExamplePageSectionProps[];
};

export type ExamplePageSectionProps = {
  name: string;
  renderContent: (propsToAdd: LayoutStyledProps) => ReactNode | ReactNode[];
  contentStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
};

export function ExamplePage(props: ExamplePageProps) {
  const { sections } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );

  return (
    <PageNavLayout>
      <Header {...propsToAdd}>Playlist Syncer</Header>
      <Content {...propsToAdd}>
        {sections.map((section, index) => {
          const { contentStyle, containerStyle, headerStyle, name, renderContent } =
            section;
          return (
            <ExamplePageSection
              key={index}
              htmlAttributes={{
                id: name,
                style: containerStyle,
              }}
              {...propsToAdd}
            >
              <ExamplePageSectionHeader
                {...propsToAdd}
                htmlAttributes={{ style: headerStyle }}
              >
                {name}
              </ExamplePageSectionHeader>
              <ExamplePageSectionContent
                {...propsToAdd}
                htmlAttributes={{ style: contentStyle }}
              >
                {renderContent(propsToAdd)}
              </ExamplePageSectionContent>
            </ExamplePageSection>
          );
        })}
      </Content>
    </PageNavLayout>
  );
}
