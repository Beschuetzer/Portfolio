import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { LayoutStyledProps } from "../../../layouts/types";

import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";
import { ExamplePageBar } from "../ExamplePageBar";

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
          commonly used model of personality in academic psychology.
        </ExamplePageTitledParagraph>

        <ExamplePageParagraph>
          Below you will find my rating for each of the five personality traits
          as well as a description of what they mean.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: BIG_FIVE_SECTION_NAMES[1],
    renderHeaderContent: (propsToAdd: LayoutStyledProps) => (
      <ExamplePageBar percentage={2} />
    ),
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          I am the sort of person who likes a clear structure organizing what I
          do. This helps me to focus on what is important. In many ways my
          concern is with 'how' I approach tasks, and in my case this is likely
          to be with a strong sense of self-discipline and the ability to work
          towards longer term goals. I am one who can work steadily towards
          something and who appreciates that sometimes it can take a
          considerable amount of time to achieve a meaningful objective. I am
          likely to pay as much attention to the end of the project as I do to
          the beginning. This view of how things should be done is likely to be
          reinforced by my confidence in my own abilities and a wish to do my
          best for myself and for other people.
        </ExamplePageParagraph>
      </>
    ),
  },
];

export function BigFivePage(props: BigFiveProps) {
  return <ExamplePage title="The Big Five" sections={BIG_FIVE_SECTIONS} />;
}
