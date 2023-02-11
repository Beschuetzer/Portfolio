import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { capitalize } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { bridgeSectionNames, BridgeSectionLink, BRIDGE_CURRENT_SECTION_CLASSNAME, BRIDGE_PAGE_NAV_LINKS_COLORS, BRIDGE_PAGE_NAV_LINK_CLASSNAME } from "../../pages";
import { clickedBridgeInfoButtonCountSelector, currentBridgeSectionSelector } from "../../slices/bridgeSlice";
import { isMobileSelector, previousUrlSelector, setHeaderHeight, setPreviousUrl, viewPortWidthSelector } from "../../slices/generalSlice";
import { DEFAULT_FONT_SIZE, HIDDEN_CLASSNAME, MOBILE_BREAK_POINT_WIDTH, PAGE_NAV_CLASSNAME, PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME, PAGE_NAV_WIDTH_AT_SWITCH_OFFSET } from "../constants";
import { scrollToSection } from "../utils";
import { setHeaderHeightCSSPropertyValue } from "./utils";

interface PageNavProps {
	match: { url: string };
}

export const selectedClass = "page-nav--active";
export const PAGE_NAV_MIN_WIDTH_THRESHOLD = 500;
export const PAGE_NAV_ITEM_COUNT_DEFAULT = 5;
export const PAGE_NAV_MIN_WIDTH_DEFAULT = "155px";
export const PAGE_NAV_MAX_WIDTH_DEFAULT = "228px";

