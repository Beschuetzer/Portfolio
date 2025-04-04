import { ReactNode, useMemo } from "react";
import { PageNavLayout, PageNavLayoutProps } from "../../layouts/PageNavLayout";
import styled, { CSSProperties } from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import {
  BUTTON_WIDTH,
  fontSizeEight,
  fontSizeSeven,
} from "../../styles/constants";

import { respond } from "../../styles/breakpoints";
import { SIDE_PADDING } from "./constants";
import { ExamplePageSection } from "./ExamplePageSection";
import { ExamplePageSectionContent } from "./ExamplePageSectionContent";
import { ExamplePageSectionHeader } from "./ExamplePageSectionHeader";
import { getTextShadowStyle } from "../../styles/styles";
import { getFormattedSectionId, getHeaderName } from "../../helpers";
import { AnyAction, Dispatch } from "redux";
import { useDispatch } from "react-redux";

const Content = styled.div<LayoutStyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  font-family: Open Sans, sans-serif;
  color: ${(props) => props.colorscheme?.primary1};
  line-height: 1.6;
`;

const Header = styled.h2<LayoutStyledProps>`
  font-size: ${fontSizeEight};
  color: ${(props) => props.colorscheme?.primary4};
  height: ${BUTTON_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${SIDE_PADDING};

  ${respond.contentFull`
    justify-content: flex-start;
    width: 100%;
    font-size: ${fontSizeSeven};
  `}

  ${getTextShadowStyle()}
`;

type ExamplePageProps = {
  layoutProps?: Omit<PageNavLayoutProps, 'children'>;
  sections: ExamplePageSectionProps[];
  title: string;
};

export type ExamplePageSectionProps = {
  name: string;
  
  /**
   * This will be added to the header of the section  
   **/
  renderHeaderContent?: (propsToAdd: LayoutStyledProps) => ReactNode | ReactNode[];
  renderContent: (propsToAdd: LayoutStyledProps, dispatch: Dispatch<AnyAction>) => ReactNode | ReactNode[];
  contentStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
};

export function ExamplePage(props: ExamplePageProps) {
  const { layoutProps, sections, title } = props;
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );

  return (
    <PageNavLayout {...layoutProps}>
      <Header {...propsToAdd}>{getHeaderName(title)}</Header>
      <Content {...propsToAdd}>
        {sections.map((section, index) => {
          const { contentStyle, containerStyle, headerStyle, name, renderContent } =
            section;
          return (
            <ExamplePageSection
              key={index}
              htmlAttributes={{
                id: getFormattedSectionId(name),
                style: containerStyle,
              }}
              {...propsToAdd}
            >
              <ExamplePageSectionHeader
                {...propsToAdd}
                htmlAttributes={{ style: headerStyle }}
              >
                {getHeaderName(name)}
                {section.renderHeaderContent?.(propsToAdd)}
              </ExamplePageSectionHeader>
              <ExamplePageSectionContent
                {...propsToAdd}
                htmlAttributes={{ style: contentStyle }}
              >
                {renderContent(propsToAdd, dispatch)}
              </ExamplePageSectionContent>
            </ExamplePageSection>
          );
        })}
      </Content>
    </PageNavLayout>
  );
}
