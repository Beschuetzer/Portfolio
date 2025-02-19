import React from "react";
import { ReferenceItem, ReferenceItemProps } from "./ReferenceItem";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { defaultFontSize } from "../../../../styles/constants";

const Container = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: repeat(2, minmax(min-content, 17.5rem)) max-content 1fr;
  grid-auto-rows: minmax(5.6rem, 8.4rem);
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: ${defaultFontSize};

  & > * {
    &:nth-child(4n + 4) {
      padding-right: 0;
    }
  }
`;

type ResumeItemsProps = {
  items: Omit<ReferenceItemProps, "isLast">[];
};

export default function ResumeItems(props: ResumeItemsProps) {
  const { items } = props;

  return (
    <Container>
      {items.map((item, index) => (
        <ReferenceItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </Container>
  );
}
