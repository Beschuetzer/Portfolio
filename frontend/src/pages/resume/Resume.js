// import * as THREE from "three";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Section from "../../components/Section";
import Paragraph from "../../typography/Paragraph";
import SkillsItemSection from "./Skills/SkillsItemSection";
import SkillsItemSectionLabels from "./Skills/SkillsItemSectionLabels";
import SkillsItem from "./Skills/SkillsItem";
import ReferenceItem from "./ReferenceItem";
import EducationItem from "./EducationItem";

import { getRepositories, setSectionsToSkipAnimation } from "../../actions";
import SkillsPopup from "./Skills/SkillsPopup/SkillsPopup";
import WorkHistoryItem from "./WorkHistory/WorkHistoryItem";
class Resume extends React.Component {
	static popupUrl = "/resume#skillsPopup";
	static skillsItemSectionLabels = [
		"Web Development",
		"IT Support",
		"Human Skills",
	];
	static sectionsToSkipAnimation = [Resume.skillsItemSectionLabels[2]];
	static skillsLabels = {
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
	static webDevSubSkillsLabels = [
		'Basics',
		'Libraries',
		'Frameworks',
		'Methodologies',
		'Databases',
	];
	static skills = {
		[Resume.skillsItemSectionLabels[0]]: {
			[Resume.webDevSubSkillsLabels[0]]: [
				{
					title: 'CSS3',
					percent: 78,
					order: 1,
				},
				{
					title: 'C#',
					percent: 35,
					order: 2,
				},
				{
					title: 'Express',
					percent: 70,
					order: 4,
				},
				{
					title: 'GraphQL',
					percent: 45,
					order: 5,
				},
				{
					title: 'HTML5',
					percent: 65,
					order: 6,
				},
				{
					title: 'Javascript',
					percent: 78,
					order: 7,
				},
				{
					title: 'jQuery',
					percent: 46,
					order: 8,
				},
				{
					title: 'Python',
					percent: 50,
					order: 9,
				},
				{
					title: 'Ruby',
					percent: 25,
					order: 10,
				},
				{
					title: 'SASS',
					percent: 62,
					order: 11,
				},
				{
					title: 'Typescript',
					percent: 51,
					order: 12,
				},
			],
			[Resume.webDevSubSkillsLabels[1]]: [
				{
					title: 'Howler',
					percent: 55,
				},
				{
					title: 'PaperJS',
					percent: 59,
				},
				{
					title: 'rxjs',
					percent: 25,
				},
				{
					title: 'socket.io',
					percent: 62.5,
				},
				{
					title: 'ThreeJS',
					percent: 35,
				},
			],
			[Resume.webDevSubSkillsLabels[2]]: [
				{
					title: 'Angular',
					percent: 55,
				},
				{
					title: 'Bootstrap',
					percent: 55,
				},
				{
					title: 'NestJS',
					percent: 35,
				},
				{
					title: 'NextJS',
					percent: 33,
				},
				{
					title: 'React',
					percent: 65,
				},
				{
					title: 'Redux',
					percent: 51,
				},				
				{
					title: 'Semantic-UI',
					percent: 43,
				},			
			],
			[Resume.webDevSubSkillsLabels[3]]: [
				{
					title: 'BEM',
					percent: 57,
				},
				{
					title: 'DSA',
					percent: 48,
				},
				{
					title: 'Dynamic Programming',
					percent: 50,
				},
				{
					title: 'Responsive Design',
					percent: 68,
				},
				{
					title: 'TDD',
					percent: 52.5,
				},
			],
			[Resume.webDevSubSkillsLabels[4]]: [
				{
					title: 'Mongoose',
					percent: 57,
				},
				{
					title: 'PostgresSQL',
					percent: 24,
					href:"/certs/sql.png",
				},
			],
		},
		[Resume.skillsItemSectionLabels[1]]: [
			{
				title: 'A+',
				percent: 80,
				href:"/certs/a-plus.png",
			},
			{
				title: 'Google IT Support',
				percent: 66,
				href:"https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ",
			},
			{
				title: 'Group Policy',
				percent: 38,
				href:"/certs/group-policy.jpg",
			},
			{
				title: 'Network+',
				percent: 70,
				href:"/certs/network-plus.png",
			},
			{
				title: 'Powershell',
				percent: 50,
				href:"/certs/powershell-active-directory-admin.jpg",
			},
			{
				title: 'SCCM',
				percent: 35,
				href:"/certs/sccm.jpg",
			},
			{
				title: "Window's Server 2016",
				percent: 40,
				href:"/certs/server2016.png",
			},
		],
		[Resume.skillsItemSectionLabels[2]]: [
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
		]
	}
	static content = [
		[
			"overview",
			<React.Fragment>
				<Paragraph size="five">
					Below you will find the following:
				</Paragraph>

				<div>
					<div className="bridge__subsection-grid">
						<span>1).</span>
						<span>
							A summary of the skills I possess and example projects highlighting those skills (click headers to open section and then click on individual skills to view projects using that skill). 
						</span>
						<span>2).</span>
						<span>
							Full work history 
						</span>
						<span>3).</span>
						<span>
							Full post-secondary education history including transcripts (click links to view)
						</span>
						<span>4).</span>
						<span>
							References and letters of recommendation (click the name of the reference to download)
						</span>
					</div>		
				</div>

				{/* <Paragraph size="four">
					If you want  haven't yet, I highly encourage you
					check out the page I created dedicated to the making the multiplayer&nbsp;<Link className="link" to="/examples/bridge">Bridge app</Link> I recently created.
					&nbsp;
				</Paragraph> */}
			</React.Fragment>,
		],
		[
			"skills",
			<React.Fragment>
				<ul className="skills">
					<SkillsItemSection title={`${Resume.skillsItemSectionLabels[0]} `}>
					{
						Resume.webDevSubSkillsLabels.map((subskill, index) => {
							return (
								<SkillsItemSection key={index} title={subskill}>
								<SkillsItemSectionLabels labels={Resume.skillsLabels.web} />	
									{Resume.skills[Resume.skillsItemSectionLabels[0]][subskill].map((skill, index2) => {
										return (
											<SkillsItem
												key={index2}
												labels={Resume.skillsLabels.web}
												title={skill.title}
												percent={skill.percent}
												href={skill.href ? skill.href : ''}
											/>
										)
									})}	
								</SkillsItemSection>
							)
						})
					}
					</SkillsItemSection>

					<SkillsItemSection title={Resume.skillsItemSectionLabels[1]}>
						<SkillsItemSectionLabels labels={Resume.skillsLabels.it} />
						{
							Resume.skills[Resume.skillsItemSectionLabels[1]].map((skill, index) => {
								return (
									<SkillsItem
										key={index}
										labels={Resume.skillsLabels.it}
										href={skill.href ? skill.href : ''}
										title={skill.title}
										percent={skill.percent}
									/>
								)
							})
						}
					</SkillsItemSection>
					
					<SkillsItemSection title={Resume.skillsItemSectionLabels[2]}>
						<SkillsItemSectionLabels labels={Resume.skillsLabels.human} />
						{
							Resume.skills[Resume.skillsItemSectionLabels[2]].map((skill, index) => {
								return (
									<SkillsItem
										key={index}
										labels={Resume.skillsLabels.it}
										href={skill.href ? skill.href : ''}
										title={skill.title}
										percent={skill.percent}
									/>
								)
							})
						}
					</SkillsItemSection>
				</ul>
			</React.Fragment>,
		],
		[
			"work-History",
			<React.Fragment>
				<div className="work-history">
					<WorkHistoryItem
						startDate="07/19"
						endDate="06/20"
						number="01"
						title="Technology Services Support Representative at <a target='_blank' rel='noreferrer'
            class='skills-popup__link-text skills__title--animating' href='https://www.ricoh-usa.com/en'> Ricoh Ltd </a>"
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
									"Increased productivity by 10% by <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://github.com/Beschuetzer/PowerShell'> automating repetitive tasks.</a> ",
								],
							},
						]}
					/>
					<WorkHistoryItem
						startDate="07/18"
						endDate="06/19"
						number="02"
						title="Second Grade Classroom Volunteer at <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.kualapuucharterschool.org/'> <span>Kualapuu Charter School <span></a>"
						sections={[
							{
								title: "Highlights",
								bullets: [
									"Created a <a class='skills-popup__link-text skills__title--animating' href='/macroexamples/macroExampleMathGrader.xlsm'> grading tool</a> to facilitate grading of math assessments.",
									"Created a <a class='skills-popup__link-text skills__title--animating' href='/macroexamples/macroExampleBookTrust.xlsm'>Book Trust tool</a> to facilitate monthly <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.booktrust.org'>Book Trust </a> ordering process.",
									"Used my time to study Bash, Powershell, Windows Active Directory, get the Google IT Support Specialist Certificate, and other IT Support related skills (IT support was the direction I wanted to go in at that point in time).",
								],
							},
						]}
					/>
					<WorkHistoryItem
						startDate="07/07"
						endDate="07/18"
						number="03"
						title="PearsonVue Test Admin / Office Admin at <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.isd622.org/'> ISD622 </a>"
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
									"Created <a class='skills-popup__link-text skills__title--animating' href='/macroexamples/macroExampleScoring.xlsm'>custom grading forms</a> using Excel userForms and macros in order to reduce the time it took to grade assessment tests by 75%.",
									"Created a tool that used testing data to produce reports that the teachers could use to understand the areas in which their students were having difficulties, preventing the purchase of dedicated software.",
								],
							},
						]}
					/>
					<WorkHistoryItem
						startDate="09/06"
						endDate="12/06"
						number="04"
						title="Overnight Stocker at <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.toysrus.com/'> Toy's &ldquo;R&rdquo; Us </a>"
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
						startDate="09/05"
						endDate="07/06"
						number="05"
						title="English Assistant at <a target='_blank' rel='noreferrer' class='skills-popup__link-text skills__title--animating' href='https://www.lietz-schulen.de/en/haubinda/boarding-school-village/'> Herman-Lietz Schule Haubinda </a>"
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
	static headerSideContent = {
		overview: (
			<div className="thumbnail">
				<img src="/self-small.png" alt="Adam Major" />
			</div>
		),
	};
	

	componentDidMount() {
		// this.renderTHREE();
		if (this.props.repos?.length > 0) return;
		this.props.getRepositories();
		this.props.setSectionsToSkipAnimation(Resume.sectionsToSkipAnimation);
	}

	renderSections = () => {
		return Resume.content.map((contentArray, index) => {
			//Returning if there is headerSideContent for this section
			if (Resume.headerSideContent[contentArray[0]]) {
				return (
					<Section
						key={index}
						name={contentArray[0]}
						pageName="resume"
						headerSideContent={Resume.headerSideContent[contentArray[0]]}>
						{contentArray[1]}
					</Section>
				);
			}

			return (
				<Section key={index} name={contentArray[0]} pageName="resume">
					{contentArray[1]}
				</Section>
			);
		});
	};

	render() {
		return (
			<React.Fragment>
				<section className="resume">
					<h2 className="heading heading--two">R&eacute;sum&eacute;</h2>
					{this.renderSections()}
				</section>
				<SkillsPopup />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		repos: state.general.repos,
	};
};

export default connect(mapStateToProps, {
	getRepositories,
	setSectionsToSkipAnimation,
})(Resume);