export const PageNav: React.FC<PageNavProps> = ({
	match,
}) => {
	//#region Init
	const dispatch = useAppDispatch();
	const viewPortWidth = useAppSelector(viewPortWidthSelector);
	const previousUrl  = useAppSelector(previousUrlSelector);
	const isMobile  = useAppSelector(isMobileSelector);
	const clickedBridgeInfoButtonCount  = useAppSelector(clickedBridgeInfoButtonCountSelector);
	const currentBridgeSection  = useAppSelector(currentBridgeSectionSelector);
	const cssClass = "page-nav";
	// const gradientVarName = "--site-nav-linear-gradient";
	// const activeScaleVarName = "--site-nav-active-scale-amount";
	// const activeScaleRange = {
	// 	desktop: { min: 1.75, max: 1.5 },
	// 	mobile: { min: 1.25, max: 1.05 },
	// 	min: 1.5,
	// 	max: 1.75,
	// };
	// const progressPercent = "0%";
	const scrollSectionDelimiterOffset = window.innerHeight / 6;
	const scrollRefreshLimit = 50;
	const maxScrollOffsetPercent = 1;
	const isBridgePage = match.url.match(/bridge$/i);
	const docStyle = getComputedStyle(document.documentElement);


	let pageNavElement = document.querySelector(".page-nav") as any;
	let previousSectionBottom: number | null = 0;
	let shouldHandleScroll = useRef(true);
	const [sectionsToRender, setsectionsToRender] = useState<NodeListOf<Element> | any[]>([]);
	const location = useLocation();
	//#endregion

	//#region Functions
	const checkShouldSetPreviousUrl = (
		match: { url: string },
		previousUrl: string,
	) => {
		const currentUrl = match?.url;

		if (!previousUrl || previousUrl !== currentUrl) {
			dispatch(setPreviousUrl(currentUrl));
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
		indexOfCurrentSection: number,
	) => {
		for (let i = 0; i < sections.length; i++) {
			let gradientToUse = getLinearGradient(percentThroughSection);
			let shouldAddActiveClass = true;
			const section = sections[i];
			const pageNavSectionName = capitalize(section.dataset.section);
			const pageNavSectionElement = document.querySelector(
				`.page-nav__section-${pageNavSectionName.toLowerCase()}`,
			) as HTMLElement;
	
	
			if (!pageNavSectionElement || !pageNavSectionElement.parentNode) return;
	
			const shouldSetEnd = isEnd && i >= indexOfCurrentSection;
			if (shouldSetEnd) {
				gradientToUse = getLinearGradient(100);
			} else if (
				!currentSection?.className.match(new RegExp(pageNavSectionName, "ig"))
			) {
				gradientToUse = getLinearGradient(0);
				shouldAddActiveClass = false;
			}
	
			pageNavSectionElement.style.backgroundImage = gradientToUse;
	
			if (shouldAddActiveClass) {
				(pageNavSectionElement.parentNode as any).classList.add(selectedClass);
			} else
				(pageNavSectionElement.parentNode as any).classList.remove(selectedClass);
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
	
		//change CSS color var depending on currentBridgeSection
		const newNormalValue = `--bridge-page-nav-link-color: ${BRIDGE_PAGE_NAV_LINKS_COLORS[currentBridgeSection].normal()}`;
		document.documentElement.style.cssText += newNormalValue;
	
		const newHoverValue = `--bridge-page-nav-link-color-hover: ${BRIDGE_PAGE_NAV_LINKS_COLORS[currentBridgeSection].hover()}`;
		document.documentElement.style.cssText += newHoverValue;
	};

	const setPageNavMinWidth = (pageNavElement: HTMLElement) => {
		let toAdd: string;
	
		const itemCount = pageNavElement.children.length;
	
		let newMinWidth = PAGE_NAV_MIN_WIDTH_DEFAULT;
		if (itemCount >= PAGE_NAV_ITEM_COUNT_DEFAULT + 1) newMinWidth = PAGE_NAV_MAX_WIDTH_DEFAULT;
		else if (itemCount < PAGE_NAV_ITEM_COUNT_DEFAULT) {
			const widthOfPageNavAtSwitch =
				MOBILE_BREAK_POINT_WIDTH - PAGE_NAV_WIDTH_AT_SWITCH_OFFSET;
			newMinWidth = `${widthOfPageNavAtSwitch / (itemCount + 1) + 0.1}px`;
		}
	  
		toAdd = `${PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME}: ${newMinWidth}`;
		document.documentElement.style.cssText += toAdd;
	};

	// const updateActiveScaleRange = () => {
	// 	if (isMobile) {
	// 		activeScaleRange.min = activeScaleRange.mobile.min;
	// 		activeScaleRange.max = activeScaleRange.mobile.max;
	// 	} else {
	// 		activeScaleRange.min = activeScaleRange.desktop.min;
	// 		activeScaleRange.max = activeScaleRange.desktop.max;
	// 	}
	// };
	//#endregion

	//#region Side FX
	useEffect(() => {
		setHeaderHeightCSSPropertyValue();
	})

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
				indexOfCurrentSection,
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
		resetGradientPercents(sections);
		setsectionsToRender(sections);
	}, [location])

	useEffect(() => {
		if (match.url.trim() === "/")
			pageNavElement.classList.add(HIDDEN_CLASSNAME);
		if (!isMobile) return;

		setTimeout(() => {
			setPageNavMinWidth(pageNavElement);
		}, 1)
	}, [previousUrl, pageNavElement, isMobile, match]);

	useEffect(() => {
		if (viewPortWidth < PAGE_NAV_MIN_WIDTH_THRESHOLD) {
			if (`${viewPortWidth}px` === PAGE_NAV_MIN_WIDTH_DEFAULT) return;
			const newValue = `${PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME}: ${PAGE_NAV_MIN_WIDTH_DEFAULT}`;
			document.documentElement.style.cssText += newValue;
		} else if (viewPortWidth >= PAGE_NAV_MIN_WIDTH_THRESHOLD) {
			setPageNavMinWidth(document.querySelector(`.${PAGE_NAV_CLASSNAME}` as any));
		}
	}, [viewPortWidth, setHeaderHeight]);

	useEffect(() => {
		const url = match.url;
		const pageName = url.slice(url.lastIndexOf("/") + 1);
		pageNavElement.classList = cssClass;
		pageNavElement.classList.add(`${cssClass}-${pageName}`);

		if (!isMobile && clickedBridgeInfoButtonCount <= 0 && url.match(/bridge$/i))
			pageNavElement.classList.add(HIDDEN_CLASSNAME);
	}, [clickedBridgeInfoButtonCount, isMobile, match.url, pageNavElement]);
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
								) as HTMLElement,
								-DEFAULT_FONT_SIZE * 75,
							);
						}}
						className={`${cssClass}__section ${cssClass}__section-${sectionName}`}>
						{capitalize(sectionName.replace('-', ' '))}
					</h2>
				</li>
			);
		});
	};

	return ReactDOM.createPortal(
		isBridgePage ? renderBridgeSections() : renderSections(),
		pageNavElement,
	);
	//#endregion
};