import React from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./sitenav/types";
import { BUTTON_RADIUS, SITE_NAV_TOP } from "../../styles/constants";

const Container = styled.div<SiteNavStyledProps>`
  position: sticky;
  top: calc(${SITE_NAV_TOP} * 2 + ${BUTTON_RADIUS} * 2);
`;

type PageNavProps = {};

export function PageNav(props: PageNavProps) {
  return <Container>PageNav Content</Container>;
}
