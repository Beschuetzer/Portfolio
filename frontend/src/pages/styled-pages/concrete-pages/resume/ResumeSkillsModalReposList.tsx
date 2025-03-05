import React from "react";
import { GithubRepository } from "../../../../apis/github";
import styled from "styled-components";
import { defaultFontSize, fontSizeEleven, fontSizeThree } from "../../../../styles/constants";
import { LayoutStyledProps } from "../../../../layouts/types";

const Item = styled.div<LayoutStyledProps>`
  padding: ${defaultFontSize};
  margin-bottom: ${fontSizeEleven};
    font-size: ${fontSizeThree};
`;

type ResumeSkillsModalReposListProps = {
  repos: GithubRepository[];
};

export function ResumeSkillsModalReposList(
  props: ResumeSkillsModalReposListProps
) {
  const { repos } = props;
  return (
    <div>
      {repos.map((repo) => (
        <Item key={repo.name}>{repo.name}</Item>
      ))}
    </div>
  );
}
