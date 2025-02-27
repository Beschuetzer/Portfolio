import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { GROCIFY_PAGE_NAME } from "../../../components/constants";
import { Quote } from "../../../components/Quote";
import { LayoutStyledProps } from "../../../layouts/types";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { Carousel } from "react-thumbnail-carousel";
import { getCarouselStylingOptions } from "../../../styles/styles";

import quickAddFlowVideo from "../../../clips/grocify/quick-add/flow.mp4";
import quickAddFlowVideoThumbnail from "../../../clips/grocify/quick-add/thumbnails/flow.png";
import quickAddNewItemVideo from "../../../clips/grocify/quick-add/new-item.mp4";
import quickAddNewItemVideoThumbnail from "../../../clips/grocify/quick-add/thumbnails/new-item.png";
import quickAddQuantityVideo from "../../../clips/grocify/quick-add/quantity.mp4";
import quickAddQuantityVideoThumbnail from "../../../clips/grocify/quick-add/thumbnails/quantity.png";
import quickAddRowChangesVideo from "../../../clips/grocify/quick-add/row-changes.mp4";
import quickAddRowChangesVideoThumbnail from "../../../clips/grocify/quick-add/thumbnails/row-changes.png";

const SECTION_NAMES = [
  "Overview",
  "ChatGPT Integration",
  "S3 Integration",
  "Other Features",
];
const GROCIFY_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Seneca"
          text="Every new beginning comes from some other beginning's end."
        />
        <ExamplePageParagraph>
          Grocify is the name of an expo app I created with the intent of making
          my grocery shopping experience more efficient by being able to create
          stores and items, scan items to add them to the cart, view previously
          purchased items, and convert images to lists. Being able to give items
          store specific values allows me to customize my route through the
          store and view pictures of the items in question. The app is still in
          development, and I plan to add more features in the future.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: SECTION_NAMES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          ChatGPT is leveraged to convert images to shopping lists via the "Quick Add" feature:
        </ExamplePageParagraph>
        <Carousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            itemViewer: {
              aspectRatio: 0.8,
            },
            styling: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
              container: {
                margin: {
                  top: 14,
                },
              },
            },
          }}
          items={[
            {
              srcMain: quickAddFlowVideo,
              srcThumbnail: quickAddFlowVideoThumbnail,
              description: "Quick add flow",
              modal: {
                sections: [
                  {
                    title: "ChatGPT Integration",
                    text: "The image is sent to the ChatGPT API which returns a list of items it thinks are in the image. The user can then save the items to the cart.",
                  },
                ],
              },
            },
            {
              srcMain: quickAddNewItemVideo,
              srcThumbnail: quickAddNewItemVideoThumbnail,
              description: "When no item is found",
              modal: {
                sections: [
                  {
                    title: "Adding a new item",
                    text: "If the item is not in the redux store, the user can add it by adding the details in the item form.",
                  },
                ],
              },
            },
            {
              srcMain: quickAddRowChangesVideo,
              srcThumbnail: quickAddRowChangesVideoThumbnail,
              description: "Adding a row",
              modal: {
                sections: [
                  {
                    title: "Rows",
                    text: "When a new row is added, the search term is used to find matching items in the database. If there is more than one match, the user can change the item used for a given row via a dropdown.",
                  },
                ],
              },
            },
            {
              srcMain: quickAddQuantityVideo,
              srcThumbnail: quickAddQuantityVideoThumbnail,
              description: "Changing Quantity",
            },
          ]}
        />
      </>
    ),
  },
];

type GrocifyPageProps = {};
export function GrocifyPage(props: GrocifyPageProps) {
  return <ExamplePage title={GROCIFY_PAGE_NAME} sections={GROCIFY_SECTIONS} />;
}
