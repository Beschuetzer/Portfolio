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
import maui04Thumbnail from "../../../imgs/about/thumbnails/maui-04-thumbnail.jpg";
import maui05Thumbnail from "../../../imgs/about/thumbnails/maui-05-thumbnail.jpg";
import maui06Thumbnail from "../../../imgs/about/thumbnails/maui-06-thumbnail.jpg";
import maui07Thumbnail from "../../../imgs/about/thumbnails/maui-07-thumbnail.jpg";
import { C_SHARP_CLASSNAME, THUMBNAIL_CAROUSEL_NAME } from "../../../components/constants";
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner";
import { getComputedStyleCustom } from "../../../helpers";
import { CSharpSection } from "../../../types";
import { CSharpCardSection, CSharpLayout } from "..";
import { Carousel } from "../../../components/carousel2/components/Carousel";
import { ModifierKey, ValidKey } from "../../../components/carousel2/hooks/useKeyboardShortcuts";
import { CarouselActions } from "../../../components/carousel2/types";
import { CarouselItemProps } from "../../../components/carousel2/components/CarouselItem";

//#region Carousel Items
const customButtons = {
	closeButton: {
		svgHref: "./sprite.svg#icon-close",
	},
	fullScreenButton: {
		svgHref: "./sprite.svg#icon-fullscreen",
		fillColor: getComputedStyleCustom('--color-primary-1'),
	},
	nextButton: {
		svgHref: "./sprite.svg#icon-skip-forward",
	},
	pauseButton: {
		svgHref: "./sprite.svg#icon-pause",
	},
	playButton: {
		svgHref: "./sprite.svg#icon-play",
	},
	previousButton: {
		svgHref: "./sprite.svg#icon-skip-backward",
	},
	restartButton: {
		svgHref: "./sprite.svg#icon-restart",
	},
	seekBackButton: {
		svgHref: "./sprite.svg#icon-backward",
	},
	seekForwardButton: {
		svgHref: "./sprite.svg#icon-forward",
	},
	stopButton: {
		svgHref: "./sprite.svg#icon-stop",
	},
	dots: {
		style: {
			transform: 'scale(2)',
		},
		svgHref: "./sprite.svg#icon-dot-single",
		fillColor: getComputedStyleCustom('--color-primary-1'),
	},
	arrowLeft: {
		svgHref: "./sprite.svg#icon-angle-right",
		fillColor: getComputedStyleCustom('--color-primary-1'),
		style: {
			transform: 'rotate(180deg) translateY(-5%)',
		}
	},
	arrowRight: {
		svgHref: "./sprite.svg#icon-angle-right",
		fillColor: getComputedStyleCustom('--color-primary-1'),
	},
}
const carouselShortcuts = {
	itemViewer: {
		closeButton: {
			keys: [ValidKey.l, [ModifierKey.alt, ValidKey.l]],
			onActionCompleted() {
				console.log('close - it works as method')
			},
		},
		nextButton: {
			keys: [ValidKey.e, [ModifierKey.alt, ValidKey.e]],
			onActionCompleted() {
				console.log('next - after')
			},
		},
		pauseButton: {
			keys: [ValidKey.a, [ModifierKey.alt, ValidKey.a]],
			onActionCompleted() {
				console.log('pause - after')
			},
		},
		playButton: {
			keys: [ValidKey.p, [ModifierKey.alt, ValidKey.p]],
			onActionCompleted() {
				console.log('play - after')
			},
		},
		previousButton: {
			keys: [ValidKey.r, [ModifierKey.alt, ValidKey.r]],
			onActionCompleted() {
				console.log('previous - after')
			},
		},
		seekBackButton: {
			keys: [ValidKey.k, [ModifierKey.alt, ValidKey.k]],
			onActionCompleted: () => {
				console.log('backward - it works as field')
			},
		},
		seekForwardButton: {
			keys: [ValidKey.w, [ModifierKey.alt, ValidKey.w]],
			onActionCompleted: () => {
				console.log('forward - it works as field')
			},
		},
	}
} as CarouselActions

