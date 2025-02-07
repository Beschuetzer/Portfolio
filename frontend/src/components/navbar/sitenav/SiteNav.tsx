import React from "react";
import { useState } from "react";

import { ColorScheme } from "../../../styles/constants";

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
import { styled } from "styled-components";
import { SiteNavButton } from "./SiteNavButton";

const SiteNavContainer = styled.header`
  position: relative;
  width: 100%;
  height: 100%;
`;

export type SiteNavProps = {
  onClick?: () => void;
};

export type ColorSchemeProp = {
  colorScheme: ColorScheme;
  isOpen?: boolean;
};

export function SiteNav() {
  return (
    <SiteNavContainer>
      <SiteNavButton />
    </SiteNavContainer>
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
