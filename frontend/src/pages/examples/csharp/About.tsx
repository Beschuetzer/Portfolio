//This page should have the following:
//   I grew up in Minnesota. Visited England, Ireland, and Whales when I was 16 through People to People (started by Dwight D. Eisenhower), Graduated HS, Moved to Germany when I was 19 to teach/tutor English at a boarding school.  Studied Linguistics (regrettably not a degree with a B.S. in front of it), Helped adults meet their educational goals for 10 years, while pursuing the idea of starting a recording studio, moved to Hawaii for 1 year (avoided serious sun burn), moved to Oregon to fix MFDs, PANDEMIC!, Web Developer...

//Philosophy
//I believe in the value of TDD when the tests are written properly, however I have yet to fully learn how to use e2e suites like Cypress.  OO and Functional Programming can co-exist in my world (there's a time and place for both).
//prefer to be Agile when possible rather than a Waterfall
//Find it important to create things I would want to use as well as the intended audience
//prefer leave the design to others
//love to get my hands dirty by building systems and fixing bugs (especially love the feeling of fixing something I initially thought was unfixable/impossible)

//interests: playing drums/guitar, riding bike, exercising, Astronomy(almost majored in it)

//Music (add these songs in the form of an AudioPlayer component):
// ein paar ganz schnelle - 2003,
// mario remix - 2004,
// adam and linda's song- 2006,
// old band practice songs - 2009
// luminiscent ether mastered up - 2012,
// steve's sweet song original - 2013,
// eerie correspondence - 2013,
// reunited ozone master - 2013,
// hopeful uncertainty mastered - 2013,
// honeydew in june b 3rd version - 2014,
// relentless shame remastered 2 - 2013,
// 4 starlite five songs (sweet jam too, blues is stalking more reverb) - 2015-16

// <script>
//   function play() {
//     var audio = document.getElementById("audio");
//     audio.play();
//   }
// </script>

// <input type="button" value="PLAY" onclick="play()">
// <audio controls id='audio'>
// 	<source src="horse.ogg" type="audio/ogg">
// 	<source src="horse.mp3" type="audio/mpeg">
// 	Your browser does not support the audio element.
// </audio>

import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CSharpLayout from "./CSharpLayout";

import EmbeddedLink from "../../../components/EmbeddedLink";
// import img1 from "../../../imgs/About/img1.png";
import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import { CAROUSEL_CLASSNAME } from "../../../components/Carousel/util";
import {
	closeCarouselItem,
	functionToGetContainer,
} from "../../../components/utils";
import {
	CSharpSection,
} from "../../../components/constants";

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
					time.&nbsp; By means of said careful reflection, I realized that I would not
					be able to live a self-realized life, if I did not give it my best
					shot at professional coder.
				</CSharpCardSection>
				<CSharpCardSection title="Long Time Coming">
					I have always been enamored with the idea of becoming a computer
					programmer.&nbsp; If my dad had not had a heart attack, I am sure I would
					have chosen to study Computer Science at University instead of
					Linguistics.&nbsp; The constant The thing is, my dad was a programmer for a
					company called Deluxe for 1 years.&nbsp; However, I saw how much my dad’s
					new position as a project manager caused him a lot of stress, which
					eventually to a heart attack.&nbsp; I naively attributed his heart attack to
					coding in my mind and decided to pursue other things, even though I
					had a thing for programming.&nbsp;, and I finally realized that this may be
					my last chance to become a programmer.&nbsp;
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		styles: {
			position: "relative",
		},
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<section className={`${C_SHARP_CLASSNAME}__${CAROUSEL_CLASSNAME}`}>
				<Carousel
					items={
						[
							// {
							// 	itemSrc: img1,
							// 	description: "The manual way of downloading",
							// },
						]
					}
					numberOfItemsInCarouselAtOneTime="3"
					numberOfItemsToScrollOnClick="3"
					functionToGetContainer={functionToGetContainer}
					functionToRunOnClose={closeCarouselItem.bind(
						null,
						null as any,
						`#${sectionNames[1].toLowerCase()}`,
					)}></Carousel>
			</section>,
		],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="A Passion for Sound">Music</CSharpCardSection>
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
	return <CSharpLayout sections={sections} pageName="About"> </CSharpLayout>;
};

export default About;
