import React from "react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  NavListItem,
  NavListItemImage,
  NavListItemProps,
} from "../NavListItem";

import aboutImage from "../../imgs/site-nav/about.jpg";
import autoBidImage from "../../imgs/site-nav/autobid.jpg";
import bridgeImage from "../../imgs/site-nav/bridge.jpg";
import contactImage from "../../imgs/site-nav/contact.jpg";
import downloaderImage from "../../imgs/site-nav/downloader.jpg";
import examplesImage from "../../imgs/site-nav/examples.jpg";
import resumeImage from "../../imgs/site-nav/resume.jpg";
import syncerImage from "../../imgs/site-nav/syncer.jpg";
import replayImage from "../../imgs/site-nav/replay.jpg";

import resume1 from "../../imgs/site-nav/overview.jpg";
import resume2 from "../../imgs/site-nav/skills.jpg";
import resume3 from "../../imgs/site-nav/work-history.jpg";
import resume4 from "../../imgs/site-nav/education.jpg";
import resume5 from "../../imgs/site-nav/references.jpg";

import about1 from "../../imgs/site-nav/overview-2.jpg";
import about2 from "../../imgs/site-nav/interests.jpg";
import about3 from "../../imgs/site-nav/music.jpg";
import about4 from "../../imgs/site-nav/personality.jpg";

import {
  ABOUT_PAGE_NAME,
  ABOUT_URL,
  AUTO_BID_PAGE_NAME,
  AUTO_BID_URL,
  BRIDGE_PAGE_NAME,
  BRIDGE_URL,
  DOWNLOADER_PAGE_NAME,
  DOWNLOADER_URL,
  EMAIL,
  PLAYLIST_SYNCER_URL,
  REPLAY_VIEWER_URL,
  RESUME_PAGE_NAME,
  RESUME_URL,
  OVERFLOW_HIDDEN_CLASSNAME,
  ANIMATION_DURATION,
  UNCLICKABLE_CLASSNAME,
  Z_INDEX_HIGHEST_CLASSNAME,
  HEADER_ID,
  SITE_NAV_CLASSNAME,
  SITE_NAV_MINIMAL_CLASSNAME,
  SITE_NAV_CLOSE_DELAY,
  PERSONALITY_URL,
  NAVBAR_ACTIVE_CLASSNAME,
  NAVBAR_CLASSNAME,
  NAVBAR_DEFAULT_CLASSNAME,
  NAVBAR_DONE_CLASSNAME,
  NAVBAR_IS_ANIMATING_CLASSNAME,
} from "../../constants";
import { useLocation } from "react-router-dom";
import {
  currentlyViewingImageSelector,
  isMobileSelector,
  isSiteNavMinimizedSelector,
  setHeaderHeight,
} from "../../../slices/generalSlice";
import { capitalize, replaceCharacters } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useHandleChangePage } from "../../../hooks/useHandleChangePage";
import { Match } from "../../../types";
import { ABOUT_SECTION_NAMES, RESUME_SECTION_TITLES } from "../../../pages";
import { useRenderCount } from "../../../hooks/CssClassCreater/useRenderCount";
import { setHeaderHeightCSSPropertyValue } from "../../../hooks/useSetHeaderCssStyle";
import { useBroswerDetection } from "../../../hooks/useBrowserDetection";
import styled from "styled-components";
import { SiteNavOpen } from "./SiteNavOpen";
import { SiteNavClosed } from "./SiteNavClosed";

//created a styled div that floats on the top left of the screen

const StyledNav = styled.button`
  position: absolute;
  top: 4.27rem;
  left: 4.27rem;
  background-color: #fff;
  z-index: 1000;
  width: 4.27rem;
  height: 4.27rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover .hamburger {
    transform: rotate(90deg);
  }

  &:hover .menu {
    display: block;
  }
`;

