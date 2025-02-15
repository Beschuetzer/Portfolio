import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  OS_10_ISSUE_TRACKER_URL,
  GITHUB_URL,
  LIVE_REPLAYS_URL,
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
        There are two reasons why I chose to build the
            <ExamplePageLink
              url={LIVE_REPLAYS_URL}
            >
              A# Maj Replay Viewer
            </ExamplePageLink>
        </ExamplePageParagraph>
        {/* <CSharpCardSection title="The Reasons">
          <Paragraph size="five">
           
            .
          </Paragraph>
          <Paragraph size="five" classNameToAdd="margin-top-1">
            First, in March of 2021, I finished
            <EmbeddedLink
              addSpaces={false}
              isLocal={false}
              href={LIVE_BRIDGE_URL}
            >
              A# Maj Bridge
            </EmbeddedLink>
            , which saves games, deals, and user statistics into a mongoDB
            database. There have been multiple times where it would have
            been nice to review games without having to log into the database
            and decipher the raw data.
          </Paragraph>

          <Paragraph size="five" classNameToAdd="margin-top-1">
            Second, I wanted to improve my familiarity with Narwahl's NX
            workspace and Angular. What better way to do that than to
            create a real-world application with a practical use?
          </Paragraph>
        </CSharpCardSection> */}
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
