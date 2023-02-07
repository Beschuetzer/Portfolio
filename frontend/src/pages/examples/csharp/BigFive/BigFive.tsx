import React from "react";
import {
	CSharpSection,
	BIG_FIVE_PAGE_NAME,
} from "../../../../components/constants";
import { PercentBar, PercentBarLabel } from "../../../../components/PercentBar/PercentBar";
import CSharpCardSection from "../CSharpCardSection";
import CSharpLayout from "../CSharpLayout";
import { C_SHARP_CLASSNAME } from "../utils";
import BigFiveItem from "./BigFiveItem";

const sectionNames = [
	"Overview",
	"Conscientiousness", //percent: 85,
	"Agreeableness", //percent: 75,
	"Openness", //percent: 70,
	"Neuroticism", //percent: 55
	"Extraversion", //percent: 35,
	"Take Away",
];

const label: PercentBarLabel = {
	left: "0",
	center: "50",
	right: "100",
};

const percentBarValues = [
	85,
	75,
	70,
	55,
	35,
];

const percentBars = [
	"",
	<React.Fragment>
		<br></br>
		<PercentBar value={percentBarValues[0]} label={label} percent={percentBarValues[0]} />
	</React.Fragment>,
		<React.Fragment>
		<br></br>
		<PercentBar value={percentBarValues[1]} label={label} percent={percentBarValues[1]} />
	</React.Fragment>,
		<React.Fragment>
		<br></br>
		<PercentBar value={percentBarValues[2]} label={label} percent={percentBarValues[2]} />
	</React.Fragment>,
		<React.Fragment>
		<br></br>
		<PercentBar value={percentBarValues[3]} label={label} percent={percentBarValues[3]} />
	</React.Fragment>,
		<React.Fragment>
		<br></br>
		<PercentBar value={percentBarValues[4]} label={label} percent={percentBarValues[4]} />
	</React.Fragment>,

	"",
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

				<CSharpCardSection>
					Below you will find my rating for each of the five personality traits
					as well as a description of what they mean.
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<BigFiveItem
				benefits={[
					"I tend to focus on the task at hand",
					"I tend to identify key goals",
					"I have a strong sense of commitment",
					"I have a structured work style",
					"I am tolerant of tedious details",
					"I want to achieve",
				]}
				pitfalls={[
					"I may commit to the wrong objective",
					"I may not know when to stop",
					"I may not re-prioritize tasks",
					"I may set impossibly high standards",
					"I may settle on goals too early",
					"I may use an overly rigid approach",
				]}>
				I am the sort of person who likes a clear structure organizing what I
				do.&nbsp; This helps me to focus on what is important.&nbsp; In many
				ways my concern is with 'how' I approach tasks, and in my case this is
				likely to be with a strong sense of self-discipline and the ability to
				work towards longer term goals.&nbsp; I am one who can work steadily
				towards something and who appreciates that sometimes it can take a
				considerable amount of time to achieve a meaningful objective.&nbsp; I
				am likely to pay as much attention to the end of the project as I do to
				the beginning.&nbsp; This view of how things should be done is likely to
				be reinforced by my confidence in my own abilities and a wish to do my
				best for myself and for other people.&nbsp;
			</BigFiveItem>,
		],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<BigFiveItem
				benefits={[
					"I am accommodating",
					"I am attuned to others",
					"I look for a 'win-win' result",
					"I negotiate through harmony",
					"I am non-confrontational",
					"I trust other people",
				]}
				pitfalls={[
					"I may accept a below standard outcome",
					"I may be naïve about others' motives",
					"I may be over-influenced by others’ feelings",
					"I may be too eager to comply",
					"I may not drive a hard enough bargain",
				]}>
				I generally am accommodating and open to the views of other
				people.&nbsp; I tend to trust other people, and can be depended on to
				have a consistent and forgiving viewpoint.&nbsp; I am very loyal, and
				build relationships with other people based on mutual respect.&nbsp;
				Other people's needs influence my dealings with them, and I am often the
				person who is striving for a harmonious outcome.&nbsp; I am tuned in to
				those around me and am motivated by the ultimate welfare of other
				people.&nbsp; This guides the way in which I negotiate, and as a rule I
				am generally avoid unnecessary confrontation whenever possible.&nbsp;
			</BigFiveItem>,
		],
	},
	{
		name: sectionNames[3],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<BigFiveItem
				benefits={[
					"I bring experience to strategy",
					"I am a flexible problem solver",
					"I am a pragmatic thinker",
					"I see detail and bigger picture",
					"I tend to be cautious",
					"I work to maintain the system",
				]}
				pitfalls={[
					"I tend to err on the side of caution",
					"I may be too quick to change style",
					"I may confuse knowledge with foresight",
					"I may find it hard to focus",
					"I may over rely on middle way",
					"I may work too slowly",
				]}>
				I take a balanced approach to solving problems.&nbsp; I am likely to be
				able to think of new and original ways of approaching situations, but
				not at the expense of ignoring well-established solutions, already known
				to work.&nbsp; This will often involve investigating problems by taking
				an open-ended view of what might work, and not being afraid to change
				things if necessary.&nbsp; I often have an eye for whether something
				will be effective both now and in the future.&nbsp; I put emphasis on
				juggling the facts and making changes, large or small, in order to make
				a decision that will stand the test of time.&nbsp;
			</BigFiveItem>,
		],
	},
	{
		name: sectionNames[4],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<BigFiveItem
				benefits={[
					"I am aware of others’ emotional states",
					"I cope with most things",
					"I am even tempered",
					"I have a low level of tension",
					"I manage feelings",
					"I take onboard criticism",
				]}
				pitfalls={[
					"I may appear too unresponsive",
					"I may be distracted by others’ emotions",
					"I may be slow to ask for help",
					"I may lack energy to act quickly",
					"I may not show real feelings",
				]}>
				I tend to respond to pressure in a relaxed way but also know when to
				take things seriously.&nbsp; I am able to let minor irritations
				go.&nbsp; I am someone who is generally calm, and not the sort to dwell
				on things, but who is also 'on guard' at times.&nbsp; I listen to other
				people and take note of what they say, but am not prone to let criticism
				interfere with what I do.&nbsp; When it comes to managing my feelings, I
				tend to respond to situations in a measured manner, as I have a good
				understanding of my ability to cope.&nbsp; Indeed my friends and
				colleagues might well describe me as an even-tempered and positive
				person.&nbsp; By and large I feel well able to deal with most of what
				life hands me.&nbsp;
			</BigFiveItem>,
		],
	},
	{
		name: sectionNames[5],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<BigFiveItem
				benefits={[
					"I am contemplative",
					"I am dispassionate",
					"I excel at independent work",
					"I am measured",
					"I think before acting",
					"I am thoughtful",
				]}
				pitfalls={[
					"I may accept a below standard outcome",
					"I may be naïve about others' motives",
					"I may be over-influenced by others’ feelings",
					"I may be too eager to comply",
					"I may not drive a hard enough bargain",
				]}>
				I am someone who would prefer to operate by myself or with limited
				interaction with others.&nbsp; I like to keep my own counsel and do not
				have a strong need to express my views or opinions.&nbsp; When it comes
				to the energy I put into life, being a self-contained, reflective
				person, I am generally quite happy in my own world.&nbsp; That is not to
				say I am disinterested in other people - rather that I am likely to
				prefer one-on-one or small group interactions that feel more
				manageable.&nbsp; Larger groups can be draining to me and, therefore, I
				need time alone to recharge.&nbsp; Overall I may show a low level of
				visible energy because I have a reflective 'think-do-think' approach to
				getting things done.&nbsp;
			</BigFiveItem>,
		],
	},
	{
		name: sectionNames[6],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="What I Complement Well">
					I am steady, confident and resourceful, and compatible with most
					workers. Since I am able to let stress roll off my back, while
					maintaining my concentration on the goal at hand, I steadfastly
					accomplish whatever professional goals I or others set for me. At the
					same time, since I also enjoy engaging in the process of doing, am
					intuitive, and am able to work collaboratively with all but the least
					conscientious and open-minded of co-workers, I am valued by colleagues
					and executives alike.
				</CSharpCardSection>
				<CSharpCardSection title="Potential Conflicts">
					As an industrious worker and a lover of people, I am fortunate that I
					work well with most sorts of people. However, often sought out for my
					innate amicability, I occasionall come across others who try to
					dominate and manipulate me. In such case, I employ a large amount of
					assertiveness in order to earn respect from others. Finally, because
					of my industriousness, I find it more challenging to work with those
					who have closed minds and little work ethic.
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface PersonalityProps {}

const BigFive: React.FC<PersonalityProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			headerSideContents={percentBars}
			pageName={BIG_FIVE_PAGE_NAME}>
			{" "}
		</CSharpLayout>
	);
};

export default BigFive;
