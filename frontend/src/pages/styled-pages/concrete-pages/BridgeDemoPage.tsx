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

type BridgeDemoProps = {};

export const BRIDGE_DEMO_SECTION_NAMES = [
  "Requirements",
  "Written Instructions",
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
            "Two separate browsers (neither can be IE)",
            "Browsers must have a way to create independent sessions (e.g. 'Private Window' in Firefox and 'Incognito Mode' in Crome)",
          ]}
        />
      </>
    ),
  },
];

export function BridgeDemoPage(props: BridgeDemoProps) {
  return <ExamplePage title="Bridge Demo" sections={BRIDGE_DEMO_SECTIONS} />;
}
