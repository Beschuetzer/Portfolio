import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { BEST_BUY_SSK_INFO_ONE_URL } from "../../../components/constants";
import { Quote } from "../../../components/Quote";
import { LayoutStyledProps } from "../../../layouts/types";
import { ExamplePageLink } from "../ExamplePageLink";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { ExamplePageTitledList } from "../ExamplePageTitledList";

import leadTypes from "../../../clips/ssk/lead-types.mp4";
import leadTypesThumbnail from "../../../clips/ssk/thumbnails/lead-types.png";
import leadAttachmentView from "../../../clips/ssk/lead-attachment-view.mp4";
import leadAttachmentViewThumbnail from "../../../clips/ssk/thumbnails/lead-attachment-view.png";
import leadScheduling from "../../../clips/ssk/lead-scheduling.mp4";
import leadSchedulingThumbnail from "../../../clips/ssk/thumbnails/lead-scheduling.png";
import leadAddress from "../../../clips/ssk/lead-address.mp4";
import leadAddressThumbnail from "../../../clips/ssk/thumbnails/lead-address.png";
import recommendations from "../../../clips/ssk/recommendations.mp4";
import recommendationsThumbnail from "../../../clips/ssk/thumbnails/recommendations.png";
import accessoryDrawer from "../../../clips/ssk/accessory-drawer.mp4";
import accessoryDrawerThumbnail from "../../../clips/ssk/thumbnails/accessory-drawer.png";
import quantitySelector from "../../../clips/ssk/quantity-selector.mp4";
import quantitySelectorThumbnail from "../../../clips/ssk/thumbnails/quantity-selector.png";
import { getCarouselStylingOptions } from "../../../styles/styles";
import LazyLoadedCarousel from "../../../components/LazyLoadedCarousel";

