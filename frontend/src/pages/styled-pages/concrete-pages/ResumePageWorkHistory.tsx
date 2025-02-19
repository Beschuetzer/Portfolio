import { styled } from "styled-components";
import { LayoutStyledProps } from "../../../layouts/types";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  defaultFontSize,
  fontSizeFive,
  fontSizeSix,
  fontSizeThree,
  getFontSizeCustom,
} from "../../../styles/constants";
import { linkStyles } from "../../../styles/styles";
import { HTMLAttributes } from "react";

const Achievements = styled.ul<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: ${defaultFontSize} 0;
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
`;

const EmployerName = styled.a<LayoutStyledProps>`
  font-style: italic;
  font-size: ${fontSizeThree};
  ${linkStyles}
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
`;

type ResumePageWorkHistoryItem = {
  achievements: string[];
  dateEnd: string;
  dateStart: string;
  employer: {
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
          <ItemContainer key={index}>
            <Header>
              <HeaderTop>
                <JobTitle>{item.jobTitle}</JobTitle>
                <TimeRange>
                  <time dateTime={item.dateStart}>{item.dateStart}</time>
                  <span>&nbsp;-&nbsp;</span>
                  <time dateTime={item.dateEnd}>{item.dateEnd}</time>
                </TimeRange>
              </HeaderTop>
              <EmployerName {...propsToAdd} href={item.employer.url}>
                {item.employer.name}
              </EmployerName>
            </Header>

            <Achievements {...propsToAdd}>
              {item.achievements.map((achievement, index) => {
                return <li key={index}>{achievement}</li>;
              })}
            </Achievements>
          </ItemContainer>
        );
      })}
    </Container>
  );
}
