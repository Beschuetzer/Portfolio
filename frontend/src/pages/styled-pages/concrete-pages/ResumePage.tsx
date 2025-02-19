import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  BEST_BUY_URL,
  GITHUB_URL,
  PLAYLIST_SYNCER_PAGE_NAME,
  YORK_B2E_URL,
} from "../../../components/constants";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";

import { Quote } from "../../../components/Quote";
import { ResumePageWorkHistory } from "./ResumePageWorkHistory";
import { defaultFontSize } from "../../../styles/constants";

export const RESUME_SECTION_TITLES = [
  "Overview",
  "Work-history",
  "Education",
  "References",
];

const RESUME_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: RESUME_SECTION_TITLES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Seth Godin"
          text="You are not your résumé, you are your work."
        />
        <ExamplePageParagraph {...propsToAdd}>
          Welcome! I am a developer with a passion for creating applications
          that are both useful and enjoyable to use. Below you will find my work
          history, a summary of my skills, and my references.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          Selecting a skill will open a modal with links to the Github repo and
          a live demo if available.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: RESUME_SECTION_TITLES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <ResumePageWorkHistory
        containerProps={{
          style: {
            paddingTop: defaultFontSize
          }
        }}
        items={[
          {
            employer: {
              name: "Best Buy",
              url: BEST_BUY_URL,
            },
            achievements: [
              `Part of the Solution Sidekick (add link) team responsible for building a selling tool used by in-store employees.`,
              `Played a decisive role in the development of the following features/enhancements: leads, accessory attachment, PDP, voice notes, caching, and displaying combo items in the basket.`,
              `Discovered and fixed numerous bugs.`,
            ],
            dateEnd: "11/22",
            dateStart: "02/22",
            jobTitle: "Engineer Associate (Contract)",
          },
          {
            employer: {
              name: "York Solutions",
              url: YORK_B2E_URL,
            },
            achievements:  [
              `Learned Java (Spring Boot), Agile methodology, and improved React.js skills with the intent of starting a contract at Best Buy as a full`,
              `Created a "Movie Night Recommendation" app leveraging Best Buy APIs in Spring Boot and React as
              well as a team project.`,
            ],
            dateEnd: "02/22",
            dateStart: "11/21",
            jobTitle: "Barriers to Entry Java Full Stack Program",
          },
        ]}
      />
    ),
  },
];

type ResmueProps = {};

export function ResumePage(props: ResmueProps) {
  return (
    <ExamplePage
      title="Résumé"
      sections={RESUME_SECTIONS}
      layoutProps={{
        links: [
          {
            title: {
              text: "Code",
            },
            url: `${GITHUB_URL}/${PLAYLIST_SYNCER_PAGE_NAME}`,
            svg: {
              xlinkHref: `/sprite.svg#icon-code`,
            },
            hoverEffectType: HoverEffect.explode,
          },
        ],
      }}
    />
  );
}