const items = [
	{
		description: "Video Sub-sections",
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
			},
			autoPlay: false,
			muted: true,
			sections: [
				['Search Section', 2521],
				['Filter Section', 5000],
				['Options Section'],
			]
		}
	},
	{
		description: "Custom Overlay with auto play",
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
			},
			autoPlay: true,
			muted: true,
		}
	},
	{
		description: "No overlay with auto play",
		srcMain: clipAnimations,
		srcThumbnail: clipAnimationsThumbnail,
		video: {
			autoPlay: true,
			muted: true,
		}
	},
	{
		description: "Default Overlay on Load (no auto play)",
		srcMain: clipFilters,
		srcThumbnail: clipFiltersThumbnail,
		video: {
			overlayProps: {
				sections: [
					{
						title: "Section 1",
						text: "The first part of the video highlights the process of applying the contract matching filter.&nbsp; There are two matches found."
					},
					{
						title: "Section 2",
						text: "This is where the second section text goes."
					}
				],
			},
			autoPlay: false,
			muted: true,
			objectFit: 'cover',
			objectPosition: 'top',
		}
	},
	{
		srcMain: maui05,
		srcThumbnail: maui05Thumbnail,
		description: "Haleakalā Sunset",
	},
	{
		description: "Custom Overlay on Load (no auto play)",
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
			},
			autoPlay: false,
			muted: true,
		}
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
] as CarouselItemProps[];
//#endregion
//#region Carousels
const allCustomSettings = (
	<Carousel
		options={{
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
					navigation: 'serif'
				},
				elements: customButtons,
			},
			shortcuts: carouselShortcuts,
			itemViewer: {
				autoHideToolbarDuration: 2000,
				seekAmount: 10000,
			},
			thumbnail: {
				size: 200,
				itemSpacing: [[2.5]],
				descriptionOverlay: {
					background: {
						solid: {
							color: getComputedStyleCustom('--color-primary-2'),
						}
					},
					textColor: getComputedStyleCustom('--color-primary-4'),
					fontSize: 14,
					hideDescriptionOverlayUnlessHovered: false,
				},
			},

		}}
		items={items}
	/>
);
const noItemDisplayedOneItemAllDefaults = (
	<Carousel
		items={items.slice(0, 1)}
	/>
);
const noItemDisplayedTwoItemsAllDefaults = (
	<Carousel
		items={items.slice(0, 2)}
	/>
);
const noItemDisplayedThreeItemsAllDefaults = (
	<Carousel
		items={items.slice(0, 3)}
	/>
);
const noItemDisplayedThreeItemsMaxSpacing = (
	<Carousel
		items={items.slice(0, 3)}
		options={{
			thumbnail: {
				itemSpacingStrategy: 'max',
			}
		}}
	/>
);
const noItemDisplayedMultiplePagesAllDefaults = (
	<Carousel items={items} />
);
const multiplePagesCustomPadding = (
	<Carousel items={items} options={{
		styling: {
			container: {
				padding: {
					left: 40,
					right: 40,
					bottom: 40,
					top: 40,
				}
			}
		}
	}} />
);
const noItemDisplayedMultiplePagesCustomItemViewerColors = (
	<Carousel items={items} options={{
		styling: {
			videoModal: {
				background: getComputedStyleCustom('--color-primary-4'),
				textColor: getComputedStyleCustom('--color-primary-1'),
				closeButton: {
					fill: getComputedStyleCustom('--color-primary-1'),
					size: [[18, 550, "max-width"], [20, 655, "max-width"], [24, 900, "min-width"]],
				}
			},
			itemViewer: {
				background: getComputedStyleCustom('--color-primary-4'),
			},
			toolbar: {
				progressBar: {
					background: getComputedStyleCustom('--color-primary-4'),
					foregroundColor: getComputedStyleCustom('--color-primary-1'),
				},
				textColor: getComputedStyleCustom('--color-primary-2'),
			},
			elements: {
				all: {
					fillColor: getComputedStyleCustom('--color-primary-2'),
				}
			}
		}
	}} />
);
const multiplePagesNoItemSpacing = (
	<Carousel items={items} options={{
		thumbnail: {
			itemSpacing: [[0]],
		}
	}} />
);
const dynamicSpacingOnly = (
	<Carousel items={items} options={{
		thumbnail: {
			// itemSpacing: 4,
			itemSpacing: [[9], [5], [11, 1100], [15, 1500, 'min-width'], [8, 800, 'max-width'], [6, 600, 'max-width'], [4, 400, 'max-width'], [12, 1200, 'min-width']],
		}
	}} />
);
const dynamicSizeOnly = (
	<Carousel
		options={{
			thumbnail: {
				size: [[200], [180], [110, 1100], [150, 1500, 'min-width'], [180, 800, 'max-width'], [160, 600, 'max-width'], [140, 400, 'max-width'], [220, 1200, 'min-width']],
			}
		}}
		items={items}
	/>
);
const dynamicSizeAndSpacing = (
	<Carousel
		options={{
			thumbnail: {
				size: [[200], [180], [110, 1100], [150, 1500, 'min-width'], [180, 800, 'max-width'], [160, 600, 'max-width'], [140, 400, 'max-width'], [220, 1200, 'min-width']],
				itemSpacing: [[9], [5], [11, 1100], [15, 1500, 'min-width'], [8, 800, 'max-width'], [6, 600, 'max-width'], [4, 400, 'max-width'], [12, 1200, 'min-width']],
			}
		}}
		items={items}
	/>
);
const dynamicSpacingOnlyDisplayAbove = (
	<Carousel items={items} options={{
		thumbnail: {
			// itemSpacing: 4,
			itemSpacing: [[9], [5], [11, 1100], [15, 1500, 'min-width'], [8, 800, 'max-width'], [6, 600, 'max-width'], [4, 400, 'max-width'], [12, 1200, 'min-width']],
		},
		layout: {
			itemDisplayLocation: 'above',
		},
	}} />
);
const dynamicSizeOnlyDisplayAbove = (
	<Carousel
		options={{
			thumbnail: {
				size: [[200], [180], [110, 1100], [150, 1500, 'min-width'], [180, 800, 'max-width'], [160, 600, 'max-width'], [140, 400, 'max-width'], [220, 1200, 'min-width']],
			},
			layout: {
				itemDisplayLocation: 'above',
			},
		}}
		items={items}
	/>
);
const dynamicSizeAndSpacingDisplayAbove = (
	<Carousel
		options={{
			thumbnail: {
				size: [[200], [180], [110, 1100], [150, 1500, 'min-width'], [180, 800, 'max-width'], [160, 600, 'max-width'], [140, 400, 'max-width'], [220, 1200, 'min-width']],
				itemSpacing: [[9], [5], [11, 1100], [15, 1500, 'min-width'], [8, 800, 'max-width'], [6, 600, 'max-width'], [4, 400, 'max-width'], [12, 1200, 'min-width']],
			},
			layout: {
				itemDisplayLocation: 'above',
			},
		}}
		items={items}
	/>
);
const dynamicSizeAndSpacingDisplayAbovePositionedLeft = (
	<Carousel
		options={{
			thumbnail: {
				size: [[200], [180], [110, 1100], [150, 1500, 'min-width'], [180, 800, 'max-width'], [160, 600, 'max-width'], [140, 400, 'max-width'], [220, 1200, 'min-width']],
				itemSpacing: [[9], [5], [11, 1100], [15, 1500, 'min-width'], [8, 800, 'max-width'], [6, 600, 'max-width'], [4, 400, 'max-width'], [12, 1200, 'min-width']],
			},
			layout: {
				itemDisplayLocation: 'above',
				itemPositioning: 'left',
			},
		}}
		items={items}
	/>
);
const dynamicSizeAndSpacingDisplayAbovePositionedCenter = (
	<Carousel
		options={{
			thumbnail: {
				size: [[200], [180], [110, 1100], [150, 1500, 'min-width'], [180, 800, 'max-width'], [160, 600, 'max-width'], [140, 400, 'max-width'], [220, 1200, 'min-width']],
				itemSpacing: [[9], [5], [11, 1100], [15, 1500, 'min-width'], [8, 800, 'max-width'], [6, 600, 'max-width'], [4, 400, 'max-width'], [12, 1200, 'min-width']],
			},
			layout: {
				itemDisplayLocation: 'above',
				itemPositioning: 'center',
			},
		}}
		items={items}
	/>
);
const dynamicSizeAndSpacingDisplayAbovePositionedRight = (
	<Carousel
		options={{
			thumbnail: {
				size: [[200], [180], [110, 1100], [150, 1500, 'min-width'], [180, 800, 'max-width'], [160, 600, 'max-width'], [140, 400, 'max-width'], [220, 1200, 'min-width']],
				itemSpacing: [[9], [5], [11, 1100], [15, 1500, 'min-width'], [8, 800, 'max-width'], [6, 600, 'max-width'], [4, 400, 'max-width'], [12, 1200, 'min-width']],
			},
			layout: {
				itemDisplayLocation: 'above',
				itemPositioning: 'right',
			},
		}}
		items={items}
	/>
);
const dynamicThumbnailDescriptionTextColor = (
	<Carousel
		options={{
			thumbnail: {
				descriptionOverlay: {
					textColor: [['red'], ['green'], ['yellow', 1100], ['blue', 1500, 'min-width'], ['orange', 800, 'max-width'], ['teal', 600, 'max-width'], ['grey', 400, 'max-width'], ['purple', 1200, 'min-width']],
				},
			},
		}}
		items={items}
	/>
);
const dynamicThumbnailBorder = (
	<Carousel
		options={{
			thumbnail: {
				currentItemBorder: [['3px solid red'], ['3px dashed green'], ['1px dotted  yellow', 1100], ['5px solid blue', 1500, 'min-width'], ['2px dotted orange', 800, 'max-width'], ['1px ridge teal', 600, 'max-width'], ['3px solid grey', 400, 'max-width'], ['thick double purple', 1200, 'min-width']],
			},
			layout: {
				itemDisplayLocation: 'above',
			},
		}}
		items={items}
	/>
);
const dynamicItemSpacingStrategy = (
	<Carousel
		options={{
			thumbnail: {
				itemSpacingStrategy: [['min'], ['max', 800]]
			},
			layout: {
				itemDisplayLocation: 'above',
			},
		}}
		items={items.slice(6)}
	/>
);
const dynamicToolbarPositioningInVideo = (
	<Carousel
		options={{
			layout: {
				itemDisplayLocation: [['above'], ['below', 1200]],
				isToolbarPositionedInVideo: [[true], [false, 800]]
			}
		}}
		items={items}
	/>
);
const dynamicPoistioning = (
	<Carousel
		options={{
			layout: {
				itemPositioning: [['center'], ['right', 800]],
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
		}}
		items={items}
	/>
);
const dynamicMaxLineCount = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
				maxLineCount: [[2], [1, 800]],
				textColor: getComputedStyleCustom('--color-primary-4'),
			},
		}
	}} />
);
const dynamicHidingOfThumbnailOverlay = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: [[false], [true, 800]],
			},
		}
	}} />
);
const dynamicHidingOfThumbnailFontSize = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
				fontSize: [[14], [10, 800], [16, 1000, 'min-width'], [18, 1200, 'min-width']],
			},
		}
	}} />
);
const dynamicDisablingOfThumbnailOverlayBelow800 = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
				isDisabled: [[false], [true, 800]]
			},
		},
	}} />
);
const dynamicThumbnailBackground = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
				background: {
					solid: {
						color: [[getComputedStyleCustom('--color-primary-3')], [getComputedStyleCustom('--color-primary-1'), 800]],
						opacity: [[1], [.5, 800]],
					}
				},
			},
		},
	}} />
);
const dynamicThumbnailBackgroundGradient = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
				background: {
					gradient: {
						angle: [[270], [90, 800]],
						start: {
							color: [[getComputedStyleCustom('--color-primary-4')], [getComputedStyleCustom('--color-primary-2'), 800]],
							opacity: [[.25], [.1, 800]],
						},
						end: {
							color: [[getComputedStyleCustom('--color-primary-1')], [getComputedStyleCustom('--color-primary-4'), 800]],
							opacity: [[.75], [.5, 800]]
						}
					},
				},
			},
		},
	}} />
);
const dynamicElementsCustomization = (
	<Carousel items={items} options={{
		styling: {
			elements: {
				arrowRight: {
					svgHref: [[customButtons.arrowRight.svgHref], [customButtons.nextButton.svgHref, 800]],
					fillColor: [['red'], ['green', 800]],
				},
				dots: {
					svgHref: [[customButtons.dots.svgHref], [customButtons.playButton.svgHref, 800]],
					fillColor: [['red'], ['green', 800]],
				}
			}
		}
	}} />
);
const dynamicVideoModalPadding = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		styling: {
			videoModal: {
				padding: {
					top: [[20], [5, 800]],
					right: [[30], [10, 800]],
					bottom: [[20], [5, 800]],
					left: [[30], [10, 800]],
				}
			}
		}
	}} />
);
const dynamicFontFamilyAll = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		thumbnail: {
			size: 100,
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
			},
		},
		styling: {
			fontFamily: {
				all: [['monospace'], ['sans-serif', 800]],
			}
		}
	}} />
);
const dynamicFontFamilyNavigation = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		thumbnail: {
			size: 100,
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
			}
		},
		styling: {
			fontFamily: {
				navigation: [['monospace'], ['sans-serif', 800]],
			}
		}
	}} />
);
const dynamicFontFamilyItemViewer = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		thumbnail: {
			size: 100,
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false,
			},
		},
		styling: {
			fontFamily: {
				itemViewer: [['monospace'], ['sans-serif', 800]],
			}
		}
	}} />
);
const dynamicWrappingDisabled = (
	<Carousel items={items.slice(2)} options={{
		navigation: {
			disableWrapping: [[false], [true, 800]]
		},
	}} />
);
const dynamicAutoChangePage = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		thumbnail: {
			size: 100,
		},
		navigation: {
			autoChangePage: [[true], [false, 800]]
		},
	}} />
);
const dynamicMaxClickThreshold = (
	<Carousel items={items.slice(2)} options={{
		navigation: {
			maxClickThreshold: [[0], [100, 800]],
		},
		itemViewer: {
			maxClickThreshold: [[0], [100, 800]],
		}
	}} />
);
const dynamicDisablingOfSwiping = (
	<Carousel items={items.slice(2)} options={{
		navigation: {
			disableSwiping: [[false], [true, 800]],
		},
		itemViewer: {
			disableSwiping: [[false], [true, 800]],
		}
	}} />
);
const dynamicItemPositioning = (
	<Carousel items={items} options={{
		layout: {
			itemPositioning: [["center"], ["right", 800]]
		},
		thumbnail: {
			size: 200,
		}
	}} />
);
const dynamicItemDisplayLocation = (
	<Carousel items={items} options={{
		layout: {
			itemDisplayLocation: [["above"], ["none", 800]]
		},
		thumbnail: {
			size: 200,
		}
	}} />
);
const dynamicVideoModal = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		styling: {
			videoModal: {
				widthInPercent: [[100], [50, 800]],
				textColor: [["red"], ['blue', 800]],
				fontSize: [[14], [10, 800]],
				closeButton: {
					fill: [['red'], ['black', 800]]
				}
			},
		},
	}} />
);
const dynamicToolbar = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		styling: {
			toolbar: {
				textColor: [['grey'], ['orange', 800]],
				progressBar: {
					shouldSpanContainerWidth: [[false], [true, 800]],
				},
				elements: {
					color: [['white'], ['red', 800]],
				}
			},
		},
	}} />
);
const dynamicSeekAmount = (
	<Carousel items={items.slice(2)} options={{
		itemViewer: {
			seekAmount: [[4000], [8000, 800]]
		}
	}} />
);
const dynamicAutoHideDurationInItemViewer = (
	<Carousel items={items.slice(2)} options={{
		itemViewer: {
			autoHideToolbarDuration: [[1000], [5000, 800]]
		}
	}} />
);
const dynamicToolbarColor = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: "above",
		},
		styling: {
			toolbar: {
				elements: {
					color: [['white'], ['red', 800]]
				},
			}
		}
	}} />
);
const dynamicProgressBarColorAndHeight = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: "above",
		},
		styling: {
			toolbar: {
				progressBar: {
					foregroundColor: [['red'], ['black', 800]],
					background: [['black'], ['white', 800]],
					height: [[10], [3, 800]],
				}
			}
		}
	}} />
);
const dynamicBackgroundColor = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: "above",
		},
		styling: {
			toolbar: {
				background: [['red'], ['black', 800]],
			},
			container: {
				background: [['red'], ['black', 800]],
			},
			itemViewer: {
				background: [['red'], ['black', 800]],
			},
			navigation: {
				background: [['red'], ['black', 800]],
			},
			videoModal: {
				background: [['red'], ['black', 800]],
				textColor: 'white',
				closeButton: {
					fill: 'white',
				}
			},
		}
	}} />
);
const customSizeAndSpacingNonDefaultItemDisplayCase = (
	<Carousel
		options={{
			thumbnail: {
				size: 200,
				itemSpacing: 5,
			},
			layout: {
				itemDisplayLocation: "above",
			}
		}}
		items={items}
	/>
);
const customThumbnailSolid = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				background: {
					solid: {
						color: getComputedStyleCustom('--color-primary-1'),
						opacity: .8,
					}
				},
				fontSize: 8,
				hideDescriptionOverlayUnlessHovered: false,
				maxLineCount: 1,
				textColor: getComputedStyleCustom('--color-primary-4'),
			},
			size: 100,
		}
	}} />
);
const customThumbnailGradient = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {

				background: {
					gradient: {
						angle: 270,
						start: {
							color: getComputedStyleCustom('--color-primary-4'),
							opacity: .25,
						},
						end: {
							color: getComputedStyleCustom('--color-primary-1'),
							opacity: .75
						}
					},
				},
				fontSize: 8,
				hideDescriptionOverlayUnlessHovered: false,
				maxLineCount: 1,
				textColor: getComputedStyleCustom('--color-primary-4'),
			},
			size: 100,
		}
	}} />
);
const customThumbnailGradientAndFallback = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				background: {
					gradient: {
						angle: 270,
						start: {
							color: getComputedStyleCustom('--color-primary-4'),
							opacity: .25,
						},
						end: {
							color: getComputedStyleCustom('--color-primary-1'),
							opacity: .75
						}
					},
					solid: {
						color: getComputedStyleCustom('--color-primary-1'),
						opacity: .25,
					}
				},
				fontSize: 8,
				hideDescriptionOverlayUnlessHovered: false,
				maxLineCount: 1,
				textColor: getComputedStyleCustom('--color-primary-4'),
			},
			size: 100,
		}
	}} />
);

