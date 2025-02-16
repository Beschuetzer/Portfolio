import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { LayoutStyledProps } from "../../../layouts/types";

import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";
import { ExamplePageBar } from "../ExamplePageBar";
import { ExamplePageTitledList } from "../ExamplePageTitledList";

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

const BIG_FIVE_PERCENT_BAR_LABELS = ["0", "25", "50", "75", "100"];
const BIG_FIVE_PERCENT_BAR_VALUES = [85, 75, 70, 55, 35];

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
      <ExamplePageBar
        percentage={BIG_FIVE_PERCENT_BAR_VALUES[0]}
        labels={BIG_FIVE_PERCENT_BAR_LABELS}
      />
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
        <ExamplePageTitledList
          title="Potential Benefits"
          items={[
            "I tend to focus on the task at hand",
            "I tend to identify key goals",
            "I have a strong sense of commitment",
            "I have a structured work style",
            "I am tolerant of tedious details",
            "I want to achieve",
          ]}
        />
        <ExamplePageTitledList
          title="Potential Pitfalls"
          items={[
            "I may commit to the wrong objective",
            "I may not know when to stop",
            "I may not re-prioritize tasks",
            "I may set impossibly high standards",
            "I may settle on goals too early",
            "I may use an overly rigid approach",
          ]}
        />
      </>
    ),
  },
  {
    name: BIG_FIVE_SECTION_NAMES[2],
    renderHeaderContent: (propsToAdd: LayoutStyledProps) => (
      <ExamplePageBar
        percentage={BIG_FIVE_PERCENT_BAR_VALUES[1]}
        labels={BIG_FIVE_PERCENT_BAR_LABELS}
      />
    ),
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          I generally am accommodating and open to the views of other people. I
          tend to trust other people, and can be depended on to have a
          consistent and forgiving viewpoint. I am very loyal, and build
          relationships with other people based on mutual respect. Other
          people's needs influence my dealings with them, and I am often the
          person who is striving for a harmonious outcome. I am tuned in to
          those around me and am motivated by the ultimate welfare of other
          people. This guides the way in which I negotiate, and as a rule I am
          generally avoid unnecessary confrontation whenever possible.
        </ExamplePageParagraph>
        <ExamplePageTitledList
          title="Potential Benefits"
          items={[
            "I am accommodating",
            "I am attuned to others",
            "I look for a 'win-win' result",
            "I negotiate through harmony",
            "I am non-confrontational",
            "I trust other people",
          ]}
        />
        <ExamplePageTitledList
          title="Potential Pitfalls"
          items={[
            "I may accept a below standard outcome",
            "I may be naïve about others' motives",
            "I may be over-influenced by others’ feelings",
            "I may be too eager to comply",
            "I may not drive a hard enough bargain",
          ]}
        />
      </>
    ),
  },
];

export function BigFivePage(props: BigFiveProps) {
  return <ExamplePage title="The Big Five" sections={BIG_FIVE_SECTIONS} />;
}
