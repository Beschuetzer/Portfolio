import { SSK_URL } from "../../../../components/constants";
import { ExamplePageLink } from "../../ExamplePageLink";
import { ResumePageWorkHistoryItem } from "./ResumePageWorkHistory";

type Achievement = {
  name: ResumePageWorkHistoryItem["achievements"][number];
  date: Date;
  shouldDisplay?: boolean;
  description?: string;
  tags?: string[];
};

export const FRONT_END_ACHIEVEMENTS: Achievement[] = [
  {
    name: () => (
      <div>
        Used React Typescript to build the
        <ExamplePageLink url={`${SSK_URL}#leads`}>
          leads feature
        </ExamplePageLink>
        , which allowed in-store employees to create re-usable baskets and
        schedule consultations, leading to a sales increase of ~15%.
      </div>
    ),
    date: new Date(2022, 5, 15),
    tags: ["Typescript", "React", "Redux", "GraphQL"],
  },
  {
    name: "Used React Typescript to add a voice notes feature complete with 360 degree duration animation, allowing employees to leave voice notes about a consultation when using the leads feature.",
    date: new Date(2022, 5, 22),
    tags: ["Typescript", "React"],
  },
  {
    name: () => (
      <div>
        Used React Typescript to create a re-usable
        <ExamplePageLink url={`${SSK_URL}#quantity-selector`}>
          quantity selector
        </ExamplePageLink>
        component which displayed the current quantity as well as adjusted the
        quantity of a product in the basket.
      </div>
    ),
    date: new Date(2022, 6, 5),
    tags: ["Typescript", "React"],
  },
  {
    name: () => (
      <div>
        Used React Typescript and Redux to create a component which displayed
        the saved consultations in a
        <ExamplePageLink url={`${SSK_URL}#recommendations-history`}>
          table
        </ExamplePageLink>
        , allowing employees to easily refer back to past consultations.
      </div>
    ),
    date: new Date(2022, 6, 5),
    tags: ["Typescript", "React"],
  },
  {
    name: () => (
      <div>
        Used React Typescript to create an
        <ExamplePageLink url={`${SSK_URL}#accessory-drawer`}>
          accessory drawer
        </ExamplePageLink>
        which displayed after the user added a product to the cart, displaying
        related accessories using infinite scroll.
      </div>
    ),
    date: new Date(2022, 6, 15),
    tags: ["Typescript", "React", "Redux"],
  },
  {
    name: "Used Redux Toolkit and Tanstack Query to complex state interaction and cache service calls.",
    date: new Date(2022, 6, 15),
    tags: ["Typescript", "React", "Redux"],
  },
  {
    name: "Maintained 80%+ test coverage through Jest and xUnit testing, ensuring high-quality deliverables.",
    date: new Date(2022, 6, 15),
    tags: ["Typescript", "Jest", "xUnit"],
  },
];

export const BACK_END_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Created a fully-customizable .NET 8 batcher service by pulling Twillio attributes at a defined interval and storing them in a PostgreSQL database, allowing the policy service to evaluate policies based on Twillio attributes without having to make calls itself.",
    date: new Date(2025, 0, 14),
    tags: [".NET", "PostgreSQL"],
  },
  {
    name: "Refactored the .NET 8 backend to use new and existing GraphQL queries to fetch feedback data, eliminating one network call.",
    date: new Date(2023, 9, 1),
    tags: [".NET", "GraphQL"],
  },
  {
    name: "Created a .NET 8 service class that leveraged external APIs to automatically add the correct protection plan to the basket when applicable, increasing protection plan sales by +15%.",
    date: new Date(2023, 0, 15),
    tags: [".NET"],
  },
];

export const OTHER_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Combined three existing GraphQL queries for getting store details (storeById, storeLookupByLatLong, and storeLookupByZip) into a single query (storeLookup).",
    date: new Date(2022, 6, 1),
    tags: ["GraphQL"],
  },
  {
    name: "Wrote unit tests using Jest and xUnit for all new functionality and bug fixes.",
    date: new Date(2023, 0, 21),
    tags: ["Jest", "xUnit"],
  },
  {
    name: "Identified and resolved a React Typescript production bug where the UI for creating rules would break in some cases, causing users to lose their changes.",
    date: new Date(2023, 0, 21),
    tags: ["bugfix", "React", "Typescript", "Redux"],
  },
  {
    name: "Identified and resolved a React Typescript production bug where redundant calls were being made when the feedback filters changed.",
    date: new Date(2023, 1, 21),
    tags: ["bugfix", "React", "Typescript", "Redux"],
  },
  {
    name: "Translated Figma designs into pixel-perfect implementations with meticulous attention to detail.",
    date: new Date(2022, 6, 15),
  },
  {
    name: "Attended design meetings and spoke up when something was either unclear or unnecessarily complex.",
    date: new Date(2022, 6, 15),
  },
  {
    name: "Created a .NET hosted service to migrate Azure storage data to AWS S3, simplifying the migration of the in-house app store to AWS.",
    date: new Date(2024, 9, 1),
    tags: [".NET", "AWS", "Azure"],
  },
  {
    name: "Created a Node.js script to convert the MS SQL .csv files into PostgreSQL .sql files, allowing for a seamless transition to the new database.",
    date: new Date(2024, 9, 1),
    tags: ["Node.js", "PostgreSQL", "MS SQL"],
  },
  {
    name: "Built a typescript(Node.js and frontend compatible) library (bundled by Rollup) which provided a simplified interface for making policy-related decisions in an app.",
    date: new Date(2023, 9, 1),
    description: "omnichannel-policy-server-lib",
    tags: ["Node.js", "typescript", "Rollup"],
  },
  {
    name: "Built a typescript(Node.js and frontend compatible) authentication library (bundled by Rollup) which simplified the setup of the employee OAuth2 provider for new apps.",
    date: new Date(2023, 9, 1),
    description: "omnichannel-bsl-auth-node-js-provider",
    tags: ["Node.js", "typescript", "Rollup"],
  },
  {
    name: "Built a typescript(Node.js and frontend compatible) library (bundled by Rollup) which wrapped the native fetch function and provided call de-duplication, caching, circuit-breaking, retrying, and token management.",
    date: new Date(2023, 9, 1),
    description: "omnichannel-fetch-lib",
    tags: ["Node.js", "typescript", "Rollup"],
  },
  {
    name: "Set up Module Federation webpack configs.",
    date: new Date(2023, 9, 1),
    tags: ["Module Federation", "Webpack"],
  },
];

export const QUESTIONABLEE_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Assisted in the migration from Azure to AWS (Stratus) for the in-house app store, reducing maintenance costs by 5%.",
    date: new Date(2025, 1, 1),
  },
  {
    name: "Identified and resolved bugs in the React.js client apps as well as the .NET (C#) backend apps, enhancing functionality and significantly improving user experience.",
    date: new Date(2025, 1, 1),
  },
  {
    name: "Collaborated with cross-functional teams in an Agile environment, actively participating in daily stand-ups, sprint planning, and retrospectives to ensure the delivery of high-quality software solutions.",
    date: new Date(2022, 4, 1),
  },
];

export const ALL_ACHIEVEMENTS: Achievement[] = [
  ...FRONT_END_ACHIEVEMENTS,
  ...BACK_END_ACHIEVEMENTS,
  ...OTHER_ACHIEVEMENTS,
];

export function getAchievements(start: Date, end: Date) {
  return ALL_ACHIEVEMENTS.filter(
    (achievement) => achievement.date >= start && achievement.date <= end
  );
}
