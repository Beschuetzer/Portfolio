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
import {
	CSharpSection,
	DISPLAY_NONE_CLASSNAME,
	GERMANY_APP_URL,
} from "../../../components/constants";

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
import joshuaTree01 from "../../../imgs/about/joshua-tree-01.jpg";
import joshuaTree02 from "../../../imgs/about/joshua-tree-02.jpg";
import maui01 from "../../../imgs/about/maui-01.jpg";
import maui02 from "../../../imgs/about/maui-02.jpg";
import maui03 from "../../../imgs/about/maui-03.jpg";
import maui04 from "../../../imgs/about/maui-04.jpg";
import maui05 from "../../../imgs/about/maui-05.jpg";
import maui06 from "../../../imgs/about/maui-06.jpg";
import maui07 from "../../../imgs/about/maui-07.jpg";
import molokai01 from "../../../imgs/about/molokai-01.jpg";
import molokai02 from "../../../imgs/about/molokai-02.jpg";
import molokai03 from "../../../imgs/about/molokai-03.jpg";
import molokai04 from "../../../imgs/about/molokai-04.jpg";
import molokai05 from "../../../imgs/about/molokai-05.jpg";
import oregon01 from "../../../imgs/about/oregon-01.jpg";
import oregon02 from "../../../imgs/about/oregon-02.jpg";
import oregon03 from "../../../imgs/about/oregon-03.jpg";
import p2p01 from "../../../imgs/about/p2p-01.png";
import p2p02 from "../../../imgs/about/p2p-02.png";
import p2p03 from "../../../imgs/about/p2p-03.png";
import p2p04 from "../../../imgs/about/p2p-04.png";

import germany01Thumbnail from "../../../imgs/about/thumbnails/germany-01-thumbnail.jpg";
import germany02Thumbnail from "../../../imgs/about/thumbnails/germany-02-thumbnail.jpg";
import germany03Thumbnail from "../../../imgs/about/thumbnails/germany-03-thumbnail.jpg";
import germany04Thumbnail from "../../../imgs/about/thumbnails/germany-04-thumbnail.jpg";
import germany05Thumbnail from "../../../imgs/about/thumbnails/germany-05-thumbnail.jpg";
import germany06Thumbnail from "../../../imgs/about/thumbnails/germany-06-thumbnail.jpg";
import germany07Thumbnail from "../../../imgs/about/thumbnails/germany-07-thumbnail.jpg";
import germany08Thumbnail from "../../../imgs/about/thumbnails/germany-08-thumbnail.jpg";
import germany09Thumbnail from "../../../imgs/about/thumbnails/germany-09-thumbnail.jpg";
import joshuaTree01Thumbnail from "../../../imgs/about/thumbnails/joshua-tree-01-thumbnail.jpg";
import joshuaTree02Thumbnail from "../../../imgs/about/thumbnails/joshua-tree-02-thumbnail.jpg";
import maui01Thumbnail from "../../../imgs/about/thumbnails/maui-01-thumbnail.jpg";
import maui02Thumbnail from "../../../imgs/about/thumbnails/maui-02-thumbnail.jpg";
import maui03Thumbnail from "../../../imgs/about/thumbnails/maui-03-thumbnail.jpg";
import maui04Thumbnail from "../../../imgs/about/thumbnails/maui-04-thumbnail.jpg";
import maui05Thumbnail from "../../../imgs/about/thumbnails/maui-05-thumbnail.jpg";
import maui06Thumbnail from "../../../imgs/about/thumbnails/maui-06-thumbnail.jpg";
import maui07Thumbnail from "../../../imgs/about/thumbnails/maui-07-thumbnail.jpg";
import molokai01Thumbnail from "../../../imgs/about/thumbnails/molokai-01-thumbnail.jpg";
import molokai02Thumbnail from "../../../imgs/about/thumbnails/molokai-02-thumbnail.jpg";
import molokai03Thumbnail from "../../../imgs/about/thumbnails/molokai-03-thumbnail.jpg";
import molokai04Thumbnail from "../../../imgs/about/thumbnails/molokai-04-thumbnail.jpg";
import molokai05Thumbnail from "../../../imgs/about/thumbnails/molokai-05-thumbnail.jpg";
import oregon01Thumbnail from "../../../imgs/about/thumbnails/oregon-01-thumbnail.jpg";
import oregon02Thumbnail from "../../../imgs/about/thumbnails/oregon-02-thumbnail.jpg";
import oregon03Thumbnail from "../../../imgs/about/thumbnails/oregon-03-thumbnail.jpg";
import p2p01Thumbnail from "../../../imgs/about/thumbnails/p2p-01-thumbnail.png";
import p2p02Thumbnail from "../../../imgs/about/thumbnails/p2p-02-thumbnail.png";
import p2p03Thumbnail from "../../../imgs/about/thumbnails/p2p-03-thumbnail.png";
import p2p04Thumbnail from "../../../imgs/about/thumbnails/p2p-04-thumbnail.png";

