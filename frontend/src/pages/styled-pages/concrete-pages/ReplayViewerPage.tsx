import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  GITHUB_URL,
  LIVE_REPLAYS_URL,
  LIVE_BRIDGE_URL,
} from "../../../components/constants";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";

import { ExamplePageLink } from "../ExamplePageLink";
import { Quote } from "../../../components/Quote";
import { Carousel } from "react-thumbnail-carousel";
import { getCarouselStylingOptions } from "../../../styles/styles";
import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";

import img1 from "../../../imgs/replay-viewer/img-1.png";
import img2 from "../../../imgs/replay-viewer/img-2.png";
import img3 from "../../../imgs/replay-viewer/img-3.png";
import img4 from "../../../imgs/replay-viewer/img-4.png";
import img5 from "../../../imgs/replay-viewer/img-5.png";
import img6 from "../../../imgs/replay-viewer/img-6.png";
import img7 from "../../../imgs/replay-viewer/img-7.png";
import imgGame from "../../../imgs/replay-viewer/img-game-1.png";
import imgMobile1 from "../../../imgs/replay-viewer/img-mobile-1.png";
import imgMobile2 from "../../../imgs/replay-viewer/img-mobile-2.png";
import clipNavigations from "../../../clips/replay-viewer/navigation.mp4";
import clipNavigations_480p from "../../../clips/replay-viewer/navigation-480p.mp4";
import clipDealPlayer from "../../../clips/replay-viewer/deal-player.mp4";
import clipDealPlayer_480p from "../../../clips/replay-viewer/deal-player-480p.mp4";
import clipFilters from "../../../clips/replay-viewer/filters.mp4";
import clipFilters_480p from "../../../clips/replay-viewer/filters-480p.mp4";
import img1Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-1-thumbnail.png";
import img2Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-2-thumbnail.png";
import img3Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-3-thumbnail.png";
import img4Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-4-thumbnail.png";
import img5Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-5-thumbnail.png";
import img6Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-6-thumbnail.png";
import img7Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-7-thumbnail.png";
import imgGameThumbnail from "../../../imgs/replay-viewer/thumbnails/img-game-1-thumbnail.png";
import imgMobile1Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-mobile-1-thumbnail.png";
import imgMobile2Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-mobile-2-thumbnail.png";
import clipNavigationsThumbnail from "../../../clips/replay-viewer/thumbnails/navigation-thumbnail.png";
import clipDealPlayerThumbnail from "../../../clips/replay-viewer/thumbnails/deal-player-thumbnail.png";
import clipFiltersThumbnail from "../../../clips/replay-viewer/thumbnails/filters-thumbnail.png";
import { defaultFontSize } from "../../../styles/constants";

export const REPLAY_VIEWER_SECTION_NAMES = [
  "Motivation",
  "Media",
  "Features",
  "Notes",
];

