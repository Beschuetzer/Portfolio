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
import clipFilters from "../../../clips/replay-viewer/filters.mp4";
import clipFiltersThumbnail from "../../../clips/replay-viewer/thumbnails/filters-thumbnail.png";
import clipAnimations from "../../../clips/replay-viewer/animations.mp4";
import clipAnimationsThumbnail from "../../../clips/replay-viewer/thumbnails/animations-thumbnail.png";

import maui01Thumbnail from "../../../imgs/about/thumbnails/maui-01-thumbnail.jpg";
import maui02Thumbnail from "../../../imgs/about/thumbnails/maui-02-thumbnail.jpg";
import maui03Thumbnail from "../../../imgs/about/thumbnails/maui-03-thumbnail.jpg";
import maui04Thumbnail from "../../../imgs/about/thumbnails/maui-04-thumbnail.jpg";
import maui05Thumbnail from "../../../imgs/about/thumbnails/maui-05-thumbnail.jpg";
import maui06Thumbnail from "../../../imgs/about/thumbnails/maui-06-thumbnail.jpg";
import maui07Thumbnail from "../../../imgs/about/thumbnails/maui-07-thumbnail.jpg";
import { ABOUT_PAGE_NAME, C_SHARP_CLASSNAME } from "../../../components/constants";
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner";
import { getComputedStyleCustom } from "../../../helpers";
import { CSharpSection } from "../../../types";
import { CSharpCardSection, CSharpLayout } from "..";
import { Carousel } from "../../../components/carousel2/components/Carousel";
import { CarouselVideoOverlay } from "../../../components/carousel2/components/CarouselVideoOverlay";

export const ABOUT_SECTION_NAMES = ["Overview", "Carousel Test Cases", "Music"];

const items = [
	{
		description: "Complex Overlay (children)",
		srcMain: clipAnimations,
		srcThumbnail: clipAnimationsThumbnail,
		video: {
			overlayProps: {
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
		description: "No Auto play and simplified overlay",
		srcMain: clipFilters,
		srcThumbnail: clipFiltersThumbnail,
		video: {
			overlayProps: {
				title: "Filtering",
				text: "The first part of the video highlights the process of applying the contract matching filter.&nbsp; There are two matches found."
			},
			autoPlay: false,
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
];

const allCustomSettings = (
	<Carousel
		options={{
			video: {
				autoHideToolbarDuration: 2000,
				seekAmount: 10000,
			},
			thumbnail: {
				backgroundColor: getComputedStyleCustom('--color-primary-2'),
				textColor: getComputedStyleCustom('--color-primary-4'),
				fontSize: 14,
				hideOverlayUnlessHovered: false,
				itemSpacing: 1,
			}
		}}
		svgHrefs={{
			itemViewer: {
				closeButton: "./sprite.svg#icon-close",
				nextButton: "./sprite.svg#icon-skip-forward",
				pauseButton: "./sprite.svg#icon-pause",
				playButton: "./sprite.svg#icon-play",
				previousButton: "./sprite.svg#icon-skip-backward",
				restartButton: "./sprite.svg#icon-restart",
				seekBackButton: "./sprite.svg#icon-backward",
				seekForwardButton: "./sprite.svg#icon-forward",
				stopButton: "./sprite.svg#icon-stop",
			},
			dots: {
				style: {
					transform: 'scale(2)',
				},
				svgHref: "./sprite.svg#icon-dot-single",
				fillColor: getComputedStyleCustom('--color-primary-1'),
			},
			arrowLeftButton: {
				svgHref: "./sprite.svg#icon-angle-right",
				fillColor: getComputedStyleCustom('--color-primary-1'),
				style: {
					transform: 'rotate(180deg)',
				}
			},
			arrowRightButton: {
				svgHref: "./sprite.svg#icon-angle-right",
				fillColor: getComputedStyleCustom('--color-primary-1'),
			}
		}}
		items={items}
	/>
);

const twoItemsAllDefaults = (
	<Carousel
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
						]}
					/>
);

const multiplePagesDynamicSizing = (
	<Carousel
		items={[
			{

				description: "Animations",
				srcMain: clipAnimations,
				srcThumbnail: clipAnimationsThumbnail,
				video: {
					overlayProps: {
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
);

const sections: CSharpSection[] = [
	{
		hasCarousel: true,
		name: ABOUT_SECTION_NAMES[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Two Items - All Defaults">
					{twoItemsAllDefaults}
				</CSharpCardSection>
				<CSharpCardSection title="Multiple Pages - Dynamic Sizing">
					{multiplePagesDynamicSizing}
				</CSharpCardSection>
				<CSharpCardSection title="All Custom Settings">
					{allCustomSettings}
				</CSharpCardSection>
				<CSharpCardSection title="Side by Side - Dynamic Sizing">
					<div style={{display: "flex"}}>
						<div style={{ width: '50%', marginRight: "4px" }}>
							{multiplePagesDynamicSizing}
						</div>
						<div style={{ width: '50%', marginLeft: "4px"  }}>
							{multiplePagesDynamicSizing}
						</div>
					</div>
				</CSharpCardSection>
				<div style={{ width: '66%' }}>
					<CSharpCardSection title="Smaller Viewport - All Custom Settings">
						{allCustomSettings}
					</CSharpCardSection>
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
			<LoadingSpinner forceShow={false} />
		</React.Fragment>
	);
}