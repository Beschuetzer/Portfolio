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
    /**
    *This can be any background string that the CSS property accepts
    *https://developer.mozilla.org/en-US/docs/Web/CSS/background
    **/
    background?: CarouselElementValue<string>;
    foregroundColor?: CarouselElementValue<Color>;
}

export enum CarouselElement {
    /**
    *Setting this will change all the items below.  `elementColor` specified in a given section will override this value
    **/
    all = 'all',
    /**
    *These are the buttons at the bottom of each carousel related to changing pages
    **/
    arrowLeft = 'arrowLeft',
    /**
    *This is the button at the bottom of each carousel to the right of the dots
    **/
    arrowRight = 'arrowRight',
    closeButton = 'closeButton',
    /**
    *The dots at the bottom of the carousel indicating the number of pages
    **/
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
/**
*this can be any color string (e.g. `#abc123`, `rgba(255,0,122, .5)`, or `yellow`)
**/
export type Color = string;
export type CarouselElementColor = {
    color?: CarouselElementValue<Color>;
}
export type CarouselElementSize = {
    /**
    *Default buttonSize is 24px above 655px and 18px otherwise
    *A tuple where the first element is the size of the button in px, the second element is the breakpoint in px, and the third element is the breakpoint type (default is max-width)
    *`max-width` is equal to <= and `min-width` is equal to >= the 2nd element's number
    *Default 2nd element and 3rd element are positive infinity and `max-width`, so giving only a number will result in that size always being used.
    *@example
    *   `[[18, 400, "max-width"]]` => when window.innerWidth <= 400 then the button size is set to 18
    *   `[[18, 400, "max-width"], [30, 1600, "min-width"]]` => when window.innerWidth <= 400 then the button size is set to 18, when window.innerWidth >= 1600 then button size is 30, otherwise button size is default of 24px.
    **/
    size?: CarouselElementValue<number>;
}
export type CarouselElementViewingMode<T> = {
    /**
    *These setting only apply when in fullscreen mode.  Otherwise default settings are used
    **/
    fullscreen?: CarouselElementValueTuple<T>;
    /**
    *These setting only apply when not in fullscreen mode.  Otherwise default settings are used
    *Elements only visible when `layout.itemDisplayLocation` is not `none`, will not be affected by this unless `itemDisplayLocation` is also set.
    **/
    nonFullscreen?: CarouselElementValueTuple<T>;
}
export type CarouselElementValue<T> = CarouselElementViewingMode<T> | CarouselElementValueTuple<T>;
export type CarouselElementValueTuple<T> = CarouselElementTuple<T> | T;
export type CarouselElementTuple<T> = [T, number?, CarouselElementValueType?][];
export type CarouselItemViewerOptions = {
    /**
    *If this is falsy or < 0 then auto-hiding of the toolbar is disabled for videos.
    *Otherwise, auto-hide occurs when there is no mouse input for this amount of time in milliseconds.  Default is 2.5 seconds.
    *Only applies when in fullscreen mode
    **/
    autoHideToolbarDuration?: CarouselElementValueTuple<number>;
    /**
    *How for forward/backward the seek buttons move a video.  
    *Default is 5 seconds.
    *Only applies when in fullscreen mode
    **/
    seekAmount?: CarouselElementValue<number>;
} & CarouselSwipingOptions

export type CarouselItemViewerButtonProps = {
    onClick?: () => void;
    options?: CarouselOptions;
} & Partial<Omit<CarouselItemViewerShortcutIndicatorProps, 'children' | 'shortcuts'>>

export enum CarouselSection {
    container = 'container',
    itemViewer = 'itemViewer',
    itemViewerPreview = 'itemViewerPreview',
    navigation = 'navigation',
    toolbar = 'toolbar',
    videoCurrentStateIndicator = 'videoCurrentStateIndicator',
    videoModal = 'videoModal',
}
export type CarouselSections = {
    [CarouselSection.container]?: {
        padding?: CarouselVerticalPaddingOptions & CarouselHorizontalPaddingOptions;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /**
    *This is the container in which the currently viewing item sits
    **/
    [CarouselSection.itemViewer]?: {
        loadingSpinner?: Partial<Omit<LoadingSpinnerProps, 'description' | 'show'>>;
        padding?: CarouselHorizontalPaddingOptions;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /**
    *This is the popup that you see when you hover over the next/previous buttons when in fullscreen mode
    *This element is only visible in fullscreen mode by default
    **/
    [CarouselSection.itemViewerPreview]?: {
        /**
        *Will use default white value, if the value provided is deemed invalid.
        **/
        border?: CarouselElementValue<CSSProperties['border']>;
        /**
        *Default is 5px
        **/
        borderRadius?: CarouselElementValue<CSSProperties['borderRadius']>;
        /**
        *Height in px.  If left blank, then it is half of the width
        **/
        height?: CarouselElementValue<number>;
        image?: {
            fit?: CarouselElementValue<CSSProperties['objectFit']>
            position?: CarouselElementValue<CSSProperties['objectPosition']>;
        }
        /**
        *Default is false
        **/
        isVisibleInNonFullscreenMode?: CarouselElementValueTuple<boolean>;
        /**
        *The opacity of the background
        **/
        opacity?: CarouselElementValue<CSSProperties['opacity']>
        /**
        *This changes which side the image and text are on
        *Default is image on left and text on right
        **/
        swapImageAndText?: CarouselElementValue<boolean>
        text?: {
            /**
            *These affect only the text body
            **/
            body?: CarouselItemViewerPreviewTextOptions;
            /**
            *These affect the layout of the entire text block
            **/
            container?: {
                padding?: CarouselElementValue<CarouselHorizontalPaddingOptions & CarouselVerticalPaddingOptions>;
                verticalAlignment?: CarouselElementValue<CSSProperties['alignItems']>
            }
            /**
            *The header text displaying the action and its shortcuts
            **/
            header?: CarouselItemViewerPreviewTextOptions;
        };
        /**
        *Width in px.  Default is 400px.
        **/
        width?: CarouselElementValue<number>;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /**
    *This is the where the dots, arrows, and thumbanils sit
    **/
    [CarouselSection.navigation]?: {
        /**
        *This changes the dots and arrows
        **/
        elements?: CarouselElementSize & CarouselElementColor;
        padding?: CarouselHorizontalPaddingOptions;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /**
    *This is where the buttons, progress bar, and item description sit
    **/
    [CarouselSection.toolbar]?: {
        /**
        This sets the size of the buttons in the toolbar in px.  The default is 24px
        **/
        padding?: CarouselElementValue<CarouselHorizontalPaddingOptions & CarouselVerticalPaddingOptions>;
        progressBar?: {
            /**
            *This is the dot at the end of the progress bar, which is only visible on when hovering the progress bar.  
            **/
            dot?: {
                /**
                *Default is 12px
                **/
                diameter?: CarouselElementValue<number>;              
                /**
                *Default is `false`
                **/
                isAlwaysVisible?: CarouselElementValue<boolean>;
                /**
                *The amount of time (in seconds) it takes to show the dot on hovering of the progress bar
                *Default is .25 and only applicable if `isAlwaysVisible` is `false`
                **/
                transitionDuration?: CarouselElementValue<number>;
            }
            /**
            *The amount of space between each video section. 
            *Only applicable if `CarouselItemProps.video.sections` is given.
            **/
            sectionGap?: CarouselElementValue<number>;
            /**
            *The amount the progress bar scales on the Y axis when hovered
            *Default is `5`
            **/
            scaleAmount?: CarouselElementValue<number>
            /**
            *If true, the progress bar spans the entire width of the carousel itemViewer,
            *otherwise it only spans the inner width of the toolbar container.
            *Default is false
            **/
            shouldSpanContainerWidth?: CarouselElementValue<boolean>;
            /**
            *Height in px.  Default is 5px. Min is 1px and max is 13px.  
            *Any number given smaller than 1px will be set to 1px.
            *Any number given larger than 13px will be set to 13px.
            **/
            height?: CarouselElementValue<number>;
            seekColor?: CarouselElementValue<string>;
        } & CarouselColorOptions;
        /**
        *This changes all of the button colors as well as the text.  To change individual ones, use `styling.elements.buttonNameHere`
        **/
        elements?: CarouselElementSize & CarouselElementColor;
        /**
        *This overrides any value given in `toolbar.elements.color` above
        **/
        textColor?: CarouselElementValue<Color>;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
    /**
    *This is the the button that appears when changing play/pause state
    **/
    [CarouselSection.videoCurrentStateIndicator]?: {
        /**
        *The button to indicate that a video is paused
        **/
        pauseIcon?: CarouselElementCustomization;
        playIcon?: CarouselElementCustomization;
    } & Partial<CarouselColorOptions> & Partial<CarouselElementSize>;
    /**
    *This is the the modal that displays when a video is paused, allowing for more info about the video
    **/
    [CarouselSection.videoModal]?: {
        closeButton?: {
            fill?: CarouselElementValue<Color>;
        } & CarouselElementSize;
        /**
        *This is in px
        **/
        fontSize?: CarouselElementValue<number>;
        padding?: CarouselElementValue<CarouselVerticalPaddingOptions & CarouselHorizontalPaddingOptions>;
        textColor?: CarouselElementValue<Color>;
        /**
        *this is a percent of the item container width when the `itemDisplayLocation` is not `none`.  It has no effect otherwise.
        **/
        widthInPercent?: CarouselElementValue<number>;
    } & Partial<Pick<CarouselColorOptions, 'background'>>;
}

export type CarouselLayoutOptions = {
    /***
    *If `none`, then the item is only displayed when clicking a thumbnail.  It is then displayed in full-screen mode.
    *Otherwise the the item is displayed above or below the carousel.
    *Default is `none`.
    ***/
    itemDisplayLocation?: CarouselElementValueTuple<'none' | 'above' | 'below'>;
    /**
    *Default is false.  If true, the toolbar will sit within the video element when `itemDisplayLocation` is not `none` and 
    *the auto-hide behavior will change to hide the toolbar when the video is playing and the mouse leaves the video element.
    *Does not affect fullscreen mode.
    **/
    isToolbarPositionedInVideo?: CarouselElementValueTuple<boolean>;
    /**
    *Default is `left`
    *Overrides any value given in `thumbnail.itemSpacingStrategy`
    *@example
    *`left` => the left-most thumbnail item on a given page is positioned flush to the container
    *`center` => the left-most and right-most thumbnail on a given page are equi-distant from the navigation containers ends
    *`right` => the right-most thumbnail item on a given page is positioned flush to the container
    **/
    itemPositioning?: CarouselElementValueTuple<'left' | 'center' | 'right'>;
    /**
    *If true, then the default, embedded controls will be used for video items.
    *Default is false.
    *Only applicable when `itemDisplayLocation` is not `none` and the carousel is in non-fullscreen mode
    *Issue when in fullscreen mode and this is true where play/pause indicator and video modal don't appear anymore
    **/
    useDefaultVideoControls?: CarouselElementValueTuple<boolean>
}

export type CarouselSwipingOptions = {
    /**
    *If true, then swiping will be disabled.  For `navigation`, this means grabbing a thumbnail
    *and swiping will not change the page (non-fullscreen mode).  
    *For `itemViewer`, this means that grabbing and swiping will not change the currently viewing item (fullscreen mode).
    *Default is `true` when `layout.isToolbarPositionedInVideo` is `true` and not fullscreen otherwise default is `false`.
    *Swiping only occurs if mouseup and mousedown coordinate distances are greater than `maxClickThreshold`. 
    **/
    disableSwiping?: CarouselElementValueTuple<boolean>;
    /**
    *The max number of pixels that can be moved between mousedown and mouseup to still register a 'click' event.
    *This is used to prevent opening of an item when mousedown and mouseup targets are the same.
    *Higher values mean the user can move the cursor more and still open the item.
    *0 would mean if the user moved the cursor at all between mouseup and mousedown then the item would not open.
    *Default is 15 when swiping is enabled to allow for slight movement (swiping is disabled if only 1 page or `disableSwiping` is false).
    **/
    maxClickThreshold?: CarouselElementValueTuple<number>;
}

export type CarouselNavigationOptions = {
    /**
    *If true, the navigation automatically changes pages based on the current item being viewed.
    *Default is true.
    **/
    autoChangePage?: CarouselElementValue<boolean>;
    /**
    *When true, the carousel can not go from beginning to end directly.
    *When false, the right arrow button navigates to the first page when the `currentPage` is the final page
    *and the left arrow button navigates to the last page when the `currentPage` is the first page.
    *Default is false.
    *Only applicable when not in fullscreen mode.
    **/
    disableWrapping?: CarouselElementValueTuple<boolean>;
    /**
    *If true, the last page ends with the last item in the list otherwise there may be blank space after the last item.
    *Default is true.
    *Only applicable when not in fullscreen mode.
    **/
    isLastPageFlush?: CarouselElementValueTuple<boolean>;
} & CarouselSwipingOptions

export type CarouselNavigationProps = {
    currentPage: number;
    numberOfDots: number;
}

export type CarouselFontFamilyOptions = Exclusive<
    {
        /**
        *Setting the font-family for text in the item-viewer
        **/
        itemViewer?: CarouselElementValue<string>;
        /**
        *Setting the font-family for the navigation items and the carousel itself
        **/
        navigation?: CarouselElementValue<string>;
    },
    {
        /**
        *Setting this sets both itemViewer and navigation to the same font-family
        **/
        all?: CarouselElementValue<string>;
    }>

export type CarouselHorizontalPaddingOptions = {
    left?: CarouselElementValueTuple<number>;
    right?: CarouselElementValueTuple<number>;
}

export type CarouselVerticalPaddingOptions = {
    bottom?: CarouselElementValueTuple<number>;
    top?: CarouselElementValueTuple<number>;
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
//Any new additions here need to be added to `ToolbarActionLogic` as well
export type CarouselAction = {
    /**
    *Runs after the the action's default action has been executed.  
    *The 'play' field is called after pressing a shortcut for the play button or pressing the play button
    **/
    onActionCompleted?: CarouselActionOnActionCompleted;
} & Required<Pick<KeyboardShortcut, 'keys'>>
export type CarouselActionOnActionCompleted = () => void;

export type CarouselItemViewerActions = {
    /**
    *Additional shortcuts for closing the item-viewer (full-screen mode).  The `esc` key is a hard-coded value here.
    **/
    [CarouselElement.closeButton]?: CarouselAction;
    /**
    *Shortcuts for moving to the next item item in the item-viewer (full-screen mode).  Overrides defaults.
    **/
    [CarouselElement.nextButton]?: CarouselAction;
    /**
    *Shortcuts for pausing a video in the item-viewer (full-screen mode).  Overrides defaults.
    **/
    [CarouselElement.pauseButton]?: CarouselAction;
    /**
    *Shortcuts for playing a video in the item-viewer (full-screen mode).  Overrides defaults.
    **/
    [CarouselElement.playButton]?: CarouselAction;
    /**
    *Shortcuts for moving to the previous item item in the item-viewer (full-screen mode).  Overrides defaults.
    **/
    [CarouselElement.previousButton]?: CarouselAction;
    /**
    *Shortcuts for seeking a video backward in the item-viewer (full-screen mode).  Overrides defaults.
    **/
    [CarouselElement.seekBackButton]?: CarouselAction;
    /**
    *Shortcuts for seeking a video forward in the item-viewer (full-screen mode).  Overrides defaults.
    **/
    [CarouselElement.seekForwardButton]?: CarouselAction;
}

export type CarouselActions = {
    itemViewer?: CarouselItemViewerActions;
}
//#endregion

export type CarouselElementCustomization = {
    /**
    *Default is `#000`
    **/
    fillColor?: CarouselElementValue<Color>;
    /**
    *Href of the svg element
    **/
    svgHref?: CarouselElementValue<string>;
    /**
    *Styles passed directly to the underlying use element of the svg (for rotation purposes mainly).
    *It's best to make changes to the svg element directly though
    **/
    style?: CSSProperties;
}

export type CarouselElementStyles = {
    [button in CarouselElement]?: button extends CarouselElement.all ? Pick<CarouselElementCustomization, 'fillColor'> : CarouselElementCustomization;
}

/**
*Only applicable in fullscreen mode since thumbnails not visible otherwise
**/
export type CarouselThumbnailBackgroundOptions = {
    /**
    *Specify what you want the gradient to be for browswers that support it.  The gradient starts at the top and goes down by default (180deg angle)
    **/
    gradient?: {
        angle?: CarouselElementValueTuple<number>;
        end: CarouselThumbnailBackground;
        start: CarouselThumbnailBackground;
    }
    /**
    *The hexadecimal value for the thumbnail's fallback background
    **/
    solid?: CarouselThumbnailBackground;
}

/**
*Only applicable in fullscreen mode since thumbnails not visible otherwise
**/
export type CarouselThumbnailBackground = {
    /**
    *This is a hexadecimal color
    **/
    color?: CarouselElementValueTuple<Color>;
    /**
    *Valid values are 0-1 inclusive
    **/
    opacity?: CarouselElementValueTuple<number>;
}

/**
*Only applicable in fullscreen mode since thumbnails not visible otherwise
**/
export type CarouselThumbnailDescriptionOverlayOptions = {
    /**
    *Options to specify how the background looks.  You can specify a starting an ending linear gradient for browsers that support it.
    *As well as specifying a solid background color for those that don't
    **/
    background?: CarouselThumbnailBackgroundOptions;
    /**
    *If true the description is disabled in the thumbnail.  Default is false is `layout.itemDisplayLocation` is 'none' otherwise true.
    **/
    isDisabled?: CarouselElementValueTuple<boolean>;
    /**
    *The size of the font in px of the thumbnail description;  Default is 12px;
    **/
    fontSize?: CarouselElementValueTuple<number>;
    /**
    *If false, the overlay with the description is always present.  
    *If true, the overlay only shows when item is hovered.
    *No overlay is shown if `item.description` is falsy
    *Default is true
    **/
    hideDescriptionOverlayUnlessHovered?: CarouselElementValueTuple<boolean>;
    /**
    *The number of lines to show before an ellipsis is inserted.  Default is 2.
    **/
    maxLineCount?: CarouselElementValueTuple<number>;
    /**
    *The hexadecimal value for the thumbnail background's text
    **/
    textColor?: CarouselElementValueTuple<Color>;

}

/**
*Only applicable in fullscreen mode since thumbnails not visible otherwise
**/
export type CarouselThumbnailOptions = {
    /**
    *This is the border used to indicate which thumbnail is active when `layout.itemDisplayLocation` is not `none`.  
    *Must be in the CSS border property format (e.g. `1px solid #000`). https://developer.mozilla.org/en-US/docs/Web/CSS/border.
    *
    *Will use default if the value provided is deemed invalid.
    **/
    currentItemBorder?: CarouselElementValueTuple<CSSProperties['border']>;
    /**
    *This is the background and text that displays with the description text when hovering a thumbnail
    **/
    descriptionOverlay?: CarouselThumbnailDescriptionOverlayOptions;
    /**
    *The value in px that the thumbnails are spaced apart.  
    *If not given, the spacing dynamically adjusts to neatly fit as many items inside the container as possible
    **/
    itemSpacing?: CarouselElementValueTuple<number>;
    /**
    *Default is `min`
    *Determines how the thumbnails are spaced out if there is only one page and `itemSpacing` is not given (i.e. dynamic spacing is active)
    *`min` means that the `itemSpacing` will be reduced to a value that would allow for the most number of thumbnails to fit within the container with even spacing
    *`max` means that the `itemSpacing` will be maximized such that the thumbnails will span the entire width of the container when there is only one page
    *If `layout.itemPositioning` is given, then this value is ignored
    **/
    itemSpacingStrategy?: CarouselElementValueTuple<'min' | 'max'>;
    /**
    *The size of the thumbnails in px.  Default is 150px.
    **/
    size?: CarouselElementValueTuple<number>;
}

export type CarouselItemViewerPreviewTextOptions = {
    color?: CarouselElementValue<CSSProperties['color']>;
    fontFamily?: CarouselElementValue<CSSProperties['fontFamily']>;
} & CarouselElementSize;

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