import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { Carousel } from "react-thumbnail-carousel";
import {
  OS_10_ISSUE_TRACKER_URL,
  WIKIPEDIA_MTP_URL,
  WIKIPEDIA_DRM_URL,
  DOWNLOADER_URL,
  GITHUB_URL,
  PLAYLIST_SYNCER_PAGE_NAME,
} from "../../../components/constants";
import { CSharpCardSection } from "../../examples";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";

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
import demoVideo_480p from "../../../clips/playlist-syncer/demo-480p.mp4";
import demoVideoThumbnail from "../../../clips/playlist-syncer/demo-thumbnail.png";
import { Quote } from "../../../components/Quote";
import { ExamplePageLink } from "../ExamplePageLink";
import { getCarouselStylingOptions } from "../../../styles/styles";

type PlaylistSyncerProps = {};

const PLAYLIST_SYNCER_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: "Background",
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph {...propsToAdd}>
          Around the end of Febraury 2020, Samsung updated their Android OS to
          version 10.&nbsp; Eager to check out the newest Android OS, I promptly
          updated.&nbsp; Unfortunately, the update&nbsp;
          <ExamplePageLink url={OS_10_ISSUE_TRACKER_URL}>
            broke my ability to sync music and playlists
          </ExamplePageLink>
          &nbsp; to my Galaxy S9+ phone.&nbsp;
        </ExamplePageParagraph>
        <ExamplePageParagraph {...propsToAdd}>
          Thinking it would get resolved in a prompt manner, I waited a few
          months.&nbsp; In the meantime, I looked into other ways of easily
          syncing music/playlists to my phone.&nbsp; After looking for over a
          month to no avail and realizing Google was in no hurry to fix the bug,
          I decided it would be an interesting programming exercise to create a
          simple application that could sync music and playlists to my phone.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: "Media",
    contentStyle: {
      padding: 0,
    },
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <Carousel
        options={getCarouselStylingOptions(propsToAdd.colorscheme)}
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
  {
    name: "The Problem",
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Charles Kettering"
          text="A problem well-stated is a problem half-solved."
        />
        <ExamplePageParagraph {...propsToAdd}>
          It was clear from the experiences others were having that the problem
          stemmed from how Android 10 handled the playlist information with
          regards to the media database.&nbsp; After doing some more digging, I
          came across a workaround that involved simple filename path
          changes.&nbsp; After successfully trying this workaround out for
          myself, I began thinking about how to integrate it into the app I was
          planning on building.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: "The Approach",
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph {...propsToAdd}>
          First I needed to figure out how to sync music to an Android device.
          It turns out that the main way to do that is through a protocol called
          the &nbsp;
          <ExamplePageLink url={WIKIPEDIA_MTP_URL}>Media Transfer Protocol</ExamplePageLink>
          &nbsp; (MTP), which is part of the&nbsp;
          <ExamplePageLink url={WIKIPEDIA_DRM_URL}>Windows Media DRM</ExamplePageLink>. Because of
          the&nbsp;
          <ExamplePageLink url={DOWNLOADER_URL}>downloader</ExamplePageLink>
          &nbsp;app I had recently started, I decided to use c# and WPF to
          create the playlist syncing app.
        </ExamplePageParagraph>
        <ExamplePageParagraph {...propsToAdd}>
          Creating the application was fairly straight forward due to what I had
          already learned from the downloader after I had thoroughly understood
          the problem and had a firm grasp on how task factories work and async
          code in general.
        </ExamplePageParagraph>
      </>
    ),
  },
];

export function PlaylistSyncerPage(props: PlaylistSyncerProps) {
  return (
    <ExamplePage
      title="Playlist Syncer"
      sections={PLAYLIST_SYNCER_SECTIONS}
      layoutProps={{
        links: [
          {
            title: {
              text: "Code",
            },
            url: `${GITHUB_URL}/${PLAYLIST_SYNCER_PAGE_NAME}`,
            svg: {
              xlinkHref: `/sprite.svg#icon-code`,
            },
            hoverEffectType: HoverEffect.explode,
          },
        ],
      }}
    />
  );
}
