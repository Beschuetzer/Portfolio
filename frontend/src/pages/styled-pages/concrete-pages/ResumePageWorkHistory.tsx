import React from "react";
import { styled } from "styled-components";
import { LayoutStyledProps } from "../../../layouts/types";
import { useColorScheme } from "../../../hooks/useColorScheme";

const Container = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type ResumePageWorkHistoryProps = {};

export function ResumePageWorkHistory(
  props: ResumePageWorkHistoryProps
) {
    const colorScheme = useColorScheme();
    const propsToAdd: LayoutStyledProps = {
        colorscheme: colorScheme,
    };
  return (
    <Container {...propsToAdd}>
      <div>test</div>
    </Container>
  );
}
