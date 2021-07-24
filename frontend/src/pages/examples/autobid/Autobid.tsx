import React from "react";
import CSharpLayout from "../csharp/CSharpLayout";

import { C_SHARP_CLASSNAME } from "../csharp/utils";
import Paragraph from "../../../typography/Paragraph";
import { CSharpSection, GITHUB_URL } from "../../../components/constants";

const sectionNames = [
	"Purpose",
	"Collaboration",
	// 'Media',
	// 'Notes'
];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<Paragraph size="four" classNameToAdd="margin-top-2 ">
					Autobid is a collaborative work-in-progress with a friend who is
					learning Python.&nbsp; The goal is to create a rudimentary bidding AI,
					that humans can play with (rather than a machine-learning-driven AI
					whose rationale are unknown).&nbsp;
				</Paragraph>
				<Paragraph size="four" classNameToAdd="margin-top-2 padding-bottom-2">
					Our approach to the AI is to effectively emulate moderate to high
					level bridge play during the bidding phase (the part that involves
					partner communication with incomplete information and ultimately
					determines the viability of making the contract) while playing like
					the best human players during the trick-taking phase.&nbsp;
				</Paragraph>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<Paragraph size="four" classNameToAdd="margin-top-2 ">
					Our collaborative process was multi-faceted:
					<ol className="margin-left-3">
						<li>
							&nbsp;We decided what we were going to work on for that day.
						</li>
						<li> &nbsp;We discussed our understanding of the problem.</li>
						<li>
							&nbsp;We took turns making our case for why we thought what we
							&nbsp;Using examples when necessary.
						</li>
						<li>
							&nbsp;We reached some level of basic agreement on how the AI
							should behave in general with regards to the behavior in question.
						</li>
						<li>
							&nbsp;We started writing test cases to make sure we weren't
							missing anything (this was also the time when our assumptions were
							really put to the test).
						</li>
						<li>
							{" "}
							&nbsp;I created the coding architecture for the feature/section.
						</li>
						<li>&nbsp;We taked turns writing code to pass the test cases.</li>
					</ol>
				</Paragraph>
				<Paragraph size="four" classNameToAdd="margin-top-2 padding-bottom-2">
					We usually devoted ~ 8 hours every Saturday to the project are
					on track to finish the bidding phase part of the AI in the fall of
					2021.&nbsp;
				</Paragraph>
			</React.Fragment>,
		],
	},
];

interface AutoBidProps {}

const AutoBid: React.FC<AutoBidProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			pageName="autobid"
			sourceCodeLink={`${GITHUB_URL}/autobid`}> </CSharpLayout>
	);
};

export default AutoBid;
