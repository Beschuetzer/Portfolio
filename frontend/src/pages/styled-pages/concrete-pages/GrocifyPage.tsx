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

import addItemFlowVideo from "../../../clips/grocify/add-item-flow.mp4";
import addItemFlowVideoThumbnail from "../../../clips/grocify/thumbnails/add-item-flow.png";
import itemNavigationVideo from "../../../clips/grocify/item-navigation.mp4";
import itemNavigationVideoThumbnail from "../../../clips/grocify/thumbnails/item-navigation.png";
import storeLookupVideo from "../../../clips/grocify/store-lookup.mp4";
import storeLookupVideoThumbnail from "../../../clips/grocify/thumbnails/store-lookup.png";

import optionsPic from "../../../imgs/grocify/options.jpg";
import previouslyPurchasedPic from "../../../imgs/grocify/previously-purchased.jpg";
import scanOnePic from "../../../imgs/grocify/scan-1.jpg";
import scanTwoPic from "../../../imgs/grocify/scan-2.jpg";
import scanThreePic from "../../../imgs/grocify/scan-3.jpg";
import storesListPic from "../../../imgs/grocify/stores-list.jpg";

const SECTION_NAMES = [
  "Overview",
  "ChatGPT Integration",
  "Media",
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
        <Carousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            itemViewer: {
              aspectRatio: 0.8,
            },
            container: {
              text: "Leveraging ChatGPT to convert images to shopping lists:"
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
  {
    name: SECTION_NAMES[2],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Carousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            itemViewer: {
              aspectRatio: 0.8,
            },
            container: {
              text: "Some more features:",
            },
          }}
          items={[
            {
              srcMain: addItemFlowVideo,
              srcThumbnail: addItemFlowVideoThumbnail,
              description: "Adding a new item",
              modal: {
                sections: [
                  {
                    title: "S3 Integration",
                    text: "Images are uploaded to an S3 bucket and the URL is saved in the database on success.",
                  },
                ],
              },
            },
            {
              srcMain: itemNavigationVideo,
              srcThumbnail: itemNavigationVideoThumbnail,
              description: "Navigating items",
              modal: {
                sections: [
                  {
                    title: "Flashlist",
                    text: "The shopify component 'flashlist' is used to display the items in the cart in order to handle large lists of items efficiently.",
                  },
                  {
                    title: "Alpabetical Navigation",
                    text: "Pressing one of the letters at the right side of the screen scrolls to the first item starting with that letter.",
                  },
                ],
              },
            },
            {
              srcMain: storeLookupVideo,
              srcThumbnail: storeLookupVideoThumbnail,
              description: "Store Lookup via external API",
            },
            {
              srcMain: optionsPic,
              description: "Options",
            },
            {
              srcMain: previouslyPurchasedPic,
              description: "Previously Purchased Items",
            },
            {
              srcMain: scanOnePic,
              description: "Scanning Start",
            },
            {
              srcMain: scanTwoPic,
              description: "Scanning Middle",
            },
            {
              srcMain: scanThreePic,
              description: "Scanning End",
            },
            {
              srcMain: storesListPic,
              description: "Stores List",
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
