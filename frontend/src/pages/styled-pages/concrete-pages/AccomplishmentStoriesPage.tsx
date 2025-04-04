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
];

const ACCOMPLISHMENT_SECTIONS: ExamplePageSectionProps[] =
  Object.values(AccomplishmentStoryTags).map((tag) => {
    return {
      name: tag,
      renderContent: (propsToAdd: LayoutStyledProps) => (
        <div style={{ display: "flex", flexDirection: "column", gap: defaultFontSize }}>
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
