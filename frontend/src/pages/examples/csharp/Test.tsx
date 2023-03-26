import React from "react";

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
import { DISPLAY_NONE_CLASSNAME, C_SHARP_CLASSNAME, ABOUT_PAGE_NAME } from "../../../components/constants";
import { EmbeddedLink } from "../../../components/EmbeddedLink";
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner";
import { Quote } from "../../../components/Quote";
import { functionToGetContainer, closeCarouselItem } from "../../../helpers";
import { CSharpSection } from "../../../types";
import { CSharpCardSection, CSharpLayout } from "..";
import { Carousel } from "../../../components/carousel2/Carousel";

export const ABOUT_SECTION_NAMES = ["Overview", "Interests", "Music"];

const hobbyQuote = (
	<Quote author="Phyllis McGinley" className="padding-top-1">
		A hobby a day keeps the doldrums away.
	</Quote>
);

const sections: CSharpSection[] = [
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
					I've been playing drums since I was 14.&nbsp; I'm not particularly great, but it's a nice way to relieve stress.
				</CSharpCardSection>
				<CSharpCardSection title="Guitar">
					In high school, a few friends and I started a band.&nbsp; It was
					during this time that I learned how to play guitar.&nbsp; While not as
					naturally-inclined to it, playing guitar is something I find rewarding.&nbsp;
				</CSharpCardSection>
				<CSharpCardSection title="Exercise">
					Sort of a strange thing to put for an 'interest', but going to the gym
					and exercising is the main way that I maintain a healthy mindset.
				</CSharpCardSection>
				<CSharpCardSection title="Seeing the world">
					Here are some photos of enjoyable experiences:
					<Carousel
						items={[
							{
								//testing no description
								srcMain: maui01,
								srcThumbnail: maui01Thumbnail,
							},
							{
								//testing only main item
								srcMain: maui02,
							},
							{
								//testing no thumbnail
								srcMain: maui03,
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
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

type TestProps = {}

export const Test = ({

}: TestProps) => {
    return (
		<React.Fragment>
			<CSharpLayout sections={sections} pageName={ABOUT_PAGE_NAME} />
			<LoadingSpinner forceShow={false}/>
		</React.Fragment>
	);
}