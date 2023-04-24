import { CSSProperties } from "react";
import { CarouselItemViewerShortcutIndicatorProps } from "./components/item-viewer/toolbar/CarouselItemViewerShortcutIndicator";
import { KeyboardShortcut } from "./hooks/useKeyboardShortcuts";

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

export type CarouselItemViewerOptions = {
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

export type CarouselItemViewerButtonProps = {
    onClick?: () => void;
    options?: CarouselOptions;
} & Partial<Omit<CarouselItemViewerShortcutIndicatorProps, 'children' | 'shortcuts'>>

export type CarouselLayoutOptions = {
    /*
    *The background color for the carousel.  Default is none.
    */
    colors?: {
        background?: {
            /*
            *Sets all of the background colors below.  Overriden by any colors given below.
            */
            all?: string;
            /*
            *This is the container that houses the item being viewed 
            */
            itemViewerContainer?: string;
            /*
            *This is the background color for carousel item gaps, arrows, and dots
            */
            navigation?: string;
            /*
            *This is where the item info and buttons are housed
            */
            toolbar?: string;
        },
        items?: {
            /*
            *Sets the fill/foreground color all of the below.  Overriden by any colors given below.
            */
            all?: string;
            /*
            *The arrows and dots
            */
            navigation?: string;
            /*
            *This is where the item info, progress bar and buttons are housed
            */
            toolbar?: {
                buttons?: string;
                progress?: {
                    /*
                    *Everything to the left of the current value color
                    */
                    foreground?: string;
                    /*
                    *Everything to the right of the current value
                    */
                    background?: string;
                }
            }
        }
    }
    padding?: {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    }
    /*
       *If 'none', then the item is only displayed when clicking a thumbnail.  It is then displayed in full-screen mode.
       *Otherwise the the item is displayed above or below the carousel.
       *Default is 'none'.
       */
    itemDisplayLocation?: 'none' | 'above' | 'below';
    /*
    *The height in pixels of the visible carousel item.  This only applies when 'itemDisplayLocation' is 'none'.
    *Currently there is no auto adjust based on the smallest item behavior, 
    *so you have to adjust it and see how it works for the items given.
    */
    itemDisplayHeight?: number;
}

export type CarouselNavigationOptions = {
    /*
    *When true, the right arrow button will be hidden when when on the last page and the left arrow button will be hidden when on the first page.  
    *When false, the right arrow button navigates to the first page when the currentPage is the final page
    *and the left arrow button navigates to the last page when the currentPage is the first page.
    *Default is false
    */
    hideArrowsAtFinalPage?: boolean;
    /*
    *If this is true, then the item that you last viewed in the itemViewer (full-screen mode) will determine which page is the current page
    *in the carousel.  Default is true.
    */
    trackItemViewerChanges?: boolean;
}

export type CarouselNavigationProps = {
    currentPage: number;
    numberOfDots: number;
}

export type CarouselFontFamilyOptions = Exclusive<
    {
        /*
        *Setting the font-family for text in the item-viewer
        */
        itemViewer?: string;
        /*
        *Setting the font-family for the navigation items and the carousel itself
        */
        navigation?: string;
    },
    {
        /*
        *Setting this sets both itemViewer and navigation to the same font-family
        */
        all?: string;
    }>

export type CarouselStylingOptions = {
    fontFamily?: CarouselFontFamilyOptions;
}

export type CarouselOptions = {
    itemViewer?: CarouselItemViewerOptions;
    layout?: CarouselLayoutOptions;
    navigation?: CarouselNavigationOptions;
    shortcuts?: CarouselActions;
    styling?: CarouselStylingOptions
    svgs?: CarouselSvgs;
    thumbnail?: CarouselThumbnailOptions;
}

//#region Actions
//Any new additions here need to be added to ToolbarActionLogic as well
export type CarouselAction = {
    /*
    *Runs after the the action's default action has been executed.  
    *The 'play' field is called after pressing a shortcut for the play button or pressing the play button
    */
    onActionCompleted?: CarouselActionOnActionCompleted;
} & Required<Pick<KeyboardShortcut, 'keys'>>
export type CarouselActionOnActionCompleted = () => void;

export type CarouselItemViewerActions = {
    /*
    *Additional shortcuts for closing the item-viewer (full-screen mode).  The esc key is a hard-coded value here.
    */
    close?: CarouselAction;
    /*
    *Shortcuts for moving to the next item item in the item-viewer (full-screen mode).  Overrides defaults.
    */
    nextItem?: CarouselAction;
    /*
    *Shortcuts for pausing a video in the item-viewer (full-screen mode).  Overrides defaults.
    */
    pause?: CarouselAction;
    /*
    *Shortcuts for playing a video in the item-viewer (full-screen mode).  Overrides defaults.
    */
    play?: CarouselAction;
    /*
    *Shortcuts for moving to the previous item item in the item-viewer (full-screen mode).  Overrides defaults.
    */
    previousItem?: CarouselAction;
    /*
   *Shortcuts for seeking a video backward in the item-viewer (full-screen mode).  Overrides defaults.
   */
    seekBackwards?: CarouselAction;
    /*
    *Shortcuts for seeking a video forward in the item-viewer (full-screen mode).  Overrides defaults.
    */
    seekForwards?: CarouselAction;
}

export type CarouselActions = {
    itemViewer?: CarouselItemViewerActions;
}
//#endregion

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
    *These are the buttons that are inside the Item Viewer (opens when you click a thumbnail)
    */
    itemViewer?: {
        closeButton?: string;
        nextButton?: string;
        pauseButton?: string;
        playButton?: string;
        previousButton?: string;
        seekBackButton?: string;
        seekForwardButton?: string;
    },
    /*
    *These are the buttons at the bottom of each carousel related to changing pages
    */
    navigation?: {
        arrowLeft?: CarouselSvgHref;
        /*
        *This is the button at the bottom of each carousel to the right of the dots
        */
        arrowRight?: CarouselSvgHref;
        /*
        *These are for the fullscreen modal that pops up when clicking a thumbnail in the carousel
        */
        /*
        *The dots at the bottom of the carousel indicating the number of pages
        */
        dots?: CarouselSvgHref;
    }
}

export type CarouselThumbnailBackgroundOptions = {
    /*
    *Specify what you want the gradient to be for browswers that support it.  The gradient starts at the top and goes down by default
    */
    gradient?: {
        /*
        *The number of degrees for the gradient.  Default is 180
        */
        angle?: number;
        end: {
            /*
            *This is the hexadecimal color value for the very bottom part of the gradient
            */
            color: string;
            /*
            *Valid values are 0-1 inclusive
            */
            opacity: number;
        },
        start: {
            /*
            *This is the hexadecimal color value for the very top part of the gradient
            */
            color: string;
            /*
            *Valid values are 0-1 inclusive
            */
            opacity: number;
        }
    }
    /*
    *This is a the fallback color and opacity of the background
    */
    solid?: {
        /*
    *The hexadecimal value for the thumbnail's background
    */
        color?: string;
        /*
        *Default is 1 when specifying a custom color
        */
        opacity?: number;
    }
}

export type CarouselThumbnailOptions = {
    /*
    *Options to specify how the background looks.  You can specify a starting an ending linear gradient for browsers that support it.
    *As well as specifying a solid background color for those that don't
    */
    background?: CarouselThumbnailBackgroundOptions;
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