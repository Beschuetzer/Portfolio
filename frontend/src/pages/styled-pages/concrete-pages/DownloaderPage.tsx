import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";
import { Quote } from "../../../components/Quote";
import { ExamplePageLink } from "../ExamplePageLink";

import img1 from "../../../imgs/downloader/img1.png";
import img2 from "../../../imgs/downloader/img2.png";
import img3 from "../../../imgs/downloader/img3.png";
import img4 from "../../../imgs/downloader/img4.png";
import img5 from "../../../imgs/downloader/img5.png";
import img6 from "../../../imgs/downloader/img6.png";
import problemVideo from "../../../clips/downloader/problem.mp4";
import problemVideo_480p from "../../../clips/downloader/problem-480p.mp4";
import demoVideo from "../../../clips/downloader/demo.mp4";
import demoVideo_480p from "../../../clips/downloader/demo-480p.mp4";
import problemVideoThumbnail from "../../../clips/downloader/problem-thumbnail.png";
import demoVideoThumbnail from "../../../clips/downloader/demo-thumbnail.png";

import img1Thumbnail from "../../../imgs/downloader/thumbnails/img1-thumbnail.png";
import img2Thumbnail from "../../../imgs/downloader/thumbnails/img2-thumbnail.png";
import img3Thumbnail from "../../../imgs/downloader/thumbnails/img3-thumbnail.png";
import img4Thumbnail from "../../../imgs/downloader/thumbnails/img4-thumbnail.png";
import img5Thumbnail from "../../../imgs/downloader/thumbnails/img5-thumbnail.png";
import img6Thumbnail from "../../../imgs/downloader/thumbnails/img6-thumbnail.png";
import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";
import {
  OC_REMIX_URL,
  KH_INSIDER_URL,
  PLAYLIST_SYNCER_URL,
  DOWNLOADER_PAGE_NAME,
  GITHUB_URL,
} from "../../../components/constants";
import { Carousel } from "react-thumbnail-carousel";
import { getCarouselStylingOptions } from "../../../styles/styles";
import { defaultFontSize } from "../../../styles/constants";

const SECTION_NAMES = ["Description", "Media", "Notes"];
const DOWNLOADER_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Peter Drucker"
          text="Efficiency is doing better what is already being done."
        />
        <ExamplePageTitledParagraph title="Why">
          Websites like
          <ExamplePageLink url={OC_REMIX_URL}>OCRemix</ExamplePageLink>and
          <ExamplePageLink url={KH_INSIDER_URL}>
            Kingdom Hearts Insider
          </ExamplePageLink>
          offer mp3 files for downloading. It can be tedious downloading each
          file by hand, so I decided to create a c# app that takes in a Regular
          Expression and recursively downloads files that match the expression
          given.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="How">
          The app finds any links that are on the url provided and recursively
          crawls any sub-links until it runs out of links. On each page, it
          looks for download links that match the Regular Expression and adds
          them to a download queue. It works best on sites like
          <ExamplePageLink url={KH_INSIDER_URL}>
            Kingdom Hearts Insider
          </ExamplePageLink>
          where each album page only has links to that specific album.
        </ExamplePageTitledParagraph>
      </>
    ),
  },
  {
    name: SECTION_NAMES[1],
    contentStyle: {
      paddingTop: defaultFontSize,
    },
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <Carousel
        options={getCarouselStylingOptions(propsToAdd.colorscheme)}
        items={[
          {
            srcMain: {
              hiRes: problemVideo,
              loRes: problemVideo_480p,
            },
            srcThumbnail: problemVideoThumbnail,
            description: "The manual way of downloading",
            modal: {
              sections: [
                {
                  title: "The Problem",
                  text: "Downloading new releases from ocremix.org is exciting, but having to download a few months worth is more of a chore.",
                },
                {
                  title: "Reality Check",
                  text: "This is what it takes to download one song.",
                },
              ],
            },
            video: {
              sections: [
                ["Navigating to First File's Page", ""],
                ["Selecting the Server", "4:00"],
                ["Selecting the Save Location", "6:00"],
              ],
              autoPlay: false,
            },
          },
          {
            srcMain: {
              hiRes: demoVideo,
              loRes: demoVideo_480p,
            },
            srcThumbnail: demoVideoThumbnail,
            description: "The automated way of downloading",
            modal: {
              sections: [
                {
                  title: "Embedded Links",
                  text: "The downloader app not only downloads links it finds matching the given criteria, but will do the same for any embedded links it finds.",
                },
                {
                  title: "Logs",
                  text: "The download logs display twice, but only one file is downloaded.",
                }
              ]
            },
            video: {
              sections: [
                ["Ensuring Options are Correct", ""],
                [
                  "Selecting the Regular Expression to Use for the Site",
                  "5:00",
                ],
                ["Selecting the Save Location", "10:00"],
                [
                  "Downloading the All Files Recursively since Last Download Date",
                  "13:00",
                ],
                ["Verifying the Downloaded Files", "43:00"],
              ],
              autoPlay: false,
            },
          },
          {
            srcMain: img1,
            srcThumbnail: img1Thumbnail,
            description: "The User interface",
          },
          {
            srcMain: img2,
            srcThumbnail: img2Thumbnail,
            description: "Options available",
          },
          {
            srcMain: img3,
            srcThumbnail: img3Thumbnail,
            description: "Full-screen user interface when downloading",
          },
          {
            srcMain: img4,
            srcThumbnail: img4Thumbnail,
            description: "Integrated file-renaming tool",
          },
          {
            srcMain: img5,
            srcThumbnail: img5Thumbnail,
            description:
              "A list of songs from ocremix.org. A pain to download manually...",
          },
          {
            srcMain: img6,
            srcThumbnail: img6Thumbnail,
            description: "Result of using Downloader",
          },
        ]}
      />
    ),
  },
  {
    name: SECTION_NAMES[2],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageTitledParagraph title="Multi-threading">
          Downloader uses three threads. One thread analyzes the html looking
          for sub-links and urls matching the Regular Expression. If it finds a
          link to download it adds it to the download queue, which is handled by
          the second thread. The last thread handles the GUI updates.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="A Challenging Concept">
          At this point in time (March-April 2020), I had never written an
          app/script that used multiple threads. It took a few days to firmly
          grasp the concept, but once I had it, I was able to do everything I
          wanted to do, namely analyze html, download files, and update the GUI
          all at the same time. I took this understanding and applied it to
          <ExamplePageLink url={PLAYLIST_SYNCER_URL}>
            another problem
          </ExamplePageLink>
          I was facing at the time.
        </ExamplePageTitledParagraph>
      </>
    ),
  },
];

type DownloaderPageProps = {};
export function DownloaderPage(props: DownloaderPageProps) {
  return (
    <ExamplePage
      title="Batch Downloader"
      sections={DOWNLOADER_SECTIONS}
      layoutProps={{
        links: [
          {
            title: {
              text: "Code",
            },
            url: `${GITHUB_URL}/${DOWNLOADER_PAGE_NAME}`,
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
