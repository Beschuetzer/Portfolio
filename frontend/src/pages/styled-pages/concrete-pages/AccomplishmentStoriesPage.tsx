import { ExamplePage, ExamplePageSectionProps } from "../ExamplePage";
import { LayoutStyledProps } from "../../../layouts/types";
import {
  AccomplishmentStoryDetail,
  AccomplishmentStoryTags,
} from "../../../types";
import { AccomplishmentStory } from "../../../components/AccomplishmentStory";
import InterviewQuestion, {
  InterviewQuestionProps,
} from "../../../components/InterviewQuestion";

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
        "I collaborated with the Product Manager and UI Designer to transform Figma designs into a fully functional feature. Using React TypeScript and Redux, I built the leads feature, enabling employees to create and save baskets along with notes about the interaction as well as schedule consultations with a solutions expert.",
      result:
        "The feature was a success.  It made it easier for customers to continue shopping when they got home, since the interaction was mailed to them in the form of a basket that could be loaded on bestbuy.com. It directly contributed to a 15% increase in sales as a result.",
    },
    name: "Leads Feature for In-Store Employees",
  },
  {
    tags: [AccomplishmentStoryTags.Library, AccomplishmentStoryTags.Typescript],
    name: "Fetch Library",
    details: {
      situation:
        "At Best Buy, there were various apps that used Module Federation.  One challenge they were having is that each micro front end would make the a lot of the same calls on loading.",
      task: "I was tasked with creating a general purpose library that could provide caching, de-duplication, and token management across micro frontend.",
      action:
        "I created a library that worked both on the frontend and backend by wrapping the native Fetch API.  It was designed to be used with Module Federation and could be used by any micro frontend.  I created a performance benchmarking app, a test suite and documentation on how to use it.",
      result:
        "It was implemented into another library that was used to interact with the in-house policy server in order to provide call retries, circuit breaking, call de-duplication, caching, and token management.  It improved performance in many cases by caching responses and simplified certain use cases by handling tokens internally.",
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
  {
    tags: [AccomplishmentStoryTags.Scalability],
    name: "AWS S3",
    details: {
      situation:
        "At Best Buy, we had an app that accepted user upload in the form of images and application binaries.  The server was handling all of the uploads itself.  This was causing performance issues and was not scalable.",
      task: "I was tasked with finding a solution that was scalable.",
      action:
        "I looked into AWS S3 and Cloudfront.  I created a proof of concept that used S3 for uploads and downloads.  I also created a CDN distribution resource via Cloudfront to serve the files.",
      result:
        "As a result, the server was able to handle upload and download requst more requests and the performance of the app improved.  The app was able to scale to handle more users without any issues.  I also learned a lot about AWS and how to use it.",
    },
  },
];

const INTERVIEW_QUESTIONS: InterviewQuestionProps[] = [
  {
    answer:
      "I'm looking for an opportunity to grow as a developer — both by deepening my technical skills and by working on meaningful projects with a collaborative team. I value clean code, good communication, and a culture that encourages continuous learning. I'm especially excited to contribute to a team where I can take ownership of features and see the impact of my work.",
    question:
      "What are you looking for in your next role / Why do you want to work for us?",
  },
  {
    question: "What does maintainable code mean to you?",
    answer:
      "To me, maintainability means writing code that's easy to understand, modify, and extend without introducing bugs. It means clear structure, meaningful naming, and following consistent coding standards so that someone else — or even me months later — can pick up the code and work with it efficiently. I aim to keep functions focused, avoid unnecessary complexity, and write tests and documentation where appropriate. Maintainable code reduces technical debt and helps teams move faster in the long run.",
  },
  {
    question: "Why are you no longer with you last employer (Exit Statement)?",
    answer:
      'In February of 2025 Best Buy "right-sized" their workforce and redirected resources to areas like Best Buy Health and AI.  As part of this effort, my department was restructured. I\'m now exploring opportunities that will take full advantage of my extensive skillset, namely in React, .NET, Node, and SQL.',
  },
  {
    question: "Tell me about yourself",
    answer:
      "I'm a full-stack software engineer with experience at a fortune 500 company.  I'm experienced in all stages of the software development lifecycle (i.e requirements analysis, front-end development, back-end development, database design, and performance testing. I'm the one who volunteers for the stories that no one else wants.  I have a proven track record of delivering on time even if it involves extra effort.",
  },
  {
    question: "What is your bigggest weakness?",
    answer:
      "The area where I need the most work is web accessibility.  I've come to realize how crucial it is to create inclusive experiences for all users, including those with disabilities.  While I have a basic understanding of accessibility principles, I want to go deeper. I've been studying WCAG guidelines and experimenting with ARIA attributes.  I plan to test my projects with screen readers and other accessibility tools going forward.",
  },
  {
    question: "What is your biggest strength?",
    answer: "I have a strong ability to learn quickly and adapt to new technologies.  I have a proven track record of picking up new languages and frameworks on the job.  For example, I learned .NET in a matter of weeks and was able to contribute to a large-scale project.  I also have a knack for problem-solving and debugging.",
  }
];

const ACCOMPLISHMENT_SECTIONS: ExamplePageSectionProps[] =
  ACCOMPLISHMENT_STORIES.map((story) => {
    return {
      name: story.name,
      renderContent: (propsToAdd: LayoutStyledProps) => (
        <AccomplishmentStory {...story} {...propsToAdd} />
      ),
    };
  });

const INTERVIEW_SECTIONS: ExamplePageSectionProps[] = INTERVIEW_QUESTIONS.map(
  (question) => {
    return {
      name: question.question,
      renderContent: (propsToAdd: LayoutStyledProps) => (
        <InterviewQuestion {...question} {...propsToAdd} />
      ),
    };
  }
);

type AccomplishmentStoriesProps = {};

export function AccomplishmentStoriesPage(props: AccomplishmentStoriesProps) {
  return (
    <ExamplePage
      title="Accomplishment Stories"
      sections={[...INTERVIEW_SECTIONS, ...ACCOMPLISHMENT_SECTIONS]}
    />
  );
}
