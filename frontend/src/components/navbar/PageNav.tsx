import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { SiteNavStyledProps } from "./sitenav/types";
import {
  BUTTON_WIDTH,
  defaultFontSize,
  fontSizeEight,
  fontSizeSix,
  getFontSizeCustom,
  SITE_NAV_TOP,
} from "../../styles/constants";
import { capitalize } from "../../helpers";
import { Link } from "react-router-dom";

const PaddingOffset = styled.div<
  SiteNavStyledProps & { numberofsections?: number }
>`
  padding-top: 50vh;
`;

const ContentContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.colorscheme?.primary4};
  border-radius: 1rem;
  position: sticky;
  top: calc(${SITE_NAV_TOP} * 2 + ${BUTTON_WIDTH});
`;

const Item = styled(Link)<SiteNavStyledProps>`
  background-color: ${(props) => props.colorscheme?.primary2};
  font-size: ${fontSizeSix};
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  font-weight: bold;
  padding: ${getFontSizeCustom(.75)} ${getFontSizeCustom(.75 * 2)};

  &:hover {
    transform: translateY(-0.25vw);
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
      0 -5px 35px hsla(0, 0%, 100%, 0.3);
  }
`;

type PageNavProps = {};

export function PageNav(props: PageNavProps) {
  const [sections, setSections] = useState<Element[]>([]);

  useEffect(() => {
    const elementsWithId = Array.from(document.querySelectorAll("[id]"));
    if (!elementsWithId || elementsWithId.length === 0) {
      console.warn("PageNav - No elements with id found");
      return;
    }
    setSections(
      elementsWithId.filter((element) => element.id && element.id !== "root")
    );
  }, []);

  return (
    <PaddingOffset>
      <ContentContainer>
        {sections.map((section: Element, index: number) => (
          <Item key={index} to={`${window.location.pathname}#${section.id}`}>
            {capitalize(section.id)}
          </Item>
        ))}
      </ContentContainer>
    </PaddingOffset>
  );
}
