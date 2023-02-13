import { RefObject } from "react";
import {
} from "../Carousel/CarouselItem";
import { FULLSCREEN_PARENT_CLASSNAME, CAROUSEL_ITEM_CLASSNAME, FULLSCREEN_CLASSNAME } from "../constants";
import { removeClassFromAllChildren } from "../utils";

import { closeVideo } from "./utils";

interface CloseControlProps {
	className?: string;
	additionalSvgClassNames?: string[];
	xlinkHref: string;
	isItemOpenRef?: React.MutableRefObject<boolean>;
	videoRef: RefObject<HTMLVideoElement>;
	containerRef?: RefObject<HTMLElement>;
	classNamesToRemove: string[] | string;
	classNamesToRemoveFromElement?: [string, HTMLElement | null][];
	functionToRunOnClose?: () => void;
}

export const CloseControl: React.FC<CloseControlProps> = ({
	xlinkHref,
	videoRef,
	isItemOpenRef,
	className = "card__close",
	additionalSvgClassNames = [],
	containerRef = null,
	classNamesToRemove,
	classNamesToRemoveFromElement = [],
	functionToRunOnClose = null,
}) => {
	const handleCloseItem = (e: MouseEvent) => {
		e.stopPropagation();
		if (isItemOpenRef?.current) isItemOpenRef.current = false;
		closeVideo(videoRef.current as HTMLVideoElement);
		if (functionToRunOnClose) functionToRunOnClose();

		if (containerRef && containerRef.current) {
			const container = containerRef.current;
			container.classList.remove(FULLSCREEN_PARENT_CLASSNAME);
			const items = container.querySelectorAll(`.${CAROUSEL_ITEM_CLASSNAME}`);

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				item?.classList.remove(FULLSCREEN_CLASSNAME);
			}

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
				if (elementToRemoveFrom)
					elementToRemoveFrom.classList.remove(classNameToRemove);
			}
		}
	};

	return (
		<div
			onClick={(e: any) => handleCloseItem(e)}
			className={`${className}-parent `}>
			<svg className={`${className} ${additionalSvgClassNames.join(" ")}`}>
				<use xlinkHref={xlinkHref}></use>
			</svg>
		</div>
	);
};