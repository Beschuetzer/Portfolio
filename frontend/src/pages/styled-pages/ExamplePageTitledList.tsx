import React from "react";
import { useColorScheme } from "../../hooks/useColorScheme";
import { ExamplePageTitledParagraph } from "./ExamplePageTitledParagraph";
import { styled } from "styled-components";
import { defaultFontSize, getFontSizeCustom } from "../../styles/constants";

const ListContainer = styled.ol`
  padding-left: ${getFontSizeCustom(2)};
`;

const ListItem = styled.li`
  padding-left: ${getFontSizeCustom(.5)};
`;

type ExamplePageTitledListProps = {
  items: string[];
  title: string;
};

export function ExamplePageTitledList(props: ExamplePageTitledListProps) {
  const colorScheme = useColorScheme();
  const { items, title } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };
  return (
    <ExamplePageTitledParagraph title={title}>
      <ListContainer>
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </ListContainer>
    </ExamplePageTitledParagraph>
  );
}
