import { useEffect, useRef } from "react";
import { GithubRepository } from "../../../../apis/github";
import styled from "styled-components";
import {
  BUTTON_WIDTH,
  defaultFontSize,
  fontSizeFive,
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

  & > div {
    padding: ${defaultFontSize} 0;
    &:first-child {
      padding-top: 0;
    }
    &:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.colorscheme?.primary1};
    }
  }
`;

const ItemContainer = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: 1fr;

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
  font-size: ${fontSizeFive};
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
  const containerRef = useRef<HTMLDivElement>(null);
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
  };

  useEffect(() => {
    //scroll to the bottom of the list
    if (containerRef.current) {
      containerRef.current.scrollTo(-1000, -1000);
    }
  }, [isLoading]);

  return (
    <Container {...propsToAdd} ref={containerRef}>
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
          <ItemDescription
            dangerouslySetInnerHTML={{ __html: repo.description || "" }}
          />
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
