import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { connect, RootStateOrAny } from "react-redux";

import { setPreviousUrl } from "../../../actions";
import BridgeSectionLink from "../../../pages/examples/bridge/BridgeSectionLink";
import {
	bridgeSections,
} from "../../../pages/examples/bridge/utils";
import { HIDDEN_CLASSNAME } from "../../constants";
import { scrollToSection } from "../../utils";
import { checkShouldSetPreviousUrl, getSectionNames, setBridgeColors, setGradientPercent, setPageNavMinWidth } from "./utils";

interface PageNavProps {
  match: {url: string},
	previousUrl: string,
	isMobile: boolean,
	clickedBridgeInfoButtonCount: number,
	currentBridgeSection: number,
	headerHeight: number,
	setPreviousUrl: (value: string) => void,
}

const PageNav: React.FC<PageNavProps> = ({
	match,
	previousUrl,
	isMobile,
	clickedBridgeInfoButtonCount,
	currentBridgeSection,
	headerHeight,
	setPreviousUrl,
}) => {
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
	const isBridgePage = match.url.match(/bridge/i);
	
  let pageNavElement = document.querySelector(".page-nav") as any;
	let previousSectionBottom: number | null = 0;
	let shouldHandleScroll = useRef(true);

	const renderFullBridge = () => {
		setBridgeColors(currentBridgeSection, clickedBridgeInfoButtonCount);

		return bridgeSections.map((sectionName, index, array) => {
			return (
				<BridgeSectionLink
					key={index}
					name={bridgeSections[index]}
					sectionToSkipTo={bridgeSections[index]}
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
			checkShouldSetPreviousUrl(match, previousUrl, setPreviousUrl);
			return renderFullBridge();
		}
	};

	const handleSectionClick = (e: MouseEvent) => {
		scrollToSection(
			document.getElementById((e.currentTarget as any)?.textContent.toLowerCase()) as HTMLElement
		);
	};

	const renderSections = () => {
		checkShouldSetPreviousUrl(match, previousUrl, setPreviousUrl);
		const sectionNames = getSectionNames();

		return sectionNames.map((sectionName, index, array) => {
			return (
				<li key={index} className={`${cssClass}__section-group`}>
					<span
						onClick={(e: any) => handleSectionClick(e)}
						className={`${cssClass}__section ${cssClass}__section-${sectionName}`}>
						{sectionName}
					</span>
				</li>
			);
		});
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

	useEffect(() => {
    const handleScroll = (e: Event) => {
      if (!shouldHandleScroll || !shouldHandleScroll.current) return;
      shouldHandleScroll.current = false;
      const scrollY = window.scrollY;
      const maxScrollY = document.body.scrollHeight - window.innerHeight;
      const maxScrollOffset =
        (document.body.scrollHeight * maxScrollOffsetPercent) / 100;
      const isEnd = scrollY >= maxScrollY - maxScrollOffset;
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
          break;
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
		document.addEventListener("scroll", handleScroll);
		// updateActiveScaleRange();

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (!isMobile) return;
		setPageNavMinWidth(pageNavElement);
	}, [previousUrl, pageNavElement, isMobile])

	useEffect(() => {
		const url = match.url;
		const pageName = url.slice(url.lastIndexOf("/") + 1);
		pageNavElement.classList = cssClass;
		pageNavElement.classList.add(`${cssClass}-${pageName}`);

		if (!isMobile && clickedBridgeInfoButtonCount <= 0 && url.match(/bridge/i))
			pageNavElement.classList.add(HIDDEN_CLASSNAME);
	}, [
		clickedBridgeInfoButtonCount,
		isMobile,
		match.url,
		pageNavElement,
	]);

	return ReactDOM.createPortal(
		//The idea behind this component is to have a nav element that has quick links  to the sections of each page
		<React.Fragment>
			{isBridgePage ? renderBridgeSections() : renderSections()}
		</React.Fragment>,
		pageNavElement,
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		previousUrl: state.general.previousUrl,
		isMobile: state.general.isMobile,
		clickedBridgeInfoButtonCount: state.bridge.clickedBridgeInfoButtonCount,
		currentBridgeSection: state.bridge.currentBridgeSection,
		headerHeight: state.general.headerHeight,
	};
};

export default connect(mapStateToProps, {
	setPreviousUrl,
})(PageNav);
