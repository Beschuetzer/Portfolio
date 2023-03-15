import { CSSProperties, RefObject } from "react";

//#region Types and Interfaces
export type ArrowButtonDirection = "left" | "right";
export type CarouselItemProps = {
	descriptionClassname?: string | undefined;
	itemClassName?: string | undefined;
	imageClassname?: string | undefined;
	videoClassname?: string | undefined;
	foregroundVideoClassname?: string | undefined;
	description: string | undefined;
	itemSrc: string | undefined;
	itemThumbnailSrc?: string | undefined;
	isItemOpenRef?: React.MutableRefObject<boolean>;
	leftArrowRef?: RefObject<HTMLElement> | undefined;
	rightArrowRef?: RefObject<HTMLElement> | undefined;
	videoType?: "mp4" | "ogv" | "webm" | "ogg" | undefined;
	videoAutoPlay?: boolean | undefined;
	videoLoop?: boolean | undefined;
	videoPlaySVGXLinkHref?: string | undefined;
	videoPlayControlSvgXLinkHref?: string | undefined;
	videoStopControlSvgXLinkHref?: string | undefined;
	videoRestartControlSvgXLinkHref?: string | undefined;
	videoPauseControlSvgXLinkHref?: string | undefined;
	videoCloseControlSvgXLinkHref?: string | undefined;
	videoCloseControlClassesToRemove?: string | undefined;
	videoOverlayStyles?: CSSProperties | undefined;
	videoOverlayText?: string | undefined;
	videoOverlayChildren?: any | undefined;
	videoExtentions?: string[] | undefined;
	functionToRunOnClose?: any | undefined;
	functionToGetContainer?: any | undefined;
	shouldRenderFullScreen?: boolean;
}
export type CSharpSection = {
	name: string;
	pageName: string;
	children: any[];
	hasCarousel?: boolean;
	styles?: CSSProperties;
}
export type Exclusive<
  T extends Record<PropertyKey, unknown>,
  U extends Record<PropertyKey, unknown>
> =
  | (T & { [k in Exclude<keyof U, keyof T>]?: never })
  | (U & { [k in Exclude<keyof T, keyof U>]?: never })

export type Match = { url: string };
export type MaxCharCounts = {
	[key in MaxCharCount]: () => number;
}
export type NavRef = RefObject<HTMLElement>;
export type Reference = {
	current: HTMLElement;
}
export type Repository = {
	[key: string]: any,
}
//#endregion

//#region Enums
export type BridgeColors = {
	[key: string]: {
		arrowNormal: {left: () => string, right: () => string},
		arrowHover: {left: () => string, right: () => string},
		linkNormal: {svg: () => string, text: () => string},
		linkHover: {svg: () => string, text: () => string},
		pageNav: {
			normal: () => string,
			hover: () => string,
		}
	}
} 
export enum BridgeSectionClassname {
	empty = '',
	slideLeft = "slide-left",
	currentSection = "current-section",
}

export enum MaxCharCount {
	song = 'song',
}
//#endregion

