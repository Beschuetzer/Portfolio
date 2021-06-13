import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { connect, RootStateOrAny } from "react-redux";

import { setPreviousUrl } from "../../../actions";
import BridgeSectionLink from "../../../pages/examples/bridge/BridgeSectionLink";
import {
	bridgeSections,
} from "../../../pages/examples/bridge/utils";
import { HIDDEN_CLASSNAME, MOBILE_BREAK_POINT_WIDTH, PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME, PAGE_NAV_WIDTH_AT_SWITCH_OFFSET } from "../../constants";
import { scrollToSection } from "../../utils";
import { checkShouldSetPreviousUrl, getSectionNames, setBridgeColors, setGradientPercent } from "./utils";

interface PageNavProps {
  match: {url: string, previousUrl: string},
	previousUrl: string,
	isMobile: boolean,
	clickedBridgeInfoButtonCount: number,
	currentBridgeSection: number,
	headerHeight: number,
	setPreviousUrl: (value: string) => void,
}

interface PageNavState {
	previousUrl: string,
}

class PageNav extends React.Component<PageNavProps, PageNavState> {
	match: any;
	previousUrl: string;
	isMobile: boolean;
	clickedBridgeInfoButtonCount: number;
	currentBridgeSection: number;
	headerHeight: number;
	setPreviousUrl: (value: string) => void;

	constructor(props: any) {
		super(props)

		this.match = this.props.match;
		this.previousUrl = this.props.previousUrl;
		this.isMobile = this.props.isMobile;
		this.clickedBridgeInfoButtonCount = this.props.clickedBridgeInfoButtonCount;
		this.currentBridgeSection = this.props.currentBridgeSection;
		this.headerHeight = this.props.headerHeight;
		this.setPreviousUrl = this.props.setPreviousUrl;
	
		this.state = {
			previousUrl: '',
		}
	}
	
	// const gradientVarName = "--site-nav-linear-gradient";
	// const activeScaleVarName = "--site-nav-active-scale-amount";
	// const activeScaleRange = {
		// 	desktop: { min: 1.75, max: 1.5 },
		// 	mobile: { min: 1.25, max: 1.05 },
	// 	min: 1.5,
	// 	max: 1.75,
	// };
	// const progressPercent = "0%";

	static cssClass = "page-nav";
	static scrollSectionDelimiterOffset = window.innerHeight / 6;
	static scrollRefreshLimit = 50;
	static maxScrollOffsetPercent = 1;
	//@ts-ignore
	
  static pageNavElement = document.querySelector(".page-nav") as any;
	static previousSectionBottom: number | null = 0;
	static shouldHandleScroll = React.createRef();

	renderFullBridge = () => {
		setBridgeColors(this.currentBridgeSection, this.clickedBridgeInfoButtonCount);

		return bridgeSections.map((sectionName, index, array) => {
			return (
				<BridgeSectionLink
					key={index}
					name={bridgeSections[index]}
					sectionToSkipTo={bridgeSections[index]}
					match={this.match}
				/>
			);
		});
	};

	renderMobileBridge = () => {
		return this.renderSections();
	};

	renderBridgeSections = () => {
		if (this.isMobile) return this.renderMobileBridge();
		else {
			checkShouldSetPreviousUrl(this.match, this.previousUrl, setPreviousUrl);
			return this.renderFullBridge();
		}
	};

	handleSectionClick = (e: MouseEvent) => {
		scrollToSection(
			document.getElementById((e.currentTarget as any)?.textContent.toLowerCase()) as HTMLElement,
			this.headerHeight,
		);
	};

