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
        <Section id="test2">Test</Section>
        <Section id="test3">Test</Section>
      </Content>
    </ExampleLayout>
  );
}
