import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageLink } from "../../ExamplePageLink";
import { fontSizeThree } from "../../../../styles/constants";
import { resumeContainerStyles } from "./styles";
import { useColorScheme } from "../../../../hooks/useColorScheme";

const Item = styled.li<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  ${resumeContainerStyles}
`;

const ItemTop = styled.div<LayoutStyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Gpa = styled.span<LayoutStyledProps>`
  font-size: ${fontSizeThree};
  font-style: italic;
`;

const Location = styled.span<LayoutStyledProps>`
  font-size: ${fontSizeThree};
`;

export type EducationItemProps = {
  degree: string;
  gpa: string;
  href: string;
  isLast?: boolean;
  location: string;
};

export function EducationItem(props: EducationItemProps) {
  const colorScheme = useColorScheme();
  const { degree, gpa, href, location } = props;
  const propsToAdd: LayoutStyledProps = {
    colorscheme: colorScheme,
    islast: props.isLast ? "true" : "false",
  };

  return (
    <Item {...propsToAdd}>
      <ItemTop>
        <ExamplePageLink includeSpaces={false} url={href}>
          {degree}
        </ExamplePageLink>
        <Gpa>{gpa} G.P.A</Gpa>
      </ItemTop>
      <Location>{location}</Location>
    </Item>
  );
}
