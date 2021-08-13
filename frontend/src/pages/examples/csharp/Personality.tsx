import React from "react";
import {
	CSharpSection,
	PERSONALITY_PAGE_NAME,
} from "../../../components/constants";
import CSharpCardSection from "./CSharpCardSection";
import CSharpLayout from "./CSharpLayout";
import { C_SHARP_CLASSNAME } from "./utils";

const sectionNames = [
	"Overview",
	"Conscientiousness", //percent: 85,
	"Agreeableness", //percent: 75,
	"Openness", //percent: 70,
	"Neruoticism", //percent: 65
	"Extraversion", //percent: 35,
	"Take Away",
];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="What is the Big Five Assessment?">
					The big five personality traits are the best accepted and most
					commonly used model of personality in academic psychology. &nbsp;
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
					I am the sort of person who likes a clear structure organizing what I
					do.&nbsp; This helps me to focus on what is important.&nbsp; In many
					ways my concern is with 'how' I approach tasks, and in my case this is
					likely to be with a strong sense of self-discipline and the ability to
					work towards longer term goals.&nbsp; I am one who can work steadily
					towards something and who appreciates that sometimes it can take a
					considerable amount of time to achieve a meaningful objective.&nbsp; I
					am likely to pay as much attention to the end of the project as I do
					to the beginning.&nbsp; This view of how things should be done is
					likely to be reinforced by my confidence in my own abilities and a
					wish to do my best for myself and for other people.&nbsp;
				</CSharpCardSection>
				<CSharpCardSection title="Potential Benefits">
					<ol>
						<li>I tend to focuses on task at hand</li>
						<li>I tend to identify key goals</li>
						<li>I have a strong sense of commitment</li>
						<li>I have a structured work style</li>
						<li>I am tolerant of tedious details</li>
						<li>I want to achieve</li>
					</ol>
				</CSharpCardSection>
				<CSharpCardSection title="Potential Downfalls">
					<ol>
						<li>I may commit to the wrong objective</li>
						<li>I may not know when to stop</li>
						<li>I may not re-prioritize tasks</li>
						<li>I may set impossibly high standards</li>
						<li>I may settle on goals too early</li>
						<li>I may use an overly rigid approach</li>
					</ol>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
				I describe myself as someone who is accommodating and open to the views of other people. I tend to trust other people, and can be depended on to have a consistent and forgiving viewpoint. I are very loyal, and build relationships with other people based on mutual respect. Other people's needs influence my dealings with them, and I am often the person who is striving for a harmonious outcome. I am tuned in to those around me and am motivated by  the ultimate welfare of other people. This guides the way in which I negotiate, and as a rule I am generally avoid unnecessary confrontation whenever possible.
				</CSharpCardSection>
				<CSharpCardSection title="Potential Benefits">
					<ol>
						<li>I am accommodating</li>
						<li>I am attuned to others</li>
						<li>I look for a 'win-win' result</li>
						<li>I negotiate through harmony</li>
						<li>I am non-confrontational</li>
						<li>I trust other people</li>
					</ol>
				</CSharpCardSection>
				<CSharpCardSection title="Potential Downfalls">
					<ol>
						<li>I may accept a below standard outcome</li>
						<li>I may be naïve about others' motives</li>
						<li>I may be over-influenced by others’ feelings</li>
						<li>I may be too eager to comply</li>
						<li>I may not drive a hard enough bargain</li>
					</ol>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[3],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
					Content here
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[4],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
					Content here
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[5],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
					Content here
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[6],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
					Content here
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface PersonalityProps {}

const Personality: React.FC<PersonalityProps> = () => {
	return (
		<CSharpLayout sections={sections} pageName={PERSONALITY_PAGE_NAME}>
			{" "}
		</CSharpLayout>
	);
};

export default Personality;
