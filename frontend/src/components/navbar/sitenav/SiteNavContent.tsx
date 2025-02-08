import React from "react";
import { styled } from "styled-components";
import { useSiteNav } from "./SiteNavContext";
import SiteNavItem from "./SiteNavItem";

import aboutImage from "../../../imgs/site-nav/about.jpg";
import autoBidImage from "../../../imgs/site-nav/autobid.jpg";
import bridgeImage from "../../../imgs/site-nav/bridge.jpg";
import contactImage from "../../../imgs/site-nav/contact.jpg";
import downloaderImage from "../../../imgs/site-nav/downloader.jpg";
import examplesImage from "../../../imgs/site-nav/examples.jpg";
import resumeImage from "../../../imgs/site-nav/resume.jpg";
import syncerImage from "../../../imgs/site-nav/syncer.jpg";
import replayImage from "../../../imgs/site-nav/replay.jpg";

import resume1 from "../../../imgs/site-nav/overview.jpg";
import resume2 from "../../../imgs/site-nav/skills.jpg";
import resume3 from "../../../imgs/site-nav/work-history.jpg";
import resume4 from "../../../imgs/site-nav/education.jpg";
import resume5 from "../../../imgs/site-nav/references.jpg";

import about1 from "../../../imgs/site-nav/overview-2.jpg";
import about2 from "../../../imgs/site-nav/interests.jpg";
import about3 from "../../../imgs/site-nav/music.jpg";
import about4 from "../../../imgs/site-nav/personality.jpg";
import { EMAIL } from "../../constants";
import { SiteNavStyledProps } from "./SiteNav";
import { SiteNavDropDown } from "./SiteNavDropDown";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  getFontSizeCustom,
} from "../../../styles/constants";


type SiteNavContentProps = {};

const ContentContainer = styled.div<SiteNavStyledProps>`
  display: flex;
  flex-direction: row;
  transition: all 0.3s ease-in-out;
  transform: ${(props) =>
    props.isopen ? "translateX(0) scaleX(1)" : `translateX(${getFontSizeCustom(-.5, props.buttonradius)}) scaleX(0)`};
  transform-origin: left;
  border-left: 1px solid ${(props) => props.colorscheme?.primary1};
  column-gap: 1px;
  border-radius: 0 14rem 14rem 0;
  background-color: ${(props) => props.colorscheme?.primary1};
`;

export function SiteNavContent(props: SiteNavContentProps) {
  const { isOpen, buttonRadius } = useSiteNav();
  const colorScheme = useColorScheme();

  const propsToAdd: SiteNavStyledProps = {
    buttonradius: buttonRadius !== null ? buttonRadius : undefined,
    isopen: isOpen !== null ? isOpen : undefined,
    colorscheme: colorScheme !== null ? colorScheme : undefined,
  };

  return (
    <ContentContainer {...propsToAdd}>
      <SiteNavDropDown
        text="Résumé"
        items={[
          {
            text: "Overview",
            image: resume1,
            to: "/resume#overview",
          },
          {
            text: "Skills",
            image: resume2,
            to: "/resume#skills",
          },
          {
            text: "Work History",
            image: resume2,
            to: "/resume#work-history",
          },
          {
            text: "Education",
            image: resume2,
            to: "/resume#education",
          },
          {
            text: "References",
            image: resume2,
            to: "/resume#references",
          },
        ]}
      />
      <SiteNavDropDown
        text="About"
        items={[
          {
            text: "Overview",
            image: about1,
            to: "/about#overview",
          },
          {
            text: "Interests",
            image: about2,
            to: "/about#interests",
          },
          {
            text: "Music",
            image: about3,
            to: "/about#music",
          },
          {
            text: "Personality",
            image: about4,
            to: "/about#personality",
          },
        ]}
      />
      <SiteNavItem
        text="Contact"
        href={`mailto:${EMAIL}`}
        image={contactImage}
        isLast
      />
    </ContentContainer>
  );
}
