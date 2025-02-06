// import * as THREE from "three";
import React, { useEffect } from "react";
import { Section } from "../../components/Section";
import Paragraph from "../../typography/Paragraph";
import { SkillsItemSection } from "../../components/Skills/SkillsItemSection";
import { PercentBarLabels } from "../../components/PercentBar/PercentBarLabels";
import { SkillsItem } from "../../components/Skills/SkillsItem";
import { ReferenceItem } from "./ReferenceItem";
import { SkillsPopup } from "../../components/Skills/SkillsPopup";
import { WorkHistoryItem } from "./WorkHistory/WorkHistoryItem";
import {
	BOOK_TRUST_URL,
	GITHUB_URL,
	GOOGLE_IT_SPECIALIST_URL,
	HERMAN_LIETZ_SCHULE_URL,
	ISD_622_URL,
	KUALAPUU_URL,
	NO_MARGIN_CLASSNAME,
	BIG_FIVE_PAGE_NAME,
	POWERSHELL_URL,
	RESUME_PAGE_NAME,
	RICOH_URL,
	TOYS_R_US_RUL as TOYS_R_US_URL,
	BRIDGE_URL,
	REPLAY_VIEWER_URL,
	PLAYLIST_SYNCER_URL,
	BEST_BUY_URL,
	YORK_B2E_URL,
	BRIDGE_CLASSNAME,
	SKILLS_CLASSNAME,
	C_SHARP_CLASSNAME,
} from "../../components/constants";
import { SourceCodeLink } from "../../components/SourceCodeLink";
import { Quote } from "../../components/Quote";
import { capitalize } from "../../helpers";
import { PageWrapper } from "../PageWrapper";
import { EducationItem } from "./EducationItem";
import { getRepositories, reposSelector } from "../../slices/generalSlice";
import { setSectionsToSkipAnimation } from "../../slices/resumeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

// export const RESUME_SPELLING = <span>R&eacute;sum&eacute;</span>;
export const RESUME_SPELLING = "Résumé";

function getLinkClassHTML(classNamesToAdd?: string[]) {
	const joined = classNamesToAdd?.join(' ');
	return ` class='${SKILLS_CLASSNAME}-popup__link-text ${SKILLS_CLASSNAME}__title--animating' ${classNamesToAdd} ${joined}`;
}

function getExternalLinkTargetAndRel() {
	return ` target='_blank' rel='noreferrer' `;
}

export const RESUME_SECTION_TITLES = [
	"Overview",
	SKILLS_CLASSNAME,
	"Work-history",
	"Education",
	"References",
];

const RESUME_SKILLS_SECTIONS = [
	"Web Development",
	"IT Skills",
	"Human Skills",
	"Personality",
];
const sectionsToSkipAnimation = [RESUME_SKILLS_SECTIONS[2]];

const skillsLabels: {
	[key: string]: { left: string; center: string; right: string };
} = {
	web: {
		left: "Novice",
		center: "Proficient",
		right: "Master",
	},
	it: {
		left: "Familiar",
		center: "Knowledgeable",
		right: "Expert",
	},
	human: {
		left: "Lacks",
		center: "Average",
		right: "Excels",
	},
	personality: {
		left: "Low",
		center: "Middle",
		right: "High",
	},
};

const webDevSubSkillsLabels = [
	"Basics",
	"Libraries",
	"Frameworks",
	"Methodologies",
	"Databases",
];

