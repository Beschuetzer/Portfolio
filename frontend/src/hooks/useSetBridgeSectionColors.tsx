import { useEffect } from "react";
import { BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME, BRIDGE_SECTION_COLORS, BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME, BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME, BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME, BRIDGE_PAGE_NAV_LINK_COLOR_CUSTOM_PROPERTY_NAME } from "../components/constants";
import { useAppSelector } from "../hooks";
import { currentBridgeSectionSelector } from "../slices";

export const useSetBridgeSectionColors = () => {
    const currentBridgeSection = useAppSelector(currentBridgeSectionSelector);

    useEffect(() => {
        document.documentElement.style.setProperty(
            BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME,
            BRIDGE_SECTION_COLORS[currentBridgeSection].arrowNormal.left(),
        );
        document.documentElement.style.setProperty(
            BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME,
            BRIDGE_SECTION_COLORS[currentBridgeSection].arrowNormal.right(),
        );
        document.documentElement.style.setProperty(
            `${BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME}-hover`,
            BRIDGE_SECTION_COLORS[currentBridgeSection].arrowHover.left(),
        );
        document.documentElement.style.setProperty(
            `${BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME}-hover`,
            BRIDGE_SECTION_COLORS[currentBridgeSection].arrowHover.right(),
        );
        document.documentElement.style.setProperty(
            BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME,
            BRIDGE_SECTION_COLORS[currentBridgeSection].linkNormal.svg(),
        );
        document.documentElement.style.setProperty(
            `${BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME}-hover`,
            BRIDGE_SECTION_COLORS[currentBridgeSection].linkHover.svg(),
        );
        document.documentElement.style.setProperty(
            BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME,
            BRIDGE_SECTION_COLORS[currentBridgeSection].linkNormal.text(),
        );
        document.documentElement.style.setProperty(
            `${BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME}-hover`,
            BRIDGE_SECTION_COLORS[currentBridgeSection].linkHover.text(),
        );

        const newPageNavNormalValue = `${BRIDGE_PAGE_NAV_LINK_COLOR_CUSTOM_PROPERTY_NAME}: ${BRIDGE_SECTION_COLORS[currentBridgeSection].pageNav.normal()}`;
		document.documentElement.style.cssText += newPageNavNormalValue;
	
		const newPageNavHoverValue = `${BRIDGE_PAGE_NAV_LINK_COLOR_CUSTOM_PROPERTY_NAME}-hover: ${BRIDGE_SECTION_COLORS[currentBridgeSection].pageNav.hover()}`;
		document.documentElement.style.cssText += newPageNavHoverValue;
    }, [
        currentBridgeSection,
        BRIDGE_SECTION_COLORS,
        BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME,
        BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME,
        BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME,
        BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME, 
        BRIDGE_PAGE_NAV_LINK_COLOR_CUSTOM_PROPERTY_NAME
    ]);
}