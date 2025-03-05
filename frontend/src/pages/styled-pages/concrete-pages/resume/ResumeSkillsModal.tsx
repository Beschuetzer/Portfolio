import React from "react";
import { GetGithubReposInput } from "../../../../apis/github";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { selectedSkillSelector } from "../../../../slices";
import { useAppSelector } from "../../../../hooks";

const Container = styled.div<LayoutStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (props.isopen === 'true' ? "visible" : "hidden")};
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ResumeSkillsModalProps = {};

export function ResumeSkillsModal(props: ResumeSkillsModalProps) {
  const selectedSkill = useAppSelector(selectedSkillSelector);
  console.log({ selectedSkill });

  const propsToAdd: LayoutStyledProps = {
    isopen: selectedSkill ? "true" : "false",
  }

  return (
    <Container {...propsToAdd}>
      <div>{selectedSkill}</div>
    </Container>
  );
}
