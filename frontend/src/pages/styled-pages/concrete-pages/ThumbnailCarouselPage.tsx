import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";
import { THUMBNAIL_CAROUSEL_PACKAGE_URL } from "../../../components/constants";
import { ExamplePageLink } from "../ExamplePageLink";
import { Carousel, CarouselItemProps } from "react-thumbnail-carousel";
import { getCarouselStylingOptions } from "../../../styles/styles";
import { BREAK_POINTS } from "../../../styles/breakpoints";

import defaultGif from "../../../clips/react-thumbnail-carousel/Default.gif";
import fullscreenGif from "../../../clips/react-thumbnail-carousel/fullscreen.gif";
import aspectRatioGif from "../../../clips/react-thumbnail-carousel/aspectRatio.gif";
import descriptionModalGif from "../../../clips/react-thumbnail-carousel/descriptionModal.gif";
import descriptionModalBuilderGif from "../../../clips/react-thumbnail-carousel/descriptionModalBuilder.gif";
import aboveGif from "../../../clips/react-thumbnail-carousel/above.gif";
import belowGif from "../../../clips/react-thumbnail-carousel/below.gif";
import dymanicAllGif from "../../../clips/react-thumbnail-carousel/dynamicAll.gif";
import dymanicViewingModeGif from "../../../clips/react-thumbnail-carousel/dynamicViewingMode.gif";
import dynamicViewportWidth from "../../../clips/react-thumbnail-carousel/dynamicViewportWidth.gif";
import {
  defaultFontSize,
  SECTION_WIDTH_IN_PIXELS,
} from "../../../styles/constants";
import { CodeDisplayer } from "./CodeDisplayer";
import { ExamplePageTitledParagraph } from "../ExamplePageTitledParagraph";
import { Quote } from "../../../components/Quote";
import LazyLoadedCarousel from "../../../components/LazyLoadedCarousel";

export const THUMBNAIL_CAROUSEL_SECTION_NAMES = [
  "Overview",
  "No Item Viewer",
  "Item Above",
  "Item Below",
];

const FIRST_CAROUSEL_ITEMS: CarouselItemProps[] = [
  {
    srcMain: defaultGif,
    description: "Default layout navigation",
  },
  {
    srcMain: fullscreenGif,
    description: "Fullscreen Feature",
  },
];

const SECOND_CAROUSEL_ITEMS: CarouselItemProps[] = [
  {
    srcMain: aspectRatioGif,
    description: "Different aspect ratios",
  },
  {
    srcMain: descriptionModalGif,
    description: "Description modal",
  },
  {
    srcMain: descriptionModalBuilderGif,
    description: "Building a description modal",
  },
];

const THIRD_CAROUSEL_ITEMS: CarouselItemProps[] = [
  {
    srcMain: aboveGif,
    description: "Current item is displayed above the thumbnails",
  },
  {
    srcMain: dymanicAllGif,
    description: "Dynamic values",
    modal: {
      sections: [
        {
          text: "Most values are dynamic and can be changed based on the viewport width and whether the user is in fullscreen mode.  Here is how the values are set for this example:",
        },
        {
          text: "",
        },
        {
          codeSection: {
            tabSpacing: 4,
            startTabCount: 4,
            lines: [
              `options: {`,
              `  styling: {`,
              `    colorTheme: {`,
              `      colorOne: {`,
              `        fullscreen: [['red'], ['green', 800]],`,
              `        nonFullscreen: [['blue'], ['purple', 800]],`,
              `      }`,
              `    },`,
              `  }`,
              `},`,
            ],
          },
        },
        {
          text: `The above translates to use "green" when fullscreen and viewport <= 800, use "red" when fullscreen otherwise, use "purple" when not fullscreen and viewport <= 800, and use "blue" when not fullscreen otherwise.`,
        },
      ],
    },
  },
  {
    srcMain: dynamicViewportWidth,
    description: "Dynamic viewport width",
  },
  {
    srcMain: dymanicViewingModeGif,
    description: "Dynamic viewing mode",
  },
];

const FOURTH_CAROUSEL_ITEMS: CarouselItemProps[] = [
  {
    srcMain: belowGif,
    description: "Current item is displayed below the thumbnails",
  },
  ...SECOND_CAROUSEL_ITEMS,
  ...THIRD_CAROUSEL_ITEMS,
];

