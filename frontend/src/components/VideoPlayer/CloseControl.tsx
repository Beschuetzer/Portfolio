import { RefObject } from "react";
import { connect } from "react-redux";
import { removeClassFromAllChildren } from "../helpers";

import { closeVideo } from "./utils";

interface CloseControlProps {
	className?: string;
	xlinkHref: string;
	videoRef: RefObject<HTMLVideoElement>;
	containerRef?: RefObject<HTMLElement>;
	classNamesToRemove: string[];
	classNamesToRemoveFromElement?: [string, HTMLElement | null][];
	functionToRunOnClose?: () => void;
}

const CloseControl: React.FC<CloseControlProps> = ({
	xlinkHref,
	videoRef,
	className = "card__close",
	containerRef = null,
	classNamesToRemove,
	classNamesToRemoveFromElement = [],
	functionToRunOnClose = null,
}) => {
	const handleCloseVideo = (e: MouseEvent) => {
		e.stopPropagation();
		closeVideo(videoRef.current);
		if (functionToRunOnClose) functionToRunOnClose();

		if (containerRef && containerRef.current) {
			const container = containerRef.current;

			for (let i = 0; i < classNamesToRemove.length; i++) {
				const classNameToRemove = classNamesToRemove[i];
				container.classList.remove(classNameToRemove);
				removeClassFromAllChildren(container, classNameToRemove);
			}
		}

		if (classNamesToRemoveFromElement.length > 0) {
			for (let i = 0; i < classNamesToRemoveFromElement.length; i++) {
				const classNameToRemove = classNamesToRemoveFromElement[i][0];
				const elementToRemoveFrom = classNamesToRemoveFromElement[i][1];
				if (elementToRemoveFrom) elementToRemoveFrom.classList.remove(classNameToRemove);
			}
		}
	};

	return (
		<div onClick={(e: any) => handleCloseVideo(e)} className={`${className}-parent`}>
			<svg className={`${className}`}>
				<use xlinkHref={xlinkHref}></use>
			</svg>
		</div>
	);
};

export default connect(null, {
	
})(CloseControl);