const itemViewerDefaultOverlayOnLoad = (
	<Carousel items={items.slice(1, 2)} />
);
const itemViewerCustomButtons = (
	<Carousel items={items.slice(1, 2)} options={{
		styling: {
			elements: customButtons,
		}
	}} />
);
const itemViewerCustomItemViewerFont = (
	<Carousel items={items} options={{
		styling: {
			fontFamily: {
				itemViewer: 'monospace',
			}
		}
	}} />
);
const itemViewerCustomNavigationFont = (
	<Carousel items={items} options={{
		styling: {
			fontFamily: {
				navigation: 'monospace',
			}
		}
	}} />
);
const itemViewerCustomFontBoth = (
	<Carousel items={items} options={{
		styling: {
			fontFamily: {
				all: 'monospace',
			}
		}
	}} />
);
const itemViewerSwipingDisabled = (
	<Carousel items={items} options={{
		itemViewer: {
			disableSwiping: true,
		}
	}} />
);
const itemViewerMaxClickThresholdZero = (
	<Carousel items={items} options={{
		itemViewer: {
			maxClickThreshold: 0,
		}
	}} />
);
const itemViewerCustomOverlayOnLoad = (
	<Carousel items={items.slice(2, 3)} />
);
const itemViewerNoToolbarHide = (
	<Carousel items={items.slice(0, 1)} options={{
		itemViewer: {
			autoHideToolbarDuration: 0,
		}
	}} />
);
const itemViewerHideAfter500ms = (
	<Carousel items={items.slice(0, 1)} options={{
		itemViewer: {
			autoHideToolbarDuration: 500,
		}
	}} />
);
const itemViewerSeekAmount2Sec = (
	<Carousel items={items.slice(0, 1)} options={{
		itemViewer: {
			seekAmount: 2000,
		}
	}} />
);
const customButtonSizes = (
	<Carousel items={items} options={{
		thumbnail: {
			size: 150,
		},
		styling: {
			navigation: {
				elements: {
					size: [[18, 550, "max-width"], [20, 655, "max-width"], [30, 900, "min-width"]],
					color: getComputedStyleCustom('--color-primary-3'),
				},
			},
			toolbar: {
				elements: {
					size: [[18, 550, "max-width"], [20, 655, "max-width"], [30, 900, "min-width"]],
					color: getComputedStyleCustom('--color-primary-4'),
				}
			},
			elements: {
				// nextButton: {
				// 	fillColor: 'red',
				// },
				// fullscreenButton: {
				// 	fillColor: 'red',
				// },
				dots: {}
			}
		},
		layout: {
			itemDisplayLocation: "above",
		}
	}} />
);
const navigationTracking = (
	<Carousel items={items} />
);
const navigationNoTracking = (
	<Carousel items={items} options={{
		navigation: {
			autoChangePage: false,
		}
	}} />
);
const navigationNoSwiping = (
	<Carousel items={items} options={{
		navigation: {
			disableSwiping: true,
		}
	}} />
);
const navigationLastPageNotFlush = (
	<Carousel items={items} options={{
		navigation: {
			isLastPageFlush: false,
		}
	}} />
);
const navigationZeroMaxClickThreshold = (
	<Carousel items={items} options={{
		navigation: {
			maxClickThreshold: 0,
		}
	}} />
);
const navigationZeroMaxClickHideArrows = (
	<Carousel items={items} options={{
		navigation: {
			disableWrapping: true,
			maxClickThreshold: 0,
		}
	}} />
);
const navigationHideArrowsAtFinalPage = (
	<Carousel items={items} options={{
		navigation: {
			disableWrapping: true,
		}
	}} />
);
const itemViewerCustomShortcuts = (
	<Carousel items={items.slice(0, 2)} options={{
		shortcuts: carouselShortcuts,
	}} />
);

