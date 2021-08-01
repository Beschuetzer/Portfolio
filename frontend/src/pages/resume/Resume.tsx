//@ts-nocheck

// import * as THREE from "three";
import React, { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";
import Section from "../../components/Section";
import Paragraph from "../../typography/Paragraph";
import SkillsItemSection from "../../components/Skills/SkillsItemSection";
import SkillsItemSectionLabels from "../../components/Skills/SkillsItemSectionLabels";
import SkillsItem from "../../components/Skills/SkillsItem";
import ReferenceItem from "./ReferenceItem";
import EducationItem from "./EducationItem";

import { getRepositories, setSectionsToSkipAnimation } from "../../actions";
import SkillsPopup from "../../components/Skills/SkillsPopup";
import WorkHistoryItem from "./WorkHistory/WorkHistoryItem";
import { BRIDGE_CLASSNAME } from "../examples/bridge/utils";
import { Repository, SKILLS_CLASSNAME } from "../../components/Skills/utils";
import {
	BOOK_TRUST_URL,
	GITHUB_URL,
	GOOGLE_IT_SPECIALIST_URL,
	HERMAN_LIETZ_SCHULE_URL,
	ISD_622_URL,
	KUALAPUU_URL,
	NO_MARGIN_CLASSNAME,
	RICOH_URL,
	TOYS_R_US_RUL as TOYS_R_US_URL,
} from "../../components/constants";
import SourceCodeLink from "../../components/SourceCodeLink";
import Quote from "../../components/Quote";

// export const RESUME_SPELLING = <span>R&eacute;sum&eacute;</span>;
export const RESUME_SPELLING = "Résumé";


function getLinkClassHTML() {
	return ` class='${SKILLS_CLASSNAME}-popup__link-text ${SKILLS_CLASSNAME}__title--animating' `;
}

function getExternalLinkTargetAndRel() {
	return ` target='_blank' rel='noreferrer' `;
}

const skillsItemSectionLabels = [
	"Web Development",
	"IT Support",
	"Human Skills",
];
const sectionsToSkipAnimation = [skillsItemSectionLabels[2]];

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
};

const webDevSubSkillsLabels = [
	"Basics",
	"Libraries",
	"Frameworks",
	"Methodologies",
	"Databases",
];

