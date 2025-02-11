import React from "react";
import { ExampleLayout } from "./ExampleLayout";
import { PageNav } from "../components/navbar/PageNav";
import styled from "styled-components";
import { LayoutStyledProps } from "./types";

type PlaylistSyncerPageProps = {};

const Content = styled.div<LayoutStyledProps>`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100vw;
`;

export function PlaylistSyncerPage(props: PlaylistSyncerPageProps) {
  console.log("PlaylistSyncerPage");
  return (
    <ExampleLayout>
      <Content>Content here</Content>
    </ExampleLayout>
  );
}
