import React from 'react'
import styled from 'styled-components';
import { defaultFontSize } from '../styles/constants';

const Container = styled.div`
  margin-top: ${defaultFontSize};
  `;

export type InterviewQuestionProps = {
    question: string;
    answer: string;
    tags?: string[];
}

export default function InterviewQuestion({
    answer,
    question,
    tags
}: InterviewQuestionProps) {
  return (
    <Container>
        {/* <h3>{question}</h3> */}
        <p>{answer}</p>
        {tags && (
            <div style={{ marginTop: defaultFontSize }}>
            Tags: {tags.join(", ")}
            </div>
        )}
    </Container>
  )
}