import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
    BEST_BUY_SSK_INFO_ONE_URL,
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
        <ExamplePageParagraph>
            Solution Sidekick is a mobile app used by Best Buy associates that offers selling assistance acroll all departments and channels as well as a way to  
          <ExamplePageLink url={BEST_BUY_SSK_INFO_ONE_URL}>
            increase their customer NPS
          </ExamplePageLink>.
          I started on the team in February of 2022 and contributed to various features, bug fixes, and enhancements.
          Below you will find a list of the biggest features I worked on while working on the front end of the app.
        </ExamplePageParagraph>
      </>
    ),
  },
];

type SSKPageProps = {};
export function SSKPage(props: SSKPageProps) {
  return <ExamplePage title="Solution Sidekick" sections={SSK_SECTIONS} />;
}