import AudioList from "../../../components/AudioPlayer/AudioList";
import AudioPlayer from "../../../components/AudioPlayer/AudioPlayer";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import Carousel from "../../../components/Carousel/Carousel";
import {
	closeCarouselItem,
	functionToGetContainer,
} from "../../../components/utils";
import EmbeddedLink from "../../../components/EmbeddedLink";
import Quote from "../../../components/Quote";
import ClassToggler from "../../../components/ClassToggler";

const sectionNames = ["Backstory", "Interests", "Music"];

const germanyCarousel = (
	<section
		id="german-carousel"
		className={`${DISPLAY_NONE_CLASSNAME} csharp__carousel padding-0`}>
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
			]}
			numberOfItemsInCarouselWidthWise="3"
			numberOfItemsToScrollOnClick="3"
			functionToGetContainer={functionToGetContainer}
			functionToRunOnClose={closeCarouselItem.bind(
				null,
				null as any,
				`#${sectionNames[0].toLowerCase()}`,
			)}></Carousel>
	</section>
);

const likesCarousel = (
	<section className="csharp__carousel margin-top-0 padding-bottom-0">
		<Carousel
			items={[
				{
					itemSrc: maui01,
					itemThumbnailSrc: maui01Thumbnail,
					description: "Cliff Jumping at Kapalua Cliff House",
				},
				{
					itemSrc: maui02,
					itemThumbnailSrc: maui02Thumbnail,
					description: "Friendly Turtle Visit",
				},
				{
					itemSrc: maui03,
					itemThumbnailSrc: maui03Thumbnail,
					description: "Bamboo Forest Waterfall on Maui",
				},
				{
					itemSrc: maui04,
					itemThumbnailSrc: maui04Thumbnail,
					description: "Stunning Beach, Less than Ideal Sand",
				},
				{
					itemSrc: maui05,
					itemThumbnailSrc: maui05Thumbnail,
					description: "Haleakalā Sunset",
				},
				{
					itemSrc: maui06,
					itemThumbnailSrc: maui06Thumbnail,
					description: "Haleakalā Backside",
				},
				{
					itemSrc: maui07,
					itemThumbnailSrc: maui07Thumbnail,
					description: "Haleakalā Backside 2",
				},
				{
					itemSrc: joshuaTree01,
					itemThumbnailSrc: joshuaTree01Thumbnail,
					description: "Joshua Tree Sunset",
				},
				{
					itemSrc: joshuaTree02,
					itemThumbnailSrc: joshuaTree02Thumbnail,
					description: "Joshua Tree Rock Formation",
				},
				{
					itemSrc: molokai01,
					itemThumbnailSrc: molokai01Thumbnail,
					description: "Molokai Roots",
				},
				{
					itemSrc: molokai02,
					itemThumbnailSrc: molokai02Thumbnail,
					description: "Make Horse Beach on Molokai",
				},
				{
					itemSrc: molokai03,
					itemThumbnailSrc: molokai03Thumbnail,
					description: "Kaunakakai Harbor Sunet",
				},
				{
					itemSrc: molokai04,
					itemThumbnailSrc: molokai04Thumbnail,
					description: "Double the Rainbow, Double the Treasure",
				},
				{
					itemSrc: molokai05,
					itemThumbnailSrc: molokai05Thumbnail,
					description: "Molokai Biking Requires Preparedness",
				},
				{
					itemSrc: oregon01,
					itemThumbnailSrc: oregon01Thumbnail,
					description: "Sweet Creek in Oregon",
				},
				{
					itemSrc: oregon02,
					itemThumbnailSrc: oregon02Thumbnail,
					description: "Oregon Coast",
				},
				{
					itemSrc: oregon03,
					itemThumbnailSrc: oregon03Thumbnail,
					description: "Another Oregonian Creek",
				},
			]}
			numberOfItemsInCarouselWidthWise="3"
			numberOfItemsToScrollOnClick="3"
			functionToGetContainer={functionToGetContainer}
			functionToRunOnClose={closeCarouselItem.bind(
				null,
				null as any,
				`#${sectionNames[1].toLowerCase()}`,
			)}></Carousel>
	</section>
);