const Hamburger = styled.div`
  width: 1.6rem;
  height: 0.4rem;
  background-color: #333;
  position: relative;
  transition: all 0.3s ease-in-out;

  &::before,
  &::after {
    content: "";
    width: 1.6rem;
    height: 0.4rem;
    background-color: #333;
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    top: -0.6rem;
    left: -0rem;
  }

  &::after {
    top: 0.6rem;
    left: -0rem;
  }
`;

const Menu = styled.div`
  display: none;
  position: absolute;
  top: 4.27rem;
  left: 4.27rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 999;
`;

type SiteNavProps = {};

export function SiteNav(props: SiteNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((current) => !current);
  };

  return isOpen ? (
    <SiteNavOpen onClick={onClick} />
  ) : (
    <SiteNavClosed onClick={onClick} />
  );
}

// <div
// 	ref={navRef as any}
// 	className={`${NAVBAR_DEFAULT_CLASSNAME} ${dynamicClassnames}`}
// 	onClick={(e: any) => onNavClick(e)}>
// 	<button
// 		aria-label="show pages"
// 		className={`${NAVBAR_CLASSNAME}__button`}>
// 		<div aria-hidden="true" className={`${NAVBAR_CLASSNAME}__menu`}>
// 			<div className={`${NAVBAR_CLASSNAME}__menu-bar`}></div>
// 		</div>
// 	</button>
// 	<section aria-label="pages" className={`${NAVBAR_CLASSNAME}__content`}>
// 		<ul className={`${NAVBAR_CLASSNAME}__list`}>
// 			{isMobile ? (
// 				<NavListItem
// 					to={RESUME_URL}
// 					image={{
// 						source: resumeImage,
// 						alt: capitalize(RESUME_PAGE_NAME),
// 					}}
// 					label="R&eacute;sum&eacute;"
// 					onMouseEnter={onMouseEnter}
// 					onClick={onNavItemClick}
// 				/>

// 			) : (
// 				<NavListItem
// 					expandedItemOptions={{
// 						items: [
// 							...RESUME_SECTION_TITLES.map((name, index) => {
// 								const nameToUse = replaceCharacters(name, [['-', ' ']]);

// 								const resumeImgsToIndexMapping = [
// 									{
// 										source: resume1,
// 										alt: RESUME_SECTION_TITLES[0],
// 									},
// 									{
// 										source: resume2,
// 										alt: RESUME_SECTION_TITLES[1],
// 									},
// 									{
// 										source: resume3,
// 										alt: RESUME_SECTION_TITLES[2],
// 									},
// 									{
// 										source: resume4,
// 										alt: RESUME_SECTION_TITLES[3],
// 									},
// 									{
// 										source: resume5,
// 										alt: RESUME_SECTION_TITLES[4],
// 									},
// 								] as NavListItemImage[];

// 								return {
// 									image: resumeImgsToIndexMapping[index],
// 									to: `${RESUME_URL}#${nameToUse?.toLowerCase()}`,
// 									label: capitalize(nameToUse),
// 									onMouseEnter: onMouseEnter,
// 									onClick: onNavItemClick,
// 								}
// 							})
// 						]
// 					}}
// 					image={{
// 						source: resumeImage,
// 						alt: capitalize(RESUME_PAGE_NAME),
// 					}}
// 					label="R&eacute;sum&eacute;"
// 					onMouseEnter={onMouseEnter}
// 					onClick={onNavItemClick}
// 				/>
// 			)}
// 			{isMobile ? (
// 				<NavListItem
// 					to={ABOUT_URL}
// 					image={{
// 						source: aboutImage,
// 						alt: capitalize(ABOUT_PAGE_NAME),
// 					}}
// 					label={capitalize(ABOUT_PAGE_NAME)}
// 					onMouseEnter={onMouseEnter}
// 					onClick={onNavItemClick}
// 				/>
// 			) : (
// 				<NavListItem
// 					expandedItemOptions={{
// 						items: [
// 							...ABOUT_SECTION_NAMES.map((name, index) => {
// 								const nameToUse = replaceCharacters(name, [['-', ' ']]);

