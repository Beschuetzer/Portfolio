import { ExamplePage } from "../ExamplePage";

type BuildProps = {};

const PROMPTS = {
    resumeOptimization: (jobDescriptionUrl: string) => `Analyze my resume and provide tailored improvements to align it with the job description at ${jobDescriptionUrl}.  Highlights skills, achievements, and keywords from the job description.  Ensure that is passes ATS screening and appeals to hiring managers.`,
}

export function BuildPage(props: BuildProps) {
  return (
    <ExamplePage
      title="Build Prompts"
      sections={[{
        name: "Resume Optimization",
        renderContent: (propsToAdd) => (
          <div {...propsToAdd}>
            <h2>Resume Optimization</h2>
            <p>{PROMPTS.resumeOptimization("https://www.example.com")}</p>
          </div>
        ),
      }]}
    />
  );
}
