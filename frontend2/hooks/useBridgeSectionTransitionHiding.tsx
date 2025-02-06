import { useEffect, useRef, useState } from "react";
import { ANIMATION_DURATION } from "../components/constants";
import { useAppSelector } from "../hooks";
import { currentBridgeSectionSelector } from "../slices";

export const useBridgeSectionTransitionHiding = (skipCondition?: boolean) => {
	const [isHidden, setIsHidden] = useState(true);
    const currentBridgeSection = useAppSelector(currentBridgeSectionSelector);
    const timeout = useRef<any>(-1)
    useEffect(() => {
		if (skipCondition) return;
		setIsHidden(true);
        
        clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			setIsHidden(false);
		}, ANIMATION_DURATION)
	}, [currentBridgeSection, skipCondition])

    return isHidden;
}