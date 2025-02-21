import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";
import { THUMBNAIL_CAROUSEL_PACKAGE_URL } from "../../../components/constants";
import { ExamplePageLink } from "../ExamplePageLink";
import { Carousel } from "react-thumbnail-carousel";
import { getCarouselStylingOptions } from "../../../styles/styles";
import { BREAK_POINTS } from "../../../styles/breakpoints";

import defaultGif from "../../../clips/react-thumbnail-carousel/Default.gif";
import fullscreenGif from "../../../clips/react-thumbnail-carousel/fullscreen.gif";
import aspectRatioGif from "../../../clips/react-thumbnail-carousel/aspectRatio.gif";
import descriptionModalGif from "../../../clips/react-thumbnail-carousel/descriptionModal.gif";
import descriptionModalBuilderGif from "../../../clips/react-thumbnail-carousel/descriptionModalBuilder.gif";
import { get } from "http";
import { SECTION_WIDTH_IN_PIXELS } from "../../../styles/constants";

export const THUMBNAIL_CAROUSEL_SECTION_NAMES = [
  "Overview",
  "Use Case 1",
  "Use Case 2",
  "Use Case 3",
];

const SECTIONS: ExamplePageSectionProps[] = [
  {
    name: THUMBNAIL_CAROUSEL_SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
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
          of images in a row. This is useful for showcasing a collection of images in a
          visually appealing way:
        </ExamplePageParagraph>
        <Carousel
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
        <ExamplePageParagraph>
          If all of the items can't fit into the width of the parent, a
          navigation bar will appear, allowing the user to navigate through the
          items by pressing the left and right arrows or swiping:
        </ExamplePageParagraph>
        <Carousel
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
              size: [[SECTION_WIDTH_IN_PIXELS / 2 - 50], [window.innerWidth / 2 - 50, parseInt(BREAK_POINTS.phone, 10), "max-width"]],
            },
          }}
          items={[
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
          ]}
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