	renderSections = () => {
		checkShouldSetPreviousUrl(this.match, this.previousUrl, this.setPreviousUrl);
		const sectionNames = getSectionNames();

		return sectionNames.map((sectionName, index, array) => {
			return (
				<li key={index} className={`${PageNav.cssClass}__section-group`}>
					<span
						onClick={(e: any) => this.handleSectionClick(e)}
						className={`${PageNav.cssClass}__section ${PageNav.cssClass}__section-${sectionName}`}>
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

	handleScroll = (e: Event) => {
		if (!PageNav.shouldHandleScroll || !PageNav.shouldHandleScroll.current) return;
		//@ts-ignore
		PageNav.shouldHandleScroll.current = false;
		const scrollY = window.scrollY;
		const maxScrollY = document.body.scrollHeight - window.innerHeight;
		const maxScrollOffset =
			(document.body.scrollHeight * PageNav.maxScrollOffsetPercent) / 100;
		const isEnd = scrollY >= maxScrollY - maxScrollOffset;
		const boundingRects = [];
		const sections = document.querySelectorAll("[data-section]");

		let currentSection = null;
		let indexOfCurrentSection = -1;
		let percentThroughSection = 0;

		//Reseting the top to 0
		if (scrollY < 10) PageNav.previousSectionBottom = 0;

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
					(boundingRectToUse.bottom <= PageNav.scrollSectionDelimiterOffset && i > 0) ||
					i === 0
				) {
					currentSection = sections[indexOfCurrentSection + 1];
					if (!PageNav.previousSectionBottom) PageNav.previousSectionBottom = window.scrollY;

					let boundingRectNext =
						boundingRects[i < 1 ? 0 : indexOfCurrentSection + 1];

					const addedPercent =
						(PageNav.scrollSectionDelimiterOffset /
							Math.abs(boundingRectNext.bottom - boundingRectNext.top)) *
						100;

					const amountProgressed = window.scrollY - PageNav.previousSectionBottom;
					const endAmount = PageNav.scrollSectionDelimiterOffset;

					percentThroughSection = (amountProgressed / endAmount) * addedPercent;

					// console.log('percentThroughSection =', percentThroughSection);
					if (percentThroughSection >= addedPercent)
						percentThroughSection = addedPercent;
				} else {
					PageNav.previousSectionBottom = null;
					const addedPercent =
						(PageNav.scrollSectionDelimiterOffset /
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
			//@ts-ignore
			shouldHandleScroll.current = true;
		}, PageNav.scrollRefreshLimit);
	};

	componentDidUpdate() {
		if (this.isMobile) {
			const itemCount = PageNav.pageNavElement.children.length;
			if (itemCount) {
				const widthOfPageNavAtSwitch = MOBILE_BREAK_POINT_WIDTH - PAGE_NAV_WIDTH_AT_SWITCH_OFFSET;
				const newMinWidth = `${widthOfPageNavAtSwitch / (itemCount + 1) + .1}px`
				const toAdd = `${PAGE_NAV_MIN_COLUMN_WIDTH_CSS_PROPERTY_NAME}: ${newMinWidth}`;
				document.documentElement.style.cssText += toAdd;
			}
		}

		const url = this.match.url;
		const pageName = url.slice(url.lastIndexOf("/") + 1);
		PageNav.pageNavElement.classList = PageNav.cssClass;
		PageNav.pageNavElement.classList.add(`${PageNav.cssClass}-${pageName}`);

		if (!this.isMobile && this.clickedBridgeInfoButtonCount <= 0 && url.match(/bridge/i))
			PageNav.pageNavElement.classList.add(HIDDEN_CLASSNAME);
	}

	componentDidMount() {
		document.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.handleScroll);
	}

	shouldComponentUpdate(prevProps: PageNavProps, prevState: PageNavState) {
		// console.log('this.props.match.url =', this.props.match.url);
		// console.log('this.state.previousUrl =', this.state.previousUrl);
		// console.log('prevState.previousUrl =', prevState.previousUrl);
		if (prevState.previousUrl === undefined || this.props.match.url !== prevState.previousUrl) {
			// console.log('updating page nav------------------------------------------------');
			this.setState({previousUrl: this.props.match.url})
			return true
		}
		return false
	}

	render() {
	  const isBridgePage = this.props.match.url.match(/bridge/i);

		return ReactDOM.createPortal(
			//The idea behind this component is to have a nav element that has quick links  to the sections of each page
			<React.Fragment>
				{isBridgePage ? this.renderBridgeSections() : this.renderSections()}
			</React.Fragment>,
			PageNav.pageNavElement,
		);
	}

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
