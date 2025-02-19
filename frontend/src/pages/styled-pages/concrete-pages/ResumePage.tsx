import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  BEST_BUY_URL,
  BRIDGE_URL,
  GITHUB_URL,
  PLAYLIST_SYNCER_PAGE_NAME,
  PLAYLIST_SYNCER_URL,
  REPLAY_VIEWER_URL,
  YORK_B2E_URL,
} from "../../../components/constants";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";

import { Quote } from "../../../components/Quote";
import { ResumePageWorkHistory } from "./ResumePageWorkHistory";
import { defaultFontSize } from "../../../styles/constants";
import { ExamplePageLink } from "../ExamplePageLink";

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
            paddingTop: defaultFontSize,
          },
        }}
        items={[
          {
            employer: {
              name: "Best Buy",
              url: BEST_BUY_URL,
            },
            achievements: [
              "Assisted in the migration from Azure to AWS (Stratus) for the omnichannel mobile platform deployment product (ADAPT), <b>reducing maintenance costs by 5%</b>.",
              "Identified and resolved bugs in the React.js client apps as well as the .NET (C#) backend apps, enhancing functionality and significantly improving user experience.",
              "Created a fully-customizable batch service using .NET 8 (C#), Entity Framework, and Marten (future enhancement) in order to pull Twillio attributes at a pre-defined interval and store them in a PostgreSQL database, allowing the authorization service to evaluate policies based on Twillio attributes.",
            ],
            dateEnd: "02/25",
            dateStart: "09/24",
            jobTitle: "Engineer I",
          },
          {
            employer: {
              name: "Best Buy",
              url: BEST_BUY_URL,
            },
            achievements: [
              "Implemented a .NET (C#) backend service for auto-adding protection plans, resulting in over <b>10% growth in sales</b> of these plans.",
              "Leveraged my React and Redux skills to implement a new feature, which allowed in-store employees to create re-useable baskets and schedule consultations in store, leading to a <b>sales increase of 12%</b>.",
              "Created a paginated, (infinite scroll) React component which leveraged Redux to display the re-usable baskets, allowing employees to easily access saved baskets.",
              "Created the QuantitySelector, a re-usable React component for displaying the quantity of a product in the cart as well as adding a variable number to the cart.",
              "Created multiple libraries typescript libraries in order to streamline interactions with the authorization service (OPS).",
              "Contributed to the development, documentation, testing, and growth of the Solution Sidekick app, which in-store employees use as a selling tool.",
              "Collaborated with cross-functional teams in an Agile environment, actively participating in daily stand-ups, sprint planning, and retrospectives to ensure the delivery of high-quality software solutions.",
            ],
            dateEnd: "02/22",
            dateStart: "09/24",
            jobTitle: "Engineer Associate",
          },
          {
            employer: {
              name: "York Solutions",
              url: YORK_B2E_URL,
            },
            achievements: [
              `Learned Java (Spring Boot), Agile methodology, and improved React.js skills with the intent of starting a contract at Best Buy as a full`,
              `Created a "Movie Night Recommendation" app leveraging Best Buy APIs in Spring Boot and React as
              well as a team project.`,
            ],
            dateEnd: "02/22",
            dateStart: "11/21",
            jobTitle: "Barriers to Entry Java Full Stack Program",
          },
          {
            employer: {
              name: "Free Lance Web Developer",
              url: YORK_B2E_URL,
            },
            achievements: [
              () => (
                <div>
                  Built a socket.io-based multiplayer
                  <ExamplePageLink url={BRIDGE_URL}>
                    contract bridge app
                  </ExamplePageLink>
                  that allows four players to play bridge online.
                </div>
              ),
              () => (
                <div>
                  Built an
                  <ExamplePageLink url={REPLAY_VIEWER_URL}>
                    angular 12 replay viewer app
                  </ExamplePageLink>
                  utilizing redux, nest.js, and mongoDB. The app pulls from the
                  mongoDB collection used in the aforementioned bridge app,
                  allowing for easy reviewing of games played as well as insight
                  into the statistics surrounding their games.
                </div>
              ),
              () => (
                <div>
                  Built a
                  <ExamplePageLink url={PLAYLIST_SYNCER_URL}>
                    c# desktop application
                  </ExamplePageLink>
                  to synchronize music playlists after an Andriod OS update that
                  rendered my previous playlist syncing app unusable.
                </div>
              ),
            ],
            dateEnd: "03/20",
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