const layoutAboveDefaultItemHeight = (
	<Carousel
		items={items.slice(1)}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			}
		}}
	/>
);
const layoutAboveWithItemHeightAndFontFamily = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				}
			}
		}}
	/>
);
const layoutAboveWithMaxSpacingStrategy = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				itemSpacingStrategy: 'max',
			},
		}}
	/>
);
const layoutAboveWithItemHeightAndThumbnailSize = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
			}
		}}
	/>
);
const layoutAboveContainerPadding = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					padding: {
						top: 50,
						bottom: 50,
						right: 100,
						left: 100,
					}
				},
			}
		}}
	/>
);
const layoutAboveExtraNavigationPadding = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				navigation: {
					padding: {
						right: 100,
						left: 100,
					}
				},

			}
		}}
	/>
);
const layoutAboveExtraItemViewerPadding = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				itemViewer: {
					padding: {
						right: 100,
						left: 100,
					}
				},
			}
		}}
	/>
);
const layoutAboveExtraToolbarPadding = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				toolbar: {
					padding: {
						right: 100,
						left: 100,
					},
					progressBar: {
						shouldSpanContainerWidth: true,
					}
				},
			}
		}}
	/>
);
const layoutAboveCompletelyFlushAndSameBackgroundColor = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					background: getComputedStyleCustom("--color-primary-4"),
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}
				},
				navigation: {
					background: getComputedStyleCustom("--color-primary-4"),
					elements: {
						color: getComputedStyleCustom("--color-primary-1"),
					},
				},
				itemViewer: {
					background: getComputedStyleCustom("--color-primary-4"),
				},
				toolbar: {
					progressBar: {
						background: getComputedStyleCustom("--color-primary-1"),
						foregroundColor: getComputedStyleCustom("--color-primary-2"),
					},
					background: getComputedStyleCustom("--color-primary-1"),
					padding: {
						left: 20,
						right: 20,
					},
					elements: {
						color: getComputedStyleCustom("--color-primary-4"),
					},
					textColor: getComputedStyleCustom("--color-primary-4"),
				},
			}
		}}
	/>
);
const layoutAboveCompletelyFlushAndSameBackgroundColorProgressSpanWhole = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					background: getComputedStyleCustom("--color-primary-4"),
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}
				},
				navigation: {
					background: getComputedStyleCustom("--color-primary-4"),
				},
				itemViewer: {
					background: getComputedStyleCustom("--color-primary-4"),
				},
				toolbar: {
					progressBar: {
						shouldSpanContainerWidth: true,
						background: getComputedStyleCustom("--color-primary-1"),
						foregroundColor: getComputedStyleCustom("--color-primary-2"),
					},
					background: getComputedStyleCustom("--color-primary-1"),
					padding: {
						left: 20,
						right: 20,
					}
				},
				elements: {
					dots: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					arrowLeft: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					arrowRight: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					}
				}
			}
		}}
	/>
);
const layoutAboveCompletelyFlushAndSameBackgroundColorAll = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					background: getComputedStyleCustom("--color-primary-4"),
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}
				},
				elements: {
					all: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					}
				}
			},
		}}
	/>
);
const layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomIcons = (
	<Carousel
		items={items}
		options={{

			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				elements: {
					fullscreenButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.fullScreenButton.svgHref,
					},
					closeButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.closeButton.svgHref,
					},
					arrowLeft: {
						...customButtons.arrowLeft,
						fillColor: getComputedStyleCustom("--color-primary-1"),

					},
					arrowRight: {
						...customButtons.arrowRight,
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					dots: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.dots.svgHref,
					},
					nextButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.nextButton.svgHref,
					},
					pauseButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.pauseButton.svgHref,
					},
					playButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.playButton.svgHref,
					},
					previousButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.previousButton.svgHref,
					},
					seekBackButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.seekBackButton.svgHref,
					},
					seekForwardButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
						svgHref: customButtons.seekForwardButton.svgHref,
					},
				},
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					background: getComputedStyleCustom("--color-primary-4"),
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}
				},
			}
		}}
	/>
);
const layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomColors = (
	<Carousel
		items={items}
		options={{

			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				elements: {
					closeButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					arrowLeft: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					arrowRight: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					dots: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					nextButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					pauseButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					playButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					previousButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					seekBackButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					seekForwardButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					fullscreenButton: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
				},
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					background: getComputedStyleCustom("--color-primary-4"),
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}
				},
				toolbar: {
					progressBar: {
						background: getComputedStyleCustom("--color-primary-4"),
						foregroundColor: getComputedStyleCustom("--color-primary-1"),
					}
				}
			}
		}}
	/>
);
const layoutAboveButtonsAllWithSpecificFillColors = (
	<Carousel
		items={items}
		options={{

			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				elements: {
					all: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					arrowLeft: {
						fillColor: getComputedStyleCustom("--color-primary-2"),
					},
					arrowRight: {
						fillColor: getComputedStyleCustom("--color-primary-2"),
					},
					dots: {
						fillColor: getComputedStyleCustom("--color-primary-2"),
					},
				},
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					background: getComputedStyleCustom("--color-primary-4"),
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}
				},
				toolbar: {
					progressBar: {
						background: getComputedStyleCustom("--color-primary-4"),
						foregroundColor: getComputedStyleCustom("--color-primary-2"),
					}
				}
			}
		}}
	/>
);
const layoutAboveCustomOverlayAndSpinner = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				elements: {
					all: {
						fillColor: getComputedStyleCustom("--color-primary-1"),
					},
					arrowLeft: {
						fillColor: getComputedStyleCustom("--color-primary-2"),
					},
					arrowRight: {
						fillColor: getComputedStyleCustom("--color-primary-2"),
					},
					dots: {
						fillColor: getComputedStyleCustom("--color-primary-2"),
					},
				},
				itemViewer: {
					loadingSpinner: {
						type: 'circle',
						options: {
							textColor: getComputedStyleCustom("--color-primary-1"),
							spinnerColor: getComputedStyleCustom("--color-primary-2"),
							radius: 100,
							width: 15,
						},
					}
				},
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					background: getComputedStyleCustom("--color-primary-4"),
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}
				},
				toolbar: {
					progressBar: {
						background: getComputedStyleCustom("--color-primary-4"),
						foregroundColor: getComputedStyleCustom("--color-primary-2"),
					},
					textColor: getComputedStyleCustom('--color-primary-2'),
				},
				videoModal: {
					fontSize: 16,
					padding: {
						top: 30,
						bottom: 30,
						left: 60,
						right: 60,
					},
					closeButton: {
						fill: getComputedStyleCustom("--color-primary-1")
					},
					background: `linear-gradient(270deg, #fff, #ccc)`,
					textColor: getComputedStyleCustom("--color-primary-1"),
					widthInPercent: 90,
				}
			}
		}}
	/>
);
const layoutAboveNoTrackingItemViewerChanges = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			navigation: {
				autoChangePage: false,
			}
		}}
	/>
);
const layoutAboveDifferentLeftAndRightPadding = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			thumbnail: {
				size: 100,
			},
			styling: {
				fontFamily: {
					itemViewer: 'monospace',
				},
				container: {
					padding: {
						left: 5,
						right: 20,
						// top: 0,
					}
				},
			}
		}}
	/>
);
const layoutBelowWithCustomThumbnailSizeAndHeight = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayLocation: 'below',
			},
			thumbnail: {
				size: 100,
				descriptionOverlay: {
					isDisabled: false,
				}
			},
			styling: {
				container: {
					padding: {
						bottom: 0,
					}
				}
			}
		}}
	/>
);
const layoutToolbarNotEmbedded = (
	<Carousel
		items={items.slice(0, 4)}
		options={{
			layout: {
				itemDisplayLocation: 'above',
				isToolbarPositionedInVideo: false,
			},
			thumbnail: {
				size: 100,
				descriptionOverlay: {
					isDisabled: false,
				}
			},
		}}
	/>
)
const layoutThumbnailPositioningCenter = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'center',
			},
			thumbnail: {
				size: 175,
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningLeftWithCustomItemSizeAndLastPageNotFlush = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'left',
			},
			navigation: {
				isLastPageFlush: false,
			},
			thumbnail: {
				size: 175,
				itemSpacing: 10,
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningCenterWithCustomItemSizeAndLastPageNotFlush = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'center',
			},
			navigation: {
				isLastPageFlush: false,
			},
			thumbnail: {
				size: 175,
				itemSpacing: 10,
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningRightWithCustomItemSizeAndLastPageNotFlush = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'right',
			},
			navigation: {
				isLastPageFlush: false,
			},
			thumbnail: {
				size: 175,
				itemSpacing: 10,
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningCenterWithItemSpacingGiven = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'center',
			},
			thumbnail: {
				size: 175,
				itemSpacing: [[10]],
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningLeftNonDefaultCaseOnePage = (
	<Carousel
		items={items.slice(3)}
		options={{
			layout: {
				itemPositioning: 'left',
				itemDisplayLocation: "above",
			},
		}}
	/>
);
const layoutThumbnailPositioningCenterNonDefaultCaseOnePage = (
	<Carousel
		items={items.slice(3)}
		options={{
			layout: {
				itemPositioning: 'center',
				itemDisplayLocation: "above",
			},
		}}
	/>
);
const layoutThumbnailPositioningRightNonDefaultCaseOnePage = (
	<Carousel
		items={items.slice(3)}
		options={{
			layout: {
				itemPositioning: 'right',
				itemDisplayLocation: "above",
			},
		}}
	/>
);
const layoutThumbnailPositioningLeft = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'left',
			},
			thumbnail: {
				size: 175,
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningLeftWithItemSpacingGiven = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'left',
			},
			thumbnail: {
				size: 175,
				itemSpacing: [[10]],
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningRight = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'right',
			},
			thumbnail: {
				size: 175,
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const layoutThumbnailPositioningRightWithItemSpacingGiven = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemPositioning: 'right',
			},
			thumbnail: {
				size: 175,
				itemSpacing: [[10]],
				descriptionOverlay: {
					isDisabled: false,
				},
			},
		}}
	/>
);
const noThumbnailHoverEffect = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				hideDescriptionOverlayUnlessHovered: false
			}
		}
	}} />
);
const customThumbnailCurrentItemBorderOne = (
	<Carousel items={items} options={{
		layout: {
			itemDisplayLocation: "above"
		},
		thumbnail: {
			currentItemBorder: `2px dotted ${getComputedStyleCustom("--color-primary-3")}`,
		}
	}} />
)
const customThumbnailCurrentItemBorderTwo = (
	<Carousel items={items} options={{
		layout: {
			itemDisplayLocation: "above"
		},
		thumbnail: {
			currentItemBorder: `  1mm  ridge  rgba(255,  255,  255,   .75) `,
		}
	}} />
)
const customThumbnailCurrentItemBorderThree = (
	<Carousel items={items} options={{
		layout: {
			itemDisplayLocation: "above"
		},
		thumbnail: {
			currentItemBorder: 'thick double #9b9b9b'
		}
	}} />
)
const noThumbnailDescriptionOverlay = (
	<Carousel items={items} options={{
		thumbnail: {
			descriptionOverlay: {
				isDisabled: true,
			}
		}
	}} />
);
const viewingModeToolbarButtons = (
	<Carousel
		items={items.slice(0, 3)}
		options={{
			layout: {
				itemDisplayLocation: 'below'
			},
			styling: {
				toolbar: {
					elements: {
						color: {
							fullscreen: [['red'], ['blue', 800]],
							nonFullscreen: [['yellow'], ['green', 800]],
						}
					}
				}
			}
		}}
	/>
);
const viewingModeVideoCurrentStateIndicator = (
	<Carousel items={items.slice(2)} options={{
		layout: {
			itemDisplayLocation: 'above',
		},
		styling: {
			videoCurrentStateIndicator: {
				background: {
					fullscreen: [[getComputedStyleCustom('--color-primary-1')], [getComputedStyleCustom('--color-primary-2'), 800]],
					nonFullscreen: [[getComputedStyleCustom('--color-primary-3')], [getComputedStyleCustom('--color-primary-4'), 800]],
				},
				foregroundColor: {
					fullscreen: [['red'], ['green', 800]],
					nonFullscreen: [['yellow'], ['blue', 800]],
				},
				size: {
					fullscreen: [[32], [26, 800]],
					nonFullscreen: [[24], [20, 800]],
				},
				playIcon: {
					fillColor: [['purple'], ['black', 800]],
					svgHref: {
						fullscreen: [["./sprite.svg#icon-play"], ["./sprite.svg#icon-forward", 800]],
						nonFullscreen: [["./sprite.svg#icon-forward"], ["./sprite.svg#icon-play", 800]],
					},
				},
				pauseIcon: {
					svgHref: {
						fullscreen: [["./sprite.svg#icon-pause"], ["./sprite.svg#icon-backward", 800]],
						nonFullscreen: [["./sprite.svg#icon-backward"], ["./sprite.svg#icon-pause", 800]],
					},
					style: {
						transform: 'translate(-10%, 0)',
					}
				}
			},
		},
	}} />
);
const viewingModeItemViewerPreview = (
	<Carousel
		items={items.slice(0, 3)}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			styling: {
				videoModal: {
					padding: {
						top: 40,
						fullscreen: {
							bottom: [[30], [1, 800]],
							right: [[60], [10, 800]],
							top: 80,
						},
						nonFullscreen: {
							right: [[30], [1, 800]],
							left: [[60], [10, 800]],
						},
					}
				},
				container: {
					padding: {
						bottom: 100,
						top: 100,
						right: 100,
						left: 100,
					},
				},
				toolbar: {
					padding: {
						left: 100,
						// top: 40,
						fullscreen: {
							left: [[30], [1, 800]],
							right: [[60], [10, 800]],
						},
						// nonFullscreen: {
						// 	right: [[30], [1, 800]],
						// 	left: [[60], [10,800]],
						// },
					},
					progressBar: {
						height: 15,
						shouldSpanContainerWidth: true,
					},
				},
				itemViewerPreview: {
					isVisibleInNonFullscreenMode: [[true], [false, 600]],
					background: {
						fullscreen: [['grey'], ['rgba(0,0,2323,.9)', 800]],
						nonFullscreen: [['#ff0'], ['rgb(0,25500,00)', 800]],
					},
					border: {
						nonFullscreen: [['3px solid #abc123'], ['5px dotted purple', 900, 'max-width'], ['1px ridge teal', 750, 'max-width'], ['thick double green', 1000, 'min-width']],
					},
					borderRadius: {
						fullscreen: [[0], [100, 800]],
					},
					width: {
						nonFullscreen: [[500, 800]],
					},
					height: {
						fullscreen: [[250], [150, 800]],
						nonFullscreen: [[200, 800]],
					},
					image: {
						fit: {
							fullscreen: [['contain', 800]],
							nonFullscreen: [['contain'], ['fill', 800]],
						},
						position: {
							fullscreen: [['left'], ['center', 800]],
							nonFullscreen: [['top'], ['right', 800]],
						}
					},
					opacity: [[.9], [.25, 800]],
					swapImageAndText: {
						fullscreen: [[true], [false, 800]],
						nonFullscreen: [[false], [true, 800]],
					},
					text: {
						body: {
							color: {
								fullscreen: [['green'], ['red', 800]],
								nonFullscreen: [['red'], ['green', 800]],
							},
							size: {
								fullscreen: [[16], [12, 800]],
								nonFullscreen: [[14], [10, 800]],
							},
							fontFamily: {
								fullscreen: [['monospace'], ['cursive', 800]],
								nonFullscreen: [['serif'], ['fantasy', 800]],
							},
						},
						header: {
							color: {
								fullscreen: [['red'], ['green', 800]],
								nonFullscreen: [['green'], ['red', 800]],
							},
							size: {
								fullscreen: [[18], [14, 800]],
								nonFullscreen: [[16], [12, 800]],
							},
							fontFamily: {
								fullscreen: [['monospace'], ['cursive', 800]],
								nonFullscreen: [['serif'], ['fantasy', 800]],
							},
						},
						container: {
							padding: {
								top: 50,
								fullscreen: [[{
									left: 10,
									right: 10,
									bottom: 25,
								}], [{
									top: 10,
									bottom: 10,
									left: 20,
									right: 20,
								}, 800]],
								nonFullscreen: [[{
									top: 10,
									bottom: 10,
									left: 20,
									right: 20,
								}], [{
									top: 20,
									bottom: 20,
									left: 10,
									right: 10,
								}, 800]]
							},
							verticalAlignment: {
								fullscreen: [['center'], ['flex-end', 800]],
								nonFullscreen: [['flex-end'], ['center', 800]],
							}
						}

					},
				}
			}
		}}
	/>
);
const viewingModePaddingEverywhere = (
	<Carousel
		items={items.slice(0, 3)}
		options={{
			layout: {
				itemDisplayLocation: 'above',
			},
			styling: {
				itemViewer: {
					padding: {
						left: [[30], [1, 800]],
						right: [[60], [10, 800]],
					}
				},
				navigation: {
					padding: {
						left: [[60], [10, 800]],
						right: [[30], [1, 800]],
					}
				},
				videoModal: {
					padding: {
						top: 40,
						fullscreen: {
							bottom: [[30], [1, 800]],
							right: [[60], [10, 800]],
							top: 80,
						},
						nonFullscreen: {
							right: [[30], [1, 800]],
							left: [[60], [10, 800]],
						},
					}
				},
				container: {
					padding: {
						bottom: [[50], [10, 800]],
						top: [[50], [10, 800]],
						left: [[50], [10, 800]],
						right: [[50], [10, 800]],
					},
				},
				toolbar: {
					padding: {
						top: 40,
						fullscreen: {
							left: [[30], [1, 800]],
							right: [[60], [10, 800]],
						},
						nonFullscreen: {
							right: [[30], [1, 800]],
							left: [[60], [10, 800]],
						},
					},
				},
				itemViewerPreview: {
					text: {
						container: {
							padding: {
								top: 50,
								fullscreen: [[{
									left: 10,
									right: 10,
									bottom: 25,
								}], [{
									top: 10,
									bottom: 10,
									left: 20,
									right: 20,
								}, 800]],
								nonFullscreen: [[{
									top: 10,
									bottom: 10,
									left: 20,
									right: 20,
								}], [{
									top: 20,
									bottom: 20,
									left: 10,
									right: 10,
								}, 800]]
							},
						}
					},
				}
			}
		}}
	/>
);
const viewingModeVideoControls = (
	<Carousel
		options={{
			layout: {
				itemDisplayLocation: 'above',
				useDefaultVideoControls: [[false], [true, 800]],
				isToolbarPositionedInVideo: [[true], [false, 1200, 'max-width']]
			},
			itemViewer: {
				// disableSwiping: false,
			},
			styling: {
				toolbar: {
					progressBar: {
						dot: {
							// diameter: {
							// 	nonFullscreen: [[16], [10, 900]]
							// },
							isAlwaysVisible: [[false], [true, 900]],
							transitionDuration: [[.25], [.1, 850]]
						},
						sectionGap: 4
					}
				},
			}
		}}
		items={items}
	/>
);
//#endregion

