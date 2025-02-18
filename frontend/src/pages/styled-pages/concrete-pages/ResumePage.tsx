import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  OS_10_ISSUE_TRACKER_URL,
  GITHUB_URL,
  PLAYLIST_SYNCER_PAGE_NAME,
} from "../../../components/constants";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";


import { ExamplePageLink } from "../ExamplePageLink";

type ResmueProps = {};

const RESUME_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: "Background",
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph {...propsToAdd}>
          Around the end of Febraury 2020, Samsung updated their Android OS to
          version 10. Eager to check out the newest Android OS, I promptly
          updated. Unfortunately, the update
          <ExamplePageLink url={OS_10_ISSUE_TRACKER_URL}>
            broke my ability to sync music and playlists
          </ExamplePageLink>
          to my Galaxy S9+ phone.         </ExamplePageParagraph>
        <ExamplePageParagraph {...propsToAdd}>
          Thinking it would get resolved in a prompt manner, I waited a few
          months. In the meantime, I looked into other ways of easily
          syncing music/playlists to my phone. After looking for over a
          month to no avail and realizing Google was in no hurry to fix the bug,
          I decided it would be an interesting programming exercise to create a
          simple application that could sync music and playlists to my phone.
        </ExamplePageParagraph>
      </>
    ),
  },
];

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
