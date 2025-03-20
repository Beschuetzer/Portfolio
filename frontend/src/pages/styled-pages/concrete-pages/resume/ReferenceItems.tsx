import React from "react";
import { ReferenceItem, ReferenceItemProps } from "./ReferenceItem";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { defaultFontSize } from "../../../../styles/constants";
import { respond } from "../../../../styles/breakpoints";
import { resumeContainerStyles } from "./styles";

const Container = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: ${defaultFontSize};
  font-size: ${defaultFontSize};

  & > * {
    &:nth-child(4n + 3),
    &:nth-child(4n + 4) {
      ${resumeContainerStyles}
      margin-bottom: 0;
    }

    &:nth-child(4n + 2), &:nth-child(4n + 4) {
      justify-content: flex-end;
      padding-right: 0;
    }
  }

  ${respond.phone`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    & > * {
      border: none;

      &:nth-child(4n + 4) {
        margin-bottom: ${defaultFontSize};
      }

      &:nth-child(4n + 3),
      &:nth-child(4n + 4) {
        padding-bottom: 0;
      }
    }
  `}
`;

type ReferenceItemsProps = {
  items: Omit<ReferenceItemProps, "isLast">[];
};

export function ReferenceItems(props: ReferenceItemsProps) {
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
