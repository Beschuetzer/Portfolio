import React from "react";
import InterviewQuestion, { InterviewQuestionProps } from "../../components/InterviewQuestion";
import { LayoutStyledProps } from "../../layouts/types";
import { ExamplePage, ExamplePageSectionProps } from "./ExamplePage";

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
    answer:
      "I have a strong ability to learn quickly and adapt to new technologies.  I have a proven track record of picking up new languages and frameworks on the job.  For example, I learned .NET in a matter of weeks and was able to contribute to a large-scale project.  I also have a knack for problem-solving and debugging.",
  },
  {
    question: "How do you deal with difficult people?",
    answer:
      "I try to approach difficult interactions with curiosity and empathy, rather than judgment.  I ask questions to understand their perspective and find common ground. I also try to remain calm and professional, even if the other person is not. If necessary, I will involve a manager or HR to mediate the situation.",
  },
  {
    question: "How do you debug an application across the full stack?",
    answer:
      "Whenever I debug, I start by reproducing the issue as clearly as possible—ideally capturing steps, inputs, and what the expected vs. actual behavior is. If i'm familiar with the application, I use my familiarity to guide the starting point.  If not, I work systematically, starting from the UI and moving backward through the stack.  Some tools I use are the browser's dev tools, logging, and debugging tools like Postman.",
  },
  {
    question: "What are some deployments optimizations?",
    answer:
      "There are many optimizations that can be made to improve deployment times.  Some of the most common ones are: Minifying and compressing assets to reduce their size. Using a CDN to serve static assets. Caching assets on the client side. Using lazy loading to load assets only when they are needed. Using a build tool like Webpack to bundle and optimize assets.",
  },
  {
    question: "What are backend optimizations?",
    answer:
      "There are many optimizations that can be made to improve backend performance.  Some of the most common ones are: Using a caching layer to store frequently accessed data. Optimizing database queries to reduce their execution time. Using a load balancer to distribute traffic across multiple servers. Using a content delivery network (CDN) to serve static assets. Using a message queue to decouple services and improve scalability.",
  },
  {
    question: "What are message queues?",
    answer:
      "Message queues are a way to decouple services and improve scalability.  They allow services to communicate asynchronously by sending messages to a queue.  The messages can be processed by one or more consumers, which can be scaled independently of the producers.  This allows for better load balancing and fault tolerance.  It is a common pattern in microservices architectures.",
  },
  {
    question: "How would you optimize complex redux state?",
    answer:
      "To optimize complex Redux state, I would first analyze the state structure to identify any unnecessary nesting or redundancy. I would then consider normalizing the state to flatten it out, which can simplify updates and make it easier to manage. Additionally, I would use selectors to derive data from the state rather than storing derived data directly in the state. This can help reduce the amount of data stored in Redux and improve performance.",
  },
  {
    question: "Why use React?",
    answer:
      "React is a popular JavaScript library for building user interfaces.  It allows developers to create reusable components that can be easily composed to build complex UIs.  React uses a virtual DOM to optimize rendering performance, which can lead to faster updates and better user experiences.  Additionally, React has a large ecosystem of libraries and tools that make it easy to integrate with other technologies.",
  },
];

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

type InterviewQuestionsPageProps = {};

export function InterviewQuestionsPage(props: InterviewQuestionsPageProps) {
 return (
    <ExamplePage
      title="Interview Questions"
      sections={INTERVIEW_SECTIONS}
    />
  );
}
