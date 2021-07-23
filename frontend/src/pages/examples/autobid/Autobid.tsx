import React from "react";
import CSharpLayout from "../csharp/CSharpLayout";

import { C_SHARP_CLASSNAME } from "../csharp/utils";
import Paragraph from "../../../typography/Paragraph";
import { CSharpSection } from "../../../components/constants";

const sectionNames = [
	'Purpose',
	'Collaboration',
	// 'Media',
	// 'Notes'
]

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<Paragraph size="four" classNameToAdd="margin-top-2 padding-bottom-2">
					Autobid is a collaborative work-in-progress with a friend who is learning Python. The goal is to create a rudimentary bidding AI, that humans can play with (rather than a machine-learning-driven AI whose rationale are unknown).&nbsp; Our approach to the AI is to effectively emulate moderate to high level bridge play during the bidding phase (this is the part that involves partner communication with incomplete information.  The bidding ultimately determines who plays the hand and how many tricks they have to make) while playing like the best human players during the trick-taking phase.
				</Paragraph>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
          <Paragraph size="four" classNameToAdd="margin-top-2 padding-bottom-2">
            Our approach to working together was a multi-step process.  First, we would decide what we were going to work on for that day.  Second, we discussed our ideas about how we understood the problem.  Thirds, we both made our cases for why we thought what we thought using examples when necessary.  Fourth, we ultimately would agree on how the AI should behave in general with regards to the feature in question.  Fifth, we  started writing test cases to make sure we weren't missing anything.  Sixth, I would lay out the overall design of the feature/section.  Seven, we would take turns writing code to pass the test cases.  We devoted ~ 8 hours every Saturday to the project, and we are on track to finish the bidding phase part of the AI before the fall of 2021.
          </Paragraph>
			</React.Fragment>,
		],
	},
	// {
	// 	styles: {
	// 		position: 'relative',
	// 	},
	// 	name: sectionNames[1],
	// 	pageName: C_SHARP_CLASSNAME,
	// 	children: [
	// 		<section className="csharp__carousel">
	// 			<Carousel
	// 				items={[
	// 					{
	// 						itemSrc: imgProblem,
	// 						description: "156 songs transferred but an empty playlist...",
	// 					},
	// 					{
	// 						itemSrc: demoVideo,
	// 						description: "Video Demonstration",
	// 					},
	// 					{
	// 						itemSrc: img1,
	// 						description: "The complete user interface",
	// 					},
	// 					{
	// 						itemSrc: img2,
	// 						description: 	"Left-side of UI",
	// 					},
	// 					{
	// 						itemSrc: img3,
	// 						description: "Playlists available section of UI",
	// 					},
	// 					{
	// 						itemSrc: img4,
	// 						description: "Transfer section of UI after transfer",
	// 					},
	// 				]}
	// 				numberOfItemsInCarouselAtOneTime="3"
	// 				numberOfItemsToScrollOnClick="3"
	// 				functionToGetContainer={functionToGetContainer}
	// 				functionToRunOnClose={fixZIndexIssue.bind(null, null as any, `#${sectionNames[1].toLowerCase()}`)}
	// 			/>
	// 		</section>
	// 	]
	// },
];

interface AutoBidProps {

}

const AutoBid: React.FC<AutoBidProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			pageName="autobid"
			sourceCodeLink="https://github.com/Beschuetzer/autobid">
		</CSharpLayout>
	);
};

export default AutoBid;