const SECTIONS: ExamplePageSectionProps[] = [
  {
    name: THUMBNAIL_CAROUSEL_SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Lao Tzu"
          text="The journey of a thousand miles begins with one step."
        />
        <ExamplePageParagraph>
          <ExamplePageLink
            url={THUMBNAIL_CAROUSEL_PACKAGE_URL}
            includeSpaces={false}
          >
            react-thumbnail-carousel
          </ExamplePageLink>{" "}
          is an npm package that offers a simple and customizable thumbnail
          carousel component for React applications. The goal was to develop a
          fully customizable component with no dependencies, serving as a
          comprehensive solution for displaying media content.
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          Below you will find a few examples of how the component is used
          throughout the site.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: THUMBNAIL_CAROUSEL_SECTION_NAMES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          The first use case for the thumbnail carousel is to display a gallery
          of images in a row. This is useful for showcasing a collection of
          images in a visually appealing way:
        </ExamplePageParagraph>
        <LazyLoadedCarousel
          options={{
            styling: {
              container: {
                margin: {
                  top: [
                    [14],
                    [12, parseInt(BREAK_POINTS.phone, 10), "max-width"],
                  ],
                },
              },
            },
            thumbnail: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
            },
          }}
          items={FIRST_CAROUSEL_ITEMS}
        />
        <ExamplePageParagraph>
          Here is what the code looks like for the above: <br />
          <CodeDisplayer
            code={`import { Carousel } from "react-thumbnail-carousel";
import defaultGif from "../../../clips/react-thumbnail-carousel/Default.gif";
import fullscreenGif from "../../../clips/react-thumbnail-carousel/fullscreen.gif";

<LazyLoadedCarousel
  options={{
    thumbnail: {
      size: [[100], [75, 1200, "max-width"], [66, 600, "max-width"]],
      descriptionOverlay: {
        hideDescriptionOverlayUnlessHovered: false,
        textColor: colorScheme?.primary4,
        background: {
          gradient: {
            start: {
              opacity: 0.9,
              color: colorScheme?.primary1,
            },
            end: {
              opacity: 0.9,
              color: colorScheme?.primary2,
            },
            angle: 270,
          },
        },
      },
    },
  }}
  items={[
    {
      srcMain: defaultGif,
      description: "Default layout navigation",
    },
    {
      srcMain: fullscreenGif,
      description: "Fullscreen Feature",
    },
  ]}
/>
            `}
          />
        </ExamplePageParagraph>
        <ExamplePageTitledParagraph title="Navigation">
          If all of the items can't fit into the width of the parent, a
          navigation bar will appear, allowing the user to navigate through the
          items by pressing the left and right arrows or swiping:
        </ExamplePageTitledParagraph>
          <LazyLoadedCarousel
            options={{
              ...getCarouselStylingOptions(propsToAdd.colorscheme),
              layout: {
                itemDisplayLocation: "none",
              },
              styling: {
                ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
                container: {
                  margin: {
                    top: [
                      [14],
                      [12, parseInt(BREAK_POINTS.phone, 10), "max-width"],
                    ],
                  },
                },
              },
              thumbnail: {
                ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
                size: [
                  [SECTION_WIDTH_IN_PIXELS / 2 - 50],
                  [
                    window.innerWidth / 2 - 50,
                    parseInt(BREAK_POINTS.phone, 10),
                    "max-width",
                  ],
                ],
              },
            }}
            items={SECOND_CAROUSEL_ITEMS}
          />
      </>
    ),
  },
  {
    name: THUMBNAIL_CAROUSEL_SECTION_NAMES[2],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          This layout allows you to display the selected item above the
          carousel:
        </ExamplePageParagraph>
        <LazyLoadedCarousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            layout: {
              itemDisplayLocation: "above",
            },
            styling: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
              container: {
                padding: {
                  bottom: 0,
                  top: defaultFontSize,
                },
              },
            },
            thumbnail: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
              size: [
                [SECTION_WIDTH_IN_PIXELS / 4 - 50],
                [
                  window.innerWidth / 4 - 50,
                  parseInt(BREAK_POINTS.phone, 10),
                  "max-width",
                ],
              ],
            },
          }}
          items={THIRD_CAROUSEL_ITEMS}
        />
      </>
    ),
  },
  {
    name: THUMBNAIL_CAROUSEL_SECTION_NAMES[3],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          This layout allows you to display the selected item below the
          carousel:
        </ExamplePageParagraph>
        <LazyLoadedCarousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            layout: {
              itemDisplayLocation: "below",
            },
            styling: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
              container: {
                padding: {
                  top: defaultFontSize,
                },
              },
            },
            thumbnail: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
              size: [
                [SECTION_WIDTH_IN_PIXELS / 4 - 50],
                [
                  window.innerWidth / 4 - 50,
                  parseInt(BREAK_POINTS.phone, 10),
                  "max-width",
                ],
              ],
            },
          }}
          items={FOURTH_CAROUSEL_ITEMS}
        />
      </>
    ),
  },
];

type ThumbnailCarouselProps = {};

export function ThumbnailCarouselPage(props: ThumbnailCarouselProps) {
  return (
    <ExamplePage
      title="Thumbnail Carousel"
      sections={SECTIONS}
      layoutProps={{
        links: [
          {
            title: {
              text: "npm",
            },
            url: THUMBNAIL_CAROUSEL_PACKAGE_URL,
            svg: {
              xlinkHref: `/sprite.svg#icon-code`,
            },
            hoverEffectType: HoverEffect.explode,
          },
        ],
      }}
    />
  );
}
