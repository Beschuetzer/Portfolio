import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  GITHUB_URL,
  PLAYLIST_SYNCER_PAGE_NAME,
} from "../../../components/constants";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";

import { Quote } from "../../../components/Quote";

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
          Welcome! I am a software engineer with a passion for creating
          applications that are both useful and enjoyable to use. Below you will
          find my work history, a summary of my skills, and my references.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          Selecting a skill will open a modal with links to the Github repo and a live demo if available.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: RESUME_SECTION_TITLES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Seth Godin"
          text="You are not your résumé, you are your work."
        />
        <ExamplePageParagraph {...propsToAdd}>
          Welcome! I am a software engineer with a passion for creating
          applications that are both useful and enjoyable to use. Below you will
          find my work history, a summary of my skills, and my references.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          Selecting a skill will open a modal with links to the Github repo and a live demo if available.
        </ExamplePageParagraph>
      </>
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
