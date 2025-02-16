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
  {
    name: BIG_FIVE_SECTION_NAMES[3],
    renderHeaderContent: (propsToAdd: LayoutStyledProps) => (
      <ExamplePageBar
        percentage={BIG_FIVE_PERCENT_BAR_VALUES[2]}
        labels={BIG_FIVE_PERCENT_BAR_LABELS}
      />
    ),
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          I take a balanced approach to solving problems. I am likely to be able
          to think of new and original ways of approaching situations, but not
          at the expense of ignoring well-established solutions, already known
          to work. This will often involve investigating problems by taking an
          open-ended view of what might work, and not being afraid to change
          things if necessary. I often have an eye for whether something will be
          effective both now and in the future. I put emphasis on juggling the
          facts and making changes, large or small, in order to make a decision
          that will stand the test of time.
        </ExamplePageParagraph>
        <ExamplePageTitledList
          title="Potential Benefits"
          items={[
            "I bring experience to strategy",
            "I am a flexible problem solver",
            "I am a pragmatic thinker",
            "I see detail and bigger picture",
            "I tend to be cautious",
            "I work to maintain the system",
          ]}
        />
        <ExamplePageTitledList
          title="Potential Pitfalls"
          items={[
            "I tend to err on the side of caution",
            "I may be too quick to change style",
            "I may confuse knowledge with foresight",
            "I may find it hard to focus",
            "I may over rely on middle way",
            "I may work too slowly",
          ]}
        />
      </>
    ),
  },
  {
    name: BIG_FIVE_SECTION_NAMES[4],
    renderHeaderContent: (propsToAdd: LayoutStyledProps) => (
      <ExamplePageBar
        percentage={BIG_FIVE_PERCENT_BAR_VALUES[3]}
        labels={BIG_FIVE_PERCENT_BAR_LABELS}
      />
    ),
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          I tend to respond to pressure in a relaxed way but also know when to
          take things seriously. I am able to let minor irritations go. I am
          someone who is generally calm, and not the sort to dwell on things,
          but who is also 'on guard' at times. I listen to other people and take
          note of what they say, but am not prone to let criticism interfere
          with what I do. When it comes to managing my feelings, I tend to
          respond to situations in a measured manner, as I have a good
          understanding of my ability to cope. Indeed my friends and colleagues
          might well describe me as an even-tempered and positive person. By and
          large I feel well able to deal with most of what life hands me.
        </ExamplePageParagraph>
        <ExamplePageTitledList
          title="Potential Benefits"
          items={[
            "I am aware of others’ emotional states",
            "I cope with most things",
            "I am even tempered",
            "I have a low level of tension",
            "I manage feelings",
            "I take onboard criticism",
          ]}
        />
        <ExamplePageTitledList
          title="Potential Pitfalls"
          items={[
            "I may appear too unresponsive",
            "I may be distracted by others’ emotions",
            "I may be slow to ask for help",
            "I may lack energy to act quickly",
            "I may not show real feelings",
          ]}
        />
      </>
    ),
  },
  {
    name: BIG_FIVE_SECTION_NAMES[5],
    renderHeaderContent: (propsToAdd: LayoutStyledProps) => (
      <ExamplePageBar
        percentage={BIG_FIVE_PERCENT_BAR_VALUES[4]}
        labels={BIG_FIVE_PERCENT_BAR_LABELS}
      />
    ),
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          I am someone who would prefer to operate by myself or with limited
          interaction with others. I like to keep my own counsel and do not have
          a strong need to express my views or opinions. When it comes to the
          energy I put into life, being a self-contained, reflective person, I
          am generally quite happy in my own world. That is not to say I am
          disinterested in other people - rather that I am likely to prefer
          one-on-one or small group interactions that feel more manageable.
          Larger groups can be draining to me and, therefore, I need time alone
          to recharge. Overall I may show a low level of visible energy because
          I have a reflective 'think-do-think' approach to getting things done.
        </ExamplePageParagraph>
        <ExamplePageTitledList
          title="Potential Benefits"
          items={[
            "I am contemplative",
            "I am dispassionate",
            "I excel at independent work",
            "I am measured",
            "I think before acting",
            "I am thoughtful",
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
