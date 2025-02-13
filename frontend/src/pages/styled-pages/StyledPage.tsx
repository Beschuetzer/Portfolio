import { ReactNode, useMemo } from "react";
import { PageNavLayout } from "../../layouts/PageNavLayout";
import styled, { CSSProperties } from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { useColorScheme } from "../../hooks/useColorScheme";
import {
  BUTTON_WIDTH,
  COLORS,
  defaultFontSize,
  fontSizeEight,
  fontSizeSix,
  SITE_NAV_NAV_SWITCH_TOP,
} from "../../styles/constants";
import {
  DOWNLOADER_URL,
  OS_10_ISSUE_TRACKER_URL,
  PLAYLIST_SYNCER_URL,
  WIKIPEDIA_DRM_URL,
  WIKIPEDIA_MTP_URL,
} from "../../components/constants";

import img1 from "../../imgs/playlist-syncer/img1.png";
import imgProblem from "../../imgs/playlist-syncer/img-problem.jpg";
import img2 from "../../imgs/playlist-syncer/img2.png";
import img3 from "../../imgs/playlist-syncer/img3.png";
import img4 from "../../imgs/playlist-syncer/img4.png";

import img1Thumbnail from "../../imgs/playlist-syncer/thumbnails/img1-thumbnail.png";
import imgProblemThumbnail from "../../imgs/playlist-syncer/thumbnails/img-problem-thumbnail.jpg";
import img2Thumbnail from "../../imgs/playlist-syncer/thumbnails/img2-thumbnail.png";
import img3Thumbnail from "../../imgs/playlist-syncer/thumbnails/img3-thumbnail.png";
import img4Thumbnail from "../../imgs/playlist-syncer/thumbnails/img4-thumbnail.png";

import demoVideo from "../../clips/playlist-syncer/demo.mp4";
import demoVideo_480p from "../../clips/playlist-syncer/demo-480p.mp4";
import demoVideoThumbnail from "../../clips/playlist-syncer/demo-thumbnail.png";
import { Carousel } from "react-thumbnail-carousel";
import { CSharpCardSection } from "..";
import { Quote } from "../../components/Quote";
import { respond } from "../../styles/breakpoints";
import { hexToRgba } from "../../components/navbar/sitenav/helpers";
import { SIDE_PADDING } from "./constants";
import { StyledPageSection } from "./StyledPageSection";
import { StyledPageParagraph } from "./StyledPageParagraph";
import { StyledPageSectionContent } from "./StyledPageSectionContent";
import { StyledPageSectionHeader } from "./StyledPageSectionHeader";

type StyledPageProps = {};

const Content = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;

  ${respond.navSwitch`
    padding: 0 ${SITE_NAV_NAV_SWITCH_TOP};
  `}
`;

const Header = styled.h2<LayoutStyledProps>`
  font-size: ${fontSizeEight};
  color: ${(props) => props.colorscheme?.primary4};
  height: ${BUTTON_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${SIDE_PADDING};
  text-shadow: 0 4px 3px
      ${(props) => hexToRgba(props.colorscheme?.primary3, 0.4)},
    0 8px 13px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)},
    0 18px 23px ${(props) => hexToRgba(props.colorscheme?.primary3, 0.1)};