function getModalHtmlAttributes(propsToAdd: LayoutStyledProps) {
  return {
    style: { color: propsToAdd.colorscheme?.primary4 },
  };
}

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
          While playing with my friends, there were multiple times where it
          would have been nice to review games without having to log into the
          database and decipher the raw data.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          In addition, I wanted to improve my familiarity with Narwahl's Nx
          workspace and Angular. What better way to do that than to create a
          real-world application with a practical use?
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: REPLAY_VIEWER_SECTION_NAMES[1],
    contentStyle: {
      paddingTop: defaultFontSize,
    },
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <Carousel
        options={{
          ...getCarouselStylingOptions(propsToAdd.colorscheme),
          layout: {
            itemDisplayLocation: "above",
          },
        }}
        items={[
          {
            srcMain: img1,
            srcThumbnail: img1Thumbnail,
            description: "First impressions matter.",
          },
          {
            srcMain: {
              hiRes: clipFilters,
              loRes: clipFilters_480p,
            },
            srcThumbnail: clipFiltersThumbnail,
            description: "Applying Filters",
            modal: {
              children: (
                <div>
                  <ExamplePageTitledParagraph
                    title="Contract is 1&clubs;"
                    htmlAttributes={getModalHtmlAttributes(propsToAdd)}
                  >
                    The first part of the video highlights the process of
                    applying the contract matching filter. There are two matches
                    found.
                  </ExamplePageTitledParagraph>
                  <ExamplePageTitledParagraph
                    title="Two Filters = Double the Filtering"
                    htmlAttributes={getModalHtmlAttributes(propsToAdd)}
                  >
                    The second filter applied requires 'Ann' to have the
                    2&clubs;. In one of the filtered games she does, and in the
                    other one she doesn't.
                  </ExamplePageTitledParagraph>
                </div>
              ),
            },
            video: {
              autoPlay: false,
              sections: [
                ["Login", "02:00"],
                ["Finding Games where Contract is 1 club", "3:00"],
                ["Opening First 1st Club Game", "13:00"],
                ["Viewing 5th Deal of 1st Game", "16:00"],
                ["Noticing Adam has 2 of Clubs in First Game", "19:00"],
                ["Opening Second 1 Club Game", "22:500"],
                ["Viewing 6th Deal of 2nd Game", "25:00"],
                ["Noticing Ann has 2 of Clubs in Second Game", "29:00"],
                ["Adding Filter for Ann Having 2 of Clubs", "32:00"],
                ["Only One Game Remains", "39:500"],
                [
                  "Proving Remaining Game is the One Where Ann has 2 of Clubs",
                  "43:00",
                ],
              ],
            },
          },
          {
            srcMain: {
              hiRes: clipDealPlayer,
              loRes: clipDealPlayer_480p,
            },
            srcThumbnail: clipDealPlayerThumbnail,
            description: "Using the deal player",
            modal: {
              children: (
                <div>
                  <ExamplePageTitledParagraph
                    title="Critical Analysis"
                    htmlAttributes={getModalHtmlAttributes(propsToAdd)}
                  >
                    One of the main reasons I created the
                    <ExamplePageLink
                      url={LIVE_REPLAYS_URL}
                      htmlAttributes={getModalHtmlAttributes(propsToAdd)}
                    >
                      Replay Viewer
                    </ExamplePageLink>
                    was to be able to easily review the trick-taking phase of
                    games completed on
                    <ExamplePageLink
                      url={LIVE_BRIDGE_URL}
                      htmlAttributes={getModalHtmlAttributes(propsToAdd)}
                    >
                      A# Maj Bridge
                    </ExamplePageLink>
                    .
                  </ExamplePageTitledParagraph>
                  <ExamplePageTitledParagraph
                    title="Viewing Options"
                    htmlAttributes={getModalHtmlAttributes(propsToAdd)}
                  >
                    There are two ways to get to the questionable play: by
                    turning on auto play or by skipping ahead to the trick in
                    question.
                  </ExamplePageTitledParagraph>
                </div>
              ),
            },
            video: {
              autoPlay: false,
              sections: [
                ["Viewing a Game with Filter Match", ""],
                ["Viewing the Replay", "3:650"],
                ["Adjusting the Playback Speed and Card Positioning", "6:00"],
                ["Using the Buttons", "12:00"],
              ],
            },
          },
          {
            srcMain: {
              hiRes: clipNavigations,
              loRes: clipNavigations_480p,
            },
            srcThumbnail: clipNavigationsThumbnail,
            description: "Animations and Settings",
            modal: {
              children: (
                <div>
                  <ExamplePageTitledParagraph
                    title="Cherry on Top"
                    htmlAttributes={getModalHtmlAttributes(propsToAdd)}
                  >
                    Animations can turn a boring app into an interesting one,
                    assuming the user experience is good.
                  </ExamplePageTitledParagraph>
                </div>
              ),
            },
            video: {
              autoPlay: false,
              sections: [
                ["Logging In", ""],
                ["Left Pane Animations", "4:250"],
                ["Right Pane Animations", "12:00"],
                ["Adjusting the Item Settings", "14:666"],
                ["Adjusting the Page Enumeration Settings", "19:750"],
              ],
            },
          },
          {
            srcMain: img2,
            srcThumbnail: img2Thumbnail,
            description: "Overall Layout",
          },
          {
            srcMain: img3,
            srcThumbnail: img3Thumbnail,
            description: "Filters en masse",
          },
          {
            srcMain: img4,
            srcThumbnail: img4Thumbnail,
            description: "Filters applied and results shown.",
          },
          {
            srcMain: img5,
            srcThumbnail: img5Thumbnail,
            description: "Game detail screen collapsed",
          },
          {
            srcMain: img6,
            srcThumbnail: img6Thumbnail,
            description: "Game detail screen expanded",
          },
          {
            srcMain: img7,
            srcThumbnail: img7Thumbnail,
            description: "Deal player layout",
          },
          {
            srcMain: imgMobile1,
            srcThumbnail: imgMobile1Thumbnail,
            description: "Mobile game detail",
          },
          {
            srcMain: imgMobile2,
            srcThumbnail: imgMobile2Thumbnail,
            description: "Mobile deal player",
          },
          {
            srcMain: imgGame,
            srcThumbnail: imgGameThumbnail,
            description: "Example of a game cached in local storage",
          },
        ]}
      />
    ),
  },
  {
    name: REPLAY_VIEWER_SECTION_NAMES[2],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Tim Cook"
          text="A great product isn't just a collection of features. It's how it all works together."
        />
        <ExamplePageTitledParagraph title="Filters">
          <ExamplePageParagraph>
            There are two type of filters that can be applied: game-level and
            deal-level. Game-level filters work by checking the games in the
            current currently-displayed games array. Deal-level filters work by
            checking the deals of the games that pass the game-level filters.
          </ExamplePageParagraph>
          <ExamplePageParagraph>
            When both types of filters are applied at the same time, games are
            checked first. If a match is found, that game is added to the
            filtered games.
          </ExamplePageParagraph>
          <ExamplePageParagraph>
            Thereafter, the game's deals are checked to see if any of them match
            any of the applied deal-level filters. If a match is found on the
            deal-level, that deal is sent to an array of deals which is used to
            highlight that deal when the game detail is opened. If there are no
            deal-level filters applied, then deal checking is skipped.
          </ExamplePageParagraph>
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Preferences">
          <ExamplePageParagraph>
            There are three preferences the user can select from: size, sort,
            and resultsPerPage.
          </ExamplePageParagraph>
          <ExamplePageParagraph>
            Size refers to the size of the game detail card in the games list
            view. There are three options: large, medium, and small.
          </ExamplePageParagraph>
          <ExamplePageParagraph>
            Sort refers to whether the matched games are sorted in descending or
            ascending order based on the completion date.
          </ExamplePageParagraph>
          <ExamplePageParagraph>
            Results per page refers to how many matched games are displayed at
            one time. The options are: 1, 2, 5, 10, 25, 50, and 100.
          </ExamplePageParagraph>
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Caching">
          <ExamplePageParagraph>
            The results of each query are stored in local storage, allowing for
            faster load times on subsequent queries of the same username as well
            as any other usernames that were part of any of the cached
            deals/games. Preferences, users, userIds, deals, and games are all
            stored in local storage as separate items. The keys are the id of
            the item and the value is the relevant data for that item.
          </ExamplePageParagraph>
        </ExamplePageTitledParagraph>
      </>
    ),
  },
  {
    name: REPLAY_VIEWER_SECTION_NAMES[3],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageTitledParagraph title="On Caching">
          <ExamplePageParagraph>
            It should be noted that the current implementation would not scale
            nicely as a player with tens of thousands of deals would have to
            download most of those deals on every query (local storage max is
            5mb and each deal is around 2kb), leading to an unacceptably-long
            delay.
          </ExamplePageParagraph>
          <ExamplePageParagraph>
            However, given that the most deals any user has is less than six
            hundred at this time, this concern is currently secondary in nature.
            It would be fairly easy to fix though by adding pagination.
          </ExamplePageParagraph>
        </ExamplePageTitledParagraph>
      </>
    ),
  },
];

type ReplayViewerPageProps = {};

export function ReplayViewerPage(props: ReplayViewerPageProps) {
  return (
    <ExamplePage
      title="Replay Viewer"
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
