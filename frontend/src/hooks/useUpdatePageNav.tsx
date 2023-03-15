import { useEffect, useCallback } from 'react';
import { PAGE_NAV_MIN_WIDTH_DEFAULT, PAGE_NAV_ITEM_COUNT_DEFAULT, PAGE_NAV_MAX_WIDTH_DEFAULT, MOBILE_BREAK_POINT_WIDTH, PAGE_NAV_WIDTH_AT_SWITCH_OFFSET, PAGE_NAV_MIN_COLUMN_WIDTH_CUSTOM_PROPERTY_NAME, PAGE_NAV_MIN_WIDTH_THRESHOLD } from '../components/constants';
import { useAppSelector } from "../hooks";
import { viewPortWidthSelector, isMobileSelector } from "../slices";

//match is inserted into all components via react-router-dom
export const useUpdatePageNav = (pageNavElement: HTMLElement) => {
	const viewPortWidth = useAppSelector(viewPortWidthSelector);
	const isMobile  = useAppSelector(isMobileSelector);

	const setPageNavMinWidth = useCallback((pageNavElement: HTMLElement) => {
		let toAdd: string;
		const itemCount = pageNavElement.children.length;
	
		let newMinWidth = PAGE_NAV_MIN_WIDTH_DEFAULT;
		if (itemCount >= PAGE_NAV_ITEM_COUNT_DEFAULT + 1) newMinWidth = PAGE_NAV_MAX_WIDTH_DEFAULT;
		else if (itemCount < PAGE_NAV_ITEM_COUNT_DEFAULT) {
			const widthOfPageNavAtSwitch =
				MOBILE_BREAK_POINT_WIDTH - PAGE_NAV_WIDTH_AT_SWITCH_OFFSET;
			newMinWidth = `${widthOfPageNavAtSwitch / (itemCount + 1) + 0.1}px`;
		}
	  
		toAdd = `${PAGE_NAV_MIN_COLUMN_WIDTH_CUSTOM_PROPERTY_NAME}: ${newMinWidth}`;
		document.documentElement.style.cssText += toAdd;
	}, [pageNavElement]);
	
	useEffect(() => {
		if (viewPortWidth < PAGE_NAV_MIN_WIDTH_THRESHOLD) {
			if (`${viewPortWidth}px` === PAGE_NAV_MIN_WIDTH_DEFAULT) return;
			const newValue = `${PAGE_NAV_MIN_COLUMN_WIDTH_CUSTOM_PROPERTY_NAME}: ${PAGE_NAV_MIN_WIDTH_DEFAULT}`;
			document.documentElement.style.cssText += newValue;
		} else if (viewPortWidth >= PAGE_NAV_MIN_WIDTH_THRESHOLD || isMobile) {
			setTimeout(() => {
				setPageNavMinWidth(pageNavElement);
			}, 10)
		}
	}, [viewPortWidth, pageNavElement, isMobile]);
}