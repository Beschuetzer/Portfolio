import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { LayoutStyledProps } from "../../../layouts/types";
import { Quote } from "../../../components/Quote";
import { ExamplePageLink } from "../ExamplePageLink";
import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";

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

import germany04 from "../../../imgs/about/germany-04.jpg";
import germany05 from "../../../imgs/about/germany-05.jpg";
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
import oregon01 from "../../../imgs/about/oregon-01.jpg";
import oregon02 from "../../../imgs/about/oregon-02.jpg";
import oregon03 from "../../../imgs/about/oregon-03.jpg";

import arizona1 from "../../../imgs/about/arizona1.jpg";
import arizona2 from "../../../imgs/about/arizona2.jpg";
import duluth1 from "../../../imgs/about/duluth1.jpg";
import duluth2 from "../../../imgs/about/duluth2.jpg";
import duluth3 from "../../../imgs/about/duluth3.jpg";
import grandCanyon1 from "../../../imgs/about/grand-canyon1.jpg";
import grandCanyon2 from "../../../imgs/about/grand-canyon2.jpg";
import northernLights1 from "../../../imgs/about/northern-lights1.jpg";
import northernLights2 from "../../../imgs/about/northern-lights2.jpg";
import solarEclipse from "../../../imgs/about/solar-eclispe1.jpeg";
import stlouis from "../../../imgs/about/st-louis.jpg";
import waterfall1 from "../../../imgs/about/waterfall1.jpg";
import waterfall2 from "../../../imgs/about/waterfall2.jpg";
import waterfall3 from "../../../imgs/about/waterfall3.jpg";
import waterfall4 from "../../../imgs/about/waterfall4.jpg";

import arizona1Thumbnail from "../../../imgs/about/thumbnails/arizona1.jpg";
import arizona2Thumbnail from "../../../imgs/about/thumbnails/arizona2.jpg";
import duluth1Thumbnail from "../../../imgs/about/thumbnails/duluth1.jpg";
import duluth2Thumbnail from "../../../imgs/about/thumbnails/duluth2.jpg";
import duluth3Thumbnail from "../../../imgs/about/thumbnails/duluth3.jpg";
import grandCanyon1Thumbnail from "../../../imgs/about/thumbnails/grand-canyon1.jpg";
import grandCanyon2Thumbnail from "../../../imgs/about/thumbnails/grand-canyon2.jpg";
import northernLights1Thumbnail from "../../../imgs/about/thumbnails/northern-lights1.jpg";
import northernLights2Thumbnail from "../../../imgs/about/thumbnails/northern-lights2.jpg";
import solarEclipseThumbnail from "../../../imgs/about/thumbnails/solar-eclispe1.jpeg";
import stlouisThumbnail from "../../../imgs/about/thumbnails/st-louis.jpg";
import waterfall1Thumbnail from "../../../imgs/about/thumbnails/waterfall1.jpg";
import waterfall2Thumbnail from "../../../imgs/about/thumbnails/waterfall2.jpg";
import waterfall3Thumbnail from "../../../imgs/about/thumbnails/waterfall3.jpg";
import waterfall4Thumbnail from "../../../imgs/about/thumbnails/waterfall4.jpg";
import germany04Thumbnail from "../../../imgs/about/thumbnails/germany-04-thumbnail.jpg";
import germany05Thumbnail from "../../../imgs/about/thumbnails/germany-05-thumbnail.jpg";
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
import oregon01Thumbnail from "../../../imgs/about/thumbnails/oregon-01-thumbnail.jpg";
import oregon02Thumbnail from "../../../imgs/about/thumbnails/oregon-02-thumbnail.jpg";
import oregon03Thumbnail from "../../../imgs/about/thumbnails/oregon-03-thumbnail.jpg";
import { defaultFontSize } from "../../../styles/constants";
import { AudioList } from "../../../components/AudioPlayer/AudioList";
import LazyLoadedCarousel from "../../../components/LazyLoadedCarousel";

type AboutProps = {};

export const ABOUT_SECTION_NAMES = ["Overview", "Interests", "Music"];

