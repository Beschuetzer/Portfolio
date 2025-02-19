import React from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageLink } from "../../ExamplePageLink";
import { defaultFontSize, fontSizeThree } from "../../../../styles/constants";

const Item = styled.li<LayoutStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: ${defaultFontSize};
  border-bottom: 1px solid ${(props) => props.colorscheme?.primary1};
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
`;

export type EducationItemProps = {
  degree: string;
  gpa: string;
  href: string;
  location: string;
};

export function EducationItem(props: EducationItemProps) {
  const { degree, gpa, href, location } = props;
  return (
    <Item>
      <ItemTop>
        <ExamplePageLink includeSpaces={false} url={href}>
          {degree}
        </ExamplePageLink>
        <Gpa>{gpa} G.P.A</Gpa>
      </ItemTop>
      <span>{location}</span>
    </Item>
  );
}
