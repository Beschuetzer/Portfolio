import { ExamplePageTitledParagraph } from "./ExamplePageTitledParagraph";
import { styled } from "styled-components";
import { getFontSizeCustom } from "../../styles/constants";

const ListContainer = styled.ol`
    list-style-type: none;
`;

const ListItem = styled.li`
`;

const ListItemText = styled.span`
    font-size: ${getFontSizeCustom(1)};
`;

type ExamplePageTitledListProps = {
  items: string[];
  title: string;
};

export function ExamplePageTitledList(props: ExamplePageTitledListProps) {
  const { items, title } = props;

  return (
    <ExamplePageTitledParagraph title={title}>
      <ListContainer>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText>{index + 1}).&nbsp;&nbsp;{item}</ListItemText>
          </ListItem>
        ))}
      </ListContainer>
    </ExamplePageTitledParagraph>
  );
}
