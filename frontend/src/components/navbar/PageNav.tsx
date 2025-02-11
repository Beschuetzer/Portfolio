import React from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./sitenav/types";
import { BUTTON_WIDTH, SITE_NAV_TOP } from "../../styles/constants";

const Container = styled.div<SiteNavStyledProps>`
  padding-top: 50vh;
`;

const Content = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${(props) => props.colorscheme?.primary4};
  border-radius: 1rem;
  position: sticky;
  top: calc(${BUTTON_WIDTH} * 2);
`;

type PageNavProps = {};

export function PageNav(props: PageNavProps) {
  return (
    <Container>
      <Content>PageNav</Content>
    </Container>
  );
}
