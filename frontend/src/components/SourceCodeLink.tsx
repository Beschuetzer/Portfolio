import React from "react";
import { useBridgeSectionTransitionHiding } from "../hooks/useBridgeSectionTransitionHiding";

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