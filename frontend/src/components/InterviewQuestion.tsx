import React, { useState } from "react";
import styled from "styled-components";
import { defaultFontSize, getFontSizeCustom } from "../styles/constants";

const Container = styled.div<{ isopen?: string }>`
  margin-top: ${getFontSizeCustom(0.5)};
  cursor: pointer;
`;

export type InterviewQuestionProps = {
  question: string;
  answer: string | string[];
  tags?: string[];
};

export default function InterviewQuestion({
  answer,
  question,
  tags,
}: InterviewQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function renderContent() {
    if (!isOpen) return null;
    const answers = Array.isArray(answer)
      ? answer.map((a, index) => <p key={index}>{a}</p>)
      : answer;
    return (
      <div style={{ marginLeft: defaultFontSize }}>
        {answers}
        {tags && (
          <div style={{ marginTop: defaultFontSize }}>
            {tags.map((tag, index) => (
              <span key={index} style={{ marginRight: defaultFontSize }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Container
      onClick={() => setIsOpen(!isOpen)}
      isopen={isOpen ? "true" : "false"}
    >
      <h5>{question}</h5>
      {renderContent()}
    </Container>
  );
}
