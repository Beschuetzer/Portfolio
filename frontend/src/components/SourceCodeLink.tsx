import React, { useState } from "react";
import { useAppSelector } from "../hooks";
import { useBridgeSectionTransitionHiding } from "../hooks/useBridgeSectionTransitionHiding";
import { useGetBridgeSections } from "../hooks/useGetBridgeSections";
import { BridgeSectionHidingLogic } from "../pages/examples/bridge/BridgeSectionHidingLogic";
import { currentBridgeSectionSelector, clickedBridgeInfoButtonCountSelector } from "../slices";

interface  SourceCodeLinkProps { 
  href: string,
  blockName?: string,
  msg?: string,
	className?: string,
}

export const SourceCodeLink: React.FC<SourceCodeLinkProps> = ({ 
  href,
  blockName = "source-link",
  msg = "Code",
	className,
}) => {
	const defaultClassname = `${blockName}__source`;
	const isHiddenDuringBridgeSectionTransition = useBridgeSectionTransitionHiding();
	
	if (isHiddenDuringBridgeSectionTransition) return null;
	return (
		<a
			target="_blank"
			rel="noreferrer"
			href={href}
			className={className ? `${className} ${defaultClassname}` : defaultClassname}>
			<svg aria-hidden="true" className={`${blockName}__source-svg`}>
				<use xlinkHref="/sprite.svg#icon-code"></use>
			</svg>
			<span aria-hidden="true" className={`${blockName}__source-label`}>{msg}</span>
		</a>
	);
};