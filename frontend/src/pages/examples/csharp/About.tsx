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

import earlier1 from "../../../music/renaming/Earlier-01.mp3";
import earlier2 from "../../../music/renaming/Earlier-02.mp3";
import earlier3 from "../../../music/renaming/Earlier-03.mp3";
import earlier4 from "../../../music/renaming/Earlier-04.mp3";
import earlier5 from "../../../music/renaming/Earlier-05.mp3";
import earlier6 from "../../../music/renaming/Earlier-06.mp3";
import earlier7 from "../../../music/renaming/Earlier-07.mp3";
import earliest1 from "../../../music/renaming/Earliest-01.mp3";
import earliest2 from "../../../music/renaming/Earliest-02.mp3";
import earliest3 from "../../../music/renaming/Earliest-03.mp3";
import othersEC from "../../../music/renaming/Others - EC.mp3";
import othersHoneyDew from "../../../music/renaming/Others - Honeydew in June.mp3";
import othersLE from "../../../music/renaming/Others - LE.mp3";
import othersQC from "../../../music/renaming/Others - QC.mp3";
import othersReunited from "../../../music/renaming/Others - Reunited.mp3";
import othersSweet from "../../../music/renaming/Others - Sweet.mp3";
import selfFD from "../../../music/renaming/Self - FD.mp3";
import selfHDIJB from "../../../music/renaming/Self - HDIJ - B.mp3";
import selfHDICC from "../../../music/renaming/Self - HDICJ - C.mp3";
import selfHU from "../../../music/renaming/Self - HU.mp3";
import selfMario from "../../../music/renaming/Self - Mario.mp3";
import selfRS from "../../../music/renaming/Self - RS.mp3";
import startliteBISM from "../../../music/renaming/Startlite - BISM.mp3";
import startliteJam from "../../../music/renaming/Startlite - Jam.mp3";
import startliteOMB from "../../../music/renaming/Startlite - OMB.mp3";
import startliteTF from "../../../music/renaming/Startlite - TF.mp3";

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
			</React.Fragment>,
		],
	},
	{
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
					Music
					<AudioPlayer
						items={[
							{
								name: "Adam - Earlier 1",
								path: {earlier1},
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
		<CSharpLayout sections={sections} pageName="About">
			{" "}
		</CSharpLayout>
	);
};

export default About;
