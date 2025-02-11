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

export function PlaylistSyncerPage(props: PlaylistSyncerPageProps) {
  console.log("PlaylistSyncerPage");
  return (
    <ExampleLayout>
      <Content>Content here</Content>
    </ExampleLayout>
  );
}
