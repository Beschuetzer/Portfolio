import { CSSProperties } from "react";
import { CarouselItemViewerShortcutIndicatorProps } from "./components/item-viewer/toolbar/CarouselItemViewerShortcutIndicator";
import { KeyboardShortcut } from "./hooks/useKeyboardShortcuts";
import { LoadingSpinnerProps } from "./components/LoadingSpinner";

//#region Prop Types
export enum ArrowButtonDirection {
    next = 'next',
    previous = 'previous',
}
export type ArrowProps = {
    direction: ArrowButtonDirection;
    options?: CarouselOptions;
}

export type ButtonProps = {
    className?: string;
    childStyle?: CSSProperties;
    fillColor?: Color;
    onClick: () => void;
    style?: CSSProperties;
}

export type CarouselColorOptions = {
    /*
    *This can be any background string that the CSS property accepts
    *https://developer.mozilla.org/en-US/docs/Web/CSS/background
    */
    background?: string;
    foregroundColor?: Color;
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

export type CarouselElementValueType = "min-width" | "max-width";
/*
*this can be any color string (e.g. `#abc123`, `rgba(255,0,122, .5)`, or `yellow`)
*/
export type Color = string;
export type CarouselElementColor = {
    color?: Color;
}
export type CarouselElementSize = {
    /*
    *Default buttonSize is 24px above 655px and 18px otherwise
    *A tuple where the first element is the size of the button in px, the second element is the breakpoint in px, and the third element is the breakpoint type (default is max-width)
    *Max width is equal to <= and min-width is equal to >= the 2nd element's number
    *Default 2nd element and 3rd element are positive infinity and max-width, so giving only a number will result in that size always being used
    *Examples: 
    *   [[18, 400, "max-width"]] => when window.innerWidth <= 400 then the button size is set to 18
    *   [[18, 400, "max-width"], [30, 1600, "min-width"]] => when window.innerWidth <= 400 then the button size is set to 18, when window.innerWidth >= 1600 then button size is 30, otherwise button size is default of 24px.
    *Known Issues:
    *   1). Changing the window width after first load doesn't necessarily change the buttonSize when changing breakpoints.  
    *       Currently the sizing only takes affect if the CarouselContenxt component re-renders.  
    *       This only happens if the numberOfPages changes or the thumbnail spacing changes.
    */
    size?: CarouselElementValue<number>;
}
export type CarouselElementValue<T> = CarouselElementValueTuple<T> | T;
export type CarouselElementValueTuple<T> = [T, number?, CarouselElementValueType?][];
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
} & CarouselSwipingOptions

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
        elements?: CarouselElementSize & CarouselElementColor;
        padding?: CarouselHorizontalPaddingOptions;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /*
    *This is where the buttons, progress bar, and item description sit
    */
    [CarouselSection.toolbar]?: {
        /*
        This sets the size of the buttons in the toolbar in px.  The default is 24px
        */
        padding?: CarouselHorizontalPaddingOptions;
        progressBar?: {
            /*
            *If true, the progress bar spans the entire width of the carousel itemViewer, otherwise it only spans the inner width of the toolbar container.
            *Default is false
            */
            shouldSpanContainerWidth?: boolean;
        } & CarouselColorOptions;
        /*
        *This changes all of the button colors as well as the text.  To change individual ones, use styling.elements.buttonNameHere
        */
        elements?: CarouselElementSize & CarouselElementColor;
        /*
        *This overrides any value given in toolbar.elements.color above
        */
        textColor?: Color;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /*
   *This is the the modal that displays when a video is paused, allowing for more info about the video
   */
    [CarouselSection.videoModal]?: {
        closeButton?: {
            fill?: Color;
        } & CarouselElementSize;
        /*
        *This is in px
        */
        fontSize?: number;
        padding?: CarouselVerticalPaddingOptions & CarouselHorizontalPaddingOptions;
        textColor?: Color;
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
   *If `thumbnail.itemSpacing` is not given, then it defaults to 5 if `itemPositioning` is not undefined
   *Default is `left`
   *`left` => the left-most thumbnail item on a given page is positioned flush with the container
   *`center` => the left-most and right-most thumbnail on a given page are equi-distant from the navigation container's ends
   *`right` => the right-most thumbnail item on a given page is positioned flush with the container
   */
    itemPositioning?: 'left' | 'center' | 'right';
}

export type CarouselSwipingOptions = {
    /*
       *If true, then swiping will be disabled.  For navigation, this means grabbing a thumbnail and swiping will not change the page.  
       *For `itemViewer`, this means that grabbing and swiping will not change the currently viewing item.
       *Default is false.
       *Swiping only occurs if mouseup and mousedown coordinate distances are greater than `maxClickThreshold` 
       */
    disableSwiping?: boolean;
    /*
   *The max number of pixels that can be moved between mousedown and mouseup to still register a 'click' event
   *This is used to prevent opening of an item when mousedown and mouseup targets are the same
   *Higher values mean the user can move the cursor more and still open the item
   *0 would mean if the user moved the cursor at all between mouseup and mousedown then the item would not open
   *Default is 15 when swiping is enabled to allow for slight movement (swiping is disabled if only 1 page or `disableSwiping` is false)
   */
    maxClickThreshold?: number;
}

export type CarouselNavigationOptions = {
    /*
   *If true, the navigation automatically changes pages based on the current item viewed 
   *Default is true.
   */
    autoChangePage?: CarouselElementValue<boolean>;
    /*
    *When true, the carousel can not go from beginning to end directly.
    *When false, the right arrow button navigates to the first page when the currentPage is the final page
    *and the left arrow button navigates to the last page when the currentPage is the first page.
    *Default is false
    */
    disableWrapping?: CarouselElementValue<boolean>;
} & CarouselSwipingOptions

export type CarouselNavigationProps = {
    currentPage: number;
    numberOfDots: number;
}

export type CarouselFontFamilyOptions = Exclusive<
    {
        /*
        *Setting the font-family for text in the item-viewer
        */
        itemViewer?: CarouselElementValue<string>;
        /*
        *Setting the font-family for the navigation items and the carousel itself
        */
        navigation?: CarouselElementValue<string>;
    },
    {
        /*
        *Setting this sets both itemViewer and navigation to the same font-family
        */
        all?: CarouselElementValue<string>;
    }>

export type CarouselHorizontalPaddingOptions = {
    left?: CarouselElementValue<number>;
    right?: CarouselElementValue<number>;
}

export type CarouselVerticalPaddingOptions = {
    bottom?: CarouselElementValue<number>;
    top?: CarouselElementValue<number>;
}

export type CarouselStylingOptions = {
    elements?: CarouselElementStyles;
    fontFamily?: CarouselFontFamilyOptions;
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

export type CarouselElementCustomization = {
    /*
    *Default is #000
    */
    fillColor?: CarouselElementValue<Color>;
    /*
    *Href of the svg element
    */
    svgHref?: CarouselElementValue<string>;
    /*
    *Styles passed directly to the underlying use element of the svg (for rotation purposes mainly).
    *It's best to make changes to the svg element directly though
    */
    style?: CSSProperties;
}

export type CarouselElementStyles = {
    [button in CarouselElement]?: button extends CarouselElement.all ? Pick<CarouselElementCustomization, 'fillColor'> : CarouselElementCustomization;
}

export type CarouselThumbnailBackgroundOptions = {
    /*
    *Specify what you want the gradient to be for browswers that support it.  The gradient starts at the top and goes down by default (180deg angle)
    */
    gradient?: {
        angle?: CarouselElementValue<number>;
        end: CarouselThumbnailBackground;
        start: CarouselThumbnailBackground;
    }
    /*
    *The hexadecimal value for the thumbnail's fallback background
    */
    solid?: CarouselThumbnailBackground;
}
export type CarouselThumbnailBackground = {
    /*
    *This is a hexadecimal color
    */
    color?: CarouselElementValue<Color>;
    /*
    *Valid values are 0-1 inclusive
    */
    opacity?: CarouselElementValue<number>;
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
    isDisabled?: CarouselElementValue<boolean>;
    /*
    *The size of the font in px of the thumbnail description;  Default is 12px;
    */
    fontSize?: CarouselElementValue<number>;
    /*
    *If false, the overlay with the description is always present.  
    *If true, the overlay only shows when item is hovered.
    *No overlay is shown if item.description is falsy
    *Default is true
    */
    hideDescriptionOverlayUnlessHovered?: CarouselElementValue<boolean>;
    /*
    *The number of lines to show before an ellipsis is inserted.  Default is 2.
    */
    maxLineCount?: CarouselElementValue<number>;
    /*
    *The hexadecimal value for the thumbnail background's text
    */
    textColor?: CarouselElementValue<Color>;

}

export type CarouselThumbnailOptions = {
    /*
    *This is the border used to indicate which thumbnail is active when 'layout.itemDisplayLocation' is not 'none'.  
    *Must be in the CSS border property format (e.g. '1px solid #000').  Will use default if the value provided is deemed invalid.
    */
    currentItemBorder?: CarouselElementValue<string>;
    /*
    *This is the background and text that displays with the description text when hovering a thumbnail
    */
    descriptionOverlay?: CarouselThumbnailDescriptionOverlayOptions;
    /*
    *The value in px that the thumbnails are spaced apart.  
    *If not given, the spacing dynamically adjusts to neatly fit as many items inside the container as possible
    */
    itemSpacing?: CarouselElementValue<number>;
    /*
    *Default is `min`
    *Determines how the thumbnails are spaced out if there is only one page and `itemSpacing` is not given (i.e. dynamic spacing is active)
    *`min` means that the `itemSpacing` will be reduced to a value that would allow for the most number of thumbnails to fit within the container with even spacing
    *`max` means that the `itemSpacing` will be maximized such that the thumbnails will span the entire width of the container when there is only one page
    */
    itemSpacingStrategy?: CarouselElementValue<'min' | 'max'>;
    /*
    *The size of the thumbnails in px.  Default is 150px.
    */
    size?: CarouselElementValue<number>;
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
export type Coordinate = {
    x: number;
    y: number;
}
export type Exclusive<
    T extends Record<PropertyKey, unknown>,
    U extends Record<PropertyKey, unknown>
> =
    | (T & { [k in Exclude<keyof U, keyof T>]?: never })
    | (U & { [k in Exclude<keyof T, keyof U>]?: never })
//#endregion