// 								const aboutImgsToIndexMapping = [
// 									{
// 										source: about1,
// 										alt: ABOUT_SECTION_NAMES[0],
// 									},
// 									{
// 										source: about2,
// 										alt: ABOUT_SECTION_NAMES[1],
// 									},
// 									{
// 										source: about3,
// 										alt: ABOUT_SECTION_NAMES[2],
// 									},
// 								] as NavListItemImage[];

// 								return {
// 									image: aboutImgsToIndexMapping[index],
// 									to: `${ABOUT_URL}#${nameToUse?.toLowerCase()}`,
// 									label: capitalize(nameToUse),
// 									onMouseEnter: onMouseEnter,
// 									onClick: onNavItemClick,
// 								} as NavListItemProps;
// 							}),
// 							{
// 								image: {
// 									source: about4,
// 									alt: "Personality",
// 								},
// 								to: PERSONALITY_URL,
// 								label: "Personality",
// 								onMouseEnter: onMouseEnter,
// 								onClick: onNavItemClick,
// 							},
// 						]
// 					}}
// 					image={{
// 						source: aboutImage,
// 						alt: capitalize(ABOUT_PAGE_NAME),
// 					}}
// 					label={capitalize(ABOUT_PAGE_NAME)}
// 					onMouseEnter={onMouseEnter}
// 					onClick={onNavItemClick}
// 				/>
// 			)}
// 			<NavListItem
// 				image={{
// 					source: examplesImage,
// 					alt: "Projects",
// 				}}
// 				label="Projects"
// 				onMouseEnter={onMouseEnter}
// 				onClick={onNavItemClick}
// 				expandedItemOptions={{
// 					items: [
// 						{
// 							image: {
// 								source: bridgeImage,
// 								alt: capitalize(BRIDGE_PAGE_NAME),
// 							},
// 							to: BRIDGE_URL,
// 							label: "A# Maj Bridge",
// 							onMouseEnter: onMouseEnter,
// 							onClick: onNavItemClick,
// 						},
// 						{
// 							image: {
// 								source: replayImage,
// 								alt: "Bridge Replayer",
// 							},
// 							to: REPLAY_VIEWER_URL,
// 							label: "Bridge Replayer",
// 							onMouseEnter: onMouseEnter,
// 							onClick: onNavItemClick,
// 						},
// 						// {
// 						// 	image:{
// 						// 		source: autoBidImage,
// 						// 		alt: AUTO_BID_PAGE_NAME,
// 						// 	},
// 						// 	to: AUTO_BID_URL,
// 						// 	label: capitalize(AUTO_BID_PAGE_NAME),
// 						// 	onMouseEnter: onMouseEnter,
// 						// 	onClick: onNavItemClick,
// 						// },
// 						{
// 							image: {
// 								source: downloaderImage,
// 								alt: capitalize(DOWNLOADER_PAGE_NAME),
// 							},
// 							to: DOWNLOADER_URL,
// 							label: capitalize(DOWNLOADER_PAGE_NAME),
// 							onMouseEnter: onMouseEnter,
// 							onClick: onNavItemClick,
// 						},
// 						{
// 							image: {
// 								source: syncerImage,
// 								alt: "Syncer",
// 							},
// 							to: PLAYLIST_SYNCER_URL,
// 							label: "Syncer",
// 							onMouseEnter: onMouseEnter,
// 							onClick: onNavItemClick,
// 						}
// 					]
// 				}
// 			}/>
// 			<NavListItem
// 				image={{
// 					source: contactImage,
// 					alt: "Contact",
// 				}}
// 				to={`mailto:${EMAIL}`}
// 				label="Contact"
// 				isEmail={true}
// 				onMouseEnter={onMouseEnter}
// 				onClick={onNavItemClick}
// 			/>
// 		</ul>
// 	</section>
// 	<div
// 		onClick={(e: any) => onNavClick(e)}
// 		className={`${NAVBAR_CLASSNAME}__background`}
// 		aria-hidden="true"></div>
// </div>
//#endregion
