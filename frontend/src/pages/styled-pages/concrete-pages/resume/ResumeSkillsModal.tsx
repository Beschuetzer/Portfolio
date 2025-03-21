import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { selectedSkillSelector, setSelectedSkill } from "../../../../slices";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  defaultFontSize,
  fontSizeSix,
  fontSizeThree,
  getFontSizeCustom,
  SECTION_WIDTH_IN_PIXELS,
} from "../../../../styles/constants";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import {
  useGithubRepos,
  UseGithubReposResponse,
} from "../../../../hooks/useGithubRepos";
import { GithubPageInfo, GithubRepository } from "../../../../apis/github";
import { ResumeSkillsModalReposList } from "./ResumeSkillsModalReposList";
import { useHideMainScrollbar } from "../../../../hooks/useHideMainScrollbar";
import { hexToRgba } from "../../../../components/navbar/sitenav/helpers";
import { resumeButtonHoverStyles as resumeButtonStyles } from "./styles";

const Container = styled.div<LayoutStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (props.isopen === "true" ? "visible" : "hidden")};
  z-index: 100000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div<LayoutStyledProps>`
  overflow-y: scroll;
  width: 80%;
  max-width: ${SECTION_WIDTH_IN_PIXELS * 1.25}px;
  height: 80%;
  position: relative;
  background-color: ${(props) => props.colorscheme?.primary4};
  border-radius: ${defaultFontSize};
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.svg<LayoutStyledProps>`
  width: ${getFontSizeCustom(2)};
  height: ${getFontSizeCustom(2)};
  cursor: pointer;
  fill: ${(props) => hexToRgba(props.colorscheme?.primary1, 0.75)};

  &:hover {
    fill: ${(props) => props.colorscheme?.primary1};
  }
`;

const CloseButtonUse = styled.use<LayoutStyledProps>``;

const Header = styled.div<LayoutStyledProps>`
  grid-template-columns: 1fr min-content;
  color: ${(props) => props.colorscheme?.primary1};
  padding: ${defaultFontSize} ${defaultFontSize} ${defaultFontSize}
    ${getFontSizeCustom(2)};
  background-color: ${(props) => props.colorscheme?.primary4};
  border-bottom: 1px solid ${(props) => props.colorscheme?.primary1};
  display: grid;
  align-items: center;
  justify-content: center;
  position: sticky;
  text-align: center;
  top: 0;
  z-index: 10000000000000000;
`;

const HeaderTitle = styled.div<LayoutStyledProps>`
  font-size: ${fontSizeSix};
  font-weight: bold;
  color: ${(props) => props.colorscheme?.primary1};
`;

const HeaderSubTitle = styled.div<LayoutStyledProps>`
  font-size: ${fontSizeThree};
  font-style: italic;
  grid-column: 1 / -1;
`;

const ShowMoreButton = styled.button<LayoutStyledProps>`
  padding: ${defaultFontSize} ${getFontSizeCustom(2)};
  border-radius: ${defaultFontSize};
  cursor: pointer;
  border: none;
  transition: background-color 0.33s;
  background-color: ${(props) => hexToRgba(props.colorscheme?.primary1, 0.75)};
  color: ${(props) => props.colorscheme?.primary4};

  &:hover {
    background-color: ${(props) => props.colorscheme?.primary1};
  }
`;

const ShowMoreContainer = styled.div<LayoutStyledProps>`
  display: flex;
  justify-content: center;
  padding: ${defaultFontSize};
  border-top: 1px solid ${(props) => props.colorscheme?.primary1};
  width: 100%;
  background-color: ${(props) => props.colorscheme?.primary4};
  position: sticky;
  bottom: 0;
  z-index: 100000000000000000;
`;

type ResumeSkillsModalProps = {};

export function ResumeSkillsModal(props: ResumeSkillsModalProps) {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const selectedSkill = useAppSelector(selectedSkillSelector);
  const [reposToDisplay, setReposToDisplay] = useState<GithubRepository[]>([]);
  const [shouldShowMore, setSetshouldShowMore] = useState(true);
  const [endCursor, setEndCursor] = useState("");
  const lastPageInfo = useRef<GithubPageInfo | null>(null);
  const propsToAdd: LayoutStyledProps = {
    isopen: selectedSkill ? "true" : "false",
    colorscheme: colorScheme,
  };

  const reset = useCallback(() => {
    setReposToDisplay([]);
    setEndCursor("");
    lastPageInfo.current = null;
  }, []);

  const onContainerClick = useCallback(() => {
    dispatch(setSelectedSkill(""));
    reset();
  }, [dispatch, reset]);

  const onConentClick = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const onLoadNextBatch = useCallback(() => {
    if (!lastPageInfo.current?.hasNextPage) {
      return;
    }
    setEndCursor(lastPageInfo.current?.endCursor || "");
  }, []);

  useHideMainScrollbar(!selectedSkill);
  const onSuccessfulFetch = useCallback((data: UseGithubReposResponse) => {
    if (data?.search) {
      lastPageInfo.current = data.search.pageInfo;
    }
    setReposToDisplay((current) => [
      ...current,
      ...(data?.search?.nodes || []),
    ]);
  }, []);

  const { data, error, isLoading } = useGithubRepos({
    topic: selectedSkill,
    endCursor,
    onSuccess: onSuccessfulFetch,
  });

  useEffect(() => {
    setSetshouldShowMore(lastPageInfo.current?.hasNextPage || false);
  }, [reposToDisplay]);

  return (
    <Container {...propsToAdd} onClick={onContainerClick}>
      <Content {...propsToAdd} onClick={onConentClick}>
        <Header {...propsToAdd}>
          <HeaderTitle {...propsToAdd}>'{selectedSkill}' repos:</HeaderTitle>
          <CloseButton {...propsToAdd} onClick={onContainerClick}>
            <CloseButtonUse {...propsToAdd} href="/sprite.svg#icon-close" />
          </CloseButton>
          <HeaderSubTitle {...propsToAdd}>
            * click the name to view a working demo (when possible)
          </HeaderSubTitle>
        </Header>
        <ResumeSkillsModalReposList
          repos={reposToDisplay}
          isLoading={isLoading}
        />
        {shouldShowMore ? (
          <ShowMoreContainer {...propsToAdd}>
            <ShowMoreButton {...propsToAdd} onClick={onLoadNextBatch}>
              Show More
            </ShowMoreButton>
          </ShowMoreContainer>
        ) : null}
      </Content>
    </Container>
  );
}
