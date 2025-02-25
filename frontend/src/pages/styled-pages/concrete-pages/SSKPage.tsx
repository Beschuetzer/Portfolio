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

const SECTION_NAMES = ["Overview", "Features", "Details", "Lessons"];
const SSK_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Seneca"
          text="Every new beginning comes from some other beginning’s end."
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
];

type SSKPageProps = {};
export function SSKPage(props: SSKPageProps) {
  return <ExamplePage title="Solution Sidekick" sections={SSK_SECTIONS} />;
}