const SECTION_NAMES = [
  "Overview",
  "Leads",
  "Recommendations History",
  "Accessory Drawer",
  "Quantity Selector",
];
const SSK_SECTIONS: ExamplePageSectionProps[] = [
  {
    name: SECTION_NAMES[0],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <Quote
          author="Seneca"
          text="Every new beginning comes from some other beginning’s end."
        />
        <ExamplePageParagraph>
          Solution Sidekick is a mobile app used by Best Buy associates that
          offers selling assistance acroll all departments and channels as well
          as a way to
          <ExamplePageLink url={BEST_BUY_SSK_INFO_ONE_URL}>
            increase their customer NPS
          </ExamplePageLink>
          .
        </ExamplePageParagraph>
        <ExamplePageParagraph>
          I started on the team in February of 2022 and contributed to various
          features, bug fixes, and enhancements. Below you will find examples of
          the biggest frontned contributions I made.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: SECTION_NAMES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          The leads flow was designed to allow in store employees to create
          baskets and schedule consultations for customers. It was developed
          over the course of multiple sprints and involved various integrations
          with internal services. The purpose of the feature is twofold:
          <ExamplePageTitledList
            tabCount={2}
            items={[
              "To save the interaction in the form of a basket/recommendation which could be imported at home by the customer on bestbuy.com",
              "Provide a way to schedule a follow-up appointment with the customer to discuss a product solution.",
            ]}
          />
        </ExamplePageParagraph>
        <LazyLoadedCarousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            itemViewer: {
              aspectRatio: 0.8,
            },
            styling: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
              container: {
                margin: {
                  top: 28,
                },
              },
            },
            thumbnail: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
              spacingStrategy: "max",
            },
          }}
          items={[
            {
              srcMain: leadScheduling,
              srcThumbnail: leadSchedulingThumbnail,
              description: "Scheduling a lead",
              modal: {
                sections: [
                  {
                    title: "Scheduling",
                    text: "Scheduling involves selecting a location and time for the appointment. The location may be a store, virtual, or at the client's home.",
                  },
                  {
                    title: "Note on Development Environment",
                    text: "The call to the backend service that retrieves the available appointment times is significantly slower than in prod.",
                  },
                ],
              },
              video: {
                sections: [
                  ["Lead Details", 1000],
                  ["Getting Availability in test env", 10000],
                  ["Picking a time", 10000],
                  ["Getting Next Month's Availability", 7500],
                  ["Changing Location", 5000],
                  ["Getting New Location Availability", 2100],
                  ["No Availability Modal", 3500],
                ],
              },
            },
            {
              srcMain: leadAttachmentView,
              srcThumbnail: leadAttachmentViewThumbnail,
              description: "A bottom sheet that displays the lead details",
              modal: {
                sections: [
                  {
                    title: "Lead Details",
                    text: "Each lead contains some number of products, the customer details, the associates notes, and the appointment time. The bottom sheet is used to view and edit the products associated with the lead.",
                  },
                ],
              },
              video: {
                sections: [
                  ["Opening the Bottomsheet", 4800],
                  ["Toggling Combo Item Visibility", 2300],
                  ["Toggling Basket Visibility", 2000],
                  ["Removing Basket from Lead", 2000],
                ],
              },
            },
            {
              srcMain: leadAddress,
              srcThumbnail: leadAddressThumbnail,
              description: "Adding the customer's address",
              modal: {
                sections: [
                  {
                    title: "Validation",
                    text: "Each field is validated using regular expressions.",
                  },
                ],
              },
              video: {
                sections: [
                  ["Opening the Address Form", 2000],
                  ["Showing Validation", 8000],
                  ["State Picker", 3500],
                  ["Button Disabling on Invalid Value", 5000],
                ],
              },
            },
            {
              srcMain: leadTypes,
              srcThumbnail: leadTypesThumbnail,
              description: "Lead types",
              modal: {
                sections: [
                  {
                    title: "Two Types of Leads",
                    text: "The flow had to vary depending on the type of lead.",
                  },
                ],
              },
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
        <ExamplePageParagraph>
          The recommendations history page was designed to allow in store
          employees to view their recommendations. The recommendations were
          fetched from the backend in a paginated manner and displayed using an
          infinitie scroll approach:
        </ExamplePageParagraph>
        <LazyLoadedCarousel
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
            layout: {
              itemDisplayLocation: "none",
            },
            thumbnail: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
              spacingStrategy: "max",
            },
          }}
          items={[
            {
              srcMain: recommendations,
              srcThumbnail: recommendationsThumbnail,
              description: "Viewing Recommendations",
              modal: {
                sections: [
                  {
                    title: "Inifinite Scroll",
                    text: "Scrolling to the bottom of the page will trigger a fetch for more recommendations.",
                  },
                  {
                    title: "Paginated Fetching",
                    text: "Each call retreived 50 recommendations.",
                  },
                ],
              },
              video: {
                sections: [
                  ["Fetching First Batch", 4000],
                  ["Infinite Scrolling", 7000],
                  ["Viewing Recommendation Details", 3500],
                  ["Caching of Recommendations", 6000],
                  ["Last Batch", 4000],
                ],
              },
            },
          ]}
        />
      </>
    ),
  },
  {
    name: SECTION_NAMES[3],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          The accessory drawer would show up whenever a product is added to the
          cart and display associated items:
        </ExamplePageParagraph>
        <LazyLoadedCarousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            itemViewer: {
              aspectRatio: 0.8,
            },
            layout: {
              itemDisplayLocation: "none",
            },
            styling: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
              container: {
                margin: {
                  top: 14,
                },
              },
            },
            thumbnail: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
              spacingStrategy: "max",
            },
          }}
          items={[
            {
              srcMain: accessoryDrawer,
              srcThumbnail: accessoryDrawerThumbnail,
              description: "Viewing Accessories",
              modal: {
                sections: [
                  {
                    title: "Inifinite Scroll",
                    text: "Scrolling to the bottom of the page will trigger a fetch for more recommendations.",
                  },
                ],
              },
              video: {
                sections: [
                  ["Recommendations and Categories", 2000],
                  ["Viewing Mounts", 4500],
                  ["Caching Demonstration", 4800],
                  ["Loading Skeleton", 2500],
                ],
              },
            },
          ]}
        />
      </>
    ),
  },
  {
    name: SECTION_NAMES[4],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
          The QuantitySelector was a re-usable component that allowed the user to change the quantity of a product in the cart. It was the de-facto way to adjust the quantity of a product in the cart after it had been added. 
        </ExamplePageParagraph>
        <LazyLoadedCarousel
          options={{
            ...getCarouselStylingOptions(propsToAdd.colorscheme),
            itemViewer: {
              aspectRatio: 0.8,
            },
            layout: {
              itemDisplayLocation: "none",
            },
            styling: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
              container: {
                margin: {
                  top: 14,
                },
              },
            },
            thumbnail: {
              ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
              spacingStrategy: "max",
            },
          }}
          items={[
            {
              srcMain: quantitySelector,
              srcThumbnail: quantitySelectorThumbnail,
              description: "Adjusting the quantity",
              modal: {
                sections: [
                  {
                    title: "Inifinite Scroll",
                    text: "Scrolling to the bottom of the page will trigger a fetch for more recommendations.",
                  },
                ],
              },
              video: {
                sections: [
                  ["Opening the drawer", 1000],
                  ["Selecting a Quantity", 5500],
                  ["New Quantity Registered", 3500],
                  ["Removing Product", 2500],
                ],
              },
            },
          ]}
        />
      </>
    ),
  },
];

type SSKPageProps = {};
export function SSKPage(props: SSKPageProps) {
  return <ExamplePage title="Solution Sidekick" sections={SSK_SECTIONS} />;
}
