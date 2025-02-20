import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { LayoutStyledProps } from "../../../layouts/types";
import { Quote } from "../../../components/Quote";

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
];

export function BridgeDemoPage(props: BridgeDemoProps) {
  return <ExamplePage title="Bridge Demo" sections={BRIDGE_DEMO_SECTIONS} />;
}
