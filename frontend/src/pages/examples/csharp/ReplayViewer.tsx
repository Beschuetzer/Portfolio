import React from "react";
import { Carousel } from "react-thumbnail-carousel";
import { CSharpLayout } from "./CSharpLayout";
import { EmbeddedLink } from "../../../components/EmbeddedLink";

import img1 from "../../../imgs/replay-viewer/img-1.png";
import img2 from "../../../imgs/replay-viewer/img-2.png";
import img3 from "../../../imgs/replay-viewer/img-3.png";
import img4 from "../../../imgs/replay-viewer/img-4.png";
import img5 from "../../../imgs/replay-viewer/img-5.png";
import img6 from "../../../imgs/replay-viewer/img-6.png";
import img7 from "../../../imgs/replay-viewer/img-7.png";
import imgDeal from "../../../imgs/replay-viewer/img-deal-1.png";
import imgGame from "../../../imgs/replay-viewer/img-game-1.png";
import imgUser from "../../../imgs/replay-viewer/img-user-1.png";
import imgMobile1 from "../../../imgs/replay-viewer/img-mobile-1.png";
import imgMobile2 from "../../../imgs/replay-viewer/img-mobile-2.png";
import clipNavigations from "../../../clips/replay-viewer/navigation.mp4";
import clipDealPlayer from "../../../clips/replay-viewer/deal-player.mp4";
import clipFilters from "../../../clips/replay-viewer/filters.mp4";
import img1Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-1-thumbnail.png";
import img2Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-2-thumbnail.png";
import img3Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-3-thumbnail.png";
import img4Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-4-thumbnail.png";
import img5Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-5-thumbnail.png";
import img6Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-6-thumbnail.png";
import img7Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-7-thumbnail.png";
import imgDealThumbnail from "../../../imgs/replay-viewer/thumbnails/img-deal-1-thumbnail.png";
import imgGameThumbnail from "../../../imgs/replay-viewer/thumbnails/img-game-1-thumbnail.png";
import imgUserThumbnail from "../../../imgs/replay-viewer/thumbnails/img-user-1-thumbnail.png";
import imgStoreThumbnail from "../../../imgs/replay-viewer/thumbnails/img-store-1-thumbnail.png";
import imgMobile1Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-mobile-1-thumbnail.png";
import imgMobile2Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-mobile-2-thumbnail.png";
import clipNavigationsThumbnail from "../../../clips/replay-viewer/thumbnails/navigation-thumbnail.png";
import clipDealPlayerThumbnail from "../../../clips/replay-viewer/thumbnails/deal-player-thumbnail.png";
import clipFiltersThumbnail from "../../../clips/replay-viewer/thumbnails/filters-thumbnail.png";

import { CSharpCardSection } from "./CSharpCardSection";
import Paragraph from "../../../typography/Paragraph";
import {
  LIVE_BRIDGE_URL,
  GITHUB_URL,
  LIVE_REPLAYS_URL,
  C_SHARP_CLASSNAME,
  CAROUSEL_COLORS,
} from "../../../components/constants";
import { Quote } from "../../../components/Quote";

const sectionNames = ["Motivation", "Media", "Features", "Notes"];

interface ReplayViewerProps {}

