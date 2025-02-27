import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import {
    BEST_BUY_SSK_INFO_ONE_URL,
} from "../../../components/constants";
import { Quote } from "../../../components/Quote";
import { LayoutStyledProps } from "../../../layouts/types";
import { ExamplePageLink } from "../ExamplePageLink";
import { ExamplePageParagraph } from "../ExamplePageParagraph";
import { ExamplePageTitledList } from "../ExamplePageTitledList";
import { Carousel } from "react-thumbnail-carousel";

import leadTypes from "../../../clips/ssk/lead-types.mp4";
import leadTypesThumbnail from "../../../clips/ssk/thumbnails/lead-types.png";
import leadAttachmentView from "../../../clips/ssk/lead-attachment-view.mp4";
import leadAttachmentViewThumbnail from "../../../clips/ssk/thumbnails/lead-attachment-view.png";
import leadScheduling from "../../../clips/ssk/lead-scheduling.mp4";
import leadSchedulingThumbnail from "../../../clips/ssk/thumbnails/lead-scheduling.png";
import leadAddress from "../../../clips/ssk/lead-address.mp4";
import leadAddressThumbnail from "../../../clips/ssk/thumbnails/lead-address.png";
import { getCarouselStylingOptions } from "../../../styles/styles";

const SECTION_NAMES = ["Overview", "Leads", "Details", "Lessons"];
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
            Solution Sidekick is a mobile app used by Best Buy associates that offers selling assistance acroll all departments and channels as well as a way to  
          <ExamplePageLink url={BEST_BUY_SSK_INFO_ONE_URL}>
            increase their customer NPS
          </ExamplePageLink>.
          I started on the team in February of 2022 and contributed to various features, bug fixes, and enhancements.
          Below you will find a list of the biggest contributions I made while working on the front end of the app.
        </ExamplePageParagraph>
      </>
    ),
  },
  {
    name: SECTION_NAMES[1],
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <>
        <ExamplePageParagraph>
            The leads feature was implemented over the course of multiple sprints and involved various integrations with external services.  
            The purpose of the feature is twofold:
            <ExamplePageTitledList tabCount={2} items={[
                "To save interactions in the form of a basket which can be imported at home by the customer",
                "Provide a way to schedule a follow-up appointment with the customer"
            ]}/>
        </ExamplePageParagraph>
        <Carousel 
            options={{
                ...getCarouselStylingOptions(propsToAdd.colorscheme),
                itemViewer: {
                    aspectRatio: .8
                },
                styling: {
                    ...getCarouselStylingOptions(propsToAdd.colorscheme).styling,
                    container: {
                        margin: {
                            top: 14
                        }
                    }
                },
                thumbnail: {
                    ...getCarouselStylingOptions(propsToAdd.colorscheme).thumbnail,
                    spacingStrategy: "max"
                }
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
                                text: "Scheduling involves selecting a location and time for the appointment. The location may be a store, virtual, or at the client's home."
                            },
                            {
                                title: "Note on Development Environment",
                                text: "The call to the backend service that retrieves the available appointment times is significantly slower than in prod."
                            }
                        ]
                    }
                },
                {
                    srcMain: leadAttachmentView,
                    srcThumbnail: leadAttachmentViewThumbnail,
                    description: "A bottom sheet that displays the lead details",
                    modal: {
                        sections: [
                            {
                                title: "Lead Details",
                                text: "Each lead contains some number of products, the customer details, the associates notes, and the appointment time. The bottom sheet is used to view and edit the products associated with the lead."
                            }
                        ]
                    }
                },
                {
                    srcMain: leadAddress,
                    srcThumbnail: leadAddressThumbnail,
                    description: "Adding the customer's address",
                    modal: {
                        sections: [
                            {
                                title: "Validation",
                                text: "Each field is validated using regular expressions."
                            }
                        ]
                    }
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
