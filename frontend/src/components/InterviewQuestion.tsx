import React, { useState } from "react";
import styled from "styled-components";
import { defaultFontSize, getFontSizeCustom } from "../styles/constants";

const Container = styled.div<{ isopen?: string }>`
  margin-top: ${getFontSizeCustom(0.5)};
  cursor: pointer;
`;

export type InterviewQuestionProps = {
  question: string;
  answer: string;
  tags?: string[];
};

export default function InterviewQuestion({
  answer,
  question,
  tags,
}: InterviewQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container onClick={() => setIsOpen(!isOpen)} isopen={isOpen ? "true" : "false"}>
      <h5>{question}</h5>
      {isOpen ? (
        <>
          <p>{answer}</p>
          {tags && (
            <div style={{ marginTop: defaultFontSize }}>
              Tags: {tags.join(", ")}
            </div>
          )}
        </>
      ) : null}
    </Container>
  );
}
