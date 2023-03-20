import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { capitalize, scrollToSection } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useBroswerDetection } from "../../hooks/useBrowserDetection";
import { useSetBridgeSectionColors } from "../../hooks/useSetBridgeSectionColors";
import { useUpdatePageNav } from "../../hooks/useUpdatePageNav";
import { BridgeSectionLink } from "../../pages";
import { clickedBridgeInfoButtonCountSelector, currentBridgeSectionSelector } from "../../slices/bridgeSlice";
import { isMobileSelector, previousUrlSelector, setPreviousUrl } from "../../slices/generalSlice";
import { Match } from "../../types";
import { bridgeSectionNames, BRIDGE_CURRENT_SECTION_CLASSNAME, BRIDGE_PAGE_NAV_LINK_CLASSNAME, BRIDGE_PAGE_NAV_LINK_COLOR_CUSTOM_PROPERTY_NAME, BRIDGE_SECTION_COLORS, PAGE_NAV_ACTIVE_CLASSNAME, PAGE_NAV_CLASSNAME } from "../constants";

type PageNavProps = {
	match: { url: string };
}

export const PageNav: React.FC<PageNavProps> = ({
	match,
}) => {
	//#region Init
	const dispatch = useAppDispatch();
	const browser = useBroswerDetection();
	const location = useLocation();
	const previousUrl  = useAppSelector(previousUrlSelector);
	const isMobile  = useAppSelector(isMobileSelector);
	const clickedBridgeInfoButtonCount  = useAppSelector(clickedBridgeInfoButtonCountSelector);
	const currentBridgeSection  = useAppSelector(currentBridgeSectionSelector);
	const shouldHandleScroll = useRef(true);
	const [sectionsToRender, setsectionsToRender] = useState<NodeListOf<Element> | any[]>([]);
	const cssClass = "page-nav";	
	const isBridgePage = match.url.match(/bridge$/i);
	const docStyle = getComputedStyle(document.documentElement);
	let previousSectionBottom: number | null = 0;
	const pageNavElement = document.querySelector(`.${PAGE_NAV_CLASSNAME}`) as HTMLElement;
	const maxScrollOffsetPercent = 1;
	const scrollRefreshLimit = browser?.os?.match(/mac/i) ? 50 : isMobile ? 10 : 1;
	const scrollSectionDelimiterOffset = window.innerHeight / 6;
	//#endregion

	//#region Functions
	const activateElement = (element: HTMLElement, percent: number) => {
		if (!element) return;
		(element.parentNode as any).classList.add(PAGE_NAV_ACTIVE_CLASSNAME);
		element.style.backgroundImage = getLinearGradient(percent);
	}

	const deactivateElement = (element: HTMLElement) => {
		if (!element) return;
		(element.parentNode as any).classList.remove(PAGE_NAV_ACTIVE_CLASSNAME);
		element.style.backgroundImage = getLinearGradient(0);
	}

	const checkShouldSetPreviousUrl = (
		match: Match,
		previousUrl: string,
	) => {
		const currentUrl = match?.url;

		if (!previousUrl || previousUrl !== currentUrl) {
			//timeout fixes warning about setState in render
			setTimeout(() => {
				dispatch(setPreviousUrl(currentUrl));
			}, 1)
		}
	};

	const getLinearGradient = (percent: number) => {
		const mainColor = docStyle.getPropertyValue("--color-primary-4");
		const progressColor = docStyle.getPropertyValue("--color-primary-2").trim();
	
		return `
		linear-gradient(to right, 
		  ${progressColor.trim()} 0%, 
		  ${progressColor.trim()} ${percent}%,
		  ${mainColor} ${percent}%,
		  ${mainColor} 100%)`;
	};

	const getSectionNames = () => {
		const sectionNames = [];
		if (!sectionsToRender) return [];
		for (let i = 0; i < sectionsToRender?.length; i++) {
			const section = sectionsToRender?.[i] || null;
			const capitalized = (section as any).dataset.section;
			sectionNames.push(capitalized);
		}
		return sectionNames;
	};
	
	const resetGradientPercents = (
		sections: any,
	) => {
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const pageNavSectionName = capitalize(section.dataset.section);
			const pageNavSectionElement = document.querySelector(
				`.page-nav__section-${pageNavSectionName.toLowerCase()}`,
			) as HTMLElement;
	
			if (!pageNavSectionElement) return;
	
			pageNavSectionElement.style.removeProperty('background-image');
		}
	}
	
	const setGradientPercent = (
		sections: any,
		currentSection: Element | null,
		percentThroughSection: number,
		isEnd: boolean,
	) => {
		if (!sections) return;
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const pageNavSectionName = capitalize(section.dataset.section);
			const pageNavSectionElement = document.querySelector(
				`.page-nav__section-${pageNavSectionName.toLowerCase()}`,
			) as HTMLElement;

			if (isEnd) {
				deactivateElement(pageNavSectionElement);
				continue;
			}
			
			if (!pageNavSectionElement || !pageNavSectionElement.parentNode) {
				return;
			} 
			else if (
				!currentSection?.className.match(new RegExp(pageNavSectionName, "ig"))
			) {
				deactivateElement(pageNavSectionElement);
			} else {
				activateElement(pageNavSectionElement, percentThroughSection);
			}
		}
	};
	
	const setBridgeColors = (
		currentBridgeSection: number,
		clickedBridgeInfoButtonCount: number,
	) => {
		//get the currentBridgeSection and run through all of the
		const sectionNames = document.querySelectorAll(
			`.${BRIDGE_PAGE_NAV_LINK_CLASSNAME}`,
		);
	
		//Setting BRIDGE_CURRENT_SECTION_CLASSNAME CSS class
		for (let i = 0; i < sectionNames.length; i++) {
			const sectionName = sectionNames[i];
			if (!sectionName) return;
	
			if (clickedBridgeInfoButtonCount >= 2) {
				sectionName.classList.remove("full-opacity");
				if (i === currentBridgeSection)
					sectionName.classList.add(BRIDGE_CURRENT_SECTION_CLASSNAME);
				else sectionName.classList.remove(BRIDGE_CURRENT_SECTION_CLASSNAME);
			} else {
				sectionName.classList.add("full-opacity");
			}
		}		
	};
	//#endregion

	//#region Side FX
	useSetBridgeSectionColors();
	useUpdatePageNav(pageNavElement);
	useEffect(() => {
		const handleScroll = (e: Event) => {
			if (!shouldHandleScroll || !shouldHandleScroll.current) return;
			shouldHandleScroll.current = false;
			const scrollY = window.scrollY;

			const isEnd = getIsScrollEnd(scrollY);

			const boundingRects = [];
			const sections = document.querySelectorAll("[data-section]");

			let currentSection = null;
			let indexOfCurrentSection = -1;
			let percentThroughSection = 0;

			//Reseting the top to 0
			if (scrollY < 10) previousSectionBottom = 0;

			for (let i = 0; i < sections.length; i++) {
				const section = sections[i];
				const boundingRect = section.getBoundingClientRect();
				boundingRects.push(boundingRect);
				indexOfCurrentSection = i - 1;

				if (boundingRect.top > 1) {
					if (i === 0) {
						currentSection = null;
					} else {
						currentSection = sections[indexOfCurrentSection];
					}
					let boundingRectToUse =
						boundingRects[i < 1 ? 0 : indexOfCurrentSection];

					const {
						percentThroughSection: proposedPercentThroughSection,
						currentSection: proposedCurrentSection,
					} = getPercentThroughSection(
						i,
						indexOfCurrentSection,
						sections,
						boundingRectToUse,
						boundingRects,
					);

					percentThroughSection = proposedPercentThroughSection;
					if (proposedCurrentSection) currentSection = proposedCurrentSection;
					break;
				} else if (section === sections[sections.length - 1]) {
					const boundingRectToUse = boundingRects[boundingRects.length - 1];
					const { percentThroughSection: proposedPercentThroughSection } =
						getPercentThroughSection(
							i,
							indexOfCurrentSection,
							sections,
							boundingRectToUse,
							boundingRects,
						);

					percentThroughSection = proposedPercentThroughSection;
					currentSection = sections[sections.length - 1];
				}
			}
			setGradientPercent(
				sections,
				currentSection,
				percentThroughSection,
				isEnd,
			);
			setTimeout(() => {
				shouldHandleScroll.current = true;
			}, scrollRefreshLimit);
		};
		// updateActiveScaleRange();

		function getIsScrollEnd(scrollY: number) {
			//note: assumes that first child of main is page content
	
			let scrollHeight = document.body.scrollHeight;
			if (scrollHeight === 0) {
				const main = document.querySelector('main') as HTMLElement;
				const mainChild = main.children?.[0] as HTMLElement;
				scrollHeight = mainChild.getBoundingClientRect().height;
			}
			const maxScrollY = scrollHeight - window.innerHeight;
			const maxScrollOffset =
				(scrollHeight * maxScrollOffsetPercent) / 100;
	
			return scrollY >= maxScrollY - maxScrollOffset;
		}

		function getPercentThroughSection(
			i: number,
			indexOfCurrentSection: number,
			sections: NodeListOf<Element>,
			boundingRectToUse: DOMRect,
			boundingRects: DOMRect[],
		) {
			let percentThroughSection = 0;
			let currentSection = null;

			if (
				(boundingRectToUse.bottom <= scrollSectionDelimiterOffset && i > 0) ||
				i === 0
			) {
				currentSection = sections[indexOfCurrentSection + 1];
				if (!previousSectionBottom) previousSectionBottom = window.scrollY;

				let boundingRectNext =
					boundingRects[i < 1 ? 0 : indexOfCurrentSection + 1];

				const addedPercent =
					(scrollSectionDelimiterOffset /
						Math.abs(boundingRectNext.bottom - boundingRectNext.top)) *
					100;

				const amountProgressed = window.scrollY - previousSectionBottom;
				const endAmount = scrollSectionDelimiterOffset;

				percentThroughSection = (amountProgressed / endAmount) * addedPercent;

				// console.log('percentThroughSection =', percentThroughSection);
				if (percentThroughSection >= addedPercent)
					percentThroughSection = addedPercent;
			} else {
				previousSectionBottom = null;
				const addedPercent =
					(scrollSectionDelimiterOffset /
						Math.abs(boundingRectToUse.bottom - boundingRectToUse.top)) *
					100;

				percentThroughSection =
					(Math.abs(boundingRectToUse.top) /
						(Math.abs(boundingRectToUse.top) +
							Math.abs(boundingRectToUse.bottom))) *
					100;

				percentThroughSection += addedPercent;
			}

			return { percentThroughSection, currentSection };
		}

		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);
	
	useEffect(() => {
		const sections = document.querySelectorAll("[data-section]");
		
		setTimeout(() => {
			resetGradientPercents(sections);
		}, 100)
		setsectionsToRender(sections);
	}, [location])
	//#endregion

	//#region JSX
	const renderFullBridge = () => {
		setBridgeColors(currentBridgeSection, clickedBridgeInfoButtonCount);

		return bridgeSectionNames.map((sectionName, index, array) => {
			return (
				<BridgeSectionLink
					key={index}
					name={bridgeSectionNames[index]}
					sectionToSkipTo={bridgeSectionNames[index]}
					match={match}
					index={index}
				/>
			);
		});
	};

	const renderMobileBridge = () => {
		return renderSections();
	};

	const renderBridgeSections = () => {
		if (isMobile) return renderMobileBridge();
		else {
			checkShouldSetPreviousUrl(match, previousUrl);
			return renderFullBridge();
		}
	};

	const renderSections = () => {
		checkShouldSetPreviousUrl(match, previousUrl);
		const sectionNames = getSectionNames();

		return sectionNames.map((sectionName, index, array) => {
			return (
				<li key={index} className={`${cssClass}__section-group`}>
					<h2
						onClick={(e: any) => {				
							scrollToSection(
								document.getElementById(
									(e.currentTarget as any)?.textContent.toLowerCase().replace(' ', '-'),
								) as HTMLElement
							);
						}}
						className={`${cssClass}__section ${cssClass}__section-${sectionName}`}>
						{capitalize(sectionName.replace('-', ' '))}
					</h2>
				</li>
			);
		});
	};

	//hide if bridge page initial or landing page	
	if (match.url === '/' || match.url?.match(/bridge$/i) && !isMobile && clickedBridgeInfoButtonCount <= 0) {
		return null;
	}
	return ReactDOM.createPortal(
		isBridgePage ? renderBridgeSections() : renderSections(),
		pageNavElement,
	);
	//#endregion
};