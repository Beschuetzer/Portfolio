import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { LayoutStyledProps } from "../../../layouts/types";

import video1 from "../../../clips/bridge-demo/1.mp4";
import video1_480p from "../../../clips/bridge-demo/1-480p.mp4";
import video2 from "../../../clips/bridge-demo/2.mp4";
import video2_480p from "../../../clips/bridge-demo/2-480p.mp4";
import video3 from "../../../clips/bridge-demo/3.mp4";
import video3_480p from "../../../clips/bridge-demo/3-480p.mp4";
import video1Thumbnail from "../../../clips/bridge-demo/1-thumbnail.png";
import video2Thumbnail from "../../../clips/bridge-demo/2-thumbnail.png";
import video3Thumbnail from "../../../clips/bridge-demo/3-thumbnail.png";
import { ExamplePageTitledList } from "../ExamplePageTitledList";
import { ExamplePageLink } from "../ExamplePageLink";
import { LIVE_BRIDGE_URL } from "../../../components/constants";
import { Carousel } from "react-thumbnail-carousel";
import { getCarouselStylingOptions } from "../../../styles/styles";
import { defaultFontSize } from "../../../styles/constants";

type BridgeDemoProps = {};

export const BRIDGE_DEMO_SECTION_NAMES = [
  "Requirements",
  "Instructions",
  "Video Instructions",
];

const BRIDGE_DEMO_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: BRIDGE_DEMO_SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          Runing a demo of A#Maj Bridge requires the following:
        </ExamplePageParagraph>
        <ExamplePageTitledList
          items={[
            "Two separate browsers (neither can be IE).",
            "Browsers must have a way to create independent sessions (e.g. 'Private Window' in Firefox and 'Incognito Mode' in Crome).",
          ]}
        />
      </>
    ),
  },
  {
    name: BRIDGE_DEMO_SECTION_NAMES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageTitledList
          items={[
            "Open both browsers.",
            "Open one private browsing window for each browser (four windows total).",
            () => (
              <>
                Navigate to
                <ExamplePageLink url={`${LIVE_BRIDGE_URL}login`}>
                  here
                </ExamplePageLink>
                in each window (it may take 10+ seconds to load as the heroku
                container will likely be asleep).
              </>
            ),
            () => (
              <>
                In each window login using one of the four usernames below and
                the password (each window must login with a separate username
                otherwise game-play will be impossible due to security reasons):
                <ExamplePageTitledList
                  listContainerStyles={{
                    listStyleType: "disc",
                  }}
                  items={[
                    "Username 1: 'Test'",
                    "Username 2: 'TEST'",
                    "Username 3: 'tesT'",
                    "Username 4: 'test'",
                    "Password: 'test'",
                  ]}
                />
              </>
            ),
            "Explore the site.  Create a lobby, start a game, make a few bids, then pass three times in a row to start the trick taking part.",
            "See below section for videos explaining the above info.",
          ]}
        />
      </>
    ),
  },
  {
    name: BRIDGE_DEMO_SECTION_NAMES[2],
    contentStyle: {
      paddingTop: defaultFontSize
    },
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <Carousel
        options={getCarouselStylingOptions(propsToAdd.colorscheme)}
        items={[
          {
            srcMain: {
              hiRes: video1,
              loRes: video1_480p,
            },
            srcThumbnail: video1Thumbnail,
            description: "Setting Up",
            modal: {
              sections: [
                {
                  title: "Four Windows at Once",
                  text: "This video show you how to open Chrome and Firefox and create private session windows",
                },
              ],
            },
            video: {
              sections: [
                ["Opening First Browser", 6500],
                ["Opening Icognito Mode in First Browser ", 4500],
                ["Opening Second Browser", 4200],
                ["Opening Icognito Mode in Second Browser ", 1],
              ],
              autoPlay: false,
            },
          },
          {
            srcMain: {
              hiRes: video2,
              loRes: video2_480p,
            },
            srcThumbnail: video2Thumbnail,
            description: "Logging In",
            modal: {
              sections: [
                {
                  title: "Test is the Password",
                  text: " Notice how each window uses a separate username but the password is the same.",
                },
              ],
            },
            video: {
              sections: [
                ["Logging in as 'test'", ""],
                ["Logging in as 'Test'", "8:00"],
                ["Logging in as 'TEST'", "12:00"],
                ["Logging in as 'tesT'", "15:00"],
              ],
              autoPlay: false,
            },
          },
          {
            srcMain: {
              hiRes: video3,
              loRes: video3_480p,
            },
            srcThumbnail: video3Thumbnail,
            description: "Starting a Game",
            modal: {
              sections: [
                {
                  title: "Create a Lobby",
                  text: "After logging in, create a lobby by entering a name and clicking 'Go'.",
                },
                {
                  title: "Join the Lobby",
                  text: "Clicking 'Go' with a lobby name that is open will join that lobby.",
                },
                {
                  title: "Bidding",
                  text: "Bidding continues until three passes in a row are made.  Then the trick taking part of the game begins.",
                },
              ],
            },
            video: {
              sections: [
                ["Creating a Lobby", ""],
                ["Setting up the Lobby", "15:00"],
                ["Starting the Game", "21:00"],
                ["Bidding", "24:00"],
              ],
              autoPlay: false,
            },
          },
        ]}
      />
    ),
  },
];

export function BridgeDemoPage(props: BridgeDemoProps) {
  return <ExamplePage title="Bridge Demo" sections={BRIDGE_DEMO_SECTIONS} />;
}
