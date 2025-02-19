import React from "react";
import { ReferenceItem, ReferenceItemProps } from "./ReferenceItem";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { defaultFontSize } from "../../../../styles/constants";

const Container = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: repeat(2, minmax(min-content, 17.5rem)) max-content 1fr;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: ${defaultFontSize};
  padding: ${defaultFontSize} 0;
`;

type ResumeItemsProps = {
  items: Omit<ReferenceItemProps, "number">[];
};

export default function ResumeItems(props: ResumeItemsProps) {
  const { items } = props;

  return (
    <Container>
      {items.map((item, index) => (
        <ReferenceItem key={index} {...item} number={index} />
      ))}
    </Container>
  );
}
