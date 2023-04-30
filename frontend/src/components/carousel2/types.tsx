import { CSSProperties } from "react";
import { CarouselItemViewerShortcutIndicatorProps } from "./components/item-viewer/toolbar/CarouselItemViewerShortcutIndicator";
import { KeyboardShortcut } from "./hooks/useKeyboardShortcuts";
import { LoadingSpinnerProps } from "./components/LoadingSpinner";

//#region Prop Types
export type ArrowButtonDirection = 'left' | 'right';
export type ArrowProps = {
    direction: ArrowButtonDirection;
    options?: CarouselOptions;
}

export type ButtonProps = {
    className?: string;
    childStyle?: CSSProperties;
    fillColor?: string;
    onClick: () => void;
    style?: CSSProperties;
}

export type CarouselColorOptions = {
    /*
    *This can be any background string that the CSS property accepts
    *https://developer.mozilla.org/en-US/docs/Web/CSS/background
    */
    background?: string;
    foregroundColor?: string;
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


export enum CarouselSection {
    container = 'container',
    itemViewer = 'itemViewer',
    navigation = 'navigation',
    toolbar = 'toolbar',
    videoModal = 'videoModal',
}
export type CarouselSections = {
    [CarouselSection.container]?: {
        padding?: CarouselVerticalPaddingOptions & CarouselHorizontalPaddingOptions;
    } & CarouselColorOptions
    /*
    *This is the container in which the currently viewing item sits
    */
    [CarouselSection.itemViewer]?: {
        loadingSpinner?: Partial<Omit<LoadingSpinnerProps, 'description' | 'show'>>;
        padding?: CarouselHorizontalPaddingOptions;
    } & CarouselColorOptions;
    /*
    *This is the where the dots, arrows, and thumbanils sit
    */
    [CarouselSection.navigation]?: {
        /*
        *This changes the dots and arrows
        */
        elementColor?: string;
        padding?: CarouselHorizontalPaddingOptions;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /*
    *This is where the buttons, progress bar, and item description sit
    */
    [CarouselSection.toolbar]?: {
        padding?: CarouselHorizontalPaddingOptions;
        progressBar?: {
            /*
            *If true, the progress bar spans the entire width of the carousel itemViewer, otherwise it only spans the inner width of the toolbar container.
            *Default is false
            */
            shouldSpanContainerWidth?: boolean;
        } & CarouselColorOptions;
        /*
        *This changes all of the button colors.  To change individual ones, use styling.elements.buttonNameHere
        */
        elementColor?: string;
        textColor?: string;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /*
   *This is the the modal that displays when a video is paused, allowing for more info about the video
   */
    [CarouselSection.videoModal]?: {
        closeButtonColor?: string;
        /*
        *This is in px
        */
        fontSize?: number;
        padding?: CarouselVerticalPaddingOptions & CarouselHorizontalPaddingOptions;
        textColor?: string;
        /*
        *this is a percent of the item container width when the 'itemDisplayLocation' is not 'none'.  It has no effect otherwise.
        */
        widthInPercent?: number;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
}

export type CarouselLayoutOptions = {
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

export type CarouselHorizontalPaddingOptions = {
    left?: number;
    right?: number;
}

export type CarouselVerticalPaddingOptions = {
    bottom?: number;
    top?: number;
}

export type CarouselStylingOptions = {
    fontFamily?: CarouselFontFamilyOptions;
    elements?: CarouselElements;
} & CarouselSections;

export type CarouselOptions = {
    itemViewer?: CarouselItemViewerOptions;
    layout?: CarouselLayoutOptions;
    navigation?: CarouselNavigationOptions;
    shortcuts?: CarouselActions;
    styling?: CarouselStylingOptions
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
    [CarouselElement.closeButton]?: CarouselAction;
    /*
    *Shortcuts for moving to the next item item in the item-viewer (full-screen mode).  Overrides defaults.
    */
    [CarouselElement.nextButton]?: CarouselAction;
    /*
    *Shortcuts for pausing a video in the item-viewer (full-screen mode).  Overrides defaults.
    */
    [CarouselElement.pauseButton]?: CarouselAction;
    /*
    *Shortcuts for playing a video in the item-viewer (full-screen mode).  Overrides defaults.
    */
    [CarouselElement.playButton]?: CarouselAction;
    /*
    *Shortcuts for moving to the previous item item in the item-viewer (full-screen mode).  Overrides defaults.
    */
    [CarouselElement.previousButton]?: CarouselAction;
    /*
   *Shortcuts for seeking a video backward in the item-viewer (full-screen mode).  Overrides defaults.
   */
    [CarouselElement.seekBackButton]?: CarouselAction;
    /*
    *Shortcuts for seeking a video forward in the item-viewer (full-screen mode).  Overrides defaults.
    */
    [CarouselElement.seekForwardButton]?: CarouselAction;
}

export type CarouselActions = {
    itemViewer?: CarouselItemViewerActions;
}
//#endregion

export type CarouselButtonCustomization = {
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

export enum CarouselElement {
    /*
    *Setting this will change all the items below.  'elementColor' specified in a given section will override this value
    */
    all = 'all',
    /*
   *These are the buttons at the bottom of each carousel related to changing pages
   */
    arrowLeft = 'arrowLeft',
    /*
  *This is the button at the bottom of each carousel to the right of the dots
  */
    arrowRight = 'arrowRight',
    closeButton = 'closeButton',
    /*
   *The dots at the bottom of the carousel indicating the number of pages
   */
    dots = 'dots',
    fullscreenButton = 'fullscreenButton',
    nextButton = 'nextButton',
    pauseButton = 'pauseButton',
    playButton = 'playButton',
    previousButton = 'previousButton',
    seekBackButton = 'seekBackButton',
    seekForwardButton = 'seekForwardButton',
}

export type CarouselElements = {
    [button in CarouselElement]?: button extends CarouselElement.all ? Pick<CarouselButtonCustomization, 'fillColor'> : CarouselButtonCustomization;
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

export type CarouselThumbnailDescriptionOverlayOptions = {
    /*
    *Options to specify how the background looks.  You can specify a starting an ending linear gradient for browsers that support it.
    *As well as specifying a solid background color for those that don't
    */
    background?: CarouselThumbnailBackgroundOptions;
    /*
    *If true the description is disabled in the thumbnail.  Default is false is `layout.itemDisplayLocation` is 'none' otherwise true.
    */
    isDisabled?: boolean;
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
    hideDescriptionOverlayUnlessHovered?: boolean;
    /*
    *The number of lines to show before an ellipsis is inserted.  Default is 2.
    */
    maxLineCount?: number;
    /*
    *The hexadecimal value for the thumbnail background's text
    */
    textColor?: string;

}

export type CarouselThumbnailOptions = {
    /*
    *This is the border used to indicate which thumbnail is active when 'layout.itemDisplayLocation' is not 'none'.  
    *Must be in the CSS border property format (e.g. '1px solid #000').  Will use default if the value provided is deemed invalid.
    */
    currentItemBorder?: string;
    /*
    *This is the background and text that displays with the description text when hovering a thumbnail
    */
    descriptionOverlay?: CarouselThumbnailDescriptionOverlayOptions;
    /*
    *The value in px that the thumbnails are spaced apart.  
    *If not given, the spacing dynamically adjusts to neatly fit as many items inside the container as possible
    */
    itemSpacing?: number;
    /*
    *The size of the thumbnails in px.  Default is 150px.
    */
    size?: number;
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