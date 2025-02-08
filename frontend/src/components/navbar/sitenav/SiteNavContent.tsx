import React from 'react'
import { styled } from 'styled-components'
import { useSiteNav } from './SiteNavContext';
import SiteNavItem from './SiteNavItem';

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
import { EMAIL } from '../../constants';
import { SiteNavDropDown } from './SiteNavDropDown';
import { SiteNavStyledProps } from './SiteNav';

type SiteNavContentProps = {}

const ContentContainer = styled.div<SiteNavStyledProps>`
    display: flex;
    flex-direction: row;
    transition: all 0.3s ease-in-out;
    transform: ${props => props.isopen ? "translateX(0) scaleX(1)" : "translateX(-33px) scaleX(0)"};
    transform-origin: left;
    `

export function SiteNavContent(props: SiteNavContentProps) {
      const { isOpen, buttonRadius } = useSiteNav();

      const propsToAdd: SiteNavStyledProps = {
        buttonradius: buttonRadius,
        isopen: isOpen
      }
    
  return (
    <ContentContainer {...propsToAdd}>
        <SiteNavDropDown text='Resume' />
        <SiteNavDropDown text='About' />
        <SiteNavDropDown text='Projects' />
        <SiteNavItem text='Contact' href={`mailto:${EMAIL}`} image={contactImage} />
    </ContentContainer>
  )
}