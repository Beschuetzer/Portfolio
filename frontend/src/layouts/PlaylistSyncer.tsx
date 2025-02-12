import { ReactNode, useMemo } from "react";
import { PageNavLayout } from "./PageNavLayout";
import styled from "styled-components";
import { LayoutStyledProps } from "./types";
import { useColorScheme } from "../hooks/useColorScheme";
import {
  BUTTON_WIDTH,
  defaultFontSize,
  fontSizeEight,
  fontSizeFive,
  fontSizeSix,
  getFontSizeCustom,
} from "../styles/constants";
import { OS_10_ISSUE_TRACKER_URL } from "../components/constants";
import { EmbeddedLink } from "../components/EmbeddedLink";
import Paragraph from "../typography/Paragraph";

type PlaylistSyncerPageProps = {};

const SIDE_PADDING = getFontSizeCustom(2);

const Content = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const Header = styled.h2<LayoutStyledProps>`
  font-size: ${fontSizeEight};
  color: ${(props) => props.colorscheme?.primary4};
  height: ${BUTTON_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section<LayoutStyledProps>`
  width: 100%;
  border-radius: ${getFontSizeCustom(0.33)};
  background: ${(props) => props.colorscheme?.primary3};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: ${getFontSizeCustom(2)};
`;

const SectionHeader = styled.h3<LayoutStyledProps>`
  width: 100%;
  padding: ${defaultFontSize} ${SIDE_PADDING};
  font-size: ${fontSizeSix};
  color: ${(props) => props.colorscheme?.primary1};
  background: linear-gradient(
    to bottom right,
    ${(props) => props.colorscheme?.primary3},
    ${(props) => props.colorscheme?.primary4}
  );
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SectionContent = styled.div<LayoutStyledProps>`
  padding: ${SIDE_PADDING};
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const PARAGRAPH = styled.p<LayoutStyledProps>`
  font-size: ${fontSizeFive};
  font-family
  color: ${(props) => props.colorscheme?.primary1};
`;

type SectionProps = { name: string; content: ReactNode | ReactNode[] };
const SECTIONS: SectionProps[] = [
  {
    name: "Background",
    content: (
      <>
        <PARAGRAPH>
          Around the end of Febraury 2020, Samsung updated their Android OS to
          version 10.&nbsp; Eager to check out the newest Android OS, I promptly
          updated.&nbsp; Unfortunately, the update
          <EmbeddedLink href={OS_10_ISSUE_TRACKER_URL}>
            broke my ability to sync music and playlists
          </EmbeddedLink>
          to my Galaxy S9+ phone.&nbsp;
        </PARAGRAPH>
        <Paragraph size="four" classNameToAdd="margin-top-1">
          Thinking it would get resolved in a prompt manner, I waited a few
          months.&nbsp; In the meantime, I looked into other ways of easily
          syncing music/playlists to my phone.&nbsp; After looking for over a
          month to no avail and realizing Google was in no hurry to fix the bug,
          I decided it would be an interesting programming exercise to create a
          simple application that could sync music and playlists to my phone.
        </Paragraph>
      </>
    ),
  },
];

export function PlaylistSyncerPage(props: PlaylistSyncerPageProps) {
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );

  return (
    <PageNavLayout>
      <Header {...propsToAdd}>Playlist Syncer</Header>
      <Content {...propsToAdd}>
        {SECTIONS.map((section, index) => (
          <Section key={index} id={section.name} {...propsToAdd}>
            <SectionHeader {...propsToAdd}>{section.name}</SectionHeader>
            <SectionContent {...propsToAdd}>{section.content}</SectionContent>
          </Section>
        ))}
      </Content>
    </PageNavLayout>
  );
}
