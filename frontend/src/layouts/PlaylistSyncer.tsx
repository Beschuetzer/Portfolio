import { ReactNode, useMemo } from "react";
import { PageNavLayout } from "./PageNavLayout";
import styled from "styled-components";
import { LayoutStyledProps } from "./types";
import { useColorScheme } from "../hooks/useColorScheme";
import {
  BUTTON_WIDTH,
  COLORS,
  defaultFontSize,
  fontSizeEight,
  fontSizeFive,
  fontSizeSix,
  getFontSizeCustom,
} from "../styles/constants";
import {
  OS_10_ISSUE_TRACKER_URL,
  PLAYLIST_SYNCER_URL,
} from "../components/constants";

import img1 from "../imgs/playlist-syncer/img1.png";
import imgProblem from "../imgs/playlist-syncer/img-problem.jpg";
import img2 from "../imgs/playlist-syncer/img2.png";
import img3 from "../imgs/playlist-syncer/img3.png";
import img4 from "../imgs/playlist-syncer/img4.png";

import img1Thumbnail from "../imgs/playlist-syncer/thumbnails/img1-thumbnail.png";
import imgProblemThumbnail from "../imgs/playlist-syncer/thumbnails/img-problem-thumbnail.jpg";
import img2Thumbnail from "../imgs/playlist-syncer/thumbnails/img2-thumbnail.png";
import img3Thumbnail from "../imgs/playlist-syncer/thumbnails/img3-thumbnail.png";
import img4Thumbnail from "../imgs/playlist-syncer/thumbnails/img4-thumbnail.png";

import demoVideo from "../clips/playlist-syncer/demo.mp4";
import demoVideo_480p from "../clips/playlist-syncer/demo-480p.mp4";
import demoVideoThumbnail from "../clips/playlist-syncer/demo-thumbnail.png";
import { Carousel } from "react-thumbnail-carousel";
import { CSharpCardSection } from "../pages";

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
  padding: 0 ${SIDE_PADDING} ${SIDE_PADDING} ${SIDE_PADDING};
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const Paragraph = styled.p<LayoutStyledProps>`
  font-size: ${fontSizeFive};
  font-family: Open Sans, sans-serif;
  color: ${(props) => props.colorscheme?.primary1};
  margin-top: ${SIDE_PADDING};
`;

type SectionProps = { name: string; content: ReactNode | ReactNode[] };
const SECTIONS: SectionProps[] = [
  {
    name: "Background",
    content: (
      <>
        <Paragraph>
          Around the end of Febraury 2020, Samsung updated their Android OS to
          version 10.&nbsp; Eager to check out the newest Android OS, I promptly
          updated.&nbsp; Unfortunately, the update&nbsp;
          <a href={OS_10_ISSUE_TRACKER_URL}>
            broke my ability to sync music and playlists
          </a>
          &nbsp; to my Galaxy S9+ phone.&nbsp;
        </Paragraph>
        <Paragraph>
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
  {
    name: "Media",
    content: (
      <Carousel
        options={{
          layout: {
            itemDisplayLocation: "below",
          },
          modal: {
            maintainMinimizedStateAcrossItems: true,
          },
          container: {
            style: {
              borderRadius: 0,
              width: '100%',
            },
          },
          thumbnail: {
            size: [[200], [100, 1200, "max-width"]],
            descriptionOverlay: {
              hideDescriptionOverlayUnlessHovered: false,
              textColor: COLORS[PLAYLIST_SYNCER_URL]?.primary4,
              background: {
                gradient: {
                  start: {
                    opacity: 0.9,
                    color: COLORS[PLAYLIST_SYNCER_URL]?.primary1,
                  },
                  end: {
                    opacity: 0.9,
                    color: COLORS[PLAYLIST_SYNCER_URL]?.primary2,
                  },
                  angle: 270,
                },
              },
            },
            currentItemBorder: `2px dotted ${COLORS[PLAYLIST_SYNCER_URL]?.primary4}`,
          },
          styling: {
            colorTheme: {
              colorOne: COLORS[PLAYLIST_SYNCER_URL]?.primary1,
              colorTwo: COLORS[PLAYLIST_SYNCER_URL]?.primary2,
              colorThree: COLORS[PLAYLIST_SYNCER_URL]?.primary3,
              colorFour: COLORS[PLAYLIST_SYNCER_URL]?.primary3,
              colorFive: COLORS[PLAYLIST_SYNCER_URL]?.primary4,
              colorGreyOne: COLORS[PLAYLIST_SYNCER_URL]?.greyOne,
            },
            itemViewer: {
              loadingSpinner: {
                options: {
                  color: COLORS[PLAYLIST_SYNCER_URL].primary4,
                },
              },
            },
          },
        }}
        items={[
          {
            srcMain: imgProblem,
            srcThumbnail: imgProblemThumbnail,
            description: "156 songs transferred but an empty playlist...",
          },
          {
            srcMain: {
              hiRes: demoVideo,
              loRes: demoVideo_480p,
            },
            srcThumbnail: demoVideoThumbnail,
            description: "Video Demonstration",
            modal: {
              children: (
                <div>
                  <CSharpCardSection title="Transferring Files">
                    The playlist syncer has the ability to transfer songs to
                    either an SD card or the phone's internal memory. &nbsp;
                    Files in the playlist that are not found in the destination
                    are copied to '/destination/music'. &nbsp; After that .m3u
                    playlist file is transferred to
                    'destination/music/playlists'.
                  </CSharpCardSection>
                </div>
              ),
            },
            video: {
              sections: [
                ["Showing the Source Files", ""],
                ["Selecting the Playlist with the Source Files in It", "2:500"],
                ["Showing the Source Files", "9:00"],
                [
                  "Transferring the Files to the Destination 'KostetZuViel'",
                  "14:00",
                ],
                [
                  "Verifying the Downloaded Files are on 'KostetZuViel'",
                  "27:100",
                ],
              ],
              autoPlay: false,
            },
          },
          {
            srcMain: img1,
            srcThumbnail: img1Thumbnail,
            description: "The complete user interface",
          },
          {
            srcMain: img2,
            srcThumbnail: img2Thumbnail,
            description: "Left-side of UI",
          },
          {
            srcMain: img3,
            srcThumbnail: img3Thumbnail,
            description: "Playlists available section of UI",
          },
          {
            srcMain: img4,
            srcThumbnail: img4Thumbnail,
            description: "Transfer section of UI after transfer",
          },
        ]}
      />
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
