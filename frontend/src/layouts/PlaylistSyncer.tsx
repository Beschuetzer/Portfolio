import React from "react";
import { PageNavLayout } from "./PageNavLayout";
import styled from "styled-components";
import { LayoutStyledProps } from "./types";

type PlaylistSyncerPageProps = {};

const Content = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Section = styled.section<LayoutStyledProps>`  
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100vh;
`;

export function PlaylistSyncerPage(props: PlaylistSyncerPageProps) {
  return (
    <PageNavLayout>
      <Content>
        <Section id="test">Test</Section>
        <Section id="overview-section-two">This is a long name</Section>
        <Section id="SomethingRatherLong">test3</Section>
        <Section id="test4">test4</Section>
        <Section id="test5">test5</Section>
        <Section id="test6">test6</Section>
        <Section id="test7">test7</Section>
      </Content>
    </PageNavLayout>
  );
}
