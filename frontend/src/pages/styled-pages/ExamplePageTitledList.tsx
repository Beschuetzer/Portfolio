import { ExamplePageTitledParagraph } from "./ExamplePageTitledParagraph";
import { styled } from "styled-components";
import { defaultFontSize, getFontSizeCustom } from "../../styles/constants";
import { CSSProperties, ReactNode } from "react";

const ListContainer = styled.ol<{ tabcount?: number }>`
  padding-left: calc(${defaultFontSize} * ${props => props.tabcount});
  padding-right: calc(${defaultFontSize} * ${props => props.tabcount});
`;

const ListItem = styled.li`
  padding-left: ${getFontSizeCustom(0.5)};
`;

const ListItemText = styled.span`
  font-size: ${getFontSizeCustom(1)};
`;

type ExamplePageTitledListProps = {
  items: (string | (() => ReactNode | ReactNode[]))[];
  listContainerStyles?: CSSProperties;
  tabCount?: number;
  title?: string;
};

export function ExamplePageTitledList(props: ExamplePageTitledListProps) {
  const { items, listContainerStyles, tabCount = 1, title } = props;

  return (
    <ExamplePageTitledParagraph title={title}>
      <ListContainer style={listContainerStyles} tabcount={tabCount}>
        {items.map((item, index) => {
          return (
            <ListItem key={index}>
              <ListItemText
                dangerouslySetInnerHTML={
                  typeof item === "string" ? { __html: item } : undefined
                }
              >
                {typeof item !== "string" ? item() : null}
              </ListItemText>
            </ListItem>
          );
        })}
      </ListContainer>
    </ExamplePageTitledParagraph>
  );
}
