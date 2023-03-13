import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks";
import { currentBridgeSectionSelector } from "../slices";
import { BridgeSectionClassname } from "../types";

export const useBridgeSectionSlidingClassname = (index: number | undefined | null) => {
	const currentBridgeSection = useAppSelector(currentBridgeSectionSelector);
    const [classname, setClassname] = useState(BridgeSectionClassname.empty);

    useEffect(() => {
		if (index === undefined || index === null) return;
        console.log("running");
        
		let tempClassname = BridgeSectionClassname.empty;
		const isLeftOfCurrentSection = index < currentBridgeSection;
		const isCurrentSection = index === currentBridgeSection;
		if (isLeftOfCurrentSection) {
			tempClassname = BridgeSectionClassname.slideLeft;
		} else if (isCurrentSection) {
			tempClassname = BridgeSectionClassname.currentSection;
		}

		setClassname(tempClassname);
	}, [currentBridgeSection])

    return classname;
}