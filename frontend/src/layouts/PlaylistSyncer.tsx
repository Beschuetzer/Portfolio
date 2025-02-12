import React from "react";
import { ExampleLayout } from "./ExampleLayout";
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
    <ExampleLayout>
      <Content>
        <Section id="test">Test</Section>
        <Section id="test2">test2</Section>
        <Section id="test3">test3</Section>
        <Section id="test4">test4</Section>
        <Section id="test5">test5</Section>
        <Section id="test6">test6</Section>
        <Section id="test7">test7</Section>
      </Content>
    </ExampleLayout>
  );
}
