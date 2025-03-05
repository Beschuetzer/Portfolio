import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { selectedSkillSelector, setSelectedSkill } from "../../../../slices";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  defaultFontSize,
  fontSizeThree,
  getFontSizeCustom,
} from "../../../../styles/constants";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import {
  useGithubRepos,
  UseGithubReposResponse,
} from "../../../../hooks/useGithubRepos";
import { GithubPageInfo } from "../../../../apis/github";

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
  width: 80%;
  height: 80%;
  position: relative;
  background-color: ${(props) => props.colorscheme?.primary4};
  border-radius: ${defaultFontSize};
  display: flex;
  flex-direction: column;
  padding: ${defaultFontSize} ${getFontSizeCustom(2)};
`;

const CloseButton = styled.svg<LayoutStyledProps>`
  width: ${getFontSizeCustom(2)};
  height: ${getFontSizeCustom(2)};
  cursor: pointer;
`;

const CloseButtonUse = styled.use<LayoutStyledProps>`
  fill: ${(props) => props.colorscheme?.primary1};
`;

const Header = styled.div<LayoutStyledProps>`
  grid-template-columns: 1fr min-content;
  color: ${(props) => props.colorscheme?.primary1};
  display: grid;
  align-items: center;
  justify-content: center;
  position: sticky;
  text-align: center;
  top: 0;
  z-index: 5;
`;

const HeaderTitle = styled.div<LayoutStyledProps>`
  font-size: ${getFontSizeCustom(2)};
  font-weight: bold;
  color: ${(props) => props.colorscheme?.primary1};
`;

const HeaderSubTitle = styled.div<LayoutStyledProps>`
  font-size: ${fontSizeThree};
  font-style: italic;
  grid-column: 1 / -1;
`;

const NextButton = styled.button<LayoutStyledProps>`
  font-size: ${fontSizeThree};
  margin-top: ${defaultFontSize};
  align-self: center;
  padding: ${defaultFontSize} ${getFontSizeCustom(2)};
  border-radius: ${defaultFontSize};
  background-color: ${(props) => props.colorscheme?.primary2};
  color: ${(props) => props.colorscheme?.primary1};
  cursor: pointer;
`;

const TableHeaders = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${defaultFontSize};
`;

type ResumeSkillsModalProps = {};

export function ResumeSkillsModal(props: ResumeSkillsModalProps) {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const selectedSkill = useAppSelector(selectedSkillSelector);
  const [endCursor, setEndCursor] = useState("");
  const lastPageInfo = useRef<GithubPageInfo | null>(null);
  console.log("rendering modal");
  const propsToAdd: LayoutStyledProps = {
    isopen: selectedSkill ? "true" : "false",
    colorscheme: colorScheme,
  };

  const onContainerClick = useCallback(() => {
    dispatch(setSelectedSkill(""));
  }, [dispatch]);

  const onConentClick = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const onLoadNextBatch = useCallback(() => {
    if (!lastPageInfo.current?.hasNextPage) {
      console.log("no more pages");
      return;
    }
    setEndCursor(lastPageInfo.current?.endCursor || "");
  }, []); 

  const onSuccessfulFetch = useCallback((data: UseGithubReposResponse) => {
    if (data?.search.pageInfo.hasNextPage) {
      lastPageInfo.current = data.search.pageInfo;
    }
  }, []);

  const { data, error, isLoading } = useGithubRepos({
    topic: selectedSkill,
    pageSize: 3,
    endCursor,
    onSuccess: onSuccessfulFetch,
  });
  console.log({data, error, isLoading});
  return (
    <Container {...propsToAdd} onClick={onContainerClick}>
      <Content {...propsToAdd} onClick={onConentClick}>
        <Header>
          <HeaderTitle>{selectedSkill}</HeaderTitle>
          <CloseButton {...propsToAdd} onClick={onContainerClick}>
            <CloseButtonUse {...propsToAdd} href="/sprite.svg#icon-close" />
          </CloseButton>
          <HeaderSubTitle>* click the project name to view a working demo (when possible)</HeaderSubTitle>
        </Header>
        <TableHeaders />
        <NextButton onClick={onLoadNextBatch}>Next</NextButton>
      </Content>
    </Container>
  );
}
