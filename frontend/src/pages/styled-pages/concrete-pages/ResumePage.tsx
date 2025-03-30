import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  BEST_BUY_URL,
  BRIDGE_URL,
  LINKED_IN_URL,
  MAIL_TO_STRING,
  PLAYLIST_SYNCER_URL,
  REPLAY_VIEWER_URL,
  YORK_B2E_URL,
} from "../../../components/constants";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";

import { Quote } from "../../../components/Quote";
import { ResumePageWorkHistory } from "./resume/ResumePageWorkHistory";
import { defaultFontSize } from "../../../styles/constants";
import { ExamplePageLink } from "../ExamplePageLink";
import EducationList from "./resume/EducationList";
import { ReferenceItems } from "./resume/ReferenceItems";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import { ResumeSkillsModal } from "./resume/ResumeSkillsModal";
import { ResumeSkillsSection } from "./resume/ResumeSkillsSection";

type Achievement = {
  name: string;
  date: Date;
  shouldDisplay?: boolean;
}

export const RESUME_PAGE_HEADER_NAME = "Résumé";
export const RESUME_SECTION_TITLES = [
  "Overview",
  "Experience",
  "Skills",
  "Education",
  "References",
];

const CONTRACTOR_START_DATE = "02/22";
const PROMOTION_DATE = "01/25";
const FTE_START_DATE = "11/22";
const LAST_DATE = "02/25";


// • 
// • 
// • 
// • Assisted in migration from Azure to Stratus, for the in-house app store, reducing maintenance costs by +8%.
// • Added backend logic to auto add the correct protection plans to baskets when an eligible item is added to the cart, resulting in a +14% growth of said plans.
// • Wrote unit tests using Jest and xUnit for all new functionality and bug fixes.
// • Identified and resolved a production bug where the UI for creating rules would break in some cases, causing users to lose their changes.
// • Identified and resolved a production bug where redundant calls were being made when feedback filters where changed.

const FRONT_END_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Created a typescript library which wrapped the native fetch method and provided call retrying, circuit breaking, de-duplication, and caching.",
    date: new Date(2023, 10, 1),
  },
  {
    name: "Built the “leads” feature from scratch, which allowed in-store employees to create re-usable baskets and schedule consultations, leading to a sales increase of ~15%.",
    date: new Date(2022, 6, 15),
  },
  {
    name: "Created a re-usable React component which was used throughout the app to adjust the quantity of an item and display the current quantity in the basket.",
    date: new Date(2022, 7, 5),
  },
  {
    name: "Created a recommendations drawer which displayed after the user added a product to the cart, displaying related items using an infinite scroll approach.",
    date: new Date(2022, 7, 15),
  },
  {
    name: "Used Redux Toolkit and Tanstack Query to complex state interaction and cache service calls.",
    date: new Date(2022, 7, 15),
  },
  {
    name: "Maintained 80%+ test coverage through Jest and xUnit testing, ensuring high-quality deliverables.",
    date: new Date(2022, 7, 15),
  },
]

const BACK_END_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Created a fully-customizable batcher service by pulling Twillio attributes at a defined interval and storing them in a PostgreSQL database, allowing the policy service to evaluate policies based on Twillio attributes.",
    date: new Date(2025, 1, 20),
  },
  {
    name: "Refactored the .NET 8 backend to use GraphQL queries to fetch feedback data, eliminating one network call.",
    date: new Date(2023, 10, 1),
  },
  {
    name: "Added backend logic to auto add the correct protection plans to baskets when an eligible item is added to the cart, resulting in a +14% growth of said plans.",
    date: new Date(2023, 1, 15),
  },

]

const OTHER_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Combined the 3 existing GraphQL queries for getting store details (storeById, storeLookupByLatLong, and storeLookupByZip) into a single query (storeLookup), providing a single query to obtain store details.",
    date: new Date(2022, 7, 1),
  },
  {
    name: "Wrote unit tests using Jest and xUnit for all new functionality and bug fixes.",
    date: new Date(2023, 1, 21),
  }, {
    name: "Identified and resolved a production bug where the UI for creating rules would break in some cases, causing users to lose their changes.",
    date: new Date(2023, 1, 21),
  },
  {
    name: "Identified and resolved a production bug where redundant calls were being made when feedback filters where changed.",
    date: new Date(2023, 1, 21),
  },
  {
    name: "Translated Figma designs into pixel-perfect implementations with meticulous attention to detail.",
    date: new Date(2022, 7, 15),
  },
  {
    name: "Attended design meetings and spoke up when something was either unclear or unnecessarily complex.",
    date: new Date(2022, 7, 15),
  }
]