`;

type SectionProps = {
  name: string;
  content: ReactNode | ReactNode[];
  contentStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
};

export function StyledPage(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = useMemo(
    () => ({
      colorscheme: colorScheme != null ? colorScheme : undefined,
    }),
    [colorScheme]
  );

  const SECTIONS: SectionProps[] = useMemo(
    () => [
      {
        name: "Background",
        content: (
          <>
            <StyledPageParagraph {...propsToAdd}>
              Around the end of Febraury 2020, Samsung updated their Android OS
              to version 10.&nbsp; Eager to check out the newest Android OS, I
              promptly updated.&nbsp; Unfortunately, the update&nbsp;
              <a href={OS_10_ISSUE_TRACKER_URL}>
                broke my ability to sync music and playlists
              </a>
              &nbsp; to my Galaxy S9+ phone.&nbsp;
            </StyledPageParagraph>
            <StyledPageParagraph {...propsToAdd}>
              Thinking it would get resolved in a prompt manner, I waited a few
              months.&nbsp; In the meantime, I looked into other ways of easily
              syncing music/playlists to my phone.&nbsp; After looking for over
              a month to no avail and realizing Google was in no hurry to fix
              the bug, I decided it would be an interesting programming exercise
              to create a simple application that could sync music and playlists
              to my phone.
            </StyledPageParagraph>
          </>
        ),
      },
      {
        name: "Media",
        contentStyle: {
          padding: 0,
        },
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
                },
              },
              thumbnail: {
                size: [[200], [100, 1200, "max-width"]],
                descriptionOverlay: {
                  hideDescriptionOverlayUnlessHovered: false,
                  textColor: colorScheme?.primary4,
                  background: {
                    gradient: {
                      start: {
                        opacity: 0.9,
                        color: colorScheme?.primary1,
                      },
                      end: {
                        opacity: 0.9,
                        color: colorScheme?.primary2,
                      },
                      angle: 270,
                    },
                  },
                },
                currentItemBorder: `2px dotted ${colorScheme?.primary4}`,
              },
              styling: {
                container: {
                  margin: {
                    top: 4,
                  },
                  padding: {
                    right: 25,
                    left: 25,
                  },
                },
                colorTheme: {
                  colorOne: colorScheme?.primary1,
                  colorTwo: colorScheme?.primary2,
                  colorThree: colorScheme?.primary2,
                  colorFour: colorScheme?.primary3,
                  colorFive: colorScheme?.primary4,
                  colorGreyOne: colorScheme?.greyOne,
                },
                navigation: {
                  backgroundColor: colorScheme?.primary3,
                  elements: {
                    color: colorScheme?.primary1,
                  },
                },

                itemViewer: {
                  backgroundColor: colorScheme?.primary3,
                  loadingSpinner: {
                    options: {
                      color: colorScheme.primary4,
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
                        Files in the playlist that are not found in the
                        destination are copied to '/destination/music'. &nbsp;
                        After that .m3u playlist file is transferred to
                        'destination/music/playlists'.
                      </CSharpCardSection>
                    </div>
                  ),
                },
                video: {
                  sections: [
                    ["Showing the Source Files", ""],
                    [
                      "Selecting the Playlist with the Source Files in It",
                      "2:500",
                    ],
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
      {
        name: "The Problem",
        content: (
          <>
            <Quote author="Charles Kettering" className="padding-top-1">
              A problem well-stated is a problem half-solved;
            </Quote>
            <StyledPageParagraph {...propsToAdd}>
              It was clear from the experiences others were having that the
              problem stemmed from how Android 10 handled the playlist
              information with regards to the media database.&nbsp; After doing
              some more digging, I came across a workaround that involved simple
              filename path changes.&nbsp; After successfully trying this
              workaround out for myself, I began thinking about how to integrate
              it into the app I was planning on building.
            </StyledPageParagraph>
          </>
        ),
      },
      {
        name: "The Approach",
        content: (
          <>
            <StyledPageParagraph {...propsToAdd}>
              First I needed to figure out how to sync music to an Android
              device. It turns out that the main way to do that is through a
              protocol called the &nbsp;
              <a href={WIKIPEDIA_MTP_URL}>Media Transfer Protocol</a>
              &nbsp; (MTP), which is part of the&nbsp;
              <a href={WIKIPEDIA_DRM_URL}>Windows Media DRM</a>. Because of
              the&nbsp;
              <a href={DOWNLOADER_URL}>downloader</a>
              &nbsp;app I had recently started, I decided to use c# and WPF to
              create the playlist syncing app.
            </StyledPageParagraph>
            <StyledPageParagraph {...propsToAdd}>
              Creating the application was fairly straight forward due to what I
              had already learned from the downloader after I had thoroughly
              understood the problem and had a firm grasp on how task factories
              work and async code in general.
            </StyledPageParagraph>
          </>
        ),
      },
    ],
    [colorScheme, propsToAdd]
  );

  return (
    <PageNavLayout>
      <Header {...propsToAdd}>Playlist Syncer</Header>
      <Content {...propsToAdd}>
        {SECTIONS.map((section, index) => {
          const { contentStyle, containerStyle, headerStyle, name, content } =
            section;
          return (
            <StyledPageSection
              key={index}
              htmlAttributes={{
                id: name,
                style: containerStyle,
              }}
              {...propsToAdd}
            >
              <StyledPageSectionHeader
                {...propsToAdd}
                htmlAttributes={{ style: headerStyle }}
              >
                {name}
              </StyledPageSectionHeader>
              <StyledPageSectionContent
                {...propsToAdd}
                htmlAttributes={{ style: contentStyle }}
              >
                {content}
              </StyledPageSectionContent>
            </StyledPageSection>
          );
        })}
      </Content>
    </PageNavLayout>
  );
}
