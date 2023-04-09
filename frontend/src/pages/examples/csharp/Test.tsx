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
import clipFilters from "../../../clips/replay-viewer/filters.mp4";
import clipFiltersThumbnail from "../../../clips/replay-viewer/thumbnails/filters-thumbnail.png";
import clipAnimations from "../../../clips/replay-viewer/animations.mp4";
import clipAnimationsThumbnail from "../../../clips/replay-viewer/thumbnails/animations-thumbnail.png";

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
import { functionToGetContainer, closeCarouselItem, toggleScrollability, getComputedStyleCustom } from "../../../helpers";
import { CSharpSection } from "../../../types";
import { CSharpCardSection, CSharpLayout } from "..";
import { Carousel } from "../../../components/carousel2/components/Carousel";
import { Carousel as CarouselOriginal } from "../../../components/Carousel/Carousel";

export const ABOUT_SECTION_NAMES = ["Overview", "Interests", "Music"];

const germanyCarousel = (
	<section className="csharp__carousel margin-top-0 padding-bottom-0">
		<CarouselOriginal
			items={[
				{
					itemSrc: clipFilters,
					itemThumbnailSrc: clipFiltersThumbnail,
					description: "Applying Filters",
					videoOverlayText: "Applying Filters",
					videoOverlayChildren: (
						<div>
							<CSharpCardSection title="Contract is 1&clubs;">
								The first part of the video highlights the process of
								applying the contract matching filter.&nbsp; There are two
								matches found.
							</CSharpCardSection>
							<CSharpCardSection title="Two Filters = Double the Filtering">
								The second filter applied requires 'Ann' to have the
								2&clubs;. In one of the filtered games, she does and in the
								other one she doesn't.
							</CSharpCardSection>
						</div>
					),
				},
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
					description: "Learning is never-ending Path",
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
				`#${ABOUT_SECTION_NAMES[0].toLowerCase()}`,
			)}
		/>
	</section>
);
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
				<CSharpCardSection title="Original">
					{germanyCarousel}
				</CSharpCardSection>
				
				<CSharpCardSection title="Seeing the world">
					Here are some photos of enjoyable experiences:
					<Carousel
						options={{
							video: {
								autoHideToolbarDuration: 2000,
								seekAmount: 10000,
							},
							thumbnail: {
								backgroundColor: getComputedStyleCustom('--color-primary-2'),
								textColor: getComputedStyleCustom('--color-primary-4'),
							}
						}}
						svgHrefs={{
							closeButton: "./sprite.svg#icon-close",
							nextButton: "./sprite.svg#icon-skip-forward",
							pauseButton: "./sprite.svg#icon-pause",
							playButton: "./sprite.svg#icon-play",
							previousButton: "./sprite.svg#icon-skip-backward",
							restartButton: "./sprite.svg#icon-restart",
							seekBackButton: "./sprite.svg#icon-backward",
							seekForwardButton: "./sprite.svg#icon-forward",
							stopButton: "./sprite.svg#icon-stop",
						}}
						items={[
							{
								description: "Animations",
								srcMain: clipAnimations,
								srcThumbnail: clipAnimationsThumbnail,
								video: {
									overlayProps: {								
										// title: "Contract is 1&clubs;",
										// text: "The first part of the video highlights the process of applying the contract matching filter.&nbsp; There are two matches found.",
										children: (
											<>
										 		<CSharpCardSection title="Contract is 1&clubs;">
										 			The first part of the video highlights the process of
										 			applying the contract matching filter.&nbsp; There are two
										 			matches found.
										 		</CSharpCardSection>
										 		<CSharpCardSection title="Two Filters = Double the Filtering">
										 			The second filter applied requires 'Ann' to have the
										 			2&clubs;. In one of the filtered games, she does and in the
										 			other one she doesn't.
										 		</CSharpCardSection>
										 	</>
										),
										closeButton: {
											rightInRem: 1.5,
										},
									},
									autoPlay: true,
									muted: true,
								}
							},		
							{
								srcMain: maui05,
								srcThumbnail: maui05Thumbnail,
								description: "Haleakalā Sunset",
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
								//testing no description
								srcMain: maui01,
								srcThumbnail: maui01Thumbnail,
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
								srcMain: maui04,
								srcThumbnail: maui04Thumbnail,
								description: "Stunning Beach, Less than Ideal Sand",
							},
						]}
					/>
				</CSharpCardSection>
				<div style={{width: '66%'}}>
					Here are some photos of enjoyable experiences:
					<Carousel
						options={{
							video: {
								autoHideToolbarDuration: 0,
							},
							thumbnail: {
								backgroundColor: getComputedStyleCustom('--color-primary-1'),
								textColor: getComputedStyleCustom('--color-primary-4'),
								hideOverlayUnlessHovered: false,
								maxLineCount: 1,
								size: 10,
								fontSize: 1,
							},
							layout: {
								interItemSpacing: .25,
							}
						}}
						onItemChange={() => console.log('onItemChang')}
						items={[
							{
								description: "Applying Filters",
								srcMain: clipFilters,
								srcThumbnail: clipFiltersThumbnail,
								video: {
									overlayProps: {
										title: "Applying Filters",
										text: "The first part of the video highlights the process of applying the contract matching filter.&nbsp; There are two matches found."
									},
									autoPlay: true,
									muted: true,
								}
								// videoOverlayChildren: (
								// 	<div>
								// 		<CSharpCardSection title="Contract is 1&clubs;">
								// 			The first part of the video highlights the process of
								// 			applying the contract matching filter.&nbsp; There are two
								// 			matches found.
								// 		</CSharpCardSection>
								// 		<CSharpCardSection title="Two Filters = Double the Filtering">
								// 			The second filter applied requires 'Ann' to have the
								// 			2&clubs;. In one of the filtered games, she does and in the
								// 			other one she doesn't.
								// 		</CSharpCardSection>
								// 	</div>
								// ),
							},
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
						]}
					/>
				</div>
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