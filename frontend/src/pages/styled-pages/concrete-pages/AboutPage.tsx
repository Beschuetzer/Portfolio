import React from "react";
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
import { QuoteLegacy } from "../../../components/QuoteLegacy";
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

type AboutProps = {};

const ABOUT_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: "The Approach",
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph {...propsToAdd}>
          First I needed to figure out how to sync music to an Android device.
          It turns out that the main way to do that is through a protocol called
          the &nbsp;
          <a href={WIKIPEDIA_MTP_URL}>Media Transfer Protocol</a>
          &nbsp; (MTP), which is part of the&nbsp;
          <a href={WIKIPEDIA_DRM_URL}>Windows Media DRM</a>. Because of
          the&nbsp;
          <a href={DOWNLOADER_URL}>downloader</a>
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

export function AboutPage(props: AboutProps) {
  return (
    <ExamplePage
      sections={ABOUT_SECTIONS}
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
