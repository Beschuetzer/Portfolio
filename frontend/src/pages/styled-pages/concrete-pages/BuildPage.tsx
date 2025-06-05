import { LINKED_IN_URL } from "../../../components/constants";
import { ExamplePage } from "../ExamplePage";

type BuildProps = {};

const PROMPTS = {
    resumeOptimizationWithAttachment: (jobDescriptionUrl: string) => `Analyze my resume and provide tailored improvements to align it with the job description at ${jobDescriptionUrl}.  Highlights skills, achievements, and keywords from the job description.  Ensure that is passes ATS screening and appeals to hiring managers.`,
    resumeOptimization: (jobDescriptionUrl: string) => `Create a resume based on my experience (found at adammajor.com) and provide tailored improvements to align it with the job description found at ${jobDescriptionUrl}.  Highlights skills, achievements, and keywords from the job description.  Ensure that is passes ATS screening and appeals to hiring managers.`,
    coverLetterCreation: (jobDescriptionUrl: string) => `Create a cover letter based on my experience (found at adammajor.com) and the job description found at ${jobDescriptionUrl}. Emphasize my experience in web development and how it aligns with the company's values and mission.  Make it concise, engaging, and unique.`,
    interviewQuestions: (jobDescriptionUrl: string) => `Generate a list of 20 interview questions based on the job description found at ${jobDescriptionUrl}.  Include technical, behavioral, and industry-specific questions.  Provide model answers tailored to my experience (found at adammajor.com).`,
    salaryNegotiation: (jobDescriptionUrl: string) => `Help me craft a strong salary negotiation strategy for the job description found at ${jobDescriptionUrl}. Consider industry benchmarks, my experience level in web development, and how to confidently communicate my value without jepordizing the offer.`,
    linkedInProfileEnhancement: (jobDescriptionUrl: string) => `Revise my LinkedIn profile (${LINKED_IN_URL}) summary and experience sections to optimize for the positiona found at ${jobDescriptionUrl}. Focus on SEO keywords, achievements, and storytelling to attract recruiters and hiring managers.`,
    networkOutreachMessage: (companyName: string) => `Write a professional yet friendly LinkedIn message to connect with web developer professionals at ${companyName}. My goal is to build rapport and learn about potential job opportunities without seeming to transactional.`,
    personalBrandingStrategy: () => `Develop a personal branding strategy for me as a web developer.  Include content ideas for LinkedIn, networking tactics, and ways to position myself as an expert to attract top recruiters.`,
    mockInterview: (jobDescriptionUrl: string) => `Act as a hiring manager for the position found at ${jobDescriptionUrl}.  eConduct a mock interview with me.  Ask 5 behavioral questions and 5 technical questions.  After my responses, provide feedback on clarity, impact, and areas of improvement.`,
    elevatorPitchCreation: (jobDescriptionUrl: string) => `Help me craft a compelling 30-second elevator pitch for the role found at ${jobDescriptionUrl}. Ensure it highlights my unique value, key achievements, and why I'm the perfect fit in a confident yet natural tone.`,
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
