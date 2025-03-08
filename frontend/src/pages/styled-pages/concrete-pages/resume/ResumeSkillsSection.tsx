import React, { useCallback } from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { defaultFontSize } from "../../../../styles/constants";
import { ExamplePageParagraph } from "../../ExamplePageParagraph";
import { linkStyles } from "../../../../styles/styles";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import { useAppDispatch } from "../../../../hooks";
import { setSelectedSkill } from "../../../../slices";
import { ResumeSkillsSectionBar } from "./ResumeSkillsSectionBar";

type Skills = {
  [key: string]: {
    apiTopic?: string;
    experience?: {
      professionalMonths: number;
      personalMonths: number;
    };
    level: number;
    isClickable?: boolean;
  };
};

const SKILLS: Skills = {
  OpenAI: {
    level: 52,
  },
  NestJs: {
    level: 40,
  },
  Express: {
    level: 87,
  },
  "Next.js": {
    level: 70,
    apiTopic: "nextjs",
  },
  Javascript: {
    level: 93,
  },
  Redux: {
    level: 87,
  },
  React: {
    level: 90,
  },
  Typescript: {
    level: 85,
  },
  MongoDB: {
    apiTopic: "Mongoose",
    level: 75,
  },
  GraphQL: {
    level: 78,
  },
  Angular: {
    level: 38,
  },
  Bootstrap: {
    level: 69,
  },
  SCSS: {
    level: 62,
  },
  Html5: {
    level: 50,
  },
  CSS3: {
    level: 89,
  },
  Jquery: {
    level: 33,
  },
  Python: {
    level: 29,
  },
  Java: {
    level: 40,
  },
  Ruby: {
    level: 15,
  },
  "c#": {
    apiTopic: "csharp",
    level: 78,
  },
  ".NET": {
    level: 71,
    isClickable: false,
  },
  nx: {
    level: 66,
  },
  "React Native": {
    level: 78,
    apiTopic: "react-native",
    isClickable: false,
  },
  "Spring Boot": {
    level: 49,
    apiTopic: "spring-boot",
  },
  Jest: {
    level: 80,
  },
  "MS SQL": {
    level: 49,
    isClickable: false,
  },
  PostgreSQL: {
    level: 75,
    isClickable: false,
  },
  "Paper.js": {
    level: 59,
    apiTopic: "paperjs",
  },
  "socket.io": {
    level: 62,
    apiTopic: "socketio",
  },
  Howler: {
    level: 59,
  },
  Xunit: {
    level: 80,
  },
  "three.js": {
    level: 49,
    apiTopic: "threejs",
  }
};

const CONTAINER_MARKER_WIDTH = 2;

const BarContainer = styled.div<LayoutStyledProps>`
  position: relative;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    top: -${CONTAINER_MARKER_WIDTH / 2}px;
    left: 0;
    background-color: ${(props) => props.colorscheme?.primary1};
    height: calc(100% + ${CONTAINER_MARKER_WIDTH}px);
    width: ${CONTAINER_MARKER_WIDTH}px;
    z-index: 10000000000;
  }

  &:after {
    content: "";
    position: absolute;
    top: -${CONTAINER_MARKER_WIDTH / 2}px;
    right: 0;
    background-color: ${(props) => props.colorscheme?.primary1};
    height: calc(100% + ${CONTAINER_MARKER_WIDTH}px);
    width: ${CONTAINER_MARKER_WIDTH}px;
    z-index: 10000000000;
  }
`;

const BarInnerContainer = styled.div<LayoutStyledProps>`
  position: relative;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    top: -${CONTAINER_MARKER_WIDTH / 2}px;
    left: 50%;
    background-color: ${(props) => props.colorscheme?.primary1};
    height: calc(100% + ${CONTAINER_MARKER_WIDTH}px);
    width: ${CONTAINER_MARKER_WIDTH}px;
    z-index: 10000000000;
  }
`;

const SkillContainer = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: ${defaultFontSize};
  margin-top: ${defaultFontSize};
  width: 100%;
`;

const SkillName = styled.a<LayoutStyledProps>`
  ${linkStyles}
  text-decoration: underline;

  ${(props) =>
    props.isclickable === "true"
      ? ""
      : `
        cursor: auto; 
        text-decoration: none;
    `}
`;

const Labels = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${defaultFontSize};
  font-size: ${defaultFontSize};
`;

const LabelLeft = styled.div<LayoutStyledProps>`
  text-align: left;
`;
const LabelMiddle = styled.div<LayoutStyledProps>`
  text-align: center;
`;
const LabelRight = styled.div<LayoutStyledProps>`
  text-align: right;
`;

type ResumeSkillsSectionProps = {};

export function ResumeSkillsSection(props: ResumeSkillsSectionProps) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const propToAdd: LayoutStyledProps & { target: string; rel: string } = {
    colorscheme: colorScheme,
    target: "_blank",
    rel: "noopener noreferrer",
    url: "",
  };

  const onSkillClick = useCallback(
    (skillName: string) => {
      dispatch(setSelectedSkill(skillName));
    },
    [dispatch]
  );

  return (
    <>
      <ExamplePageParagraph>
        Below is my self evaluation of my skills based on professional and
        personal experience. Clicking on a skill will open a modal with a list
        of the public repos in which that skill is used. If you want to get an
        idea of the code I write for that skill, look through the most recent
        repo for the skill in question.
      </ExamplePageParagraph>
      <SkillContainer>
        <div />
        <Labels>
          <LabelLeft>Novice</LabelLeft>
          <LabelMiddle>Proficient</LabelMiddle>
          <LabelRight>Master</LabelRight>
        </Labels>
        {Object.entries(SKILLS)
          .sort((a, b) =>
            a[0].toUpperCase() > b[0].toUpperCase()
              ? 1
              : a[0].toUpperCase() < b[0].toUpperCase()
              ? -1
              : 0
          )
          .map(([skillName, details], index) => {
            const isClickableToUse =
              details.isClickable == null ? true : details.isClickable;
            return (
              <React.Fragment key={index}>
                <SkillName
                  {...propToAdd}
                  isclickable={isClickableToUse ? "true" : "false"}
                  onClick={
                    isClickableToUse
                      ? () => onSkillClick(details.apiTopic || skillName)
                      : undefined
                  }
                >
                  {skillName}:
                </SkillName>
                <BarContainer {...propToAdd}>
                  <BarInnerContainer {...propToAdd}>
                    <ResumeSkillsSectionBar
                      examplePageBarProps={{ percentage: details.level }}
                    />
                  </BarInnerContainer>
                </BarContainer>
              </React.Fragment>
            );
          })}
      </SkillContainer>
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
