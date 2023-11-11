import React from "react";
import { Carousel } from "react-thumbnail-carousel";
import { CSharpLayout } from "./CSharpLayout";
import { EmbeddedLink } from "../../../components/EmbeddedLink";

import img1 from "../../../imgs/playlist-syncer/img1.png";
import imgProblem from "../../../imgs/playlist-syncer/img-problem.jpg";
import img2 from "../../../imgs/playlist-syncer/img2.png";
import img3 from "../../../imgs/playlist-syncer/img3.png";
import img4 from "../../../imgs/playlist-syncer/img4.png";

import img1Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img1-thumbnail.png";
import imgProblemThumbnail from "../../../imgs/playlist-syncer/thumbnails/img-problem-thumbnail.jpg";
import img2Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img2-thumbnail.png";
import img3Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img3-thumbnail.png";
import img4Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img4-thumbnail.png";

import demoVideo from "../../../clips/playlist-syncer/demo.mp4";
import demoVideoThumbnail from "../../../clips/playlist-syncer/demo-thumbnail.png";
import { CSharpCardSection } from "./CSharpCardSection";
import Paragraph from "../../../typography/Paragraph";
import {
	CAROUSEL_COLORS,
  C_SHARP_CLASSNAME,
  DOWNLOADER_URL,
  GITHUB_URL,
  OS_10_ISSUE_TRACKER_URL,
  PLAYLIST_SYNCER_PAGE_NAME,
  WIKIPEDIA_DRM_URL,
  WIKIPEDIA_MTP_URL,
} from "../../../components/constants";
import { Quote } from "../../../components/Quote";

const sectionNames = ["Background", "Media", "Problem", "Approach"];

interface PlaylistSyncerProps {}

export const PlaylistSyncer: React.FC<PlaylistSyncerProps> = () => {
  return (
    <CSharpLayout
      sections={[
        {
          name: sectionNames[0],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <CSharpCardSection>
                <Paragraph size="four">
                  Around the end of Febraury 2020, Samsung updated their Android
                  OS to version 10.&nbsp; Eager to check out the newest Android
                  OS, I promptly updated.&nbsp; Unfortunately, the update
                  <EmbeddedLink href={OS_10_ISSUE_TRACKER_URL}>
                    broke my ability to sync music and playlists
                  </EmbeddedLink>
                  to my Galaxy S9+ phone.&nbsp;
                </Paragraph>
                <Paragraph size="four" classNameToAdd="margin-top-1">
                  Thinking it would get resolved in a prompt manner, I waited a
                  few months.&nbsp; In the meantime, I looked into other ways of
                  easily syncing music/playlists to my phone.&nbsp; After
                  looking for over a month to no avail and realizing Google was
                  in no hurry to fix the bug, I decided it would be an
                  interesting programming exercise to create a simple
                  application that could sync music and playlists to my phone.
                </Paragraph>
              </CSharpCardSection>
            </React.Fragment>,
          ],
        },
        {
          styles: {
            position: "relative",
          },
          name: sectionNames[1],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <Carousel
              options={{
                layout: {
                  itemDisplayLocation: "above",
                },
                container: {
                  style: {
                    borderRadius: 0,
                  },
                },
                thumbnail: {
                  size: 200,
                  descriptionOverlay: {
                    hideDescriptionOverlayUnlessHovered: false,
                    textColor: CAROUSEL_COLORS.playlistSyncer.primary4,
                    background: {
                      gradient: {
                        start: {
                          opacity: 0.9,
                          color: CAROUSEL_COLORS.playlistSyncer.primary1,
                        },
                        end: {
                          opacity: 0.9,
                          color: CAROUSEL_COLORS.playlistSyncer.primary2,
                        },
                        angle: 270,
                      },
                    },
                  },
                  currentItemBorder: `2px dotted ${CAROUSEL_COLORS.playlistSyncer.primary4}`,
                },
                styling: {
                  colorTheme: {
                    colorOne: CAROUSEL_COLORS.playlistSyncer.primary1,
                    colorTwo: CAROUSEL_COLORS.playlistSyncer.primary2,
                    colorThree: CAROUSEL_COLORS.playlistSyncer.primary3,
                    colorFour: CAROUSEL_COLORS.playlistSyncer.primary3,
                    colorFive: CAROUSEL_COLORS.playlistSyncer.primary4,
                    colorGreyOne: "#ddd",
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
                  srcMain: demoVideo,
                  srcThumbnail: demoVideoThumbnail,
                  description: "Video Demonstration",
                  modal: {
                    children: (
                      <div>
                        <CSharpCardSection title="Transferring Files">
                          The playlist syncer has the ability to transfer songs
                          to either an SD card or the phone's internal memory.
                          &nbsp; Files in the playlist that are not found in the
                          destination are copied to '/destination/music'. &nbsp;
                          After that .m3u playlist file is transferred to
                          'destination/music/playlists'.
                        </CSharpCardSection>
                      </div>
                    ),
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
            />,
          ],
        },
        {
          name: sectionNames[2],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <Quote author="Charles Kettering" className="padding-top-1">
                A problem well-stated is a problem half-solved;
              </Quote>
              <CSharpCardSection>
                <Paragraph size="four">
                  It was clear from the experiences others were having that the
                  problem stemmed from how Android 10 handled the playlist
                  information with regards to the media database.&nbsp; After
                  doing some more digging, I came across a workaround that
                  involved simple filename path changes.&nbsp; After
                  successfully trying this workaround out for myself, I began
                  thinking about how to integrate it into the app I was planning
                  on building.
                </Paragraph>
              </CSharpCardSection>
            </React.Fragment>,
          ],
        },
        {
          name: sectionNames[3],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <CSharpCardSection>
                <Paragraph size="four">
                  First I needed to figure out how to sync music to an Android
                  device. It turns out that the main way to do that is through a
                  protocol called the
                  <EmbeddedLink href={WIKIPEDIA_MTP_URL}>
                    Media Transfer Protocol
                  </EmbeddedLink>
                  (MTP), which is part of the
                  <EmbeddedLink href={WIKIPEDIA_DRM_URL}>
                    Windows Media DRM
                  </EmbeddedLink>
                  . Because of the
                  <EmbeddedLink isLocal={true} href={DOWNLOADER_URL}>
                    downloader
                  </EmbeddedLink>
                  app I had recently started, I decided to use c# and WPF to
                  create the playlist syncing app.
                </Paragraph>
                <Paragraph size="four" classNameToAdd="margin-top-1">
                  Creating the application was fairly straight forward due to
                  what I had already learned from the downloader after I had
                  thoroughly understood the problem and had a firm grasp on how
                  task factories work and async code in general.
                </Paragraph>
              </CSharpCardSection>
            </React.Fragment>,
          ],
        },
      ]}
      pageName={PLAYLIST_SYNCER_PAGE_NAME}
      sourceCodeLink={`${GITHUB_URL}/${PLAYLIST_SYNCER_PAGE_NAME}`}
    >
      {" "}
    </CSharpLayout>
  );
};
