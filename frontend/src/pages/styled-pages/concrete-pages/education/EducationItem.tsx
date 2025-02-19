import React from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../../../layouts/types";
import { ExamplePageLink } from "../../ExamplePageLink";

const Item = styled.li<LayoutStyledProps>``;

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
      <ExamplePageLink url={href}>
        {degree}
      </ExamplePageLink>
      from {location} ({gpa} GPA).
    </Item>
  );
}