const skills: {
	[key: string]: {
		[key: string]: [Skill];
	};
} = {
	[skillsItemSectionLabels[0]]: {
		[webDevSubSkillsLabels[0]]: [
			{
				title: "CSS3",
				percent: 78,
			},
			{
				title: "C#",
				percent: 35,
			},
			{
				title: "Express",
				percent: 70,
			},
			{
				title: "GraphQL",
				percent: 45,
			},
			{
				title: "HTML5",
				percent: 65,
			},
			{
				title: "Javascript",
				percent: 78,
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
				percent: 51,
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
				percent: 55,
			},
			{
				title: "NestJS",
				percent: 48,
			},
			{
				title: "NextJS",
				percent: 33,
			},
			{
				title: "nx",
				percent: 55,
			},
			{
				title: "React",
				percent: 65,
			},
			{
				title: "Redux",
				percent: 51,
			},
			{
				title: "Semantic-UI",
				percent: 43,
			},
		],
		[webDevSubSkillsLabels[3]]: [
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
				percent: 24,
				href: "/certs/sql.png",
			},
		],
	},
	[skillsItemSectionLabels[1]]: [
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
	[skillsItemSectionLabels[2]]: [
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
};

const hints = {
	skills: "click section to view skills",
	education: "click degree to view transcript",
	references: "click name to view letter of recommendation",
};

interface Skill {
	title: string;
	percent: number;
	href?: string;
}

interface HeaderSideContent {
	overview: any;
}

interface ResumeProps {
	repos: Repository[];
	getRepositories: () => void;
	setSectionsToSkipAnimation: (value: any[]) => void;
}

const Resume: React.FC<ResumeProps> = ({
	repos,
	getRepositories,
	setSectionsToSkipAnimation,
}) => {
	const content = [
		[
			"overview",
			<React.Fragment>
				<Quote author="Seth Godin" className="padding-bottom-2">
					You are not your résumé, you are your work.
				</Quote>
				<Paragraph classNameToAdd={`${NO_MARGIN_CLASSNAME}`} size="five">
					Below you will find the following:
				</Paragraph>

				<div>
					<div className={`${BRIDGE_CLASSNAME}__subsection-grid`}>
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
							References and letters of recommendation (click the name of the
							reference to download)
						</span>
					</div>
				</div>

				{/* <Paragraph size="four">
					If you want  haven't yet, I highly encourage you
					check out the page I created dedicated to the making the multiplayer&nbsp;<Link className="link" to={BRIDGE_URL}>Bridge app</Link> I recently created.
					&nbsp;
				</Paragraph> */}
			</React.Fragment>,
		],
		[
			`${SKILLS_CLASSNAME}`,
			<React.Fragment>
				<ul className={`${SKILLS_CLASSNAME}`}>
					<SkillsItemSection title={`${skillsItemSectionLabels[0]} `}>
						{webDevSubSkillsLabels.map((subSkill: string, index: number) => {
							return (
								<SkillsItemSection key={index} title={subSkill}>
									<SkillsItemSectionLabels label={skillsLabels.web} />
									{(skills[skillsItemSectionLabels[0]][subSkill] as any).map(
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
					<SkillsItemSection title={skillsItemSectionLabels[1]}>
						<SkillsItemSectionLabels label={skillsLabels.it} />
						{(skills[skillsItemSectionLabels[1]] as any).map(
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
					<SkillsItemSection title={skillsItemSectionLabels[2]}>
						<SkillsItemSectionLabels label={skillsLabels.human} />
						{(skills[skillsItemSectionLabels[2]] as any).map(
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
				</ul>
			</React.Fragment>,
		],
		[
			"work-History",
			<React.Fragment>
				<div className="work-history">
					<WorkHistoryItem
						id="ricoh"
						startDate="07/19"
						endDate="06/20"
						number="01"
						title={`Technology Services Support Representative at <a ${getExternalLinkTargetAndRel()}
            ${getLinkClassHTML()} href=${RICOH_URL}> Ricoh Ltd </a>`}
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
									`Increased productivity by 10% by <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href='${GITHUB_URL}/powerShell'> automating repetitive tasks.</a> `,
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="hawaii"
						startDate="07/18"
						endDate="06/19"
						number="02"
						title={`Second Grade Classroom Volunteer at <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${KUALAPUU_URL}> <span>Kualapuu Charter School <span></a>`}
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
						startDate="07/07"
						endDate="07/18"
						number="03"
						title={`PearsonVue Test Admin / Office Admin at <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${ISD_622_URL}> ISD622 </a>`}
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
						startDate="09/06"
						endDate="12/06"
						number="04"
						title={`Overnight Stocker at <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${TOYS_R_US_URL}> Toy's &ldquo;R&rdquo; Us </a>`}
						sections={[
							{
								title: "Responsibilities",
								bullets: [
									"Stocked shelves and generally made sure the store was ready to open.",
								],
							},
						]}
					/>
					<WorkHistoryItem
						id="germany"
						startDate="09/05"
						endDate="07/06"
						number="05"
						title={`English Assistant at <a ${getExternalLinkTargetAndRel()} ${getLinkClassHTML()} href=${HERMAN_LIETZ_SCHULE_URL}> Herman-Lietz Schule Haubinda </a>`}
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
			"education",
			<React.Fragment>
				<ul className="education">
					<EducationItem
						startDate="12/10"
						location="University of Minnesota Twin Cities"
						degree="B.A. in Linguistics "
						gpa="3.701"
						href="/transcript.pdf"
					/>
					<EducationItem
						startDate="09/03"
						endDate="08/05"
						location="Century College"
						degree="Minnesota Transfer Curriculum (PSEO)"
						gpa="3.86"
						href="/transcriptPSEO.pdf"
					/>
				</ul>
			</React.Fragment>,
		],
		[
			"references",
			<React.Fragment>
				<div className="references">
					<ReferenceItem
						number="01"
						name="Scott Helland"
						relation="Former Supervisor"
						phone="651-325-5416"
						email="shelland@isd622.org"
						href="/letterOfRecommendationScott.pdf"
					/>
					<ReferenceItem
						number="02"
						name="Rita Bulger"
						relation="Former Co-worker"
						phone="651-325-7633"
						email="rbulger@isd622.org"
						href="/letterOfRecommendationRita.pdf"
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
		// renderTHREE();
		if (repos?.length > 0) return;
		getRepositories();
		setSectionsToSkipAnimation(sectionsToSkipAnimation);
	});

	const renderSections = () => {
		return content.map((contentArray, index) => {
			//Returning if there is headerSideContent for this section
			if (headerSideContent[contentArray[0] as keyof HeaderSideContent]) {
				return (
					<Section
						key={index}
						name={contentArray[0] as string}
						pageName="resume"
						headerSideContent={
							headerSideContent[contentArray[0] as keyof HeaderSideContent]
						}
						hint={hints[contentArray[0]]}>
						{contentArray[1] as string}
					</Section>
				);
			}

			return (
				<Section
					key={index}
					name={contentArray[0] as string}
					pageName="resume"
					hint={hints[contentArray[0]]}>
					{contentArray[1] as string}
				</Section>
			);
		});
	};

	return (
		<React.Fragment>
			<section className="resume">
				<SourceCodeLink
					href={`${GITHUB_URL}/portfolio`}
					// blockName="hero"
				/>
				<h2 className="heading heading--two">{RESUME_SPELLING}</h2>
				{renderSections()}
			</section>
			<SkillsPopup />
		</React.Fragment>
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		repos: state.general.repos,
	};
};

export default connect(mapStateToProps, {
	getRepositories,
	setSectionsToSkipAnimation,
})(Resume as any);
