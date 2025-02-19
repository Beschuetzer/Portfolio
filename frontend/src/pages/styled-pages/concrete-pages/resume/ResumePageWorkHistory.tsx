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

const Achievements = styled.ul<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: ${defaultFontSize} 0 0 ${getFontSizeCustom(2)};
`;

const AchievementItem = styled.li<LayoutStyledProps>`
  font-size: ${fontSizeFour};
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
  align-items: center;
  justify-content: center;
  font-size: ${fontSizeThree};
  font-style: italic;
`;

const JobTitle = styled.h6<LayoutStyledProps>`
  font-size: ${fontSizeFive};
  padding-right: ${defaultFontSize};
`;

type ResumePageWorkHistoryItem = {
  achievements: (
    | string
    | ((propsToAdd: LayoutStyledProps) => ReactNode | ReactNode[])
  )[];
  dateEnd: string;
  dateStart: string;
  employer?: {
    name: string;
    url?: string;
  };
  jobTitle: string;
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
                  <time dateTime={item.dateStart}>{item.dateStart}</time>
                  <span>&nbsp;-&nbsp;</span>
                  <time dateTime={item.dateEnd}>{item.dateEnd}</time>
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
            <Achievements {...propsToAdd}>
              {item.achievements.map((achievement, index) => {
                return (
                  <AchievementItem
                    key={index}
                    dangerouslySetInnerHTML={
                      typeof achievement === "string"
                        ? { __html: achievement }
                        : undefined
                    }
                  >
                    {typeof achievement !== "string"
                      ? achievement(propsToAdd)
                      : null}
                  </AchievementItem>
                );
              })}
            </Achievements>
          </ItemContainer>
        );
      })}
    </Container>
  );
}
