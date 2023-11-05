import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  clickedBridgeInfoButtonCountSelector,
  currentBridgeSectionSelector,
  isMobileSelector,
  setCurrentBridgeSection,
} from "../../../slices";
import {
  ANIMATION_DURATION,
} from "../../../components/constants";
import { useGetBridgeSections } from "../../../hooks/useGetBridgeSections";
import { useBridgeSectionTransitionHiding } from "../../../hooks/useBridgeSectionTransitionHiding";
import { BridgeSectionHidingLogic } from "./BridgeSectionHidingLogic";

type BridgeArrowButtonProps = {
  direction: "left" | "right";
  reference?: any;
};

export const BridgeArrowButton: React.FC<BridgeArrowButtonProps> = ({
  direction,
  reference,
}) => {
  const displayTimeoutRef = useRef<any>(-1);
  const dispatch = useAppDispatch();
  const currentBridgeSection = useAppSelector(currentBridgeSectionSelector);
  const isMobile = useAppSelector(isMobileSelector);
  const clickedBridgeInfoButtonCount = useAppSelector(
    clickedBridgeInfoButtonCountSelector
  );
  const bridgeSections = useGetBridgeSections();
  const bridgeTransitionHidingLogic = new BridgeSectionHidingLogic(
    clickedBridgeInfoButtonCount,
    currentBridgeSection,
    bridgeSections.length,
    isMobile
  );
  const isHiddenDuringTransition = useBridgeSectionTransitionHiding(
    bridgeTransitionHidingLogic.isBridgeHeroVisible ||
      !bridgeTransitionHidingLogic.leftDisplayCondition ||
      !bridgeTransitionHidingLogic.rightDisplayCondition
  );
  const [isHidden, setIsHidden] = useState(isHiddenDuringTransition);

  //Handling Updates
  useEffect(() => {
    const handleDisplay = () => {
      setIsHidden(true);
      clearTimeout(displayTimeoutRef.current);
      displayTimeoutRef.current = setTimeout(() => {
        if (direction === "left") {
          setIsHidden(bridgeTransitionHidingLogic.leftDisplayCondition);
        } else {
          setIsHidden(bridgeTransitionHidingLogic.rightDisplayCondition);
        }
      }, ANIMATION_DURATION);
    };

    handleDisplay();
  }, [
    currentBridgeSection,
    bridgeSections,
    clickedBridgeInfoButtonCount,
    direction,
    bridgeTransitionHidingLogic.leftDisplayCondition,
    bridgeTransitionHidingLogic.rightDisplayCondition,
  ]);

  const handleClick = (e: MouseEvent) => {
    const MAX_BRIDGE_SECTION = 3;
    if (
      (currentBridgeSection === MAX_BRIDGE_SECTION && direction === "right") ||
      (currentBridgeSection === 0 && direction === "left")
    )
      return;
    if ((e.currentTarget as HTMLElement)?.className.match(/left/i)) {
      if (currentBridgeSection > 0) {
        return dispatch(setCurrentBridgeSection(currentBridgeSection - 1));
      }
    } else {
      if (currentBridgeSection < (bridgeSections || []).length - 1) {
        dispatch(setCurrentBridgeSection(currentBridgeSection + 1));
      }
    }
  };

  //#region JSX
  if (isHidden) return null;
  return (
    <div
      ref={reference}
      onClick={(e: any) => handleClick(e)}
      className={`arrow-button arrow-button--${direction}`}
    >
      <svg>
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg>
      {/* <svg className={`arrow-button__fill-${fillNumber} arrow-button__hover-fill-${hoverFillNumber}`}>
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg> */}
    </div>
  );
  //#endregion
};
