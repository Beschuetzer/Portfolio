import { ReactNode, useMemo } from "react";
import { PageNavLayout } from "./PageNavLayout";
import styled from "styled-components";
import { LayoutStyledProps } from "./types";
import { useColorScheme } from "../hooks/useColorScheme";
import { BUTTON_WIDTH, fontSizeEight, fontSizeNine } from "../styles/constants";

type PlaylistSyncerPageProps = {};

const Content = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Header = styled.h2<LayoutStyledProps>`
  font-size: ${fontSizeEight};
  grid-column: 2;
  color: ${(props) => props.colorscheme?.primary4};
  height: ${BUTTON_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.section<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%
  background: ${(props) => props.colorscheme?.primary4};
  grid-column: 2;

`;

type SectionProps = { name: string, content: ReactNode | ReactNode[]};
const SECTIONS: SectionProps[] = [
  {
    name: "Background",
    content: (
      <div>
        <p>
          This is a playlist syncer that will allow you to sync your playlists
          across multiple platforms.
        </p>
      </div>
    ),
  }
]

export function PlaylistSyncerPage(props: PlaylistSyncerPageProps) {
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = useMemo(() => ({
    colorscheme: colorScheme != null ? colorScheme : undefined,
  }), [colorScheme]);

  return (
    <PageNavLayout>
      <Header {...propsToAdd}>Playlist Syncer</Header>
      <Content {...propsToAdd}>
        {SECTIONS.map((section, index) => (
          <Section key={index} id={section.name}>
            {section.content}
          </Section>
        ))}
      </Content>
    </PageNavLayout>
  );
}
