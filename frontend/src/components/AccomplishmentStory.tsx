import React from "react";
import { AccomplishmentStoryDetail } from "../types";
import styled from "styled-components";
import { defaultFontSize, getFontSizeCustom } from "../styles/constants";

type Props = AccomplishmentStoryDetail;

const Container = styled.div`
  margin-top: ${defaultFontSize};
`;

const Title = styled.h3`
  margin-bottom: ${getFontSizeCustom(1)};
`;

export function AccomplishmentStory({ details, name, tags }: Props) {
  return (
    <Container>
      <Title>{name}</Title>
      <p>
        <strong>Situation:</strong> {details.situation}
      </p>
      <p>
        <strong>Task:</strong> {details.task}
      </p>
      <p>
        <strong>Action:</strong> {details.action}
      </p>
      <p>
        <strong>Result:</strong> {details.result}
      </p>
      {tags && (
        <div style={{ marginTop: defaultFontSize }}>Tags: {tags.join(", ")}</div>
      )}
    </Container>
  );
}
