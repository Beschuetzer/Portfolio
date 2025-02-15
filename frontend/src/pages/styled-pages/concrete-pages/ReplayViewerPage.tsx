import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  OS_10_ISSUE_TRACKER_URL,
  GITHUB_URL,
  LIVE_REPLAYS_URL,
  LIVE_BRIDGE_URL,
} from "../../../components/constants";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";

import { ExamplePageLink } from "../ExamplePageLink";
import { Quote } from "../../../components/Quote";
import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";

type ReplayViewerPageProps = {};

export const REPLAY_VIEWER_SECTION_NAMES = [
  "Motivation",
  "Media",
  "Features",
  "Notes",
];

const REPLAY_VIEWER_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: REPLAY_VIEWER_SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Anonymous"
          text="When the why is clear, the how is easy."
        />
        <ExamplePageParagraph>
          In March of 2021, I had just finished
          <ExamplePageLink url={LIVE_BRIDGE_URL}>A# Maj Bridge</ExamplePageLink>
          , which store games, deals, and user statistics as MongoDB documents.
          While playing with my friends, there were multiple times where it would have been nice to review
          games without having to log into the database and decipher the raw
          data.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          In addition, I wanted to improve my familiarity with Narwahl's Nx workspace
          and Angular. What better way to do that than to create a real-world
          application with a practical use?
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: REPLAY_VIEWER_SECTION_NAMES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Anonymous"
          text="When the why is clear, the how is easy."
        />
        <ExamplePageParagraph>
          In March of 2021, I had just finished
          <ExamplePageLink url={LIVE_BRIDGE_URL}>A# Maj Bridge</ExamplePageLink>
          , which store games, deals, and user statistics as MongoDB documents.
          While playing with my friends, there were multiple times where it would have been nice to review
          games without having to log into the database and decipher the raw
          data.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          In addition, I wanted to improve my familiarity with Narwahl's Nx workspace
          and Angular. What better way to do that than to create a real-world
          application with a practical use?
        </ExamplePageParagraph>
      </>
    ),
  },
];

export function ReplayViewerPage(props: ReplayViewerPageProps) {
  return (
    <ExamplePage
      title="Playlist Syncer"
      sections={REPLAY_VIEWER_SECTIONS}
      layoutProps={{
        links: [
          {
            title: {
              text: "Code",
            },
            url: `${GITHUB_URL}/nxbridge`,
            svg: {
              xlinkHref: `/sprite.svg#icon-code`,
            },
            hoverEffectType: HoverEffect.explode,
          },
          {
            title: {
              text: "Demo",
            },
            url: `${LIVE_REPLAYS_URL}`,
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
