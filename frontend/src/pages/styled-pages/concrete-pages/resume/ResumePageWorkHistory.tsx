import { styled } from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { useColorScheme } from "../../../../hooks/useColorScheme";
import {
  defaultFontSize,
  fontSizeFive,
  fontSizeFour,
  fontSizeThree,
  getFontSizeCustom,
} from "../../../../styles/constants";
import { HTMLAttributes, ReactNode } from "react";
import { ExamplePageLink } from "../../ExamplePageLink";
import { resumeContainerStyles } from "./styles";
import { respond } from "../../../../styles/breakpoints";
import { copyClickedElementTextToClipboard } from "../../../../helpers";
import { toast } from "react-toastify";

const Achievements = styled.ul<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: ${defaultFontSize} 0 0 ${getFontSizeCustom(2.5)};

  ${respond.phone`
    padding-left: ${getFontSizeCustom(1.25)};
  `}
`;

const AchievementItem = styled.li<LayoutStyledProps>`
  font-size: ${fontSizeFour};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  &:focus {
    outline: 2px solid ${({ colorscheme }) => colorscheme?.primary1};
    outline-offset: 2px;
    text-decoration: underline;
  }
`;

const Container = styled.div<LayoutStyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemContainer = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  ${resumeContainerStyles}
`;

const EmployerName = styled.div<LayoutStyledProps>`
  font-size: ${fontSizeThree};
`;

const Header = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const HeaderTop = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TimeRange = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${fontSizeThree};
  font-style: italic;
`;

const JobDescription = styled.p<LayoutStyledProps>`
  padding-top: ${defaultFontSize};
`;

const JobTitle = styled.h6<LayoutStyledProps>`
  font-size: ${fontSizeFive};
  padding-right: ${defaultFontSize};
`;

export type ResumePageWorkHistoryItem = {
  achievements: (
    | string
    | ((propsToAdd: LayoutStyledProps) => ReactNode | ReactNode[])
  )[];
  dateEnd: Date;
  dateStart: Date;
  employer?: {
    name: string;
    url?: string;
  };
  jobTitle: string;
  jobDescription?: string | ReactNode | ReactNode[];
};

type ResumePageWorkHistoryProps = {
  containerProps?: HTMLAttributes<HTMLDivElement>;
  items: ResumePageWorkHistoryItem[];
};

export function ResumePageWorkHistory(props: ResumePageWorkHistoryProps) {
  const { containerProps, items } = props;
  const colorScheme = useColorScheme();
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
  };

  return (
    <Container {...propsToAdd} {...containerProps}>
      {items.map((item, index) => {
        const divider = "/";
        const startMonth = `${item.dateStart.getMonth() + 1}`.padStart(2, "0");
        const startYear = `${item.dateStart.getFullYear()}`.slice(-2);
        const startTime = `${startMonth}${divider}${startYear}`;

        const endMonth = `${item.dateEnd.getMonth() + 1}`.padStart(2, "0");
        const endYear = `${item.dateEnd.getFullYear()}`.slice(-2);
        const endTime = `${endMonth}${divider}${endYear}`;

        return (
          <ItemContainer
            key={index}
            {...propsToAdd}
            islast={index === items.length - 1 ? "true" : undefined}
          >
            <Header>
              <HeaderTop>
                <JobTitle>{item.jobTitle}</JobTitle>
                <TimeRange>
                  <time dateTime={startTime}>{startTime}</time>
                  <span>&nbsp;-&nbsp;</span>
                  <time dateTime={endTime}>{endTime}</time>
                </TimeRange>
              </HeaderTop>
              {item.employer ? (
                <EmployerName {...propsToAdd}>
                  <ExamplePageLink
                    {...propsToAdd}
                    url={item.employer.url}
                    includeSpaces={false}
                  >
                    {item.employer.name}
                  </ExamplePageLink>
                </EmployerName>
              ) : null}
            </Header>
            {item.jobDescription ? (
              <JobDescription>{item.jobDescription}</JobDescription>
            ) : null}
            <Achievements {...propsToAdd}>
              {item.achievements.map((achievement, index) => {
                if (typeof achievement === "string") {
                  // Ensure the achievement ends with a period
                  const formattedAchievement = achievement.trim().endsWith(".")
                    ? achievement
                    : `${achievement}.`;

                  return (
                    <AchievementItem
                      key={index}
                      role="button"
                      tabIndex={0}
                      dangerouslySetInnerHTML={{ __html: formattedAchievement }}
                      onClick={(e) => {
                        copyClickedElementTextToClipboard(e);
                        toast.success("Copied to clipboard!");
                      }}
                    />
                  );
                } else {
                  return (
                    <AchievementItem key={index}>
                      {achievement(propsToAdd)}
                    </AchievementItem>
                  );
                }
              })}
            </Achievements>
          </ItemContainer>
        );
      })}
    </Container>
  );
}
