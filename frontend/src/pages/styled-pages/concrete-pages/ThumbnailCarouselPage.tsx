import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { LayoutStyledProps } from "../../../layouts/types";
import { Quote } from "../../../components/Quote";


export const THUMBNAIL_CAROUSEL_SECTION_NAMES = ["Overview", "Use Case 1", "Use Case 2", "Use Case 3"];

const SECTIONS: ExamplePageSectionProps[] = [
  {
    name: THUMBNAIL_CAROUSEL_SECTION_NAMES[0],
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
      </>
    ),
  },
];

type ThumbnailCarouselProps = {};

export function ThumbnailCarouselPage(props: ThumbnailCarouselProps) {
  return <ExamplePage title="Thumbnail Carousel" sections={SECTIONS} />;
}
