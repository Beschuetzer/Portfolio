import React, { ReactNode } from "react";
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

export const ABOUT_SECTION_NAMES = ["Overview", "Carousel Test Cases", "Music"];

//#region Carousel Items
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
		description: "Close up Turtle Encounter",
		srcMain: maui02,
	},
	{
		srcMain: maui03,
		description: "Item with no Thumbnail",
	},
	{
		srcMain: maui01,
		srcThumbnail: maui01Thumbnail,
		description: "Cliff Jumping"
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
//#endregion
//#region Carousels
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
		items={items.slice(0, 2)}
	/>
);
const threeItemsAllDefaults = (
	<Carousel
		items={items.slice(0, 3)}
	/>
);
const multiplePagesDynamicSizingAllDefaults = (
	<Carousel items={items} />
);
const multiplePagesFixedItemSpacing = (
	<Carousel items={items} options={{
		thumbnail: {
			itemSpacing: 2,
		}
	}} />
);
const customThumbnail = (
	<Carousel items={items} options={{
		thumbnail: {
			backgroundColor: 'gray',
			fontSize: 8,
			hideOverlayUnlessHovered: false,
			maxLineCount: 1,
			size: 100,
			textColor: 'red'
		}
	}} />
);
const hideArrowsAtFinalPage = (
	<Carousel items={items} options={{
		navigation: {
			hideArrowsAtFinalPage: true,
		}
	}} />
);
const itemViewerNoToolbarHide = (
	<Carousel items={items.slice(0, 1)} options={{
		video: {
			autoHideToolbarDuration: 0,
		}
	}} />
);
const itemViewerHideAfter500ms = (
	<Carousel items={items.slice(0, 1)} options={{
		video: {
			autoHideToolbarDuration: 500,
		}
	}} />
);
const noThumbnailHoverEffect = (
	<Carousel items={items} options={{thumbnail: {hideOverlayUnlessHovered: false}}} />
);
//#endregion

const itemsToRender: { label: string, jsx: ReactNode | ReactNode[] }[] = [
	{
		label: "Two Items - All Defaults",
		jsx: twoItemsAllDefaults
	},
	{
		label: "Three Items - All Defaults",
		jsx: threeItemsAllDefaults
	},
	{
		label: "Multiple Pages - All Defaults",
		jsx: multiplePagesDynamicSizingAllDefaults
	},
	{
		label: "No Thumbnail Hover Effect",
		jsx: noThumbnailHoverEffect
	},
	{
		label: "Fixed Item Spacing",
		jsx: multiplePagesFixedItemSpacing
	},
	{
		label: "Custom Thumbnail",
		jsx: customThumbnail
	},
	{
		label: "Hide Navigation Arrows on First and Last Page",
		jsx: hideArrowsAtFinalPage
	},
	{
		label: "Side by Side - All Defaults",
		jsx: (
			<div style={{ display: "flex" }}>
				<div style={{ width: '50%', marginRight: "4px" }}>
					{multiplePagesDynamicSizingAllDefaults}
				</div>
				<div style={{ width: '50%', marginLeft: "4px" }}>
					{multiplePagesDynamicSizingAllDefaults}
				</div>
			</div>
		)
	},
	{
		label: "Side by Side - All Custom Settings",
		jsx: (
			<div style={{ display: "flex" }}>
				<div style={{ width: '50%', marginRight: "4px" }}>
					{allCustomSettings}
				</div>
				<div style={{ width: '50%', marginLeft: "4px" }}>
					{allCustomSettings}
				</div>
			</div>
		)
	},
	{
		label: "All Custom Settings",
		jsx: allCustomSettings,
	},
	{
		label: "ItemViewer (Click item to view) - Toolbar doesn't hide on inactivity",
		jsx: itemViewerNoToolbarHide
	},
	{
		label: "ItemViewer (Click item to view) - Toolbar hides after 500ms of inactivity",
		jsx: itemViewerHideAfter500ms
	},
]

const sections: CSharpSection[] = [
	{
		hasCarousel: true,
		name: ABOUT_SECTION_NAMES[1],
		pageName: C_SHARP_CLASSNAME,
		children: itemsToRender.map((item) => {
			return (
				<CSharpCardSection title={item.label + ':'}>
					{item.jsx}
				</CSharpCardSection>
			)
		}),
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