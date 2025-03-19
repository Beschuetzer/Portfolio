import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LayoutStyledProps } from "../../layouts/types";
import { respond } from "../../styles/breakpoints";
import {
  defaultFontSize,
  SECTION_WIDTH_IN_PIXELS,
} from "../../styles/constants";
import { INTER_SECTION_PADDING } from "./constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyledPageProps } from "./types";
import { hexToRgba } from "../../components/navbar/sitenav/helpers";
import { SITE_NAV_BUTTON_OPEN_BORDER_RADIUS_AMOUNT } from "../../components/navbar/sitenav/SiteNavButton";

// Extend LayoutStyledProps with our custom prop for animation:
interface SectionProps extends LayoutStyledProps {
  isVisible: boolean;
}

const Section = styled.section<SectionProps>`
  font-size: ${defaultFontSize};
  width: 100%;
  border-radius: calc(${SITE_NAV_BUTTON_OPEN_BORDER_RADIUS_AMOUNT} / 2);
  border: 1px solid ${(props) => hexToRgba(props.colorscheme?.primary1, 0.33)};
  background: ${(props) => props.colorscheme?.primary4};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: ${INTER_SECTION_PADDING};
  max-width: ${SECTION_WIDTH_IN_PIXELS}px;
  z-index: 1;
  box-shadow: ${(props) => hexToRgba(props.colorscheme?.primary4, 0.06)} 0px 0px 1rem 1rem;

  // Animation styles:
  transform: ${({ isVisible }) => isVisible ? "translate3d(0, 0, 0)" : "translate3d(-100%, 0, 0)"};
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transition: transform .5s ease-in, opacity .5s ease-in;

  ${respond.navSwitch`
    margin: 0 auto ${INTER_SECTION_PADDING} auto;  
  `}

  ${respond.contentFullWithPadding`
    max-width: none;
  `}
`;

export function ExamplePageSection(props: StyledPageProps) {
  const colorScheme = useColorScheme();
  const { children, htmlAttributes } = props;
  const propsToAdd = {
    colorscheme: colorScheme,
  };

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionRefCopy = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRefCopy) {
        observer.unobserve(sectionRefCopy);
      }
    };
  }, []);

  return (
    <Section
      ref={sectionRef}
      isVisible={isVisible}
      {...propsToAdd}
      {...htmlAttributes}
    >
      {children}
    </Section>
  );
}