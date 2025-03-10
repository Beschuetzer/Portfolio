import React from "react";
import { Carousel } from "react-thumbnail-carousel";

import { CSharpLayout } from "./CSharpLayout";

import video1 from "../../../clips/bridge-demo/1.mp4";
import video1_480p from "../../../clips/bridge-demo/1-480p.mp4";
import video2 from "../../../clips/bridge-demo/2.mp4";
import video2_480p from "../../../clips/bridge-demo/2-480p.mp4";
import video3 from "../../../clips/bridge-demo/3.mp4";
import video3_480p from "../../../clips/bridge-demo/3-480p.mp4";
import video1Thumbnail from "../../../clips/bridge-demo/1-thumbnail.png";
import video2Thumbnail from "../../../clips/bridge-demo/2-thumbnail.png";
import video3Thumbnail from "../../../clips/bridge-demo/3-thumbnail.png";

import {
  LIVE_BRIDGE_URL,
  BRIDGE_DEMO_PAGE_NAME,
  C_SHARP_CLASSNAME,
  CAROUSEL_COLORS,
} from "../../../components/constants";
import { EmbeddedLink } from "../../../components/EmbeddedLink";
import { CSharpCardSection } from "./CSharpCardSection";

const sectionNames = [
  "Requirements",
  "Written Instructions",
  "Video Instructions",
];

interface BridgeDemoProps {}

export const BridgeDemo: React.FC<BridgeDemoProps> = () => {
  return (
    <CSharpLayout
      sections={[
        {
          name: sectionNames[0],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <CSharpCardSection>
                <p>
                  Since there is no AI currently implemented, runing a demo of
                  A#Maj Bridge requires one to open two different browsers with
                  two tabs in each browser (one of which has to be a "Private
                  Browsing" tab or "Incognito" tab).
                </p>
                <ol>
                  <li>Two separate browsers (neither can be IE)</li>
                  <li>
                    Browsers must have a way to create independent sessions
                    (e.g. "Private Window" in Firefox and "Incognito Mode" in
                    Crome)
                  </li>
                </ol>
              </CSharpCardSection>
            </React.Fragment>,
          ],
        },
        {
          name: sectionNames[1],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <React.Fragment>
              <CSharpCardSection>
                <ol>
                  <li>Open both browsers</li>
                  <li>
                    Open one private browsing window for each browser (four
                    windows total)
                  </li>
                  <li>
                    Navigate to{" "}
                    <EmbeddedLink
                      isLocal={false}
                      href={`${LIVE_BRIDGE_URL}/login`}
                      addSpaces={false}
                    >
                      here
                    </EmbeddedLink>
                    &nbsp;in each window
                  </li>
                  <li>
                    In each window login using one of the four usernames below
                    and the password (each window must login with a separate
                    username otherwise game-play will be impossible due to
                    security reasons):
                    <ul className="padding-top-1 padding-bottom-1">
                      <li>Username 1: 'Test'</li>
                      <li>Username 2: 'TEST'</li>
                      <li>Username 3: 'tesT'</li>
                      <li>Username 4: 'test'</li>
                      <li>Password: 'test'</li>
                    </ul>
                  </li>
                  <li>
                    Explore the site and try creating a lobby to start a game to
                    see the actual gameplay
                  </li>
                  <li>
                    See below section for videos explaining the above info
                  </li>
                </ol>
              </CSharpCardSection>
            </React.Fragment>,
          ],
        },
        {
          name: sectionNames[2],
          pageName: C_SHARP_CLASSNAME,
          children: [
            <Carousel
              options={{
                layout: {
                  itemDisplayLocation: "above",
                },
                modal: {
                  maintainMinimizedStateAcrossItems: true,
                },
                container: {
                  style: {
                    borderRadius: 0,
                  },
                },
                thumbnail: {
                  size: [[200], [100, 1200, "max-width"]],
                  descriptionOverlay: {
                    hideDescriptionOverlayUnlessHovered: false,
                    textColor: CAROUSEL_COLORS.bridgeDemo.primary4,
                    background: {
                      gradient: {
                        start: {
                          opacity: 0.9,
                          color: CAROUSEL_COLORS.bridgeDemo.primary1,
                        },
                        end: {
                          opacity: 0.9,
                          color: CAROUSEL_COLORS.bridgeDemo.primary2,
                        },
                        angle: 270,
                      },
                    },
                  },
                  spacingStrategy: "max",
                  currentItemBorder: `2px solid ${CAROUSEL_COLORS.bridgeDemo.primary1}`,
                },
                styling: {
                  colorTheme: {
                    colorOne: CAROUSEL_COLORS.bridgeDemo.primary4,
                    colorTwo: CAROUSEL_COLORS.bridgeDemo.primary3,
                    colorThree: CAROUSEL_COLORS.bridgeDemo.primary2,
                    colorFour: CAROUSEL_COLORS.bridgeDemo.primary2,
                    colorFive: CAROUSEL_COLORS.bridgeDemo.primary1,
                    colorGreyOne: CAROUSEL_COLORS.bridgeDemo.greyOne,
                  },
                  itemViewer: {
                    loadingSpinner: {
                      options: {
                        color: CAROUSEL_COLORS.downloader.primary4,
                      },
                    },
                  },
                },
              }}
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
                      ["Opening Icognito Mode in Second Browser ", 0],
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
            />,
          ],
        },
      ]}
      pageName={BRIDGE_DEMO_PAGE_NAME}
    />
  );
};
