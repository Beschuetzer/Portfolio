import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  LIVE_BRIDGE_URL,
  WIKIPEDIA_BRIDGE_URL,
} from "../../../components/constants";
import { Quote } from "../../../components/Quote";
import { LayoutStyledProps } from "../../../layouts/types";
import { ExamplePageLink } from "../ExamplePageLink";
import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { Card } from "../../../components/Card/Card";
import { CardManager } from "../../../components/Card/CardManager";

import dealSummaryVideo from "../../../clips/bridge/dealSummary.mp4";
import dealSummaryVideoThumbnail from "../../../clips/bridge/thumbnails/deal-summary.png";
import undoVideo from "../../../clips/bridge/undo.mp4";
import undoVideoThumbnail from "../../../clips/bridge/thumbnails/save-game.png";
import animationRoundEndVideo from "../../../clips/bridge/animation-roundEnd.mp4";
import animationRoundEndVideoThumbnail from "../../../clips/bridge/thumbnails/animation-round-end.png";
import animationCardPlayVideo from "../../../clips/bridge/animation-roundEndDummy.mp4";

import claimSomeVideo from "../../../clips/bridge/claim-some-declarer-initial.mp4";
import claimAllVideo from "../../../clips/bridge/claim-all.mp4";
import resizingVideo from "../../../clips/bridge/resizing.mp4";
import resizingVideoThumbnail from "../../../clips/bridge/thumbnails/resizing.png";
import playingACardVideo from "../../../clips/bridge/cardPlayOptions.mp4";
import cardPlayAndRoundEndVideo from "../../../clips/bridge/animation-roundEndDummy.mp4";
import preferencesVideo from "../../../clips/bridge/preferences.mp4";
import themesVideo from "../../../clips/bridge/themes.mp4";
import saveGameVideo from "../../../clips/bridge/saveGame.mp4";
import saveGameVideoThumbnail from "../../../clips/bridge/thumbnails/save-game.png";
import { Carousel } from "react-thumbnail-carousel";
import { get } from "http";
import { getCarouselStylingOptions } from "../../../styles/styles";

const SECTION_NAMES = ["Overview", "Features", "Details", "Lessons"];
const DOWNLOADER_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Timothy Ferriss"
          text="What we fear doing most is usually what we most need to do."
        />
        <ExamplePageTitledParagraph title="What is A#Maj Bridge?">
          <ExamplePageLink includeSpaces={false} url={LIVE_BRIDGE_URL}>
            A# Maj Bridge
          </ExamplePageLink>{" "}
          is a web application I created to play
          <ExamplePageLink url={WIKIPEDIA_BRIDGE_URL}>
            contract bridge
          </ExamplePageLink>
          online during the pandemic. I started serious coding of the project in
          August of 2020 and completed the main code base in January of 2021.
        </ExamplePageTitledParagraph>
        <ExamplePageParagraph>
          It is also the first web app I ever created. For that reason it was
          written in Vanilla Html, CSS, and Javascript. The backend end uses
          Express, socket.io, and MongoDb to achieve a real-time bridge
          experience with saving and replaying. Paper.js was used to make the
          cards feel more real.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: SECTION_NAMES[1],
    contentStyle: {
      padding: 0,
    },
    renderContent: (propsToAdd: LayoutStyledProps) => (
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
            size: [[150], [100, 1200, "max-width"]],
            descriptionOverlay: {
              hideDescriptionOverlayUnlessHovered: false,
              textColor: propsToAdd.colorscheme?.primary4,
              background: {
                gradient: {
                  start: {
                    opacity: 0.9,
                    color: propsToAdd.colorscheme?.primary1,
                  },
                  end: {
                    opacity: 0.9,
                    color: propsToAdd.colorscheme?.primary2,
                  },
                  angle: 270,
                },
              },
            },
            currentItemBorder: `thick double ${propsToAdd.colorscheme?.primary4}`,
          },
          styling: {
            colorTheme: {
              colorOne: propsToAdd.colorscheme?.primary1,
              colorTwo: propsToAdd.colorscheme?.primary2,
              colorThree: propsToAdd.colorscheme?.primary3,
              colorFour: propsToAdd.colorscheme?.primary3,
              colorFive: propsToAdd.colorscheme?.primary4,
              colorGreyOne: propsToAdd.colorscheme?.greyOne,
            },
            itemViewer: {
              loadingSpinner: {
                options: {
                  color: propsToAdd.colorscheme?.primary4,
                },
              },
            },
          },
        }}
        items={[
          {
            srcMain: animationRoundEndVideo,
            srcThumbnail: animationRoundEndVideoThumbnail,
            description: "Up up and away!",
            modal: {
              sections: [
                {
                  title: "Blast off",
                  text: "This animation serves two purposes.  It shows the user that the trick has ended and it shows who won it.",
                },
              ],
            },
          },
          {
            srcMain: animationCardPlayVideo,
            srcThumbnail: animationRoundEndVideoThumbnail,
            description: "The perfect throw",
            modal: {
              sections: [
                {
                  title: "How did they do that?",
                  text: "This animation appears for other players when someone else plays a card.",
                },
              ],
            },
          },
          {
            srcMain: saveGameVideo,
            srcThumbnail: saveGameVideoThumbnail,
            description: "Have no fear!  MongoDB is here!",
            modal: {
              sections: [
                {
                  title: "Save Game",
                  text: "The server saves each play and bid automatically, allowing players to resume playing at a later time without having to worry about losing the game state.",
                },
              ],
            },
          },
          {
            srcMain: resizingVideo,
            srcThumbnail: resizingVideoThumbnail,
            description: "All viewport are welcome!",
            modal: {
              sections: [
                {
                  title: "Dynamic Resizing",
                  text: "The playing screen dynamically adjusts to the viewport, allowing users to play on their Android phone or with the window only taking up a fraction of the screen.",
                },
              ],
            },
          },
          {
            srcMain: undoVideo,
            srcThumbnail: undoVideoThumbnail,
            description: "We can fix this.",
            modal: {
              sections: [
                {
                  title: "Undo",
                  text: " Players are able to undo during the bidding phase as well as the playing phase.",
                },
              ],
            },
          },
          {
            srcMain: dealSummaryVideo,
            srcThumbnail: dealSummaryVideoThumbnail,
            description: "Good to know!",
            modal: {
              sections: [
                {
                  title: "Deal Summary",
                  text: "The Deal Summary screen allows players to review the last hand.  It shows who had which cards, how the bidding went, and which cards each player had at any given point in the hand.",
                },
              ],
            },
          },
          //   {
          //     srcMain: dealSummaryVideo,
          //     description:
          //       "A summary of the deal is shown at the beginning of each hand.",
          //   },
          //   {
          //     srcMain: dealSummaryVideo,
          //     description:
          //       "A summary of the deal is shown at the beginning of each hand.",
          //   },
        ]}
      />
    ),
  },
];

type BridgePageProps = {};
export function BridgePage(props: BridgePageProps) {
  return <ExamplePage title="A# Major Bridge" sections={DOWNLOADER_SECTIONS} />;
}
