//This page should have the following:
//   I grew up in Minnesota. Visited England, Ireland, and Whales when I was 16 through People to People (started by Dwight D. Eisenhower), Graduated HS, Moved to Germany when I was 19 to teach/tutor English at a boarding school.  Studied Linguistics (regrettably not a degree with a B.S. in front of it), Helped adults meet their educational goals for 10 years, while pursuing the idea of starting a recording studio, moved to Hawaii for 1 year (avoided serious sun burn), moved to Oregon to fix MFDs, PANDEMIC!, Web Developer...

//Philosophy
//I believe in the value of TDD when the tests are written properly, however I have yet to fully learn how to use e2e suites like Cypress.  OO and Functional Programming can co-exist in my world (there's a time and place for both).
//prefer to be Agile when possible rather than a Waterfall
//Find it important to create things I would want to use as well as the intended audience
//prefer leave the design to others
//love to get my hands dirty by building systems and fixing bugs (especially love the feeling of fixing something I initially thought was unfixable/impossible)

//interests: playing drums/guitar, riding bike, exercising, Astronomy(almost majored in it)

import React from "react";
import CSharpLayout from "./CSharpLayout";
import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import { CSharpSection } from "../../../components/constants";

import earlier3 from "../../../music/Earlier_03.mp3";
import earlier5 from "../../../music/Earlier_05.mp3";
import earlier6 from "../../../music/Earlier_06.mp3";
import earlier7 from "../../../music/Earlier_07.mp3";
import earliest1 from "../../../music/Earliest_01.mp3";
import earliest2 from "../../../music/Earliest_02.mp3";
import earliest3 from "../../../music/Earliest_03.mp3";
import othersEC from "../../../music/Others_EC.mp3";
import othersLE from "../../../music/Others_LE.mp3";
import othersQC from "../../../music/Others_QC.mp3";
import othersReunited from "../../../music/Others_Reunited.mp3";
import othersSweet from "../../../music/Others_Sweet.mp3";
import selfHDIJC from "../../../music/Self_HIDJ_C.mp3";
import selfHU from "../../../music/Self_HU.mp3";
import selfMario from "../../../music/Self_Mario.mp3";
import selfRS from "../../../music/Self_RS.mp3";
import startliteBISM from "../../../music/Starlite_Five_BISM.mp3";
import startliteJam from "../../../music/Starlite_Five_Jam.mp3";
import startliteOMB from "../../../music/Starlite_Five_OMB.mp3";
import startliteTF from "../../../music/Starlite_Five_TF.mp3";

import germany01 from "../../../imgs/about/germany-01.jpg";
import germany02 from "../../../imgs/about/germany-02.jpg";
import germany03 from "../../../imgs/about/germany-03.jpg";
import germany04 from "../../../imgs/about/germany-04.jpg";
import germany05 from "../../../imgs/about/germany-05.jpg";
import germany06 from "../../../imgs/about/germany-06.jpg";
import germany07 from "../../../imgs/about/germany-07.jpg";
import germany08 from "../../../imgs/about/germany-08.jpg";
import germany09 from "../../../imgs/about/germany-09.jpg";

import germany01Thumbnail from "../../../imgs/about/thumbnails/germany-01-thumbnail.jpg";
import germany02Thumbnail from "../../../imgs/about/thumbnails/germany-02-thumbnail.jpg";
import germany03Thumbnail from "../../../imgs/about/thumbnails/germany-03-thumbnail.jpg";
import germany04Thumbnail from "../../../imgs/about/thumbnails/germany-04-thumbnail.jpg";
import germany05Thumbnail from "../../../imgs/about/thumbnails/germany-05-thumbnail.jpg";
import germany06Thumbnail from "../../../imgs/about/thumbnails/germany-06-thumbnail.jpg";
import germany07Thumbnail from "../../../imgs/about/thumbnails/germany-07-thumbnail.jpg";
import germany08Thumbnail from "../../../imgs/about/thumbnails/germany-08-thumbnail.jpg";
import germany09Thumbnail from "../../../imgs/about/thumbnails/germany-09-thumbnail.jpg";

import AudioList from "../../../components/AudioPlayer/AudioList";
import AudioPlayer from "../../../components/AudioPlayer/AudioPlayer";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import Carousel from "../../../components/Carousel/Carousel";

const germanyCarousel = (
	<section className="csharp__carousel margin-0 padding-top-0">
		<Carousel
			items={[
				{
					itemSrc: germany06,
					itemThumbnailSrc: germany06Thumbnail,
					description: "Residence and its caretaker",
				},
				{
					itemSrc: germany01,
					itemThumbnailSrc: germany01Thumbnail,
					description: "A Family I had the pleasure of meeting",
				},
				{
					itemSrc: germany02,
					itemThumbnailSrc: germany02Thumbnail,
					description: "The path (learning) is a never-ending",
				},
				{
					itemSrc: germany03,
					itemThumbnailSrc: germany03Thumbnail,
					description: "Sunset in Hungary on the Balaton See",
				},
				{
					itemSrc: germany04,
					itemThumbnailSrc: germany04Thumbnail,
					description: "Morning in South Tirol, Italy",
				},
				{
					itemSrc: germany05,
					itemThumbnailSrc: germany05Thumbnail,
					description: "Not much left of the old city in Nuernberg",
				},
				{
					itemSrc: germany07,
					itemThumbnailSrc: germany07Thumbnail,
					description: "The pain is real even if the equipment is not",
				},
				{
					itemSrc: germany09,
					itemThumbnailSrc: germany09Thumbnail,
					description: "Shields only work if you know how to use them",
				},
				{
					itemSrc: germany08,
					itemThumbnailSrc: germany08Thumbnail,
					description: "WanderTag!  (Learn by doing)",
				},
			]}></Carousel>
	</section>
);

