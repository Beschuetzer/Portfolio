import React from "react";
import { styled } from "styled-components";
import { useSiteNav } from "./SiteNavContext";
import SiteNavItem from "./SiteNavItem";

import bridgeImage from "../../../imgs/site-nav/bridge.jpg";
import contactImage from "../../../imgs/site-nav/contact.jpg";
import downloaderImage from "../../../imgs/site-nav/downloader.jpg";
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
import { ABOUT_URL, BRIDGE_URL, DOWNLOADER_URL, EMAIL, PLAYLIST_SYNCER_URL, REPLAY_VIEWER_URL, RESUME_URL } from "../../constants";
import { SiteNavStyledProps } from "./types";
import { SiteNavDropDown } from "./SiteNavDropDown";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  getFontSizeCustom,
} from "../../../styles/constants";
import { BREAK_POINTS } from "../../../styles/breakpoints";


type SiteNavContentProps = {};

const ContentContainer = styled.div<SiteNavStyledProps>`
  text-align: center;
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
  const isRelevant = window.innerWidth > parseInt(BREAK_POINTS.navSwitch, 10);

  const propsToAdd: SiteNavStyledProps = {
    buttonradius: buttonRadius != null ? buttonRadius : undefined,
    isopen: isOpen != null ? isOpen && isRelevant : undefined,
    colorscheme: colorScheme != null ? colorScheme : undefined,
  };

  return (
    <ContentContainer {...propsToAdd}>
      <SiteNavDropDown
        text="Résumé"
        items={[
          {
            text: "Overview",
            image: resume1,
            to: `${RESUME_URL}#overview`,
          },
          {
            text: "Skills",
            image: resume2,
            to: `${RESUME_URL}#skills`,
          },
          {
            text: "Work History",
            image: resume3,
            to: `${RESUME_URL}#work-history`,
          },
          {
            text: "Education",
            image: resume4,
            to: `${RESUME_URL}#education`,
          },
          {
            text: "References",
            image: resume5,
            to: `${RESUME_URL}#references`,
          },
        ]}
      />
      <SiteNavDropDown
        text="About"
        items={[
          {
            text: "Overview",
            image: about1,
            to: `${ABOUT_URL}#overview`,
          },
          {
            text: "Interests",
            image: about2,
            to: `${ABOUT_URL}#interests`,
          },
          {
            text: "Music",
            image: about3,
            to: `${ABOUT_URL}#music`,
          },
          {
            text: "Personality",
            image: about4,
            to: `${ABOUT_URL}#personality`,
          },
        ]}
      />
      <SiteNavDropDown
        text="Projects"
        items={[
          {
            text: "A# Maj Bridge",
            image: bridgeImage,
            to: BRIDGE_URL
          },
          {
            text: "Replay Viewer",
            image: replayImage,
            to: REPLAY_VIEWER_URL,
          },
          {
            text: "Downloader",
            image: downloaderImage,
            to: DOWNLOADER_URL,
          },
          {
            text: "Syncer",
            image: syncerImage,
            to: PLAYLIST_SYNCER_URL,
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