export const ReplayViewer: React.FC<ReplayViewerProps> = () => {
  return (
    <CSharpLayout
      href={LIVE_REPLAYS_URL}
      sections={[
        {
          name: sectionNames[0],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <Quote author="Anonymous">
                When the why is clear, the how is easy.
              </Quote>
              <CSharpCardSection title="The Reasons">
                <Paragraph size="five">
                  There are two reasons why I chose to build the
                  <EmbeddedLink
                    addSpaces={false}
                    isLocal={false}
                    href={LIVE_REPLAYS_URL}
                  >
                    A# Maj Replay Viewer
                  </EmbeddedLink>
                  .
                </Paragraph>
                <Paragraph size="five" classNameToAdd="margin-top-1">
                  First, in March of 2021, I finished&nbsp;
                  <EmbeddedLink
                    addSpaces={false}
                    isLocal={false}
                    href={LIVE_BRIDGE_URL}
                  >
                    A# Maj Bridge
                  </EmbeddedLink>
                  , which saves games, deals, and user statistics into a mongoDB
                  database.&nbsp; There have been multiple times where it would
                  have been nice to review games without having to log into the
                  database and decipher the raw data.&nbsp;
                </Paragraph>

                <Paragraph size="five" classNameToAdd="margin-top-1">
                  Second, I wanted to improve my familiarity with Narwahl's NX
                  workspace and Angular.&nbsp; What better way to do that than
                  to create a real-world application with a practical use?
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
				itemViewer: {
					aspectRatio: "widescreen",
				},
                thumbnail: {
                  size: 200,
                  descriptionOverlay: {
                    hideDescriptionOverlayUnlessHovered: false,
                    textColor: CAROUSEL_COLORS.replayViewer.primary4,
                    background: {
                      gradient: {
                        start: {
                          opacity: 0.9,
                          color: CAROUSEL_COLORS.replayViewer.primary1,
                        },
                        end: {
                          opacity: 0.9,
                          color: CAROUSEL_COLORS.replayViewer.primary2,
                        },
                        angle: 270,
                      },
                    },
                  },
                  currentItemBorder: `2px solid ${CAROUSEL_COLORS.replayViewer.primary1}`,
                },
                styling: {
                  colorTheme: {
                    colorOne: CAROUSEL_COLORS.replayViewer.primary4,
                    colorTwo: CAROUSEL_COLORS.replayViewer.primary3,
                    colorThree: CAROUSEL_COLORS.replayViewer.primary3,
                    colorFour: CAROUSEL_COLORS.replayViewer.primary2,
                    colorFive: CAROUSEL_COLORS.replayViewer.primary1,
                    colorGreyOne: CAROUSEL_COLORS.replayViewer.greyOne,
                  },
				  modal: {
					backgroundColor: CAROUSEL_COLORS.replayViewer.primary3,
					textColor: CAROUSEL_COLORS.replayViewer.primary1,
				  }
                },
              }}
              items={[
                {
                  srcMain: img1,
                  srcThumbnail: img1Thumbnail,
                  description: "First impressions matter.",
                },
                {
                  srcMain: clipFilters,
                  srcThumbnail: clipFiltersThumbnail,
                  description: "Applying Filters",
                  modal: {
                    children: (
                      <div>
                        <CSharpCardSection title="Contract is 1&clubs;">
                          The first part of the video highlights the process of
                          applying the contract matching filter.&nbsp; There are
                          two matches found.
                        </CSharpCardSection>
                        <CSharpCardSection title="Two Filters = Double the Filtering">
                          The second filter applied requires 'Ann' to have the
                          2&clubs;. In one of the filtered games she does, and
                          in the other one she doesn't.
                        </CSharpCardSection>
                      </div>
                    ),
                  },
                },
                {
                  srcMain: clipDealPlayer,
                  srcThumbnail: clipDealPlayerThumbnail,
                  description: "Using the deal player",
                  modal: {
                    children: (
                      <div>
                        <CSharpCardSection title="Critical Analysis">
                          One of the main reasons I created the{" "}
                          <EmbeddedLink isLocal={false} href={LIVE_REPLAYS_URL}>
                            Replay Viewer
                          </EmbeddedLink>{" "}
                          was to be able to easily review the trick-taking phase
                          of games completed on{" "}
                          <EmbeddedLink isLocal={false} href={LIVE_BRIDGE_URL}>
                            A# Maj Bridge
                          </EmbeddedLink>
                          .
                        </CSharpCardSection>
                        <CSharpCardSection title="Viewing Options">
                          There are two ways to get to the questionable
                          play:&nbsp; by turning on auto play or by skipping
                          ahead to the trick in question.
                        </CSharpCardSection>
                      </div>
                    ),
                  },
                },
                {
                  srcMain: clipNavigations,
                  srcThumbnail: clipNavigationsThumbnail,
                  description: "Misc. Animations",
                  modal: {
                    children: (
                      <div>
                        <CSharpCardSection title="Cherry on Top">
                          Animations can turn a boring app into an interesting
                          one, assuming the user experience is good.
                        </CSharpCardSection>
                      </div>
                    ),
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
				//todo: figure out why these cause a crash?
                // {
                //   srcMain: imgDeal,
                //   srcThumbnail: imgDealThumbnail,
                //   description: "Example of a deal cached in local storage",
                // },
                // {
                //   srcMain: imgUser,
                //   srcThumbnail: imgUserThumbnail,
                //   description: "Example of a user cached in local storage",
                // },
              ]}
            />,
          ],
        },
        {
          name: sectionNames[2],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <Quote author="Tim Cook" className="padding-top-1">
                A great product isn't just a collection of features. &nbsp;It's
                how it all works together.
              </Quote>

              <CSharpCardSection title="Filters">
                <Paragraph size="five">
                  There are two type of filters that can be applied: game-level
                  and deal-level.&nbsp; Game-level filters work by checking the
                  games in the current currently-displayed games array.&nbsp;
                  Deal-level filters work by checking the deals of the games
                  that pass the game-level filters.
                </Paragraph>
                <Paragraph size="five" classNameToAdd="margin-top-1">
                  When both types of filters are applied at the same time, games
                  are checked first.&nbsp; If a match is found, that game is
                  added to the filtered games.
                </Paragraph>
                <Paragraph size="five" classNameToAdd="margin-top-1">
                  Thereafter, the game's deals are checked to see if any of them
                  match any of the applied deal-level filters.&nbsp; If a match
                  is found on the deal-level, that deal is sent to an array of
                  deals which is used to highlight that deal when the game
                  detail is opened. &nbsp; If there are no deal-level filters
                  applied, then deal checking is skipped.&nbsp;
                </Paragraph>
              </CSharpCardSection>
              <CSharpCardSection title="Preferences">
                <Paragraph size="five">
                  There are three preferences the user can select from: size,
                  sort, and resultsPerPage.
                </Paragraph>
                <Paragraph size="five" classNameToAdd="margin-top-1">
                  Size refers to the size of the game detail card in the games
                  list view.&nbsp; There are three options: large, medium, and
                  small.
                </Paragraph>
                <Paragraph size="five" classNameToAdd="margin-top-1">
                  Sort refers to whether the matched games are sorted in
                  descending or ascending order based on the completion date.
                </Paragraph>
                <Paragraph size="five" classNameToAdd="margin-top-1">
                  Results per page refers to how many matched games are
                  displayed at one time.&nbsp; The options are: 1, 2, 5, 10, 25,
                  50, and 100.
                </Paragraph>
              </CSharpCardSection>
              <CSharpCardSection title="Caching">
                <Paragraph size="five">
                  The results of each query are stored in local storage,
                  allowing for faster load times on subsequent queries of the
                  same username as well as any other usernames that were part of
                  any of the cached deals/games.&nbsp; Preferences, users,
                  userIds, deals, and games are all stored in local storage as
                  separate items.&nbsp; The keys are the id of the item and the
                  value is the relevant data for that item.
                </Paragraph>
                {/* <Paragraph size="five">
						The application works by utilizing local storage to cache games and
						deals for each player that a user searchs.&nbsp; Only new games and
						deals are downloaded on each subsequent query of a given player's
						username.&nbsp;
					</Paragraph> */}
              </CSharpCardSection>
            </React.Fragment>,
          ],
        },
        {
          name: sectionNames[3],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <CSharpCardSection title="On Caching">
                <Paragraph size="five">
                  It should be noted that the current implementation would not
                  scale nicely as a player with tens of thousands of deals would
                  have to download most of those deals on every query (local
                  storage max is 5mb and each deal is around 2kb), leading to an
                  unacceptably-long delay.
                </Paragraph>
                <Paragraph size="five" classNameToAdd="margin-top-1">
                  However, given that the most deals any user has is less than
                  six hundred at this time, this concern is currently secondary
                  in nature.&nbsp; It would be fairly easy to fix though by
                  adding pagination.
                </Paragraph>
              </CSharpCardSection>
            </React.Fragment>,
          ],
        },
      ]}
      pageName="replay-viewer"
      sourceCodeLink={`${GITHUB_URL}/nxBridge`}
      demoLink={LIVE_REPLAYS_URL}
    >
      {" "}
    </CSharpLayout>
  );
};
