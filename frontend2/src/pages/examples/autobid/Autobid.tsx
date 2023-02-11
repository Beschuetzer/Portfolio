import React from "react";
import { CSharpLayout } from "../csharp/CSharpLayout";

import { C_SHARP_CLASSNAME } from "../csharp/utils";
import { AUTO_BID_PAGE_NAME, GITHUB_URL } from "../../../components/constants";
import { CSharpCardSection } from "../csharp";
import { CSharpSection } from "../../../types";

const sectionNames = [
	"Details",
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
				<CSharpCardSection title="The Project">
					Autobid is a collaborative work-in-progress with a friend who is
					learning Python.&nbsp; The goal is to create a rudimentary bidding AI,
					that humans can play with (rather than a machine-learning-driven AI
					whose rationale are unknown).&nbsp;
				</CSharpCardSection>
				<CSharpCardSection title="The Approach">
					Our approach to the AI is to effectively emulate moderate to high
					level bridge play during the bidding phase (the part that involves
					partner communication with incomplete information and ultimately
					determines the viability of making the contract) while playing like
					the best human players during the trick-taking phase.&nbsp;
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="The Collaborative Process">
					<ol>
						<li>
							We decide what we are going to work on for that day.
						</li>
						<li> We discuss our understanding of the problem.</li>
						<li>
							We take turns making our case for why we think what we think, using data/examples when possible.
						</li>
						<li>
							We reach some level of basic agreement on how the AI
							should behave in general with regards to the behavior in question.
						</li>
						<li>
							We start writing test cases to make sure we aren't
							missing anything (this is also the time when our assumptions are
							really put to the test).
						</li>
						<li>
							I creat the coding architecture for the feature/section.
						</li>
						<li>We take turns writing code to pass the test cases.</li>
					</ol>
				</CSharpCardSection>
				<CSharpCardSection title="E.T.A">
					We usually devoted ~ 8 hours every Saturday to the project are on
					track to finish the bidding phase part of the AI in the fall of
					2021.&nbsp;
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface AutoBidProps {}

export const AutoBid: React.FC<AutoBidProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			pageName={AUTO_BID_PAGE_NAME}
			sourceCodeLink={`${GITHUB_URL}/${AUTO_BID_PAGE_NAME}`}/>
	);
};