const peopleToPeopleCarousel = (
	<section
		id="p2p-carousel"
		className={`${DISPLAY_NONE_CLASSNAME} csharp__carousel padding-top-0`}>
		<Carousel
			items={[
				{
					itemSrc: p2p01,
					itemThumbnailSrc: p2p01Thumbnail,
					description: "Abseiling an English Castle",
				},
				{
					itemSrc: p2p02,
					itemThumbnailSrc: p2p02Thumbnail,
					description: "Team Building Exercise",
				},
				{
					itemSrc: p2p03,
					itemThumbnailSrc: p2p03Thumbnail,
					description: "Roman Infantry Training",
				},
				{
					itemSrc: p2p04,
					itemThumbnailSrc: p2p04Thumbnail,
					description: "The Training Commences",
				},
			]}
			numberOfItemsInCarouselWidthWise="3"
			numberOfItemsToScrollOnClick="3"
			functionToGetContainer={functionToGetContainer}
			functionToRunOnClose={closeCarouselItem.bind(
				null,
				null as any,
				`#${sectionNames[0].toLowerCase()}`,
			)}></Carousel>
	</section>
);

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				{/* <CSharpCardSection title="Making the Most of a Tough Situation">
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
				</CSharpCardSection> */}

				<Quote author="Henry Ford">
					Anyone who stops learning is old, whether at twenty or eighty. Anyone
					who keeps learning stays young.
				</Quote>
				<CSharpCardSection title="A Way of Life">
					The above quote sheds a lot of light onto the choices I have made in
					my life.&nbsp; After I graduated high school, I wanted to learn more
					about the world and its inhabitants (a desire that was fostered by
					my&nbsp;
					<ClassToggler
						classToToggle={DISPLAY_NONE_CLASSNAME}
						targetSelector="#p2p-carousel">
						People to People Experience
					</ClassToggler>{" "}
					to England, Ireland, and Whales in 10th Grade).{" "}
					{peopleToPeopleCarousel} &nbsp;To this end, I
					<EmbeddedLink isLocal={false} href={GERMANY_APP_URL}>
						applied
					</EmbeddedLink>
					to a posting I found online for an English Assistant at a boarding
					school in Thuringia, Germany.&nbsp; As a result of this experience,{" "}
					<ClassToggler
						classToToggle={DISPLAY_NONE_CLASSNAME}
						targetSelector="#german-carousel">
						I learned a lot
					</ClassToggler>{" "}
					about myself, my prior assumptions, and German culture.&nbsp;
					{germanyCarousel}
				</CSharpCardSection>
			</React.Fragment>,
		],
		hasCarousel: true,
	},
	{
		hasCarousel: true,
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Biking">
					One of the most enjoyable things I do on a regular basis is bike riding.&nbsp;  I enjoy it so much, that I even tried using it as my main source of transportation for a year (quite a challenge given I did it in Minnesota).&nbsp;
				</CSharpCardSection>
				<CSharpCardSection title="Hiking">
					Living in Oregon for two years really fostered a fondness for hiking.&nbsp;  I don't plan on hiking Everest anytime soon, but I will definitely enjoy any chance I get to change my elevation by using my feet.  
				</CSharpCardSection>
				<CSharpCardSection title="Drums">
					My dad was a drummer, so growing up I had the privilege of having access to a drum kit while growing up.&nbsp;  For what ever reason, the way my brain works is well-suited to playing drums
				</CSharpCardSection>
				<CSharpCardSection title="Guitar">
					In high school, a few friends and I started a band.&nbsp;  It was during this time that I learned how to play guitar.&nbsp;  While not as naturally-inclined to it, playing guitar is something I find very rewarding.&nbsp;
				</CSharpCardSection>
				<CSharpCardSection title="Exercise">
					Sort of a strange thing to put for an 'interest', but going to the gym and exercising is the main way that I cope with stress.&nbsp;  Without it, I am but a pile of saggy mortality.
				</CSharpCardSection>
				<CSharpCardSection title="Proof of Concept">
				Here are some photos of enjoyable moments I've had:
				{likesCarousel}

				</CSharpCardSection>
			</React.Fragment>,
		],
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
];

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
	return (
		<React.Fragment>
			<LoadingSpinner />
			<CSharpLayout sections={sections} pageName="about">
				{" "}
			</CSharpLayout>
			<AudioPlayer />
		</React.Fragment>
	);
};

export default About;