type Sections = [SectionNames, { label: string, jsx: ReactNode | ReactNode[] }[]][];
enum SectionNames {
	aboveCustomization = "Above Customization",
	belowCustomization = "Below Customization",
	custom = "Custom",
	customWidth = "Custom Width",
	dynamicBasedOnViewingMode = "Dynamic based on Viewing Mode",
	dynamicLayout = "Dynamic Layout Settings",
	itemPositioning = "Item Positioning",
	itemViewer = "Item Viewer",
	layouts = "Layouts",
	navigationOptions = "Navigation Options",
	otherDynamicSettings = "Other Dynamic Settings",
	thumbnailOptions = "Thumbnail Options",
}
const SECTIONS: Sections = [
	[
		SectionNames.layouts,
		[
			{
				label: "One Item - All Defaults",
				jsx: noItemDisplayedOneItemAllDefaults
			},
			{
				label: "Two Items - All Defaults",
				jsx: noItemDisplayedTwoItemsAllDefaults
			},
			{
				label: "Three Items - All Defaults",
				jsx: noItemDisplayedThreeItemsAllDefaults
			},
			{
				label: "Three Items - Max Spacing Strategy",
				jsx: noItemDisplayedThreeItemsMaxSpacing
			},
			{
				label: "Multiple Pages - All Defaults",
				jsx: noItemDisplayedMultiplePagesAllDefaults
			},
			{
				label: "Multiple Pages - Custom Padding",
				jsx: multiplePagesCustomPadding
			},
			{
				label: "Multiple Pages - Custom Item Viewer Colors",
				jsx: noItemDisplayedMultiplePagesCustomItemViewerColors
			},
			{
				label: "Display Current Item Above with Custom itemHeight and Font Family",
				jsx: layoutAboveWithItemHeightAndFontFamily,
			},
			{
				label: "Display Current Item Above with Max Spacing Strategy",
				jsx: layoutAboveWithMaxSpacingStrategy,
			},
			{
				label: "Display Current Item Below with Custom Thumbnail Size, Height, and Font-size",
				jsx: layoutBelowWithCustomThumbnailSizeAndHeight,
			},
			{
				label: "Video Toolbar not Embedded Inside Video",
				jsx: layoutToolbarNotEmbedded,
			},
		]
	],
	[
		SectionNames.itemPositioning,
		[
			{
				label: "Thumbnails Positioned Left in Container with Default Spacing",
				jsx: layoutThumbnailPositioningLeft,
			},
			{
				label: "Thumbnails Positioned Left in Container with Custom Item Spacing",
				jsx: layoutThumbnailPositioningLeftWithItemSpacingGiven,
			},
			{
				label: "Thumbnails Positioned Left in Container with Custom Item Spacing and Last Page not Flush",
				jsx: layoutThumbnailPositioningLeftWithCustomItemSizeAndLastPageNotFlush,
			},
			{
				label: "Thumbnails Positioned Center in Container with Default Spacing",
				jsx: layoutThumbnailPositioningCenter,
			},
			{
				label: "Thumbnails Positioned Center in Container with Custom Item Spacing",
				jsx: layoutThumbnailPositioningCenterWithItemSpacingGiven,
			},
			{
				label: "Thumbnails Positioned Center in Container with Custom Item Spacing and Last Page not Flush",
				jsx: layoutThumbnailPositioningCenterWithCustomItemSizeAndLastPageNotFlush,
			},
			{
				label: "Thumbnails Positioned Right in Container with Default Spacing",
				jsx: layoutThumbnailPositioningRight,
			},
			{
				label: "Thumbnails Positioned Right in Container with Custom Item Spacing",
				jsx: layoutThumbnailPositioningRightWithItemSpacingGiven,
			},
			{
				label: "Thumbnails Positioned Right in Container with Custom Item Spacing and Last Page not Flush",
				jsx: layoutThumbnailPositioningRightWithCustomItemSizeAndLastPageNotFlush,
			},
			{
				label: "Thumbnails Positioned Left in Container One Page",
				jsx: layoutThumbnailPositioningLeftNonDefaultCaseOnePage
			},
			{
				label: "Thumbnails Positioned Center in Container One Page",
				jsx: layoutThumbnailPositioningCenterNonDefaultCaseOnePage
			},
			{
				label: "Thumbnails Positioned Right in Container One Page",
				jsx: layoutThumbnailPositioningRightNonDefaultCaseOnePage
			},
		]
	],
	[
		SectionNames.aboveCustomization,
		[
			{
				label: "Display Current Item Above Default itemHeight and No Overlay Video First",
				jsx: layoutAboveDefaultItemHeight,
			},
			{
				label: "Display Current Item Above with Custom itemHeight and Thumbnail Size",
				jsx: layoutAboveWithItemHeightAndThumbnailSize,
			},
			{
				label: "Display Above with Container Padding",
				jsx: layoutAboveContainerPadding,
			},
			{
				label: "Display Above with Item Viewer Padding",
				jsx: layoutAboveExtraItemViewerPadding
			},
			{
				label: "Display Above with Extra Navigation Padding",
				jsx: layoutAboveExtraNavigationPadding,
			},
			{
				label: "Display Above with Extra Toolbar Padding",
				jsx: layoutAboveExtraToolbarPadding
			},
			{
				label: "Display Above with Different Left and Right Padding",
				jsx: layoutAboveDifferentLeftAndRightPadding,
			},
			{
				label: "Display Above Flush and Same Background Color",
				jsx: layoutAboveCompletelyFlushAndSameBackgroundColor,
			},
			{
				label: "Display Above Flush with Progress Bar Whole Width",
				jsx: layoutAboveCompletelyFlushAndSameBackgroundColorProgressSpanWhole,
			},
			{
				label: "Display Above Flush and Same Background Color using All option",
				jsx: layoutAboveCompletelyFlushAndSameBackgroundColorAll,
			},
			{
				label: "Display Above Custom Icons with Same Background Color",
				jsx: layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomIcons,
			},
			{
				label: "Display Above Custom Icons with Default Icons using Custom Colors",
				jsx: layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomColors,
			},
			{
				label: "Display Above buttons.all with Specific Item Fill Colors",
				jsx: layoutAboveButtonsAllWithSpecificFillColors,
			},
			{
				label: "Display Above Custom Overlay Style and Loading Spinner",
				jsx: layoutAboveCustomOverlayAndSpinner,
			},
			{
				label: "Display Above No Tracking Current Item",
				jsx: layoutAboveNoTrackingItemViewerChanges,
			},
		]
	],
	[
		SectionNames.belowCustomization,
		[
			{
				label: "All Defaults",
				jsx: React.cloneElement(layoutAboveDefaultItemHeight, {
					options: {
						...layoutAboveDefaultItemHeight.props.options,
						layout: {
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Current Item Below with Custom itemHeight and Thumbnail Size",
				jsx: React.cloneElement(layoutAboveWithItemHeightAndThumbnailSize, {
					options: {
						...layoutAboveWithItemHeightAndThumbnailSize.props.options,
						layout: {
							...layoutAboveWithItemHeightAndThumbnailSize.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below with Container Padding",
				jsx: React.cloneElement(layoutAboveContainerPadding, {
					options: {
						...layoutAboveContainerPadding.props.options,
						layout: {
							...layoutAboveContainerPadding.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below with Item Viewer Padding",
				jsx: React.cloneElement(layoutAboveExtraItemViewerPadding, {
					options: {
						...layoutAboveExtraItemViewerPadding.props.options,
						layout: {
							...layoutAboveExtraItemViewerPadding.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below with Extra Navigation Padding",
				jsx: React.cloneElement(layoutAboveExtraNavigationPadding, {
					options: {
						...layoutAboveExtraNavigationPadding.props.options,
						layout: {
							...layoutAboveExtraNavigationPadding.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below with Extra Toolbar Padding",
				jsx: React.cloneElement(layoutAboveExtraToolbarPadding, {
					options: {
						...layoutAboveExtraToolbarPadding.props.options,
						layout: {
							...layoutAboveExtraToolbarPadding.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below with Different Left and Right Padding",
				jsx: React.cloneElement(layoutAboveDifferentLeftAndRightPadding, {
					options: {
						...layoutAboveDifferentLeftAndRightPadding.props.options,
						layout: {
							...layoutAboveDifferentLeftAndRightPadding.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below Flush and Same Background Color",
				jsx: React.cloneElement(layoutAboveCompletelyFlushAndSameBackgroundColor, {
					options: {
						...layoutAboveCompletelyFlushAndSameBackgroundColor.props.options,
						layout: {
							...layoutAboveCompletelyFlushAndSameBackgroundColor.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below Flush with Progress Bar Whole Width",
				jsx: React.cloneElement(layoutAboveCompletelyFlushAndSameBackgroundColorProgressSpanWhole, {
					options: {
						...layoutAboveCompletelyFlushAndSameBackgroundColorProgressSpanWhole.props.options,
						layout: {
							...layoutAboveCompletelyFlushAndSameBackgroundColorProgressSpanWhole.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below Flush and Same Background Color using All option",
				jsx: React.cloneElement(layoutAboveCompletelyFlushAndSameBackgroundColorAll, {
					options: {
						...layoutAboveCompletelyFlushAndSameBackgroundColorAll.props.options,
						layout: {
							...layoutAboveCompletelyFlushAndSameBackgroundColorAll.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below Custom Icons with Same Background Color",
				jsx: React.cloneElement(layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomIcons, {
					options: {
						...layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomIcons.props.options,
						layout: {
							...layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomIcons.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below Custom Icons with Default Icons using Custom Colors",
				jsx: React.cloneElement(layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomColors, {
					options: {
						...layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomColors.props.options,
						layout: {
							...layoutAboveCompletelyFlushAndSameBackgroundColorWithCustomColors.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below buttons.all with Specific Item Fill Colors",
				jsx: React.cloneElement(layoutAboveButtonsAllWithSpecificFillColors, {
					options: {
						...layoutAboveButtonsAllWithSpecificFillColors.props.options,
						layout: {
							...layoutAboveButtonsAllWithSpecificFillColors.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below Custom Overlay Style and Loading Spinner",
				jsx: React.cloneElement(layoutAboveCustomOverlayAndSpinner, {
					options: {
						...layoutAboveCustomOverlayAndSpinner.props.options,
						layout: {
							...layoutAboveCustomOverlayAndSpinner.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
			{
				label: "Display Below No Tracking Current Item",
				jsx: React.cloneElement(layoutAboveNoTrackingItemViewerChanges, {
					options: {
						...layoutAboveNoTrackingItemViewerChanges.props.options,
						layout: {
							...layoutAboveNoTrackingItemViewerChanges.props.options.layout,
							itemDisplayLocation: 'below',
						}
					}
				}),
			},
		]
	],
	[
		SectionNames.thumbnailOptions,
		[
			{
				label: "All Default",
				jsx: noItemDisplayedMultiplePagesAllDefaults,
			},
			{
				label: "Description Overlay Always Shown",
				jsx: noThumbnailHoverEffect
			},
			{
				label: "Description Overlay Disabled",
				jsx: noThumbnailDescriptionOverlay
			},
			{
				label: "0 Item Spacing",
				jsx: multiplePagesNoItemSpacing
			},
			{
				label: "Fixed Item Spacing and Custom Item Size",
				jsx: allCustomSettings
			},
			{
				label: "Fixed Item Spacing and Custom Item Size with Non-default Item Display Location",
				jsx: customSizeAndSpacingNonDefaultItemDisplayCase
			},
			{
				label: "Given Thumbnail Size with Custom Solid Background",
				jsx: customThumbnailSolid
			},
			{
				label: "Given Thumbnail Size with Custom Gradient Background",
				jsx: customThumbnailGradient
			},
			{
				label: "Given Thumbnail Size with Custom Gradient Background and Fallback",
				jsx: customThumbnailGradientAndFallback
			},
			{
				label: "Custom Current Item Border - Input Format One",
				jsx: customThumbnailCurrentItemBorderOne
			},
			{
				label: "Custom Current Item Border - Input Format Two",
				jsx: customThumbnailCurrentItemBorderTwo
			},
			{
				label: "Custom Current Item Border - Input Format Three",
				jsx: customThumbnailCurrentItemBorderThree
			},
		]
	],
	[
		SectionNames.dynamicLayout,
		[
			{
				label: "Dynamic Thumbnail Spacing",
				jsx: dynamicSpacingOnly,
			},
			{
				label: "Dynamic Thumbnail Sizing and Automatic Spacing",
				jsx: dynamicSizeOnly,
			},
			{
				label: "Dynamic Thumbnail Sizing and Spacing",
				jsx: dynamicSizeAndSpacing,
			},
			{
				label: "Dynamic Thumbnail Spacing",
				jsx: dynamicSpacingOnlyDisplayAbove,
			},
			{
				label: "Dynamic Thumbnail Sizing and Automatic Spacing",
				jsx: dynamicSizeOnlyDisplayAbove,
			},
			{
				label: "Dynamic Thumbnail Sizing and Spacing",
				jsx: dynamicSizeAndSpacingDisplayAbove,
			},
			{
				label: "Dynamic Thumbnail Sizing and Spacing and Positioned Left",
				jsx: dynamicSizeAndSpacingDisplayAbovePositionedLeft,
			},
			{
				label: "Dynamic Thumbnail Sizing and Spacing and Positioned Center",
				jsx: dynamicSizeAndSpacingDisplayAbovePositionedCenter,
			},
			{
				label: "Dynamic Thumbnail Sizing and Spacing and Positioned Right",
				jsx: dynamicSizeAndSpacingDisplayAbovePositionedRight,
			},
		]
	],
	[
		SectionNames.otherDynamicSettings,
		[
			{
				label: "Thumbnail Overlay Disabled <= 800px",
				jsx: dynamicDisablingOfThumbnailOverlayBelow800,
			},
			{
				label: "Thumbnail Overlay Font Size Changes at 800px",
				jsx: dynamicHidingOfThumbnailFontSize,
			},
			{
				label: "Thumbnail Overlay Always Shown > 800px",
				jsx: dynamicHidingOfThumbnailOverlay,
			},
			{
				label: "Thumbnail Background Opacity and Color Change at 800px",
				jsx: dynamicThumbnailBackground,
			},
			{
				label: "Thumbnail Background Gradient Change at 800px",
				jsx: dynamicThumbnailBackgroundGradient,
			},
			{
				label: "Dots and Left Arrow Change Svgs and Color at 800px",
				jsx: dynamicElementsCustomization,
			},
			{
				label: "Video Modal Padding Changes at 800px",
				jsx: dynamicVideoModalPadding,
			},
			{
				label: "Font Changes Everywhere at 800px",
				jsx: dynamicFontFamilyAll,
			},
			{
				label: "Font Changes in ItemViewer at 800px",
				jsx: dynamicFontFamilyItemViewer,
			},
			{
				label: "Font Changes in Thumbnails at 800px",
				jsx: dynamicFontFamilyNavigation,
			},
			{
				label: "Seek Amount in ItemViewer Changes at 800px",
				jsx: dynamicSeekAmount,
			},
			{
				label: "Item Viewer Auto Hide Duration Changes at 800px",
				jsx: dynamicAutoHideDurationInItemViewer,
			},
			{
				label: "Toolbar Elements' Color Changes at 800px",
				jsx: dynamicToolbarColor,
			},
			{
				label: "ProgressBar Color and Height Change at 800px",
				jsx: dynamicProgressBarColorAndHeight,
			},
			{
				label: "All Background Colors Changes at 800px",
				jsx: dynamicBackgroundColor,
			},
			{
				label: "Wrapping Disabled < 800px",
				jsx: dynamicWrappingDisabled,
			},
			{
				label: "Auto Change Page Disabled < 800px",
				jsx: dynamicAutoChangePage,
			},
			{
				label: "The amount of horiztonal movement needed to register swipe event increases < 800px",
				jsx: dynamicMaxClickThreshold,
			},
			{
				label: "Swiping Disabled < 800px",
				jsx: dynamicDisablingOfSwiping,
			},
			{
				label: "Thumbnail Positioning Right < 800px Otherwise Center",
				jsx: dynamicItemPositioning,
			},
			{
				label: "Display Above Thumbnail Positioning Right < 800px Otherwise Center",
				jsx: dynamicPoistioning,
			},
			{
				label: "Item Display Location None < 800px Otherwise Above",
				jsx: dynamicItemDisplayLocation,
			},
			{
				label: "Video Modal Styling Changes < 800px",
				jsx: dynamicVideoModal,
			},
			{
				label: "Toolbar Items and Progress Bar Width Change < 800px",
				jsx: dynamicToolbar,
			},
			{
				label: "Thumbnail Max Line Count Changes at 800px",
				jsx: dynamicMaxLineCount,
			},
			{
				label: "Thumbnail Text Color Changes Based on Viewport",
				jsx: dynamicThumbnailDescriptionTextColor,
			},
			{
				label: "Current Item's Border Changes Based on Viewport",
				jsx: dynamicThumbnailBorder,
			},
			{
				label: "Item Spacing Strategy Changes at 800px",
				jsx: dynamicItemSpacingStrategy,
			},
			{
				label: "Toolbar Embedded in Video > 800px",
				jsx: dynamicToolbarPositioningInVideo,
			},
		]
	],
	[
		SectionNames.dynamicBasedOnViewingMode,
		[
			// {
			// 	label: "Padding Everywhere Changes Dynamically based on Viewing Mode",
			// 	jsx: viewingModePaddingEverywhere,
			// },
			// {
			// 	label: "Toolbar Buttons Change Dynamically based on Viewing Mode",
			// 	jsx: viewingModeToolbarButtons,
			// },
			// {
			// 	label: "Video Current State Indicator Changes Dynamically based on Viewing Mode",
			// 	jsx: viewingModeVideoCurrentStateIndicator,
			// },
			// {
			// 	label: "Item Viewer Preview Changes Dynamically based on Viewing Mode",
			// 	jsx: viewingModeItemViewerPreview,
			// },				
			{
				label: "Video Controls Change Dynamically based on Viewing Mode",
				jsx: viewingModeVideoControls,
			},
		]
	],
	[
		SectionNames.navigationOptions,
		[
			{
				label: "No Wrapping",
				jsx: navigationHideArrowsAtFinalPage
			},
			{
				label: "Current Page follows last viewed item in item viewer (full-screen)",
				jsx: navigationTracking
			},
			{
				label: "Current Page does not follow last viewed item in item viewer (full-screen)",
				jsx: navigationNoTracking
			},
			{
				label: "0 Max Click Threshold",
				jsx: navigationZeroMaxClickThreshold
			},
			{
				label: "0 Max Click Threshold No Wrapping",
				jsx: navigationZeroMaxClickHideArrows
			},
			{
				label: "Swiping a Thumbnail Disabled",
				jsx: navigationNoSwiping
			},
			{
				label: "Last Page is not Flush",
				jsx: navigationLastPageNotFlush
			},
		]
	],
	[
		SectionNames.itemViewer,
		[
			{
				label: "Default Overlay Displayed on Load",
				jsx: itemViewerDefaultOverlayOnLoad
			},
			{
				label: "Default Overlay Displayed on Load with Custom Toolbar Buttons",
				jsx: itemViewerCustomButtons
			},
			{
				label: "Custom Overlay Displayed on Load",
				jsx: itemViewerCustomOverlayOnLoad
			},
			{
				label: "Toolbar doesn't hide on inactivity (Click item to view)",
				jsx: itemViewerNoToolbarHide
			},
			{
				label: "Toolbar hides after 500ms of inactivity (Click item to view)",
				jsx: itemViewerHideAfter500ms
			},
			{
				label: "Seek amount 2 sec (Click item to view)",
				jsx: itemViewerSeekAmount2Sec
			},
			{
				label: "All custom keyboard shortcuts",
				jsx: itemViewerCustomShortcuts,
			},
			{
				label: "Custom Item Viewer Font",
				jsx: itemViewerCustomItemViewerFont,
			},
			{
				label: "Custom Navigation Font",
				jsx: itemViewerCustomNavigationFont,
			},
			{
				label: "Custom Navigation and Item Viewer Fonts",
				jsx: itemViewerCustomFontBoth,
			},
			{
				label: "Full-screen Swiping Disabled",
				jsx: itemViewerSwipingDisabled
			},
			{
				label: "Full-screen Max Click Threshold 0",
				jsx: itemViewerMaxClickThresholdZero
			},
		]
	],
	[
		SectionNames.customWidth,
		[
			{
				label: "Half width - All Defaults",
				jsx: (
					<div style={{ display: "flex" }}>
						<div style={{ width: '50%' }}>
							{noItemDisplayedMultiplePagesAllDefaults}
						</div>
					</div>
				)
			},
			{
				label: "Side by Side - All Defaults",
				jsx: (
					<div style={{ display: "flex" }}>
						<div style={{ width: '50%', marginRight: "4px" }}>
							{noItemDisplayedMultiplePagesAllDefaults}
						</div>
						<div style={{ width: '50%', marginLeft: "4px" }}>
							{noItemDisplayedMultiplePagesAllDefaults}
						</div>
					</div>
				)
			},
			{
				label: "Half width - All Custom Settings",
				jsx: (
					<div style={{ display: "flex" }}>
						<div style={{ width: '50%', marginRight: "4px" }}>
							{allCustomSettings}
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
		]
	],
	[
		SectionNames.custom,
		[
			{
				label: "All Custom Settings",
				jsx: allCustomSettings,
			},
			{
				label: "Custom Button Sizes",
				jsx: customButtonSizes
			},
		]
	]
];

const ENABLED_SECTIONS: SectionNames[] = [
	// SectionNames.otherDynamicSettings,
	// SectionNames.layouts,
	SectionNames.dynamicBasedOnViewingMode,
	// SectionNames.navigationOptions,
	// SectionNames.itemPositioning,
	// ...Object.values(SectionNames),
];
const sections: CSharpSection[] = SECTIONS
	.filter((section) => ENABLED_SECTIONS.includes(section[0]))
	.map((section) => {
		return {
			name: section[0],
			pageName: C_SHARP_CLASSNAME,
			children: section[1].map((item) => {
				return (
					<CSharpCardSection title={item.label + ':'}>
						{item.jsx}
					</CSharpCardSection>
				)
			})
		}
	})


export const ThumbnailCarouselTests = () => {
	return (
		<React.Fragment>
			<CSharpLayout sections={sections} pageName={`${THUMBNAIL_CAROUSEL_NAME}-tests`} />
			<LoadingSpinner forceShow={false} />
		</React.Fragment>
	);
}