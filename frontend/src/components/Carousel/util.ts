import { CSSProperties } from "react";

export const CAROUSEL_CLASSNAME = 'carousel';
export const CAROUSEL_TRANSLATION_CSS_CLASSNAME = `--${CAROUSEL_CLASSNAME}-item-translation-x`;
export const CAROUSEL_VIDEO_CLASSNAME = `${CAROUSEL_CLASSNAME}__video`;

export const CAROUSEL_IMAGE_CLASSNAME = `${CAROUSEL_CLASSNAME}__image`;
export const CAROUSEL_ITEM_CLASSNAME = `${CAROUSEL_CLASSNAME}__item`;
export const CAROUSEL_TRANSITION_CLASSNAME = "carousel-transition";
export const CAROUSEL_DESCRIPTION_CLASSNAME = `${CAROUSEL_IMAGE_CLASSNAME}-description`;
export const CAROUSEL_DOT_CLASSNAME = `${CAROUSEL_CLASSNAME}__dot`;
export const CAROUSEL_DOT_ACTIVE_CLASSNAME = `${CAROUSEL_DOT_CLASSNAME}--active`;
export const CAROUSEL_ARROW_BUTTONS_CLASSNAME = `${CAROUSEL_CLASSNAME}__arrow-button`;
export const CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--left`;
export const CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--right`;
export const CAROUSEL_MIN_IMAGE_COUNT = 0;

export interface CarouselItemProps {
	descriptionClassname: string | undefined;
	itemClassName: string | undefined;
	imageClassname: string | undefined;
	videoClassname: string | undefined;
	foregroundVideoClassname: string | undefined;
	description: string | undefined;
	itemSrc: string | undefined;
	videoType?: 'mp4' | 'ogv' | 'webm' | 'ogg' | undefined;
	videoAutoPlay?: boolean | undefined;
	videoLoop?: boolean | undefined;
	videoPlaySVGXLinkHref: string | undefined;
	videoPlayControlSvgXLinkHref?: string | undefined;
	videoStopControlSvgXLinkHref?: string | undefined;
	videoRestartControlSvgXLinkHref?: string | undefined;
	videoPauseControlSvgXLinkHref?: string | undefined;
	videoCloseControlSvgXLinkHref?: string | undefined;
	videoCloseControlClassesToRemove?: string | undefined;
	videoOverlayStyles?: CSSProperties | undefined,
	videoOverlayText?: string | undefined,
	videoOverlayChildren?: any | undefined,
	videoExtentions?: string[] | undefined,
	functionToRunOnClose?: any | undefined,
	functionToGetContainer?: any | undefined,
}