const ALL_ACHIEVEMENTS: Achievement[] = [
  ...FRONT_END_ACHIEVEMENTS,
  ...BACK_END_ACHIEVEMENTS,
  ...OTHER_ACHIEVEMENTS,
]

const RESUME_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: RESUME_SECTION_TITLES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Seth Godin"
          text="You are not your résumé, you are your work."
        />
        <ExamplePageParagraph>
          Welcome! My name is Adam. I am a developer with a passion for solving
          problems and creating new things with technology.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          Below you will find my experience, current skill set, formal
          education, and references. If you would like to learn more about me,
          please feel free to reach out to me on{" "}
          <ExamplePageLink url={LINKED_IN_URL} includeSpaces={false}>
            LinkedIn
          </ExamplePageLink>{" "}
          and/or{" "}
          <ExamplePageLink url={MAIL_TO_STRING} includeSpaces={false}>
            email
          </ExamplePageLink>
          .
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
              "Assisted in the migration from Azure to AWS (Stratus) for the in-house app store, reducing maintenance costs by 5%.",
              "Identified and resolved bugs in the React.js client apps as well as the .NET (C#) backend apps, enhancing functionality and significantly improving user experience.",
              "Created a fully-customizable batch service using .NET 8 (C#) and Entity Framework in order to pull Twillio attributes at a pre-defined interval and store them in a PostgreSQL database, allowing the authorization service to evaluate policies based on Twillio attributes while still maintaining quick response times.",
            ],
            jobDescription:
              "Continued contributions to the in-house app store and started contributing to the authorization service.",
            dateEnd: LAST_DATE,
            dateStart: PROMOTION_DATE,
            jobTitle: "Engineer I",
          },
          {
            employer: {
              name: "Best Buy",
              url: BEST_BUY_URL,
            },
            achievements: [
              "Implemented a .NET (C#) backend service for auto-adding protection plans, resulting in over 10% growth in sales of these plans.",
              "Created a .NET hosted service to migrate Azure storage data to AWS S3, simplifying the migration of the in-house app store to AWS.",
              "Created a Node.js script to convert the MS SQL .csv files into PostgreSQL .sql files, allowing for a seamless transition to the new database.",
              "Built a typescript(Node.js and Frontend compatible) library which streamlines interactions with the on-site authorization service (OPS).",
              "Built a typescript(Node.js and Frontend compatible) authentication library which simplified setup to the employee OAuth2 provider.",
              "Built a typescript(Node.js and Frontend compatible) library which wrapped the native fetch function to provide de-duplication, caching, circuit-breaking, retrying, and token management.",
            ],
            dateStart: FTE_START_DATE,
            dateEnd: PROMOTION_DATE,
            jobTitle: "Engineer Associate (FTE)",
            jobDescription:
              "Continued contributions to the Solution Sidekick mobile app but shifted focus to its Backend for Frontend service.  Eventually was moved to the in-store app store team where I supported multiple .NET and React projects.",
          },
          {
            employer: {
              name: "Best Buy",
              url: BEST_BUY_URL,
            },
            jobDescription:
              "Contributed primarily to the development, documentation, testing, and growth of the Solution Sidekick mobile app.",
            achievements: [
              "Leveraged my React and Redux skills to implement a new feature, which allowed in-store employees to create re-useable baskets and schedule consultations in store, leading to a sales increase of 12%.",
              "Created a paginated, (infinite scroll) React component which leveraged Redux to display the re-usable baskets, allowing employees to easily access saved baskets.",
              "Created the QuantitySelector, a re-usable React component for displaying the quantity of a product in the cart as well as adding a variable number to the cart.",
              "Collaborated with cross-functional teams in an Agile environment, actively participating in daily stand-ups, sprint planning, and retrospectives to ensure the delivery of high-quality software solutions.",
            ],
            dateStart: CONTRACTOR_START_DATE,
            dateEnd: FTE_START_DATE,
            jobTitle: "Engineer Associate (CW)",
          },
          {
            employer: {
              name: "York Solutions",
              url: YORK_B2E_URL,
            },
            achievements: [
              `Learned Java (Spring Boot), Agile methodology, and improved React.js skills with the intent of starting a contract at Best Buy.`,
              `Created a "Movie Night Recommendation" app leveraging Best Buy APIs in Spring Boot and React as
              well as a team project.`,
            ],
            dateEnd: CONTRACTOR_START_DATE,
            dateStart: "11/21",
            jobTitle: "Barriers to Entry Java Full Stack Program",
          },
          {
            dateStart: "03/20",
            dateEnd: "11/21",
            jobTitle: "Developer in Training",
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
                  mongoDB collection used in the aforementioned
                  <ExamplePageLink url={BRIDGE_URL}>bridge app</ExamplePageLink>
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
          },
        ]}
      />
    ),
  },
  {
    name: RESUME_SECTION_TITLES[2],
    renderContent: (propsToAdd: LayoutStyledProps, dispatch) => (
      <ResumeSkillsSection />
    ),
  },
  {
    name: RESUME_SECTION_TITLES[3],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <EducationList
        items={[
          {
            location: "University of Minnesota Twin Cities",
            degree: "B.A. in Linguistics ",
            gpa: "3.701",
            href: "/transcript.pdf",
          },
          {
            location: "Century College",
            degree: "Minnesota Transfer Curriculum (PSEO)",
            gpa: "3.86",
            href: "/transcriptPSEO.pdf",
          },
        ]}
      />
    ),
  },
  {
    name: RESUME_SECTION_TITLES[4],
    contentStyle: {
      paddingBottom: 0,
    },
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <ReferenceItems
        items={[
          // {
          //   name: "Troy McCabe",
          //   relation: "Best Buy Manager",
          //   phone: "913-209-2823",
          //   email: "troymccabe@gmail.com",
          //   linkedInUrl: "https://www.linkedin.com/in/troymccabe/",
          // },
          {
            name: "Alissa Monroe",
            relation: "Best Buy Co-worker",
            phone: "507-616-6133",
            email: "aalissamonroee@gmail.com",
            linkedInUrl: "https://www.linkedin.com/in/alissa-monroe/",
          },
          {
            name: "Kayla Otterness",
            relation: "Best Buy Co-worker",
            phone: "612-720-4675",
            email: "KaylaAnnOtterness@gmail.com",
            linkedInUrl: "https://www.linkedin.com/in/kaykuhl/",
          },
          {
            name: "Brian Thompson",
            relation: "Best Buy Co-worker",
            phone: "612-616-5904",
            email: "elephantium@gmail.com",
            linkedInUrl: "https://www.linkedin.com/in/thobrin/",
          },
          {
            name: "Jeff Wallen",
            relation: "Best Buy Product Manager",
            phone: "612-867-5333",
            email: "jeffwallen27@gmail.com",
            linkedInUrl: "https://www.linkedin.com/in/jeff-wallen/",
          },
          {
            name: "Scott Helland",
            relation: "Former Supervisor",
            phone: "651-325-5416",
            email: "shelland@isd622.org",
            linkedInUrl: "https://www.linkedin.com/in/scott-helland-6a77b88/",
          },
          // {
          //   name: "Rita Bulger",
          //   relation: "Former Co-worker",
          //   phone: "651-325-7633",
          //   email: "rbulger@isd622.org",
          // },
          // {
          //   name: "Helen Dougherty-Wakeman",
          //   relation: "Former Co-worker",
          //   phone: "651-748-6223",
          //   email: "hdougherty-wakeman@isd622.org",
          // },
          // {
          //   name: "Andrew Cleland",
          //   relation: "Friend",
          //   phone: "612-388-8986",
          //   email: "clel0011@umn.edu",
          // }
        ]}
      />
    ),
  },
];

type ResmueProps = {};

export function ResumePage(props: ResmueProps) {
  return (
    <>
      <ExamplePage
        title={RESUME_PAGE_HEADER_NAME}
        sections={RESUME_SECTIONS}
        layoutProps={{
          links: [
            {
              title: {
                text: "Download",
              },
              url: `/resume.pdf`,
              svg: {
                xlinkHref: `/sprite.svg#icon-code`,
              },
              hoverEffectType: HoverEffect.explode,
            },
            {
              url: LINKED_IN_URL,
              svg: {
                jsx: (colorScheme) => <LinkedInIcon />,
              },
              hoverEffectType: HoverEffect.explode,
            },
          ],
        }}
      />
      <ResumeSkillsModal />
    </>
  );
}
