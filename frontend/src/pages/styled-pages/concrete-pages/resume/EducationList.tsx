import { defaultFontSize, fontSizeFour } from "../../../../styles/constants";
import { EducationItem, EducationItemProps } from "./EducationItem";
import styled from "styled-components";

const Container = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: ${defaultFontSize};
  font-size: ${fontSizeFour};
`;

type EducationListProps = {
  items: EducationItemProps[];
};

export default function EducationList(props: EducationListProps) {
  const { items } = props;
  return (
    <Container>
      {items.map((item, index) => (
        <EducationItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </Container>
  );
}
