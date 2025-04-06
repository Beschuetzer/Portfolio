import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { LayoutStyledProps } from "../../../layouts/types";
import {
  AccomplishmentStoryDetail,
  AccomplishmentStoryTags,
} from "../../../types";
import { AccomplishmentStory } from "../../../components/AccomplishmentStory";
import { defaultFontSize } from "../../../styles/constants";

export const ACCOMPLISHMENT_STORIES: AccomplishmentStoryDetail[] = [
  {
    tags: [
      AccomplishmentStoryTags.GraphQL,
      AccomplishmentStoryTags.Optimization,
      AccomplishmentStoryTags.Refactoring,
    ],
    details: {
      situation:
        "At Best Buy, one of our .NET backends was making multiple network calls to retrieve feedback data, leading to performance inefficiencies and increased server load.",
      task: "I was tasked with optimizing the feedback data retrieval by reducing unnecessary network calls all while maintaining data integrity and system functionality.",
      action:
        "I refactored the backend to leverage the enterprise GraphQL service.  This required both adding new queries as well as refactoring existing ones.  Ultimately, I consolidated multiple REST API requests into a single, optimized GraphQL query. This reduced redundant calls, improved data fetching efficiency, and streamlined backend logic.",
      result:
        "As a result, the number of network calls required for feedback retrieval was reduced which improved response times. A side effect of this work was that other teams could now access the feedback data directly since the GraphQL service was enterprise-wide.",
    },
    name: "Refactor Feedback Data Retrieval Using GraphQL",
  },
  {
    tags: [
      AccomplishmentStoryTags.Frontend,
      AccomplishmentStoryTags.React,
      AccomplishmentStoryTags.Typescript,
      AccomplishmentStoryTags.Redux,
    ],
    details: {
      situation:
        "At Best Buy, in-store employees needed a more efficient way to record customer interactions and assist with purchases.",
      task: "I was responsible for developing a feature that allowed employees to create reusable product baskets and schedule consultations.",
      action:
        "I worked with the Product Manager and UI Designer to bring Figma designs to life.  I used React Typescript and Redux to create consultations that could be sent to the backend for saving.  I collaborated with the Product Manager and UI Designer to transform Figma designs into a fully functional feature. Using React TypeScript and Redux, I built the leads feature, enabling employees to create and save baskets along with notes about the interaction as well as schedule consultations with a solutions expert.",
      result:
        "This feature streamlined the sales process, making it easier for employees to assist customers.  It also made it easier for customers to continue shopping when they got home, since the interaction was mailed to them in the form of a basket that could be loaded on bestbuy.com. It directly contributed to a 15% increase in sales as a result.",
    },
    name: "Leads Feature for In-Store Employees",
  },
  {
    tags: [AccomplishmentStoryTags.Library, AccomplishmentStoryTags.Typescript],
    name: "Fetch Library",
    details: {
      situation:
        "At Best Buy, we various apps that used Module Federation.  One challenge they were having is that each micro front end would make the a lot of the same calls on loading.",
      task: "I was tasked with creating a general purpose library that could provide caching, de-duplication, and token management across micro frontend.",
      action:
        "I created a library that worked both on the frontend and backend by wrapping the native Fetch API with .  It was designed to be used with Module Federation and could be used by any micro frontend.  I created a performance benchmarking app, a test suite and documentation on how to use it.",
      result:
        "It was implemented into another library that was used to interact with the in-house policy server in order to provide call retries, circuit breaking, call de-duplication, caching, and token management.  It improved performance in many cases by caching responses and simplified certain use cases by handling tokens tokens internally.",
    },
  },
  {
    tags: [
      AccomplishmentStoryTags.Library,
      AccomplishmentStoryTags.Typescript,
      AccomplishmentStoryTags.Express,
      AccomplishmentStoryTags.Challenge,
    ],
    name: "BSL Auth Library",
    details: {
      situation:
        "At Best Buy, we used an in-house OAuth2 server for authentication.  Every app would have to go through the same set up process to use it.",
      task: "I was tasked with creating a general purpose library and middleware that could be used by Express backends to simplify the set up process.",
      action:
        "I created a library that used passport's oauth 2 strategy.  I made sure to make it configurable so that all of the options that the strategy had could be passed in via the library.  Optional middleware could be added which attached the token to the request object later in the middle ware chain.  I also created a proof of concept application and documentation on how to use it.",
      result:
        "Unfortunately, the library was never used in production as it was completed right before the announcement that the auth provider was changing.  However, it was a good learning experience for me.  I learned a lot about how OAuth2 works.",
    },
  },
];

const ACCOMPLISHMENT_SECTIONS: ExamplePageSectionProps[] = Object.values(
  AccomplishmentStoryTags
).map((tag) => {
  return {
    name: tag,
    renderContent: (propsToAdd: LayoutStyledProps) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: defaultFontSize,
        }}
      >
        {ACCOMPLISHMENT_STORIES.filter((story) =>
          story.tags?.includes(tag as AccomplishmentStoryTags)
        ).map((story, index) => (
          <AccomplishmentStory {...story} {...propsToAdd} key={index} />
        ))}
      </div>
    ),
  };
});

type AccomplishmentStoriesProps = {};

export function AccomplishmentStoriesPage(props: AccomplishmentStoriesProps) {
  return (
    <ExamplePage
      title="Accomplishment Stories"
      sections={ACCOMPLISHMENT_SECTIONS}
    />
  );
}