const sectionNames = ["Introduction", "Likes", "Music", "Philosophy"];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Making the Most of a Tough Situation">
					The outbreak of the COVID-19 Pandemic provided me with a lot of time
					to reflect on my career choices and where I want to be in 10 years
					time.&nbsp; By means of said careful reflection, I realized that I
					would not be able to live a self-realized life, if I did not give it
					my best shot at professional coder.
				</CSharpCardSection>
				<CSharpCardSection title="Long Time Coming">
					I have always been enamored with the idea of becoming a computer
					programmer.&nbsp; If my dad had not had a heart attack, I am sure I
					would have chosen to study Computer Science at University instead of
					Linguistics.&nbsp; The constant The thing is, my dad was a programmer
					for a company called Deluxe for 1 years.&nbsp; However, I saw how much
					my dad’s new position as a project manager caused him a lot of stress,
					which eventually to a heart attack.&nbsp; I naively attributed his
					heart attack to coding in my mind and decided to pursue other things,
					even though I had a thing for programming.&nbsp;, and I finally
					realized that this may be my last chance to become a programmer.&nbsp;
				</CSharpCardSection>
				{germanyCarousel}
			</React.Fragment>,
		],
	},
	{
		styles: {
			position: "relative",
		},
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="A Passion for Sound">
					Music has been a big part of my life since I was young.&nbsp; Ever
					since first discovered Fruity Loops, I have been using music as a
					cathartic outlet.&nbsp; The songs are almost universally of low
					quality, but the act of getting the idea out of my head into the real
					world is really the part that brings me joy.&nbsp; Listening to the
					song reminds me of the process.&nbsp;
				</CSharpCardSection>
				<CSharpCardSection title="Electronic">
					Here are some of the first songs I made on Fruity Loops
					<AudioList
						className="margin-top-1"
						items={[
							{
								name: "Adam - Fruity Loops 1",
								path: { earliest1 },
							},
							{
								name: "Adam - Fruity Loops 2",
								path: { earliest2 },
							},
							{
								name: "Adam - Mario Jingle",
								path: { selfMario },
							},
						]}
					/>
				</CSharpCardSection>
				<CSharpCardSection title="Youthful Aspirations">
					In high school, some friends and I were in a band:
					<AudioList
						className="margin-top-1"
						items={[
							{
								name: "Band - Altus",
								path: { earlier5 },
							},
							{
								name: "Band - Hey Joe",
								path: { earlier7 },
							},
							{
								name: "Band - Vodoo Child",
								path: { earlier3 },
							},
							{
								name: "Band - Washed Away",
								path: { earlier6 },
							},
						]}
					/>
				</CSharpCardSection>
				<CSharpCardSection title="Real Instruments">
					As my interest and talent grew, I began trying to learn how to sing
					and record songs using more than just electronic samples and
					instruments:
					<AudioList
						className="margin-top-1"
						items={[
							{
								name: "Adam - Honeydew in June",
								path: { selfHDIJC },
							},
							{
								name: "Adam - Hopeful Uncertainty",
								path: { selfHU },
							},
							{
								name: "Adam - Relentless Sacrifice",
								path: { selfRS },
							},
							{
								name: "Adam and Linda - Rear-view Mirror",
								path: { earliest3 },
							},
							{
								name: "Paula - Quiet Condolences",
								path: { othersQC },
							},
							{
								name: "Paula, and Steve - Luminescent Ether",
								path: { othersLE },
							},
							{
								name: "Steve - Eerie Correspondence",
								path: { othersEC },
							},
							{
								name: "Steve - Reunited",
								path: { othersReunited },
							},
							{
								name: "Steve - Nostalgia",
								path: { othersSweet },
							},
						]}
					/>
				</CSharpCardSection>
				<CSharpCardSection title="Making the Most of It">
					For a few years, I whole-heartily pursued the idea of becoming a
					recording/mixing engineer.&nbsp; Unfortunately, devotion doesn't
					always make up for lack of skill and connections:
					<AudioList
						className="margin-top-1"
						items={[
							{
								name: "Starlite Five - The Blues is Stalkin' Me",
								path: { startliteBISM },
							},
							{
								name: "Starlite Five - That feeling",
								path: { startliteJam },
							},
							{
								name: "Starlite Five - Oldsmobile Blue",
								path: { startliteOMB },
							},
							{
								name: "Starlite Five - Those Feet",
								path: { startliteTF },
							},
						]}
					/>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[3],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="A Passion for Sound">Music</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
	return (
		<React.Fragment>
			<LoadingSpinner />
			<CSharpLayout sections={sections} pageName="About"></CSharpLayout>
			<AudioPlayer />
		</React.Fragment>
	);
};

export default About;
