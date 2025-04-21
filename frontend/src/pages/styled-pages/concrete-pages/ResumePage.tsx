import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  BEST_BUY_URL,
  BRIDGE_URL,
  LINKED_IN_URL,
  MAIL_TO_STRING,
  PLAYLIST_SYNCER_URL,
  REPLAY_VIEWER_URL,
  RICOH_URL,
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
import { getAchievements } from "./resume/achievements";

export const RESUME_PAGE_HEADER_NAME = "Résumé";
export const RESUME_SECTION_TITLES = [
  "Overview",
  "Experience",
  "Skills",
  "Education",
  "References",
];

const BESTBUY_CONTRACTOR_START_DATE = new Date(2022, 1, 1);
const BESTBUY_ENGINEER_I_PROMOTION_DATE = new Date(2025, 0, 1);
const BESTBUY_FTE_START_DATE = new Date(2022, 10, 13);
const BESTBUY_LAST_DATE = new Date(2025, 1, 14);
const YORK_SOLUTIONS_START_DATE = new Date(2021, 10, 1);
const DEVELOPER_START_DATE = new Date(2020, 2, 25);
const RICOH_START_DATE = new Date(2019, 6, 19);
const RICOH_END_DATE = new Date(2020, 2, 20);

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
          Java trained, full-stack software engineer with .NET experience at a
          fortune 500 company. Experienced in all stages of the SDLC:
          requirements analysis, front-end development, back-end development,
          database design, and performance test engineering. Believes in solving
          key business and organizational problems with careful software design,
          focusing on great user experience and managing technical debt to
          produce maintainable solutions.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          Below you will find my experience, current skill set, formal
          education, and references. If you would like to learn more about me,
          please feel free to reach out to me on
          <ExamplePageLink url={LINKED_IN_URL}>LinkedIn</ExamplePageLink>
          and/or&nbsp;
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
            achievements: getAchievements(
              BESTBUY_ENGINEER_I_PROMOTION_DATE,
              BESTBUY_LAST_DATE
            ).map((achievement) => achievement.name),
            jobDescription:
              "Continued contributions to the in-house app store and started contributing to the authorization service.",
            dateEnd: BESTBUY_LAST_DATE,
            dateStart: BESTBUY_ENGINEER_I_PROMOTION_DATE,
            jobTitle: "Engineer I",
          },
          {
            employer: {
              name: "Best Buy",
              url: BEST_BUY_URL,
            },
            achievements: getAchievements(
              BESTBUY_FTE_START_DATE,
              BESTBUY_ENGINEER_I_PROMOTION_DATE
            ).map((achievement) => achievement.name),
            dateStart: BESTBUY_FTE_START_DATE,
            dateEnd: BESTBUY_ENGINEER_I_PROMOTION_DATE,
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
            achievements: getAchievements(
              BESTBUY_CONTRACTOR_START_DATE,
              BESTBUY_FTE_START_DATE
            ).map((achievement) => achievement.name),
            dateStart: BESTBUY_CONTRACTOR_START_DATE,
            dateEnd: BESTBUY_FTE_START_DATE,
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
            dateEnd: BESTBUY_CONTRACTOR_START_DATE,
            dateStart: YORK_SOLUTIONS_START_DATE,
            jobTitle: "Barriers to Entry Java Full Stack Program",
          },
          {
            dateStart: DEVELOPER_START_DATE,
            dateEnd: YORK_SOLUTIONS_START_DATE,
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
          {
            employer: {
              name: "Ricoh",
              url: RICOH_URL,
            },
            jobDescription:
              "Troubleshot and repaired Ricoh printers and copiers in a fast-paced environment.  Provided customer service to clients in the field.",
            achievements: [
              "Worked with clients to resolve issues related to their multi-function devices.",
              "Configured, troubleshot, installed, and repaired multi-function devices.",
              "Secured two contracts with clients by going the extra mile to ensure customer satisfaction.",
              `Increased productivity by 10% by automating repetitive tasks.`,
            ],
            dateStart: RICOH_START_DATE,
            dateEnd: RICOH_END_DATE,
            jobTitle: "Technology Services Support Representative",
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
            name: "Troy McCabe",
            relation: "Best Buy Manager",
            phone: "913-209-2823",
            email: "troymccabe@gmail.com",
            linkedInUrl: "https://www.linkedin.com/in/troymccabe/",
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
              url: `/Resume for Adam Major.docx`,
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
