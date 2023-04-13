import { CSSProperties } from "react";

//#region Prop Types
export type ArrowButtonDirection = 'left' | 'right';
export type ArrowProps = {
    direction: ArrowButtonDirection;
    options?: CarouselOptions;
    fillColor?: string;
}

export type ButtonProps = {
    className?: string;
    onClick: () => void;
}

export type CarouselNavigationOptions = {
    /*
    *When true, the right arrow button will be hidden when when on the last page and the left arrow button will be hidden when on the first page.  
    *When false, the right arrow button navigates to the first page when the currentPage is the final page
    *and the left arrow button navigates to the last page when the currentPage is the first page.
    *Default is false
    */
    hideArrowsAtFinalPage?: boolean;
}

export type CarouselNavigationProps = {
    currentPage: number;
    numberOfDots: number;
}

export type CarouselOptions = {
    navigation?: CarouselNavigationOptions;
	svgs?: CarouselSvgs;
    thumbnail?: CarouselThumbnailOptions;
    video?: CarouselVideoOptions;
}

export type CarouselSvgHref = {
    /*
    *Default is #000
    */
    fillColor?: string;
    /*
    *Href of the svg element
    */
    svgHref?: string;
    /*
    *Styles passed directly to the underlying use element of the svg (for rotation purposes mainly)
    */
    style?: CSSProperties;
}

export type CarouselSvgs = {
    /*
    *This is the button at the bottom of each carousel to the left of the dots
    */
    arrowLeftButton?: CarouselSvgHref;
    /*
    *This is the button at the bottom of each carousel to the right of the dots
    */
    arrowRightButton?: CarouselSvgHref;
    /*
    *These are for the fullscreen modal that pops up when clicking a thumbnail in the carousel
    */
    itemViewer?: {
        closeButton?: string;
        nextButton?: string;
        pauseButton?: string;
        playButton?: string;
        previousButton?: string;
        restartButton?: string;
        seekBackButton?: string;
        seekForwardButton?: string;
        stopButton?: string;
    },
    /*
    *The dots at the bottom of the carousel indicating the number of pages
    */
    dots?: CarouselSvgHref;
}

export type CarouselThumbnailOptions = {
    /*
    *The hexadecimal value for the thumbnail's background
    */
    backgroundColor?: string;
    /*
    *Default is 1 when specifying a custom color
    */
    backgroundOpacity?: number;
    /*
    *The size of the font in px of the thumbnail description;  Default is 12px;
    */
    fontSize?: number;
     /*
    *If false, the overlay with the description is always present.  
    *If true, the overlay only shows when item is hovered.
    *No overlay is shown if item.description is falsy
    *Default is true
    */
    hideOverlayUnlessHovered?: boolean;
    /*
    *The value in px that the thumbnails are spaced apart.  
    *If not given, the spacing dynamically adjusts to neatly fit as many items inside the container as possible
    */
    itemSpacing?: number;
    /*
    *The number of lines to show before an ellipsis is inserted.  Default is 2.
    */
    maxLineCount?: number;
    /*
    *The size of the thumbnails in px.  Default is 150px.
    */
    size?: number;
    /*
    *The hexadecimal value for the thumbnail background's text
    */
    textColor?: string;
}

export type CarouselVideoOptions = {
    /*
   *If this is falsy or < 0 then auto-hiding of the toolbar is disabled for videos.  
   *Otherwise, auto-hide occurs when there is no mouse input for this amount of time in milliseconds.  Default is 2.5 seconds.
   */
    autoHideToolbarDuration?: number;
    /*
    *How for forward/backward the seek buttons move a video.  Default is 5 seconds.
    */
    seekAmount?: number;
}

export type CssStyles = {
    [name: string]: React.CSSProperties;
}

export type Point = {
    x: number;
    y: number;
}

export type VideoTimeStrings = {
    durationStr: string;
    currentTimeStr: string;
}
//#endregion

//#region Helpers
export type Exclusive<
    T extends Record<PropertyKey, unknown>,
    U extends Record<PropertyKey, unknown>
> =
    | (T & { [k in Exclude<keyof U, keyof T>]?: never })
    | (U & { [k in Exclude<keyof T, keyof U>]?: never })
//#endregion