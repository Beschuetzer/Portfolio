import React from "react";
import { GithubRepository } from "../../../../apis/github";
import styled from "styled-components";
import {
  BUTTON_WIDTH,
  defaultFontSize,
  fontSizeEleven,
  fontSizeSix,
  fontSizeThree,
} from "../../../../styles/constants";
import { LayoutStyledProps } from "../../../../layouts/types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { ExamplePageLink } from "../../ExamplePageLink";

const Container = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${defaultFontSize};
`;

const ItemContainer = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: 1fr;

  padding: ${defaultFontSize};
  margin-bottom: ${fontSizeEleven};
  font-size: ${fontSizeThree};
`;

const ItemRowOne = styled.div<LayoutStyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemRowOneColumnTwo = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const ItemName = styled.div<LayoutStyledProps>`
  font-size: ${fontSizeSix};
`;

const ItemDescription = styled.div<LayoutStyledProps>`
  padding-top: ${defaultFontSize};
`;

const ItemCreatedAt = styled.div<LayoutStyledProps>``;

const ItemUpdatedAt = styled.div<LayoutStyledProps>``;

const LoadingContainer = styled.div<LayoutStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${defaultFontSize};
  font-size: ${fontSizeThree};
  width: 100%;
  height: 100%;
  color: ${(props) => props.colorscheme?.primary1};
`;

const LoadingSpinner = styled.div<LayoutStyledProps>`
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_WIDTH};
  border: calc(${BUTTON_WIDTH} / 6) solid
    ${(props) => props.colorscheme?.primary1};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
`;

type ResumeSkillsModalReposListProps = {
  repos: GithubRepository[];
  isLoading: boolean;
};

export function ResumeSkillsModalReposList(
  props: ResumeSkillsModalReposListProps
) {
  const { repos, isLoading } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
  };
  return (
    <Container {...propsToAdd}>
      {repos.map((repo) => (
        <ItemContainer key={repo.name}>
          <ItemRowOne>
            <ItemName>
              {repo.homepageUrl ? (
                <ExamplePageLink url={repo.homepageUrl}>
                  {repo.name}
                </ExamplePageLink>
              ) : (
                <>{repo.name}</>
              )}
            </ItemName>
            <ItemRowOneColumnTwo>
              <ItemCreatedAt>
                <b>Created:</b> {new Date(repo.createdAt).toLocaleDateString()}
                &nbsp;
              </ItemCreatedAt>
              <ItemUpdatedAt>
                <b>Updated:</b> {new Date(repo.updatedAt).toLocaleDateString()}
              </ItemUpdatedAt>
            </ItemRowOneColumnTwo>
          </ItemRowOne>
          <ItemDescription>{repo.description}</ItemDescription>
          <div>{repo.url}</div>
        </ItemContainer>
      ))}
      {isLoading ? (
        <LoadingContainer {...propsToAdd}>
          <LoadingSpinner {...propsToAdd} />
        </LoadingContainer>
      ) : null}
    </Container>
  );
}
