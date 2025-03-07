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

const SkillContainer = styled.div<LayoutStyledProps>`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: ${defaultFontSize};
  width: 100%;
`;

const SkillName = styled.a<LayoutStyledProps>`
  ${linkStyles}
  text-decoration: underline;
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
        Click on any of the skills below to see a list of the public repos I
        have created that pertain to it:
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
            return (
              <React.Fragment key={index}>
                <SkillName
                  {...propToAdd}
                  onClick={() => onSkillClick(skillName)}
                >
                  {skillName}:
                </SkillName>
                <ResumeSkillsSectionBar
                  examplePageBarProps={{ percentage: details.level }}
                />
              </React.Fragment>
            );
          })}
      </SkillContainer>
    </>
  );
}

type Skills = {
  [key: string]: {
    apiTopic?: string;
    experience: {
      professionalMonths: number;
      personalMonths: number;
    };
    level: number;
  };
};

const SKILLS: Skills = {
  NestJs: {
    experience: {
      professionalMonths: 60,
      personalMonths: 60,
    },
    level: 90,
  },
  Express: {
    experience: {
      professionalMonths: 60,
      personalMonths: 60,
    },
    level: 90,
  },
  "Next.js": {
    experience: {
      professionalMonths: 60,
      personalMonths: 60,
    },
    level: 90,
    apiTopic: "nextjs",
  },
  Javascript: {
    experience: {
      professionalMonths: 60,
      personalMonths: 60,
    },
    level: 90,
  },
  Redux: {
    experience: {
      professionalMonths: 60,
      personalMonths: 60,
    },
    level: 90,
  },
  React: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 90,
  },
  Typescript: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 80,
  },
  MongoDB: {
    apiTopic: "Mongoose",
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 70,
  },
  GraphQL: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  Angular: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  Bootstrap: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  SCSS: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  Html: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  CSS: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  Jquery: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  Python: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  Java: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  Ruby: {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 60,
  },
  "c#": {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    apiTopic: "csharp",
    level: 60,
  },
  ".NET": {
    experience: {
      professionalMonths: 48,
      personalMonths: 48,
    },
    level: 70,
  },
};

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