//@ts-ignore
const skills: {
	[key: string]: {
		[key: string]: [Skill];
	};
} = {
	[RESUME_SKILLS_SECTIONS[0]]: {
		[webDevSubSkillsLabels[0]]: [
			{
				title: "CSS3",
				percent: 78,
			},
			{
				title: "C#",
				percent: 55,
			},
			{
				title: "Express",
				percent: 70,
			},
			{
				title: "GraphQL",
				percent: 28,
			},
			{
				title: "HTML5",
				percent: 65,
			},
			{
				title: "Java",
				percent: 48,
			},
			{
				title: "Javascript",
				percent: 82,
			},
			{
				title: "jQuery",
				percent: 46,
			},
			{
				title: "Python",
				percent: 50,
			},
			{
				title: "Ruby",
				percent: 25,
			},
			{
				title: "SASS",
				percent: 62,
			},
			{
				title: "Typescript",
				percent: 75,
			},
		],
		[webDevSubSkillsLabels[1]]: [
			{
				title: "Howler",
				percent: 55,
			},
			{
				title: "PaperJS",
				percent: 59,
			},
			{
				title: "rxjs",
				percent: 25,
			},
			{
				title: "socket.io",
				percent: 62.5,
			},
			{
				title: "ThreeJS",
				percent: 35,
			},
		],
		[webDevSubSkillsLabels[2]]: [
			{
				title: "Angular",
				percent: 55,
			},
			{
				title: "Bootstrap",
				percent: 68,
			},
			{
				title: "NestJS",
				percent: 48,
			},
			{
				title: ".NET",
				percent: 55,
			},
			{
				title: "NextJS",
				percent: 33,
			},
			{
				title: "nx",
				percent: 66,
			},
			{
				title: "React",
				percent: 80,
			},
			{
				title: "React Native",
				percent: 70,
			},
			{
				title: "Redux",
				percent: 75,
			},
			{
				title: "Semantic-UI",
				percent: 43,
			},
			{
				title: "Spring Boot",
				percent: 53,
			},
		],
		[webDevSubSkillsLabels[3]]: [
			{
				title: "BDD",
				percent: 66,
			},
			{
				title: "BEM",
				percent: 57,
			},
			{
				title: "DSA",
				percent: 48,
			},
			{
				title: "Dynamic Programming",
				percent: 50,
			},
			{
				title: "Responsive Design",
				percent: 68,
			},
			{
				title: "TDD",
				percent: 52.5,
			},
		],
		[webDevSubSkillsLabels[4]]: [
			{
				title: "Mongoose",
				percent: 57,
			},
			{
				title: "PostgresSQL",
				percent: 65,
				href: "/certs/sql.png",
			},
		],
	},
	[RESUME_SKILLS_SECTIONS[1]]: [
		{
			title: "A+",
			percent: 80,
			href: "/certs/a-plus.png",
		},
		{
			title: "Google IT Support",
			percent: 66,
			href: GOOGLE_IT_SPECIALIST_URL,
		},
		{
			title: "Group Policy",
			percent: 38,
			href: "/certs/group-policy.jpg",
		},
		{
			title: "Network+",
			percent: 70,
			href: "/certs/network-plus.png",
		},
		{
			title: "Powershell",
			percent: 50,
			href: "/certs/powershell-active-directory-admin.jpg",
		},
		{
			title: "SCCM",
			percent: 35,
			href: "/certs/sccm.jpg",
		},
		{
			title: "Window's Server 2016",
			percent: 40,
			href: "/certs/server2016.png",
		},
	],
	[RESUME_SKILLS_SECTIONS[2]]: [
		{
			title: "Empathizing",
			percent: 68,
		},
		{
			title: "Giving Feedback",
			percent: 48,
		},
		{
			title: "Having Difficult Conversations",
			percent: 75,
		},
		{
			title: "Listening",
			percent: 85,
		},
		{
			title: "Oral Communication",
			percent: 75,
		},
		{
			title: "Receiving Feedback",
			percent: 66,
		},
		{
			title: "Self-Starter",
			percent: 78,
		},
		{
			title: "Written Communication",
			percent: 85,
		},
	],
	[RESUME_SKILLS_SECTIONS[3]]: [
		{
			title: "Conscientiousness",
			percent: 85,
			href: `/${BIG_FIVE_PAGE_NAME}#conscientiousness`,
		},
		{
			title: "Agreeableness",
			percent: 75,
			href: `/${BIG_FIVE_PAGE_NAME}#agreeableness`,
		},
		{
			title: "Openness",
			percent: 70,
			href: `/${BIG_FIVE_PAGE_NAME}#openness`,
		},
		{
			title: "Neuroticism",
			percent: 55,
			href: `/${BIG_FIVE_PAGE_NAME}#neuroticism`,
		},
		{
			title: "Extraversion",
			percent: 35,
			href: `/${BIG_FIVE_PAGE_NAME}#extraversion`,
		},
	],
};

const hints = {
	skills: "click section to view skills",
	education: "click degree to view transcript",
	references: "click name to view letter of recommendation",
};

export type Skill = {
	title: string;
	percent: number;
	href?: string;
}

export type HeaderSideContent = {
	overview: any;
}

export type ResumeProps = {}

