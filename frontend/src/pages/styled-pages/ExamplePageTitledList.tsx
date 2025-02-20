import { ExamplePageTitledParagraph } from "./ExamplePageTitledParagraph";
import { styled } from "styled-components";
import { defaultFontSize, getFontSizeCustom } from "../../styles/constants";

const ListContainer = styled.ol`
    list-style-type: decimal;
    padding-left: ${defaultFontSize};
`;

const ListItem = styled.li`
  padding-left: ${getFontSizeCustom(.5)};
`;

const ListItemText = styled.span`
    font-size: ${getFontSizeCustom(1)};
`;

type ExamplePageTitledListProps = {
  items: string[];
  title?: string;
};

export function ExamplePageTitledList(props: ExamplePageTitledListProps) {
  const { items, title } = props;

  return (
    <ExamplePageTitledParagraph title={title}>
      <ListContainer>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText>{item}</ListItemText>
          </ListItem>
        ))}
      </ListContainer>
    </ExamplePageTitledParagraph>
  );
}
