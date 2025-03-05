import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
  BEST_BUY_URL,
  BRIDGE_URL,
  LINKED_IN_URL,
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
import ResumeItems from "./resume/ResumeItems";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import { ResumeSkillsModal } from "./resume/ResumeSkillsModal";

export const RESUME_PAGE_HEADER_NAME = "Résumé";
export const RESUME_SECTION_TITLES = [
  "Overview",
  "Experience",
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
        <ExamplePageParagraph>
          Welcome! I am a developer with a passion for creating things that are
          both perfomant and seamless. Below you will find my experience,
          education, and my references.
        </ExamplePageParagraph>
        {/* <ExamplePageParagraph>
          Selecting a skill will open a modal with links to the Github repo and
          a live demo if available.
        </ExamplePageParagraph> */}
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
              "Assisted in the migration from Azure to AWS (Stratus) for the in-house app store, <b>reducing maintenance costs by 5%</b>.",
              "Identified and resolved bugs in the React.js client apps as well as the .NET (C#) backend apps, enhancing functionality and significantly improving user experience.",
              "Created a fully-customizable batch service using .NET 8 (C#) and Entity Framework in order to pull Twillio attributes at a pre-defined interval and store them in a PostgreSQL database, allowing the authorization service to evaluate policies based on Twillio attributes while still maintaining quick response times.",
            ],
            jobDescription:
              "Continued contributions to the in-house app store and started contributing to the authorization service.",
            dateEnd: "02/25",
            dateStart: "12/24",
            jobTitle: "Engineer I",
          },
          {
            employer: {
              name: "Best Buy",
              url: BEST_BUY_URL,
            },
            achievements: [
              "Implemented a .NET (C#) backend service for auto-adding protection plans, resulting in over <b>10% growth in sales</b> of these plans.",
              "Created a .NET hosted service to migrate Azure storage data to AWS S3, simplifying the migration of the in-house app store to AWS.",
              "Created a Node.js script to convert the MS SQL .csv files into PostgreSQL .sql files, allowing for a seamless transition to the new database.",
              "Built a typescript(Node.js and Frontend compatible) library which streamlines interactions with the on-site authorization service (OPS).",
              "Built a typescript(Node.js and Frontend compatible) authentication library which simplified setup to the employee OAuth2 provider.",
              "Built a typescript(Node.js and Frontend compatible) library which wrapped the native fetch function to provide de-duplication, caching, circuit-breaking, retrying, and token management.",
            ],
            dateStart: "11/22",
            dateEnd: "09/24",
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
              "Leveraged my React and Redux skills to implement a new feature, which allowed in-store employees to create re-useable baskets and schedule consultations in store, leading to a <b>sales increase of 12%</b>.",
              "Created a paginated, (infinite scroll) React component which leveraged Redux to display the re-usable baskets, allowing employees to easily access saved baskets.",
              "Created the QuantitySelector, a re-usable React component for displaying the quantity of a product in the cart as well as adding a variable number to the cart.",
              "Collaborated with cross-functional teams in an Agile environment, actively participating in daily stand-ups, sprint planning, and retrospectives to ensure the delivery of high-quality software solutions.",
            ],
            dateStart: "02/22",
            dateEnd: "11/22",
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
            dateEnd: "02/22",
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
    name: RESUME_SECTION_TITLES[3],
    contentStyle: {
      paddingBottom: 0,
    },
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <ResumeItems
        items={[
          {
            name: "Troy McCabe",
            relation: "Best Buy Manager",
            phone: "913-209-2823",
            email: "troymccabe@gmail.com",
          },
          {
            name: "Alissa Monroe",
            relation: "Best Buy Co-worker",
            phone: "507-616-6133",
            email: "aalissamonroee@gmail.com",
          },
          {
            name: "Kayla Otterness",
            relation: "Best Buy Co-worker",
            phone: "612-720-4675",
            email: "KaylaAnnOtterness@gmail.com",
          },
          {
            name: "Brian Thompson",
            relation: "Best Buy Co-worker",
            phone: "612-616-5904",
            email: "elephantium@gmail.com",
          },
          {
            name: "Jeff Wallen",
            relation: "Best Buy Product Manager",
            phone: "612-867-5333",
            email: "jeffwallen27@gmail.com",
          },
          {
            name: "Scott Helland",
            relation: "Former Supervisor",
            phone: "651-325-5416",
            email: "shelland@isd622.org",
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

//todo: add skills section using this data
// const RESUME_SKILLS_SECTIONS = [
// 	"Web Development",
// 	"IT Skills",
// 	"Human Skills",
// 	"Personality",
// ];
// const sectionsToSkipAnimation = [RESUME_SKILLS_SECTIONS[2]];

// const skillsLabels: {
// 	[key: string]: { left: string; center: string; right: string };
// } = {
// 	web: {
// 		left: "Novice",
// 		center: "Proficient",
// 		right: "Master",
// 	},
// 	it: {
// 		left: "Familiar",
// 		center: "Knowledgeable",
// 		right: "Expert",
// 	},
// 	human: {
// 		left: "Lacks",
// 		center: "Average",
// 		right: "Excels",
// 	},
// 	personality: {
// 		left: "Low",
// 		center: "Middle",
// 		right: "High",
// 	},
// };

// const webDevSubSkillsLabels = [
// 	"Basics",
// 	"Libraries",
// 	"Frameworks",
// 	"Methodologies",
// 	"Databases",
// ];

// //@ts-ignore
// const skills: {
// 	[key: string]: {
// 		[key: string]: [Skill];
// 	};
// } = {
// 	[RESUME_SKILLS_SECTIONS[0]]: {
// 		[webDevSubSkillsLabels[0]]: [
// 			{
// 				title: "CSS3",
// 				percent: 78,
// 			},
// 			{
// 				title: "C#",
// 				percent: 55,
// 			},
// 			{
// 				title: "Express",
// 				percent: 70,
// 			},
// 			{
// 				title: "GraphQL",
// 				percent: 28,
// 			},
// 			{
// 				title: "HTML5",
// 				percent: 65,
// 			},
// 			{
// 				title: "Java",
// 				percent: 48,
// 			},
// 			{
// 				title: "Javascript",
// 				percent: 82,
// 			},
// 			{
// 				title: "jQuery",
// 				percent: 46,
// 			},
// 			{
// 				title: "Python",
// 				percent: 50,
// 			},
// 			{
// 				title: "Ruby",
// 				percent: 25,
// 			},
// 			{
// 				title: "SASS",
// 				percent: 62,
// 			},
// 			{
// 				title: "Typescript",
// 				percent: 75,
// 			},
// 		],
// 		[webDevSubSkillsLabels[1]]: [
// 			{
// 				title: "Howler",
// 				percent: 55,
// 			},
// 			{
// 				title: "PaperJS",
// 				percent: 59,
// 			},
// 			{
// 				title: "rxjs",
// 				percent: 25,
// 			},
// 			{
// 				title: "socket.io",
// 				percent: 62.5,
// 			},
// 			{
// 				title: "ThreeJS",
// 				percent: 35,
// 			},
// 		],
// 		[webDevSubSkillsLabels[2]]: [
// 			{
// 				title: "Angular",
// 				percent: 55,
// 			},
// 			{
// 				title: "Bootstrap",
// 				percent: 68,
// 			},
// 			{
// 				title: "NestJS",
// 				percent: 48,
// 			},
// 			{
// 				title: ".NET",
// 				percent: 55,
// 			},
// 			{
// 				title: "NextJS",
// 				percent: 33,
// 			},
// 			{
// 				title: "nx",
// 				percent: 66,
// 			},
// 			{
// 				title: "React",
// 				percent: 80,
// 			},
// 			{
// 				title: "React Native",
// 				percent: 70,
// 			},
// 			{
// 				title: "Redux",
// 				percent: 75,
// 			},
// 			{
// 				title: "Semantic-UI",
// 				percent: 43,
// 			},
// 			{
// 				title: "Spring Boot",
// 				percent: 53,
// 			},
// 		],
// 		[webDevSubSkillsLabels[3]]: [
// 			{
// 				title: "BDD",
// 				percent: 66,
// 			},
// 			{
// 				title: "BEM",
// 				percent: 57,
// 			},
// 			{
// 				title: "DSA",
// 				percent: 48,
// 			},
// 			{
// 				title: "Dynamic Programming",
// 				percent: 50,
// 			},
// 			{
// 				title: "Responsive Design",
// 				percent: 68,
// 			},
// 			{
// 				title: "TDD",
// 				percent: 52.5,
// 			},
// 		],
// 		[webDevSubSkillsLabels[4]]: [
// 			{
// 				title: "Mongoose",
// 				percent: 57,
// 			},
// 			{
// 				title: "PostgresSQL",
// 				percent: 65,
// 				href: "/certs/sql.png",
// 			},
// 		],
// 	},
// 	[RESUME_SKILLS_SECTIONS[1]]: [
// 		{
// 			title: "A+",
// 			percent: 80,
// 			href: "/certs/a-plus.png",
// 		},
// 		{
// 			title: "Google IT Support",
// 			percent: 66,
// 			href: GOOGLE_IT_SPECIALIST_URL,
// 		},
// 		{
// 			title: "Group Policy",
// 			percent: 38,
// 			href: "/certs/group-policy.jpg",
// 		},
// 		{
// 			title: "Network+",
// 			percent: 70,
// 			href: "/certs/network-plus.png",
// 		},
// 		{
// 			title: "Powershell",
// 			percent: 50,
// 			href: "/certs/powershell-active-directory-admin.jpg",
// 		},
// 		{
// 			title: "SCCM",
// 			percent: 35,
// 			href: "/certs/sccm.jpg",
// 		},
// 		{
// 			title: "Window's Server 2016",
// 			percent: 40,
// 			href: "/certs/server2016.png",
// 		},
// 	],
// 	[RESUME_SKILLS_SECTIONS[2]]: [
// 		{
// 			title: "Empathizing",
// 			percent: 68,
// 		},
// 		{
// 			title: "Giving Feedback",
// 			percent: 48,
// 		},
// 		{
// 			title: "Having Difficult Conversations",
// 			percent: 75,
// 		},
// 		{
// 			title: "Listening",
// 			percent: 85,
// 		},
// 		{
// 			title: "Oral Communication",
// 			percent: 75,
// 		},
// 		{
// 			title: "Receiving Feedback",
// 			percent: 66,
// 		},
// 		{
// 			title: "Self-Starter",
// 			percent: 78,
// 		},
// 		{
// 			title: "Written Communication",
// 			percent: 85,
// 		},
// 	],
// 	[RESUME_SKILLS_SECTIONS[3]]: [
// 		{
// 			title: "Conscientiousness",
// 			percent: 85,
// 			href: `/${BIG_FIVE_PAGE_NAME}#conscientiousness`,
// 		},
// 		{
// 			title: "Agreeableness",
// 			percent: 75,
// 			href: `/${BIG_FIVE_PAGE_NAME}#agreeableness`,
// 		},
// 		{
// 			title: "Openness",
// 			percent: 70,
// 			href: `/${BIG_FIVE_PAGE_NAME}#openness`,
// 		},
// 		{
// 			title: "Neuroticism",
// 			percent: 55,
// 			href: `/${BIG_FIVE_PAGE_NAME}#neuroticism`,
// 		},
// 		{
// 			title: "Extraversion",
// 			percent: 35,
// 			href: `/${BIG_FIVE_PAGE_NAME}#extraversion`,
// 		},
// 	],
// };
