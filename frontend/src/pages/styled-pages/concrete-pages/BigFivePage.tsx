import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { LayoutStyledProps } from "../../../layouts/types";

import { ExamplePageLink } from "../ExamplePageLink";
import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";

const BIG_FIVE_SECTION_NAMES = [
  "Overview",
  "Conscientiousness",
  "Agreeableness",
  "Openness",
  "Neuroticism",
  "Extraversion",
  "Take Away",
];

type BigFiveProps = {};

const BIG_FIVE_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: BIG_FIVE_SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageTitledParagraph title="What is the Big Five Assessment?">
          The big five personality traits are the best accepted and most
          commonly used model of personality in academic psychology. &nbsp;
        </ExamplePageTitledParagraph>

        <ExamplePageParagraph>
          Below you will find my rating for each of the five personality traits
          as well as a description of what they mean.
        </ExamplePageParagraph>
      </>
    ),
  },
];

export function BigFivePage(props: BigFiveProps) {
  return <ExamplePage title="The Big Five" sections={BIG_FIVE_SECTIONS} />;
}
