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
				closeButton: {
					rightInRem: 1.5,
				},
			},
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
				closeButton: {
					rightInRem: 1.5,
				},
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
				itemSpacing: 3.9876,
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
				closeButtonColor: getComputedStyleCustom('--color-primary-1'),
			},
			itemViewer: {
				background: getComputedStyleCustom('--color-primary-4'),
				foregroundColor: getComputedStyleCustom('--color-primary-1'),

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
const multiplePagesFixedItemSpacing = (
	<Carousel items={items} options={{
		thumbnail: {
			itemSpacing: 2,
		}
	}} />
);
const customSizeOnly = (
	<Carousel
		options={{
			thumbnail: {
				size: 200,
			}
		}}
		items={items}
	/>
);
const customSizeAndSpacingNonDefaultItemDisplayCase = (
	<Carousel
		options={{
			thumbnail: {
				size: 200,
				itemSpacing: 5,
			},
			layout: {
				itemDisplayHeight: 444,
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
const navigationZeroMaxClickThreshold = (
	<Carousel items={items} options={{
		navigation: {
			maxClickThreshold: 0,
		}
	}} />
);
const navigationHideArrowsAtFinalPage = (
	<Carousel items={items} options={{
		navigation: {
			hideArrowsAtFinalPage: true,
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
				itemDisplayHeight: 444,
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
const layoutAboveWithItemHeightAndThumbnailSize = (
	<Carousel
		items={items}
		options={{
			layout: {
				itemDisplayHeight: 427,
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
				itemDisplayHeight: 350,
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
				itemDisplayHeight: 427,
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
				itemDisplayHeight: 427,
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
				itemDisplayHeight: 427,
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
				itemDisplayHeight: 445,
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
					elementColor: getComputedStyleCustom("--color-primary-1"),
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
					elementColor: getComputedStyleCustom("--color-primary-4"),
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
				itemDisplayHeight: 445,
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
				itemDisplayHeight: 445,
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
					foregroundColor: getComputedStyleCustom("--color-primary-1"),
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
				itemDisplayHeight: 445,
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
					foregroundColor: getComputedStyleCustom("--color-primary-1"),
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
				itemDisplayHeight: 445,
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
					foregroundColor: getComputedStyleCustom("--color-primary-1"),
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
				itemDisplayHeight: 445,
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
					foregroundColor: getComputedStyleCustom("--color-primary-1"),
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
				itemDisplayHeight: 445,
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
					foregroundColor: getComputedStyleCustom("--color-primary-1"),
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
					closeButtonColor: getComputedStyleCustom("--color-primary-1"),
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
				itemDisplayHeight: 445,
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
				itemDisplayHeight: 422,
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
						top: 0,
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
				itemDisplayHeight: 450,
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
//#endregion

type Sections = [string, { label: string, jsx: ReactNode | ReactNode[] }[]][];
const SECTIONS: Sections = [
	[
		"Layouts",
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
				label: "Display Current Item Below with Custom Thumbnail Size, Height, and Font-size",
				jsx: layoutBelowWithCustomThumbnailSizeAndHeight,
			},
		]
	],
	[
		'Above-Customization',
		[
			{
				label: "Display Current Item Above Default itemHeight and No Autoplay Video First",
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
		'Below-Customization',
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
		"Thumbnail Options",
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
				label: "Fixed Item Spacing",
				jsx: multiplePagesFixedItemSpacing
			},
			{
				label: "Custom Item Size",
				jsx: customSizeOnly,
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
		"Navigation Options",
		[
			{
				label: "Hide Arrows on First and Last Page",
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
				label: "Swiping a Thumbnail Disabled",
				jsx: navigationNoSwiping
			},
		]
	],
	[
		"Item Viewer",
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
			}
		]
	],
	[
		"Custom Width",
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
	], [
		"All Custom",
		[
			{
				label: "All Custom Settings",
				jsx: allCustomSettings,
			},
		]
	]
];

const sections: CSharpSection[] = SECTIONS.map((section) => ({
	name: section[0],
	pageName: C_SHARP_CLASSNAME,
	children: section[1].map((item) => {
		return (
			<CSharpCardSection title={item.label + ':'}>
				{item.jsx}
			</CSharpCardSection>
		)
	})
}))


export const ThumbnailCarouselTests = () => {
	return (
		<React.Fragment>
			<CSharpLayout sections={sections} pageName={`${THUMBNAIL_CAROUSEL_NAME}-tests`} />
			<LoadingSpinner forceShow={false} />
		</React.Fragment>
	);
}