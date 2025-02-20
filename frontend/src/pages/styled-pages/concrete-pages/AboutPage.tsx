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

import germany02 from "../../../imgs/about/germany-02.jpg";
import germany03 from "../../../imgs/about/germany-03.jpg";
import germany04 from "../../../imgs/about/germany-04.jpg";
import germany05 from "../../../imgs/about/germany-05.jpg";
import germany07 from "../../../imgs/about/germany-07.jpg";
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

import germany02Thumbnail from "../../../imgs/about/thumbnails/germany-02-thumbnail.jpg";
import germany03Thumbnail from "../../../imgs/about/thumbnails/germany-03-thumbnail.jpg";
import germany04Thumbnail from "../../../imgs/about/thumbnails/germany-04-thumbnail.jpg";
import germany05Thumbnail from "../../../imgs/about/thumbnails/germany-05-thumbnail.jpg";
import germany07Thumbnail from "../../../imgs/about/thumbnails/germany-07-thumbnail.jpg";
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
import { Carousel } from "react-thumbnail-carousel";
import {
  DEFAULT_FONT_SIZE,
  CAROUSEL_COLORS,
} from "../../../components/constants";
import { AudioList } from "../../../components/AudioPlayer/AudioList";

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
          My mind is always working, whether at work or at play. I enjoy
          learning new things and bring a natural curiosity to everything I
          encounter. While I enjoy being out in the world, I always look forward
          to evenings at home with one or two good friends and great
          conversation. I can also find happiness on my own, working on a
          project or reading a good book.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          Learn about my personality
          <ExamplePageLink url="/the-big-five">here</ExamplePageLink>.
        </ExamplePageParagraph>
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
          source of transportation for a year (quite a challenge given I did it
          in Minnesota).
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Hiking">
          Living in Oregon for two years really fostered a fondness for hiking.
          I don't plan on hiking Everest anytime soon, but I will definitely
          enjoy any chance I get to change my elevation by using my feet.
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Drums">
          I've been playing drums since I was 14. I'm not particularly great,
          but it's a nice way to relieve stress.
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
        <ExamplePageTitledParagraph title="Seeing the world">
          Here are some photos of enjoyable experiences:
          <Carousel
            options={{
              modal: {
                maintainMinimizedStateAcrossItems: true,
              },
              container: {
                style: {
                  borderRadius: `${DEFAULT_FONT_SIZE}rem`,
                },
              },
              thumbnail: {
                size: [[166], [100, 1200, "max-width"]],
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
                  colorGreyOne: CAROUSEL_COLORS.about.greyOne,
                },
                container: {
                  margin: {
                    top: 8,
                  },
                },
                itemViewer: {
                  loadingSpinner: {
                    options: {
                      color: CAROUSEL_COLORS.downloader.primary1,
                    },
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
        </ExamplePageTitledParagraph>
      </>
    ),
  },
  {
    name: ABOUT_SECTION_NAMES[2],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Leornard Bernstein"
          text="To achieve great things, two things are needed: a plan, and not quite enough time."
        />
        <ExamplePageTitledParagraph title="An Innate Passion">
          Music has been a big part of my life since I was young.&nbsp; Ever
          since first discovered Fruity Loops, I have been using music as a
          cathartic outlet.&nbsp; The songs are almost universally of low
          quality, but the act of getting the idea out of my head into the real
          world is really the part that brings me joy.&nbsp; Listening to the
          song reminds me of the process.&nbsp;
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Electronic">
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
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Youthful Aspirations">
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
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Real Instruments">
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
        </ExamplePageTitledParagraph>
        <ExamplePageTitledParagraph title="Making the Most of It">
          For a few years, I whole-heartedly pursued the idea of becoming a
          recording/mixing engineer.&nbsp; Unfortunately, hard work doesn't
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
        </ExamplePageTitledParagraph>
      </>
    ),
  },
];

export function AboutPage(props: AboutProps) {
  return <ExamplePage title="About Me" sections={ABOUT_SECTIONS} />;
}
