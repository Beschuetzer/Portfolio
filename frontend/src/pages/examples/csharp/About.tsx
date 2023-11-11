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
import { CSharpLayout } from "./CSharpLayout";
import {
  ABOUT_PAGE_NAME,
  CAROUSEL_COLORS,
  C_SHARP_CLASSNAME,
  DEFAULT_FONT_SIZE,
  DISPLAY_NONE_CLASSNAME,
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

import { AudioList } from "../../../components/AudioPlayer/AudioList";
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner";
import { Carousel } from "react-thumbnail-carousel";
import { EmbeddedLink } from "../../../components/EmbeddedLink";
import { Quote } from "../../../components/Quote";
import { CSharpCardSection } from "./CSharpCardSection";
import { CSharpSection } from "../../../types";

export const ABOUT_SECTION_NAMES = ["Overview", "Interests", "Music"];
const germanyCarousel = (
  <section className="csharp__carousel margin-top-0 padding-bottom-0">
    <Carousel
      items={[
        {
          srcMain: germany06,
          srcThumbnail: germany06Thumbnail,
          description: "Residence and its caretaker",
        },
        {
          srcMain: germany01,
          srcThumbnail: germany01Thumbnail,
          description: "A Family I had the pleasure of meeting",
        },
        {
          srcMain: germany02,
          srcThumbnail: germany02Thumbnail,
          description: "Learning is never-ending Path",
        },
        {
          srcMain: germany03,
          srcThumbnail: germany03Thumbnail,
          description: "Sunset in Hungary on the Balaton See",
        },
        {
          srcMain: germany04,
          srcThumbnail: germany04Thumbnail,
          description: "Morning in South Tirol, Italy",
        },
        {
          srcMain: germany05,
          srcThumbnail: germany05Thumbnail,
          description: "Not much left of the old city in Nuernberg",
        },
        {
          srcMain: germany07,
          srcThumbnail: germany07Thumbnail,
          description: "The pain is real even if the equipment is not",
        },
        {
          srcMain: germany09,
          srcThumbnail: germany09Thumbnail,
          description: "Shields only work if you know how to use them",
        },
        {
          srcMain: germany08,
          srcThumbnail: germany08Thumbnail,
          description: "WanderTag!  (Learn by doing)",
        },
      ]}
    />
  </section>
);

const travelCarousel = (
  <Carousel
    options={{
      layout: {
      },
      container: {
        style: {
          borderRadius: `${DEFAULT_FONT_SIZE}rem`,
        },
      },
      thumbnail: {
        size: 266,
        descriptionOverlay: {
          hideDescriptionOverlayUnlessHovered: false,
          textColor: CAROUSEL_COLORS.about.primary4,
          background: {
            gradient: {
              start: {
                opacity: 0.9,
                color: CAROUSEL_COLORS.about.primary1,
              },
              end: {
                opacity: 0.9,
                color: CAROUSEL_COLORS.about.primary2,
              },
              angle: 270,
            },
          },
        },
        currentItemBorder: `2px dashed ${CAROUSEL_COLORS.about.primary4}`,
      },
      styling: {
        colorTheme: {
          colorOne: CAROUSEL_COLORS.about.primary1,
          colorTwo: CAROUSEL_COLORS.about.primary2,
          colorThree: CAROUSEL_COLORS.about.primary3,
          colorFour: CAROUSEL_COLORS.about.primary3,
          colorFive: CAROUSEL_COLORS.about.primary4,
          colorGreyOne: "#ddd",
        },
        container: {
          margin: {
            top: 8,
          },
        },
      },
    }}
    items={[
      {
        srcMain: maui01,
        srcThumbnail: maui01Thumbnail,
        description: "Cliff Jumping at Kapalua Cliff House",
      },
      {
        srcMain: maui02,
        srcThumbnail: maui02Thumbnail,
        description: "Friendly Turtle Visit",
      },
      {
        srcMain: maui03,
        srcThumbnail: maui03Thumbnail,
        description: "Bamboo Forest Waterfall on Maui",
      },
      {
        srcMain: maui04,
        srcThumbnail: maui04Thumbnail,
        description: "Stunning Beach, Less than Ideal Sand",
      },
      {
        srcMain: maui05,
        srcThumbnail: maui05Thumbnail,
        description: "Haleakalā Sunset",
      },
      {
        srcMain: maui06,
        srcThumbnail: maui06Thumbnail,
        description: "Haleakalā Backside",
      },
      {
        srcMain: maui07,
        srcThumbnail: maui07Thumbnail,
        description: "Haleakalā Backside 2",
      },
      {
        srcMain: joshuaTree01,
        srcThumbnail: joshuaTree01Thumbnail,
        description: "Joshua Tree Sunset",
      },
      {
        srcMain: joshuaTree02,
        srcThumbnail: joshuaTree02Thumbnail,
        description: "Joshua Tree Rock Formation",
      },
      {
        srcMain: molokai01,
        srcThumbnail: molokai01Thumbnail,
        description: "Molokai Roots",
      },
      {
        srcMain: molokai02,
        srcThumbnail: molokai02Thumbnail,
        description: "Make Horse Beach on Molokai",
      },
      {
        srcMain: molokai03,
        srcThumbnail: molokai03Thumbnail,
        description: "Kaunakakai Harbor Sunet",
      },
      {
        srcMain: molokai04,
        srcThumbnail: molokai04Thumbnail,
        description: "Double the Rainbow, Double the Treasure",
      },
      {
        srcMain: molokai05,
        srcThumbnail: molokai05Thumbnail,
        description: "Molokai Biking Requires Preparedness",
      },
      {
        srcMain: oregon01,
        srcThumbnail: oregon01Thumbnail,
        description: "Sweet Creek in Oregon",
      },
      {
        srcMain: oregon02,
        srcThumbnail: oregon02Thumbnail,
        description: "Oregon Coast",
      },
      {
        srcMain: oregon03,
        srcThumbnail: oregon03Thumbnail,
        description: "Another Oregonian Creek",
      },
      {
        srcMain: germany02,
        srcThumbnail: germany02Thumbnail,
        description: "Haubinda, Germany",
      },
      {
        srcMain: germany03,
        srcThumbnail: germany03Thumbnail,
        description: "Sunset in Hungary on the Balaton See",
      },
      {
        srcMain: germany04,
        srcThumbnail: germany04Thumbnail,
        description: "Morning in South Tirol, Italy",
      },
      {
        srcMain: germany05,
        srcThumbnail: germany05Thumbnail,
        description: "Not much left of the old city in Nuernberg",
      },
      {
        srcMain: germany07,
        srcThumbnail: germany07Thumbnail,
        description: "The pain is real even if the equipment is not",
      },
      {
        srcMain: germany09,
        srcThumbnail: germany09Thumbnail,
        description: "Shields only work if you know how to use them",
      },
      {
        srcMain: p2p01,
        srcThumbnail: p2p01Thumbnail,
        description: "Abseiling an English Castle",
      },
    ]}
  />
);

const peopleToPeopleCarousel = (
  <section
    id="p2p-carousel"
    className={`${DISPLAY_NONE_CLASSNAME} csharp__carousel padding-top-0`}
  >
    <Carousel
      items={[
        {
          srcMain: p2p01,
          srcThumbnail: p2p01Thumbnail,
          description: "Abseiling an English Castle",
        },
        {
          srcMain: p2p02,
          srcThumbnail: p2p02Thumbnail,
          description: "Team Building Exercise",
        },
        {
          srcMain: p2p03,
          srcThumbnail: p2p03Thumbnail,
          description: "Roman Infantry Training",
        },
        {
          srcMain: p2p04,
          srcThumbnail: p2p04Thumbnail,
          description: "The Training Commences",
        },
      ]}
    />
  </section>
);

const regretQuote = (
  <Quote author="Anonymous" className="padding-bottom-1">
    In the end, we only regret the chances we didn't take, relationships we were
    afraid to have, and the decisions we waited too long to make.
  </Quote>
);

const youngQuote = (
  <Quote author="Henry Ford" className="padding-top-1">
    Anyone who stops learning is old, whether at twenty or eighty. &nbsp;Anyone
    who keeps learning stays young.
  </Quote>
);

const greatThingsQuote = (
  <Quote author="Leornard Bernstein" className="padding-top-1">
    To achieve great things, two things are needed: a plan, and not quite enough
    time.
  </Quote>
);

const hobbyQuote = (
  <Quote author="Phyllis McGinley" className="padding-top-1">
    A hobby a day keeps the doldrums away.
  </Quote>
);

const selfDoubtQuote = (
  <Quote author="Sylvia Plath" className="padding-top-1">
    And by the way, everything in life is writable about if you have the
    outgoing guts to do it, and the imagination to improvise. The worst enemy to
    creativity is self-doubt.
  </Quote>
);

const sections: CSharpSection[] = [
  {
    name: ABOUT_SECTION_NAMES[0],
    pageName: C_SHARP_CLASSNAME,
    children: [
      <React.Fragment>
        {youngQuote}
        <CSharpCardSection>
          My mind is always working, whether at work or at play. I enjoy
          learning new things and bring a natural curiosity to everything I
          encounter. While I enjoy being out in the world, I always look forward
          to evenings at home with one or two good friends and great
          conversation. I can also find happiness on my own, working on a
          project or reading a good book.
        </CSharpCardSection>
        <CSharpCardSection>
          Learn about my personality{" "}
          <EmbeddedLink
            href="/the-big-five"
            addSpaces={false}
            isLocal={true}
            openInNewTab={false}
          >
            here
          </EmbeddedLink>
        </CSharpCardSection>
      </React.Fragment>,
    ],
    hasCarousel: true,
  },
  {
    hasCarousel: true,
    name: ABOUT_SECTION_NAMES[1],
    pageName: C_SHARP_CLASSNAME,
    children: [
      <React.Fragment>
        {hobbyQuote}
        <CSharpCardSection title="Biking">
          One of the most enjoyable things I do on a regular basis is bike
          riding.&nbsp; I enjoy it so much, that I even tried using it as my
          main source of transportation for a year (quite a challenge given I
          did it in Minnesota).&nbsp;
        </CSharpCardSection>
        <CSharpCardSection title="Hiking">
          Living in Oregon for two years really fostered a fondness for
          hiking.&nbsp; I don't plan on hiking Everest anytime soon, but I will
          definitely enjoy any chance I get to change my elevation by using my
          feet.
        </CSharpCardSection>
        <CSharpCardSection title="Drums">
          I've been playing drums since I was 14.&nbsp; I'm not particularly
          great, but it's a nice way to relieve stress.
        </CSharpCardSection>
        <CSharpCardSection title="Guitar">
          In high school, a few friends and I started a band.&nbsp; It was
          during this time that I learned how to play guitar.&nbsp; While not as
          naturally-inclined to it, playing guitar is something I find
          rewarding.&nbsp;
        </CSharpCardSection>
        <CSharpCardSection title="Exercise">
          Sort of a strange thing to put for an 'interest', but going to the gym
          and exercising is the main way that I maintain a healthy mindset.
        </CSharpCardSection>
        <CSharpCardSection title="Seeing the world">
          Here are some photos of enjoyable experiences:
          {travelCarousel}
        </CSharpCardSection>
      </React.Fragment>,
    ],
  },
  {
    name: ABOUT_SECTION_NAMES[2],
    pageName: C_SHARP_CLASSNAME,
    children: [
      <React.Fragment>
        {greatThingsQuote}
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
          For a few years, I whole-heartedly pursued the idea of becoming a
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
  // {
  // 	name: ABOUT_SECTION_NAMES[3],
  // 	pageName: C_SHARP_CLASSNAME,
  // 	children: [
  // 		<React.Fragment>
  // 			{regretQuote}
  // 			<CSharpCardSection title="Why Now?">
  // 				If you had asked me what my career goals were in January of 2020, I'd
  // 				have told to that I want to become a level 3 Tech Support Specialist
  // 				or a Systems Administrator (I didn't believe I could ever have the
  // 				necessary pre-requisites to becoming a programmer, which is what I
  // 				really wanted to do).&nbsp; When I left&nbsp;
  // 				<EmbeddedLink
  // 					href={`${RESUME_URL}#ricoh`}
  // 					openInNewTab={true}
  // 					isLocal={true}
  // 					addSpaces={false}>
  // 					Ricoh
  // 				</EmbeddedLink>
  // 				, I had more free time on my hands than I'd had in a while.&nbsp; I
  // 				used that free time to start learning c# (I was familiar with&nbsp;
  // 				<EmbeddedLink
  // 					href={POWERSHELL_URL}
  // 					openInNewTab={true}
  // 					isLocal={false}
  // 					addSpaces={false}>
  // 					Powershell
  // 				</EmbeddedLink>
  // 				, so c# seemed like a logical next step) with the intent of solving a
  // 				couple "problems" I had had at the time (see{" "}
  // 				<EmbeddedLink
  // 					isLocal={true}
  // 					href={DOWNLOADER_URL}
  // 					openInNewTab={true}>
  // 					Downloader
  // 				</EmbeddedLink>{" "}
  // 				and{" "}
  // 				<EmbeddedLink
  // 					isLocal={true}
  // 					href={PLAYLIST_SYNCER_URL}
  // 					openInNewTab={true}>
  // 					Playlist Syncer
  // 				</EmbeddedLink>
  // 				).&nbsp; One thing led to another until I eventually realized that I
  // 				would regret not pursuing a career in Programming/Web
  // 				Development.&nbsp;
  // 			</CSharpCardSection>

  // 			<CSharpCardSection title="Why not Comp Sci?">
  // 				<div>
  // 					After I graduated high school, I wanted to learn more about the
  // 					world and its inhabitants (a desire that was fostered by my&nbsp;
  // 					<ClassToggler
  // 						classToToggle={DISPLAY_NONE_CLASSNAME}
  // 						targetSelector="#p2p-carousel">
  // 						People to People Experience
  // 					</ClassToggler>
  // 					&nbsp; to England, Ireland, and Whales in 10th Grade).&nbsp;
  // 					{peopleToPeopleCarousel} &nbsp;I had studied German throughout high
  // 					school and even won a scholarship to be used to further my knowledge
  // 					of German and/or German culture.&nbsp; I could've used the
  // 					scholarship to take German classes, but I was young and for some
  // 					reason believed that Europeans were "better" versions of
  // 					Americans.&nbsp;
  // 				</div>
  // 				<div className="margin-top-1">
  // 					I wanted to learn to be "better", so I began searching for ways to
  // 					go to Germany that involved total immersion.&nbsp; Eventually, I
  // 					found a posting online for an English Assistant at a boarding school
  // 					in Thuringia, Germany.&nbsp; It seemed like a good fit, so I&nbsp;
  // 					<EmbeddedLink
  // 						isLocal={false}
  // 						href={GERMANY_APP_URL}
  // 						addSpaces={false}>
  // 						applied
  // 					</EmbeddedLink>
  // 					&nbsp; to it. &nbsp; Overall, it was a very challenging and&nbsp;
  // 					<ClassToggler
  // 						classToToggle={DISPLAY_NONE_CLASSNAME}
  // 						targetSelector="#german-carousel">
  // 						rewarding experience
  // 					</ClassToggler>{" "}
  // 					.&nbsp; Frankly, I learned a lot about myself, my assumptions, human
  // 					nature, and what "being an American" means to me.
  // 					{germanyCarousel}
  // 				</div>
  // 				<Paragraph size="five" classNameToAdd="margin-top-1">
  // 					Upon returning home, I took some time re-acclimate myself to
  // 					American culture (I had been the only "American" at the school).
  // 					&nbsp;I wasn't sure what I wanted to study yet, so I spent the
  // 					summer volunteering at two English as a Second Language schools (
  // 					<EmbeddedLink
  // 						isLocal={false}
  // 						addSpaces={false}
  // 						href={HUBB_CENTER_URL}>
  // 						The Hubb Center
  // 					</EmbeddedLink>
  // 					&nbsp;and&nbsp;
  // 					<EmbeddedLink isLocal={false} addSpaces={false} href={HARMONY_URL}>
  // 						Harmony Learning Center
  // 					</EmbeddedLink>
  // 					).
  // 				</Paragraph>
  // 				<Paragraph size="five" classNameToAdd="margin-top-1">
  // 					&nbsp;As Summerwas winding up, my father had a talk to me about
  // 					finishing my bachelor's degree.&nbsp; At the time, my father was of
  // 					the opinion that the degree was less important than just having a
  // 					college degree (this was a time when many freshman would choose
  // 					majors like "Psychology", "Philosophy", and "English" without any
  // 					real clue as to how they would use those degrees upon graduation).
  // 				</Paragraph>
  // 				{selfDoubtQuote}
  // 				<Paragraph size="five" classNameToAdd="margin-top-1">
  // 					At that time, I was entertaining three choices: Astronomy, Computer
  // 					Science, and Linguistics. &nbsp;Astronomy involved a lot of math and
  // 					physics, which I enjoyed, but I ultimately doubted how well I would
  // 					be able to handle the highest levels of math needed to be a
  // 					successful astronomer, so I entertained other options.
  // 				</Paragraph>
  // 				<Paragraph size="five" classNameToAdd="margin-top-1">
  // 					Computer Science was the most appealing option at the time, but I
  // 					ultimately shied away from it for two reasons.&nbsp; First, my dad
  // 					had been promoted to a team leader (from a developer
  // 					position).&nbsp; I didn't realize it at the time, but his comments
  // 					and attitude toward the new position negatively affected by
  // 					perception of the whole field.&nbsp; Second, I had just spent 11
  // 					months learning and perfecting my German and I didn't want to the
  // 					proficiency I had built up.&nbsp;
  // 				</Paragraph>
  // 				<Paragraph size="five" classNameToAdd="margin-top-1">
  // 					Knowing what I know now, it's hard to understand why I chose to
  // 					major in Linguistics (I was ignorant of the fact that a B.A. degree
  // 					would limit my options in the job market as they are generally
  // 					considered inferior to B.S. degrees).&nbsp; I tell myself I made the
  // 					"best" choice with what I knew at the time, but if I could, I would
  // 					use inception to plant the idea that majoring in computer science is
  // 					the "best" choice, even if I thought I would end up with a 2.0 G.P.A.
  // 				</Paragraph>
  // 			</CSharpCardSection>
  // 		</React.Fragment>,
  // 	],
  // 	hasCarousel: false,
  // },
];

interface AboutProps {}

export const About: React.FC<AboutProps> = () => {
  return (
    <React.Fragment>
      <CSharpLayout sections={sections} pageName={ABOUT_PAGE_NAME} />
      <LoadingSpinner forceShow={false} />
    </React.Fragment>
  );
};
