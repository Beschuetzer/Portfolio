import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { HoverEffect, LayoutStyledProps } from "../../../layouts/types";
import { THUMBNAIL_CAROUSEL_PACKAGE_URL } from "../../../components/constants";
import { ExamplePageLink } from "../ExamplePageLink";

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
          <ExamplePageLink url={THUMBNAIL_CAROUSEL_PACKAGE_URL}>
            react-thumbnail-carousel
          </ExamplePageLink>
          is an npm package that offers a simple and customizable thumbnail
          carousel component for React applications. The goal was to develop a
          fully customizable component with no dependencies, serving as a
          comprehensive solution for displaying and playing videos.
        </ExamplePageParagraph>
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