export const Resume: React.FC<ResumeProps> = () => {
	const dispatch = useAppDispatch();
	const repos = useAppSelector(reposSelector);

	const content = [
		[
			RESUME_SECTION_TITLES[0],
			<React.Fragment>
				<section aria-label="Overview">
					<Quote author="Seth Godin">
						You are not your résumé, you are your work.
					</Quote>
					<Paragraph classNameToAdd={`${NO_MARGIN_CLASSNAME}`} size="five">
						Below you will find the following:
					</Paragraph>
				</section>

				<section>
					<div className={`${BRIDGE_CLASSNAME}__subsection-grid margin-bottom-0`}>
						<span>1).</span>
						<span>
							A summary of the skills I possess with example projects
							highlighting those skills.
						</span>
						<span>2).</span>
						<span>Full work history</span>
						<span>3).</span>
						<span>Transcript highlighting my post-secondary education</span>
						<span>4).</span>
						<span>
							References
						</span>
					</div>
				</section>

				{/* <Paragraph size="four">
					If you want  haven't yet, I highly encourage you
					check out the page I created dedicated to the making the multiplayer&nbsp;<Link className="link" to={BRIDGE_URL}>Bridge app</Link> I recently created.
					&nbsp;
				</Paragraph> */}
			</React.Fragment>,
		],
		[
			capitalize(RESUME_SECTION_TITLES[1]),
			<React.Fragment>
				<ul className={`${SKILLS_CLASSNAME}`}>
					<SkillsItemSection title={`${RESUME_SKILLS_SECTIONS[0]} `}>
						{webDevSubSkillsLabels.map((subSkill: string, index: number) => {
							return (
								<SkillsItemSection key={index} title={subSkill}>
									<PercentBarLabels label={skillsLabels.web} />
									{(skills[RESUME_SKILLS_SECTIONS[0]][subSkill] as any).map(
										(skill: any, index2: number) => {
											return (
												<SkillsItem
													key={index2}
													label={skillsLabels.web}
													title={skill.title}
													percent={skill.percent}
													href={skill.href ? skill.href : ""}
												/>
											);
										},
									)}
								</SkillsItemSection>
							);
						})}
					</SkillsItemSection>
					<SkillsItemSection title={RESUME_SKILLS_SECTIONS[1]}>
						<PercentBarLabels label={skillsLabels.it} />
						{(skills[RESUME_SKILLS_SECTIONS[1]] as any).map(
							(skill: Skill, index: number) => {
								return (
									<SkillsItem
										key={index}
										label={skillsLabels.it}
										href={skill.href ? skill.href : ""}
										title={skill.title}
										percent={skill.percent as any}
									/>
								);
							},
						)}
					</SkillsItemSection>
					<SkillsItemSection title={RESUME_SKILLS_SECTIONS[2]}>
						<PercentBarLabels label={skillsLabels.human} />
						{(skills[RESUME_SKILLS_SECTIONS[2]] as any).map(
							(skill: Skill, index: number) => {
								return (
									<SkillsItem
										key={index}
										label={skillsLabels.human}
										href={skill.href ? skill.href : ""}
										title={skill.title}
										percent={skill.percent as any}
									/>
								);
							},
						)}
					</SkillsItemSection>
					<SkillsItemSection title={RESUME_SKILLS_SECTIONS[3]}>
						<PercentBarLabels label={skillsLabels.personality} />
						{(skills[RESUME_SKILLS_SECTIONS[3]] as any).map(
							(skill: Skill, index: number) => {
								return (
									<SkillsItem
										key={index}
										label={skillsLabels.personality}
										href={skill.href ? skill.href : ""}
										title={skill.title}
										percent={skill.percent as any}
										isLocal={true}
									/>
								);
							},
						)}
					</SkillsItemSection>
				</ul>
			</React.Fragment>,
		],
		[
			RESUME_SECTION_TITLES[2],
			<React.Fragment>
				<div className="work-history">
					<WorkHistoryItem
						id="best_buy"
						location={`<a ${getExternalLinkTargetAndRel()}
						${getLinkClassHTML()} href=${BEST_BUY_URL}> Best Buy</a>`}
						startDate="02/22"
						endDate="Present"
						number="01"
						title="Full Stack Web Developer (Contract)"
						sections={[
							{
								title: "best_buy",
								bullets: [
									`Part of the Solution Sidekick (add link) team responsible for building a selling tool used by in-store employees.`,
									`Played a decisive role in the development of the following features/enhancements: leads, accessory attachment, PDP, voice notes, caching, and displaying combo items in the basket.`,
									`Discovered and fixed numerous bugs.`,
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="york_solutions"
						location={`<a ${getExternalLinkTargetAndRel()}
						${getLinkClassHTML()} href=${YORK_B2E_URL}> York Solutions</a>`}
						startDate="11/21"
						endDate="02/22"
						number="02"
						title="Barriers to Entry Java Full Stack Program"
						sections={[
							{
								title: "york_solutions",
								bullets: [
									`Learned Java (Spring Boot), Agile methodology, and improved React.js skills with the intent of starting a contract at Best Buy as a full`,
									`Created a "Movie Night Recommendation" app leveraging Best Buy APIs in Spring Boot and React as
									well as a team project.`,
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="freelance_web_developer"
						startDate="03/20"
						endDate="11/21"
						number="03"
						title="Freelance Web Developer"
						sections={[
							{
								title: "",
								bullets: [
									`Built <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href='${BRIDGE_URL}'>  socket.io-based multiplayer bridge app</a> that allows four players to play bridge online.`,
									`Built an  <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href='${REPLAY_VIEWER_URL}'>angular 12 replay viewer app</a> utilizing redux, nest.js, and mongoDB.  The app pulls from the mongoDB collection used in the aforementioned bridge app, allowing for easy reviewing of games played as well as insight into the statistics surrounding their games.`,
									`Built a  <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href='${PLAYLIST_SYNCER_URL}'>c# application to synchronize music playlists</a> after an Andriod OS update that rendered my previous playlist syncing app unusable.`,
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="ricoh"
						location={`<a ${getExternalLinkTargetAndRel()}
						${getLinkClassHTML()} href=${RICOH_URL}> Ricoh Ltd </a>`}
						startDate="07/19"
						endDate="06/20"
						number="04"
						title="Technology Services Support Representative"
						sections={[
							{
								title: "Responsibilities",
								bullets: [
									"Worked with clients to resolve issues related to their multi-function devices.",
									"Configured, troubleshot, installed, and repaired multi-function devices.",
								],
							},
							{
								title: "Highlights",
								bullets: [
									"Secured two contracts with clients by going the extra mile to ensure customer satisfaction.",
									`Increased productivity by 10% by <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href='${POWERSHELL_URL}'> automating repetitive tasks.</a> `,
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="hawaii"
						location={`<a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${KUALAPUU_URL}> <span>Kualapuu Charter School <span></a>`}
						startDate="07/18"
						endDate="06/19"
						number="05"
						title="Second Grade Classroom Volunteer"
						sections={[
							{
								title: "Highlights",
								bullets: [
									`Created a <a ${getLinkClassHTML()} href='/macroexamples/macroExampleMathGrader.xlsm'> grading tool</a> to facilitate grading of math assessments.`,
									`Created a <a ${getLinkClassHTML()} href='/macroexamples/macroExampleBookTrust.xlsm'>Book Trust tool</a> to facilitate monthly <a ${getExternalLinkTargetAndRel()} class='${SKILLS_CLASSNAME}-popup__link-text ${SKILLS_CLASSNAME}__title--animating' href=${BOOK_TRUST_URL}>Book Trust </a> ordering process.`,
									`Used my time to study Bash, Powershell, Windows Active Directory, get the Google IT Support Specialist Certificate, and other IT Support related skills (IT support was the direction I wanted to go in at that point in time).`,
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="isd622"
						location={`<a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${ISD_622_URL}> ISD622 </a>`}
						startDate="07/07"
						endDate="07/18"
						number="06"
						title="PearsonVue Test Admin / Office Admin"
						sections={[
							{
								title: "Responsibilities",
								bullets: [
									"Offered technical support to teachers and other staff members.",
									"Guided learners throughout the registration process.",
									"Created reports and documents, provided recommendations, etc.",
									"Served a diverse set of individuals including seniors learning how to read, single-parent mothers, incarcerated youth earning their G.E.D., refugees learning English, and professionals looking to earn certifications.",
									"Administered G.E.D. tests in a minimum-security correctional facility for 4 years.",
								],
							},
							{
								title: "Highlights",
								bullets: [
									"Created VBA macros to automate report generation, reducing the time-to-complete by more than 80%.",
									`Created <a ${getLinkClassHTML()} href='/macroexamples/macroExampleScoring.xlsm'>custom grading forms</a> using Excel userForms and macros in order to reduce the time it took to grade assessment tests by 75%.`,
									"Created a tool that used testing data to produce reports that the teachers could use to understand the areas in which their students were having difficulties, preventing the purchase of dedicated software.",
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="overnight_stocker"
						location={`<a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${TOYS_R_US_URL}> Toy's &ldquo;R&rdquo; Us </a>`}
						startDate="09/06"
						endDate="12/06"
						number="07"
						title="Overnight Stocker"
						sections={[
							{
								title: "Responsibilities",
								bullets: [
									"Unloaded Freight.",
									"Opened boxes and placed merchandise on displays/shelves.",
									"Cleaned up and disposed up boxes.",
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="germany"
						location={`<a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${HERMAN_LIETZ_SCHULE_URL}> Herman-Lietz Schule Haubinda </a>`}
						startDate="09/05"
						endDate="07/06"
						number="08"
						title="English Assistant"
						sections={[
							{
								title: "Responsibilities",
								bullets: [
									"Collaborated with English language teacher to enhance lessons.",
									"Led small group sessions with 5-8 students.",
									"Conducted remedial 1-on-1 tutoring sessions with students struggling in English.",
								],
							},
						]}
					/>
				</div>
			</React.Fragment>,
		],
		[
			RESUME_SECTION_TITLES[3],
			<React.Fragment>
				<ul className="education">
					<EducationItem
						// startDate="12/10"
						location="University of Minnesota Twin Cities"
						degree="B.A. in Linguistics "
						gpa="3.701"
						href="/transcript.pdf"
					/>
					<EducationItem
						// startDate="09/03"
						// endDate="08/05"
						location="Century College"
						degree="Minnesota Transfer Curriculum (PSEO)"
						gpa="3.86"
						href="/transcriptPSEO.pdf"
					/>
				</ul>
			</React.Fragment>,
		],
		[
			RESUME_SECTION_TITLES[4],
			<React.Fragment>
				<div className="references">
					<ReferenceItem
						number="01"
						name="Scott Helland"
						relation="Former Supervisor"
						phone="651-325-5416"
						email="shelland@isd622.org"
						// href="/letterOfRecommendationScott.pdf"
					/>
					<ReferenceItem
						number="02"
						name="Rita Bulger"
						relation="Former Co-worker"
						phone="651-325-7633"
						email="rbulger@isd622.org"
						// href="/letterOfRecommendationRita.pdf"
					/>
					<ReferenceItem
						number="03"
						name="Helen Dougherty-Wakeman"
						relation="Former Co-worker"
						phone="651-748-6223"
						email="hdougherty-wakeman@isd622.org"
					/>
					<ReferenceItem
						number="04"
						name="Andrew Cleland"
						relation="Friend"
						phone="612-388-8986"
						email="clel0011@umn.edu"
					/>
				</div>
			</React.Fragment>,
		],
	];

	const headerSideContent = {
		overview: (
			<div className="thumbnail">
				<img src="/self-small.png" alt="Adam Major" />
			</div>
		),
	};

	useEffect(() => {
		if (repos?.length > 0) return;
		dispatch(getRepositories());
		dispatch(setSectionsToSkipAnimation(sectionsToSkipAnimation));
	});

	const renderSections = () => {
		return content.map((contentArray, index) => {
			//Returning if there is headerSideContent for this section
			const headerSideContents =
				headerSideContent[
					(contentArray[0] as string).toLowerCase() as keyof HeaderSideContent
				];
			if (headerSideContents) {
				return (
					<Section
						key={index}
						name={contentArray[0] as string}
						pageName={RESUME_PAGE_NAME}
						headerSideContent={headerSideContents}
						hint={(hints as any)[contentArray[0] as any]}>
						{contentArray[1] as string}
					</Section>
				);
			}

			return (
				<Section
					key={index}
					name={contentArray[0] as string}
					pageName={RESUME_PAGE_NAME}
					hint={(hints as any)[contentArray[0] as any]}>
					{contentArray[1] as string}
				</Section>
			);
		});
	};

	return (
		<React.Fragment>
			<PageWrapper pageName={RESUME_PAGE_NAME}>
				<h2 className={`${C_SHARP_CLASSNAME}__title`}>
					<SourceCodeLink href={`${GITHUB_URL}/portfolio`} />
					<SourceCodeLink
						className="source-link__live"
						href={`/resume.pdf`}
						msg={"Download"}
					/>
					{RESUME_SPELLING}
				</h2>
				{renderSections()}
			</PageWrapper>
			{/* <SkillsPopup /> */}
		</React.Fragment>
	);
};