const ABOUT_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: ABOUT_SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Henry Ford"
          text="Anyone who stops learning is old, whether at twenty or eighty. Anyone
            who keeps learning stays young."
        />
        <ExamplePageParagraph>
          My mind is always active, whether at work or at play. I have a passion
          for learning new things and bring a natural curiosity to everything I
          encounter. While I often enjoy being out in the world, I always look
          forward to evenings at home with others, engaging in great
          conversation or playing a board game. I also find happiness in
          solitary activities, such as working on a project, reading a good
          book, or diving into a challenging problem.
        </ExamplePageParagraph>
        {/* <ExamplePageParagraph>
          Learn about my personality
          <ExamplePageLink url="/the-big-five">here</ExamplePageLink>.
        </ExamplePageParagraph> */}
      </>
    ),
  },
  {
    name: ABOUT_SECTION_NAMES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Phyllis McGinley"
          text="A hobby a day keeps the doldrums away."
        />
        <ExamplePageTitledParagraph title="Biking">
          One of the most enjoyable things I do on a regular basis is bike
          riding. I enjoy it so much, that I even tried using it as my main
          source of transportation for a year.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Hiking">
          Living in Oregon for two years really awakened a fondness for hiking.
          I don't plan on hiking Everest anytime soon, but I definitely enjoy
          any chance I get to explore the outdoors.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Drums">
          I've been playing drums since I was 14. I'm not the best drummer in
          the world, but it's a nice way to relieve stress.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Guitar">
          In high school, a few friends and I started a band. It was during this
          time that I learned how to play guitar. While not as
          naturally-inclined to it, playing guitar is something I find
          rewarding.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Exercise">
          Sort of a strange thing to put for an 'interest', but going to the gym
          and exercising is the main way that I maintain a healthy mindset.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Photos">
          Here are some photos of enjoyable experiences:
          <LazyLoadedCarousel
            options={{
              modal: {
                maintainMinimizedStateAcrossItems: true,
              },
              container: {
                style: {
                  borderRadius: defaultFontSize,
                },
              },
              thumbnail: {
                size: [[166], [100, 1200, "max-width"]],
                descriptionOverlay: {
                  hideDescriptionOverlayUnlessHovered: false,
                  textColor: propsToAdd.colorscheme?.primary4,
                  background: {
                    gradient: {
                      start: {
                        opacity: 0.9,
                        color: propsToAdd.colorscheme?.primary1,
                      },
                      end: {
                        opacity: 0.9,
                        color: propsToAdd.colorscheme?.primary2,
                      },
                      angle: 270,
                    },
                  },
                },
                currentItemBorder: `2px dashed ${propsToAdd.colorscheme?.primary4}`,
              },
              styling: {
                colorTheme: {
                  colorOne: propsToAdd.colorscheme?.primary1,
                  colorTwo: propsToAdd.colorscheme?.primary2,
                  colorThree: propsToAdd.colorscheme?.primary3,
                  colorFour: propsToAdd.colorscheme?.primary3,
                  colorFive: propsToAdd.colorscheme?.primary4,
                  colorGreyOne: propsToAdd.colorscheme?.greyOne,
                },
                container: {
                  margin: {
                    top: 8,
                  },
                },
                itemViewer: {
                  loadingSpinner: {
                    options: {
                      color: propsToAdd.colorscheme?.primary1,
                    },
                  },
                },
              },
            }}
            items={[
              {
                srcMain: arizona1,
                srcThumbnail: arizona1Thumbnail,
                description: "Horseshoe Bend in Arizona",
              },
              {
                srcMain: arizona2,
                srcThumbnail: arizona2Thumbnail,
                description: "Antelope Canyon in Page, Arizona",
              },
              {
                srcMain: duluth1,
                srcThumbnail: duluth1Thumbnail,
                description: "Lake Superior 1",
              },
              {
                srcMain: duluth2,
                srcThumbnail: duluth2Thumbnail,
                description: "Lake Superior 2",
              },
              {
                srcMain: duluth3,
                srcThumbnail: duluth3Thumbnail,
                description: "Lake Superior 3",
              },
              {
                srcMain: grandCanyon1,
                srcThumbnail: grandCanyon1Thumbnail,
                description: "Grand Canyon",
              },
              {
                srcMain: grandCanyon2,
                srcThumbnail: grandCanyon2Thumbnail,
                description: "Grand Canyon 2",
              },
              {
                srcMain: northernLights1,
                srcThumbnail: northernLights1Thumbnail,
                description: "Northern Lights in Grand Marais, MN",
              },
              {
                srcMain: northernLights2,
                srcThumbnail: northernLights2Thumbnail,
                description: "Northern Lights in Grand Marais, MN",
              },
              {
                srcMain: solarEclipse,
                srcThumbnail: solarEclipseThumbnail,
                description: "Total Solar Solar Eclipse in Missouri",
              },
              {
                srcMain: stlouis,
                srcThumbnail: stlouisThumbnail,
                description: "St. Louis Arch",
              },
              {
                srcMain: waterfall1,
                srcThumbnail: waterfall1Thumbnail,
                description: "Waterfall in Northern Minnoesota",
              },
              {
                srcMain: waterfall2,
                srcThumbnail: waterfall2Thumbnail,
                description: "Waterfall in Northern Minnoesota",
              },
              {
                srcMain: waterfall3,
                srcThumbnail: waterfall3Thumbnail,
                description: "Waterfall in Northern Minnoesota",
              },
              {
                srcMain: waterfall4,
                srcThumbnail: waterfall4Thumbnail,
                description: "Waterfall in Northern Minnoesota",
              },
              {
                srcMain: maui01,
                srcThumbnail: maui01Thumbnail,
                description: "Cliff Jumping at Kapalua Cliff House",
              },
              {
                srcMain: maui02,
                srcThumbnail: maui02Thumbnail,
                description: "Friendly Turtle at Kapalua Cliff House",
              },
              {
                srcMain: maui03,
                srcThumbnail: maui03Thumbnail,
                description: "Bamboo Forest Waterfall on Maui",
              },
              {
                srcMain: maui04,
                srcThumbnail: maui04Thumbnail,
                description: "Beautiful Beach on Maui",
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
                srcMain: germany04,
                srcThumbnail: germany04Thumbnail,
                description: "Morning in South Tirol, Italy",
              },
              {
                srcMain: germany05,
                srcThumbnail: germany05Thumbnail,
                description: "Not much left of the old city in Nuernberg",
              },
            ]}
          />
        </ExamplePageTitledParagraph>
      </>
    ),
  },
  // {
  //   name: ABOUT_SECTION_NAMES[2],
  //   renderContent: (propsToAdd: LayoutStyledProps) => (
  //     <>
  //       <Quote
  //         author="Leornard Bernstein"
  //         text="To achieve great things, two things are needed: a plan, and not quite enough time."
  //       />
  //       <ExamplePageTitledParagraph title="An Innate Passion">
  //         Music has been a big part of my life since I was young.&nbsp; Ever
  //         since first discovered Fruity Loops, I have been using music as a
  //         cathartic outlet.&nbsp; The songs are almost universally of low
  //         quality, but the act of getting the idea out of my head into the real
  //         world is really the part that brings me joy.&nbsp; Listening to the
  //         song reminds me of the process.&nbsp;
  //       </ExamplePageTitledParagraph>
  //       <ExamplePageTitledParagraph title="Electronic">
  //         Here are some of the first songs I made on Fruity Loops:
  //         <AudioList
  //           className="margin-top-1"
  //           items={[
  //             {
  //               name: "Adam - Fruity Loops 1",
  //               path: { earliest1 },
  //             },
  //             {
  //               name: "Adam - Fruity Loops 2",
  //               path: { earliest2 },
  //             },
  //             {
  //               name: "Adam - Mario Jingle",
  //               path: { selfMario },
  //             },
  //           ]}
  //         />
  //       </ExamplePageTitledParagraph>
  //       <ExamplePageTitledParagraph title="Youthful Aspirations">
  //         In high school, some friends and I were in a band:
  //         <AudioList
  //           className="margin-top-1"
  //           items={[
  //             {
  //               name: "Band - Altus",
  //               path: { earlier5 },
  //             },
  //             {
  //               name: "Band - Hey Joe",
  //               path: { earlier7 },
  //             },
  //             {
  //               name: "Band - Vodoo Child",
  //               path: { earlier3 },
  //             },
  //             {
  //               name: "Band - Washed Away",
  //               path: { earlier6 },
  //             },
  //           ]}
  //         />
  //       </ExamplePageTitledParagraph>
  //       <ExamplePageTitledParagraph title="Real Instruments">
  //         As time went on, I tried out different genres of music:
  //         <AudioList
  //           className="margin-top-1"
  //           items={[
  //             {
  //               name: "Adam - Honeydew in June",
  //               path: { selfHDIJC },
  //             },
  //             {
  //               name: "Adam - Hopeful Uncertainty",
  //               path: { selfHU },
  //             },
  //             {
  //               name: "Adam - Relentless Sacrifice",
  //               path: { selfRS },
  //             },
  //             {
  //               name: "Adam and Linda - Rear-view Mirror",
  //               path: { earliest3 },
  //             },
  //             {
  //               name: "Steve - Eerie Correspondence",
  //               path: { othersEC },
  //             },
  //             {
  //               name: "Steve - Nostalgia",
  //               path: { othersSweet },
  //             },
  //           ]}
  //         />
  //       </ExamplePageTitledParagraph>
  //       <ExamplePageTitledParagraph title="Making the Most of It">
  //         For a few years, I whole-heartedly pursued the idea of becoming a
  //         recording/mixing engineer.&nbsp; Unfortunately, hard work doesn't
  //         always make up for lack of connections:
  //         <AudioList
  //           className="margin-top-1"
  //           items={[
  //             {
  //               name: "Starlite Five - The Blues is Stalkin' Me",
  //               path: { startliteBISM },
  //             },
  //             {
  //               name: "Starlite Five - That feeling",
  //               path: { startliteJam },
  //             },
  //             {
  //               name: "Starlite Five - Oldsmobile Blue",
  //               path: { startliteOMB },
  //             },
  //             {
  //               name: "Starlite Five - Those Feet",
  //               path: { startliteTF },
  //             },
  //           ]}
  //         />
  //       </ExamplePageTitledParagraph>
  //     </>
  //   ),
  // },
];

export function AboutPage(props: AboutProps) {
  return <ExamplePage title="About Me" sections={ABOUT_SECTIONS} />;
}
