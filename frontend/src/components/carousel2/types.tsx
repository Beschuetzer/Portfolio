/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSProperties, ElementType } from "react";
import { CarouselItemViewerShortcutIndicatorProps } from "./components/item-viewer/toolbar/CarouselItemViewerShortcutIndicator";
import { LoadingSpinnerProps } from "./components/LoadingSpinner";
import {
    CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT,
    MOBILE_PIXEL_WIDTH,
    CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT,
    CAROUSEL_ITEM_SIZE_DEFAULT,
    CAROUSEL_PADDING_DEFAULT,
    CAROUSEL_ITEM_SPACING_DEFAULT,
    AUTO_HIDE_DISABLED_VALUE,
    AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT,
    SEEK_AMOUNT_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_RADIUS_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_EMBEDDED,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_NOT_EMBEDDED,
    CAROUSEL_PROGRESS_BAR_SHOULD_SPAN_ENTIRE_WIDTH_DEFAULT,
    MAX_CLICK_THRESHOLD_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_IS_VISIBLE_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_OPACITY_DEFAULT,
    AUTO_CHANGE_PAGE_DEFAULT,
    DISABLE_WRAPPING_DEFAULT,
    IS_LAST_PAGE_FLUSH_DEFAULT,
    CAROUSEL_COLOR_ONE,
    CAROUSEL_COLOR_TWO,
    CAROUSEL_COLOR_THREE,
    CAROUSEL_COLOR_FOUR,
    CAROUSEL_COLOR_FIVE,
    CAROUSEL_COLOR_GREY_ONE,
    ITEM_VIEWER_CLOSE_SHORTCUTS,
    ITEM_VIEWER_PLAY_SHORTCUTS,
    ITEM_VIEWER_SEEK_BACKWARDS_SHORTCUTS,
    ITEM_VIEWER_SEEK_FORWARDS_SHORTCUTS,
    CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT,
    ITEM_VIEWER_NEXT_ITEM_SHORTCUTS,
    ITEM_VIEWER_PREVIOUS_ITEM_SHORTCUTS,
    THUMBNAIL_OVERLAY_IS_HIDDEN_DEFAULT,
    PROGRESS_BAR_SHOW_CURRENT_POSITION_ON_CHANGE_DEFAULT,
    CAROUSEL_OVERLAY_ITEM_PADDING_TOP,
    MODAL_TEXT_TAG_DEFAULT,
    MODAL_TITLE_TAG_DEFAULT,
    CAROUSEL_MAX_HEIGHT_DEFAULT,
    MODAL_MINIMIZE_ON_CLICK_DEFAULT,
    MODAL_MAINTAIN_MINIMIZED_STATE_DEFAULT,
} from './constants';
import { OptionsLogic } from './business-logic/OptionsLogic';
import { StylingLogic } from './business-logic/StylingLogic';
import { ToolbarActionsLogic } from './business-logic/ToolbarActionsLogic';
import { CarouselVideoOptions } from "./components/CarouselVideo";
import { CarouselItemViewer } from './components/item-viewer/CarouselItemViewer';
import { CarouselContent } from './components/CarouselContent';
import { CarouselItemProps } from './components/CarouselItem';
import { CarouselItemViewerToolbar } from './components/item-viewer/toolbar/CarouselItemViewerToolbar'
import { getCodeSections } from './utils/utils';


//#region Enums
export enum ArrowButtonDirection {
    next = 'next',
    previous = 'previous',
}

export enum CarouselElement {
    /**
    *Setting this will change all the items below.  Any {@link CarouselElementColor color} specified in a given section will override this value
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

export enum CarouselSection {
    container = 'container',
    itemViewer = 'itemViewer',
    itemViewerPreview = 'itemViewerPreview',
    modal = 'modal',
    navigation = 'navigation',
    toolbar = 'toolbar',
    videoCurrentStateIndicator = 'videoCurrentStateIndicator',
}

export enum CarouselVideoCurrentStateIndicatorButtonName {
    playIcon = 'playIcon',
    pauseIcon = 'pauseIcon',
}

export enum SpacingDirection {
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    top = 'top',
}
//#endregion

//#region Prop Types

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
    backgroundColor?: CarouselElementValue<string>;
    /**
    *For some elements this is the text color and for others it is the foreground color (e.g. progress bar)
    **/
    textOrForegroundColor?: CarouselElementValue<Color>;
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
     *A tuple where the first element is the size of the button in pixels, the second element is the breakpoint in pixels, and the third element is the breakpoint type (default is max-width)
     *`max-width` is equal to <= and `min-width` is equal to >= the 2nd element's number
     *Default 2nd element and 3rd element are positive infinity and `max-width`, so giving only a number will result in that size always being used.
     *Default when above the mobile {@link MOBILE_PIXEL_WIDTH breakpoint} is {@link CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT here} in pixels.
     *Otherwise {@link CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT here} in pixels.
    *@example
    *   [[18, 400, "max-width"]] => when window.innerWidth <= 400 then the button size is set to 18
    *   [[18, 400, "max-width"], [30, 1600, "min-width"]]` => when window.innerWidth <= 400 then the button size is set to 18, when window.innerWidth >= 1600 then button size is 30, otherwise button size is default value for any given viewport width.
    **/
    size?: CarouselElementValue<number>;
}
export type CarouselElementViewingMode<T> = {
    /**
    *These setting only apply when in fullscreen mode.  Otherwise default settings are used.
    **/
    fullscreen?: CarouselElementValueTuple<T>;
    /**
    *These setting only apply when not in fullscreen mode.  Otherwise default settings are used.
    *Elements only visible when {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none}, will not be affected by this unless {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is also set.
    **/
    nonFullscreen?: CarouselElementValueTuple<T>;
}
export type CarouselElementValue<T> = CarouselElementViewingMode<T> | CarouselElementValueTuple<T>;
export type CarouselElementValueTuple<T> = CarouselElementTuple<T> | T;
export type CarouselElementTuple<T> = [NonNullable<T> | undefined, number?, CarouselElementValueType?][];
export type CarouselItemViewerOptions = {
    /**
    *`auto` sets the aspectRatio based on the first item in carousel.
    *`widescreen` is 16:9 (9/16 => .5625).
    *`fullscreen` is 4:3 (i.e. 3/4 => .75).
    *To set the ratio to something else like 16:10, calculate the decimal value by taking the right number divided by the left number (e.g. 10/16)
    *The aspectRatio will then be calcuated with that decimal (e.g. width * decimal)
    *
    *The ratio can only be guaranteed if {@link CarouselLayoutOptions.maxHeight maxHeight} is not specified,
    *otherwise the itemViewer height may be reduced to meet the {@link CarouselLayoutOptions.maxHeight maxHeight} constraint.
    *
    * Setting this to the aspect ratio of you widest item in the carousel will yield the best results 
    *(this way the widest item will fit perfectly into the item viewer and less wide items will be full aspectRatio). 
    *Any other approach risks leaving vertical space between the viewer and the items in some cases
    *
    * `auto` is the second best option if you're unsure.
    *If the widest item is 1.85:1, then you would want to use 1/1.85 or ~0.54 as the `aspectRatio`.
    *
    *Default is {@link OptionsLogic.itemViewerAspectRatio here}.
    *
    *Note: Using this option will disabled {@link CarouselItemViewerOptions.useRecommendedAspectRatio} (not recommended).
    **/
    aspectRatio?: 'auto' | number | CarouselItemViewerAspectRatioPreset;
    /**
    *If this is falsy or <= {@link AUTO_HIDE_DISABLED_VALUE default} then auto-hiding of the toolbar is disabled for videos.
    *Otherwise, auto-hide occurs when there is no mouse input for this amount of time in milliseconds.  
    *Only applies when in fullscreen mode or the toolbar is embedded in non-fullscreen mode.
    *Default is {@link AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT here} in milliseconds.
    **/
    autoHideToolbarDuration?: CarouselElementValueTuple<number>;
    /**
    *How for forward/backward the seek buttons move a video.  
    *Default is {@link SEEK_AMOUNT_DEFAULT here} in milliseconds.
    *Only applies when in fullscreen mode
    **/
    seekAmount?: CarouselElementValue<number>;
    /**
    *If `true`, the item container height is calculated based on the lowest aspect ratio of the items given
    *(for images the {@link CarouselItemProps.srcMain srcMain} is used, for videos {@link CarouselItemProps.srcThumbnail srcThumbnail} is used). 
    *
    *If `false`, the {@link CarouselItemViewerOptions.aspectRatio aspectRatio} defaults to `auto` instead of {@link CarouselItemViewerAspectRatioPreset.widescreen widescreen}.
    *
    *For this to work properly with videos, the aspect ratio of the video's thumbnail should be the same as that of the video.
    *If {@link CarouselItemViewerOptions.aspectRatio} is given, this defaults to `false` otherwise `true`.
    **/
    useRecommendedAspectRatio?: CarouselElementValue<boolean>;
} & CarouselSwipingOptions

export type CarouselItemViewerAspectRatioPreset = 'widescreen' | 'fullscreen';

export type CarouselImagePosition = 'bottom' | 'center' | 'top';
export type CarouselItemDisplayLocation = 'none' | 'above' | 'below';
export type CarouselItemThumbnailPositioning = 'left' | 'center' | 'right';

export type CarouselItemViewerButtonProps = {
    onClick?: () => void;
    // options?: CarouselOptions;
} & Partial<Omit<CarouselItemViewerShortcutIndicatorProps, 'children' | 'shortcuts'>>

export type CarouselSections = {
    [CarouselSection.container]?: CarouselSectionsContainer;
    /**
    *This is the container in which the currently viewing item sits.
    **/
    [CarouselSection.itemViewer]?: CarouselSectionsItemViewer;
    /**
    *This is the popup that you see when you hover over the next/previous buttons when in fullscreen mode.
    *This element is only visible in fullscreen mode by default
    **/
    [CarouselSection.itemViewerPreview]?: CarouselSectionsItemViewerPreview;
    /**
    *This is the the modal that displays when an item is paused, allowing for more info about the item.
    **/
    [CarouselSection.modal]?: CarouselSectionsModal;
    /**
    *This is the where the dots, arrows, and thumbnails sit.
    **/
    [CarouselSection.navigation]?: CarouselSectionsNavigation;
    /**
    *This is where the buttons, progress bar, and item description sit.
    **/
    [CarouselSection.toolbar]?: CarouselSectionsToolbar;
    /**
    *This is the the button that appears when changing play/pause state.
    **/
    [CarouselSection.videoCurrentStateIndicator]?: CarouselSectionsVideoCurrentStateIndicator;
}

export type CarouselSectionsContainer = {
    padding?: CarouselVerticalPaddingOptions & CarouselHorizontalPaddingOptions;
    margin?: CarouselVerticalMarginOptions & CarouselHorizontalMarginOptions;
} & Partial<Pick<CarouselColorOptions, 'backgroundColor'>>;
export type CarouselSectionsItemViewer = {
    loadingSpinner?: Partial<Omit<LoadingSpinnerProps, 'description' | 'show'>>;
    padding?: CarouselHorizontalPaddingOptions;
} & Partial<Pick<CarouselColorOptions, 'backgroundColor'>>;
export type CarouselSectionsItemViewerPreview = {
    /**
    *Will use default {@link OptionsLogic.theme colorFive} {@link CAROUSEL_COLOR_FIVE value}, if the value provided is deemed invalid.
    **/
    border?: CarouselElementValue<CSSProperties['border']>;
    /**
    *Default is {@link CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_RADIUS_DEFAULT here} in pixels.
    **/
    borderRadius?: CarouselElementValue<CSSProperties['borderRadius']>;
    /**
    *Height in pixels.  If left blank, then it is half of the width.
    *Default would be ({@link CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT this} / 2) in pixels.
    **/
    height?: CarouselElementValue<number>;
    image?: {
        fit?: CarouselElementValue<CSSProperties['objectFit']>
        position?: CarouselElementValue<CSSProperties['objectPosition']>;
    }
    /**
    *Default is {@link CAROUSEL_ITEM_VIEWER_PREVIEW_IS_VISIBLE_DEFAULT here}.
    **/
    isVisibleInNonFullscreenMode?: CarouselElementValueTuple<boolean>;
    /**
    *The opacity of the background.
    *Default is {@link CAROUSEL_ITEM_VIEWER_PREVIEW_OPACITY_DEFAULT here}.
    **/
    opacity?: CarouselElementValue<CSSProperties['opacity']>
    /**
    *This changes which side the image and text are on.
    *Default is image on left and text on right.
    **/
    swapImageAndText?: CarouselElementValue<boolean>
    text?: {
        /**
        *These affect only the text body.
        **/
        body?: CarouselItemViewerPreviewTextOptions;
        /**
        *These affect the layout of the entire text block.
        **/
        container?: {
            padding?: CarouselElementValue<CarouselHorizontalPaddingOptions & CarouselVerticalPaddingOptions>;
            verticalAlignment?: CarouselElementValue<CSSProperties['alignItems']>
        }
        /**
        *The header text displaying the action and its shortcuts.
        **/
        header?: CarouselItemViewerPreviewTextOptions;
    };
    /**
    *Width of the item viewer in pixels. 
    *Default is {@link CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT here}.
    **/
    width?: CarouselElementValue<number>;
} & Partial<Pick<CarouselColorOptions, 'backgroundColor'>>;
export type CarouselSectionsModal = {
    closeButton?: {
        fill?: CarouselElementValue<Color>;
    } & CarouselElementSize;
    /**
    *This is in pixels
    **/
    fontSize?: CarouselElementValue<number>;
    /**
    *The opacity of modals when they are minimized.  Valid values are 0 <= x <= 1.
    **/
    opacityWhenMinimized?: CarouselElementValue<number>;
    padding?: CarouselElementValue<CarouselVerticalPaddingOptions & CarouselHorizontalPaddingOptions>;
    textColor?: CarouselElementValue<Color>;
    /**
    *this is a percent of the item container width when the {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none}.  
    *It has no effect otherwise.
    *Default is {@link OptionsLogic.modalWidth here}.
    **/
    widthInPercent?: CarouselElementValue<number>;
} & Partial<Pick<CarouselColorOptions, 'backgroundColor'>>;
export type CarouselSectionsNavigation = {
    /**
    *This changes the dots and arrows
    **/
    elements?: CarouselElementSize & CarouselElementColor;
    padding?: CarouselHorizontalPaddingOptions;
} & Partial<Pick<CarouselColorOptions, 'backgroundColor'>>;
export type CarouselSectionsToolbar = {
    /**
    This sets the padding for the {@link CarouselItemViewerToolbar toolbar} in pixels.  When {@link CarouselLayoutOptions.isToolbarPositionedInVideo isToolbarPositionedInVideo} is `true` (default), the default is {@link CAROUSEL_PADDING_DEFAULT this}, otherwise it is {@link CAROUSEL_ITEM_SPACING_DEFAULT this} in pixels for left and right. 
    **/
    padding?: CarouselElementValue<CarouselHorizontalPaddingOptions & CarouselVerticalPaddingOptions>;
    progressBar?: CarouselProgressBar;
    /**
    *This changes all of the button colors as well as the text.  To change individual ones, use {@link CarouselStylingOptions.elements element stylings}.
    **/
    elements?: CarouselElementSize & CarouselElementColor;
    /**
    *This is the popup that displays when hovering a button in the {@link CarouselItemViewerToolbar toolbar}.
    **/
    shortcutIndicator?: CarouselColorOptions;
    /**
    *This overrides any value given in {@link CarouselSectionsToolbar.elements toolbar.elements.color}.
    *See logic {@link OptionsLogic.toolbarTextColor here}.
    **/
    textColor?: CarouselElementValue<Color>;
} & Partial<Pick<CarouselColorOptions, 'backgroundColor'>>;
export type CarouselSectionsVideoCurrentStateIndicator = {
    /**
    *The button to indicate that a video is paused.
    **/
    [CarouselVideoCurrentStateIndicatorButtonName.pauseIcon]?: CarouselElementCustomization;
    [CarouselVideoCurrentStateIndicatorButtonName.playIcon]?: CarouselElementCustomization;
} & Partial<CarouselColorOptions> & Partial<CarouselElementSize>;

/**
*This is only relevant to video items
**/
export type CarouselProgressBar = {
    /**
    *This is the dot at the end of the progress bar, which is only visible on when hovering the progress bar.  
    *Defaults for these are {@link OptionsLogic.videoProgressBarDotSettings here}.
    **/
    dot?: CarouselProgressBarDot;
    /**
    *The amount of space above the actual progress bar that counts as the a registered hover event.
    *Defaults can be found {@link OptionsLogic.videoProgressBarHitSlop here}.
    **/
    hitSlop?: {
        top?: number;
        bottom?: number;
    }
    /**
    *This is the popup that shows a screenshot of the video at a given time (on hover/seek)
    **/
    screenshotViewer?: {
        /**
        *Width of the thumbnail in pixels.  
        *Default is {@link CAROUSEL_ITEM_SIZE_DEFAULT} pixels.  
        *Height is `.5625 * thisValue` to maintain a 16:9 aspect ratio ({@link OptionsLogic.videoProgressBarScreenshotViewer details})
        **/
        thumbnailWidth?: number;
    } & Pick<CarouselColorOptions, 'textOrForegroundColor'>
    /**
    *The amount of space between each video section. 
    *Only applicable if the length of {@link CarouselVideoOptions.sections sections} is > 1.
    **/
    sectionGap?: CarouselElementValue<number>;
    /**
    *The amount the progress bar scales on the Y axis when hovered.
    *Default is {@link OptionsLogic.videoProgressBarScaleAmount here}.
    **/
    scaleAmount?: CarouselElementValue<number>
    /**
    *If true, the progress bar spans the entire width of the carousel itemViewer,
    *otherwise it only spans the inner width of the toolbar container.
    *Default is {@link CAROUSEL_PROGRESS_BAR_SHOULD_SPAN_ENTIRE_WIDTH_DEFAULT here}.
    **/
    shouldSpanContainerWidth?: CarouselElementValue<boolean>;
    /**
    *If `true`, there will be an indicator showing the position of the video before the progress bar change occurred.
    *Default is {@link PROGRESS_BAR_SHOW_CURRENT_POSITION_ON_CHANGE_DEFAULT here}.
    **/
    showCurrentPositionOnChange?: CarouselElementValue<boolean>;
    /**
    *Height in pixels.  
    *Default is {@link CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_EMBEDDED this} when embedded otherwise {@link CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_NOT_EMBEDDED this}.
    *See logic {@link OptionsLogic.videoProgressBarHeight here}.
    **/
    height?: CarouselElementValue<number>;
    seekColor?: CarouselElementValue<string>;
} & CarouselColorOptions;

export type CarouselProgressBarDot = {
    /**
     * Default is {@link OptionsLogic.videoProgressBarDotSettings here}.
    **/
    diameter?: CarouselElementValue<number>;
    /**
     * Whether the dot is always visible for the progress bar.
     * Default is {@link OptionsLogic.videoProgressBarDotSettings here}.
    **/
    isAlwaysVisible?: CarouselElementValue<boolean>;
    /**
     *The amount of time (in seconds) it takes to show the dot on hovering of the progress bar.
     *Default is {{@link OptionsLogic.videoProgressBarDotSettings here}.
     *Only applicable if {@link CarouselProgressBarDot.isAlwaysVisible isAlwaysVisible} is `false`.
    **/
    transitionDuration?: CarouselElementValue<number>;
}

export type CarouselLayoutOptions = {
    /***
    *If `none`, then the item is only displayed when clicking a thumbnail.  It is then displayed in fullscreen mode.
    *Otherwise the the item is displayed above or below the carousel and viewing the item in fullscreen mode requires pressing the fullscreen button when the item is selected.
    *Default is `none`.
    ***/
    itemDisplayLocation?: CarouselElementValueTuple<CarouselItemDisplayLocation>;
    /**
     *If `true`, the toolbar will sit within the video element when {@link CarouselLayoutOptions.itemDisplayLocation} is not {@link CarouselItemDisplayLocation none} and 
     *the auto-hide behavior will change to hide the toolbar when the video is playing and the mouse leaves the video element.
     *Default is `true` if not mobile otherwise `false`.  
     *Does not affect fullscreen mode.
    **/
    isToolbarPositionedInVideo?: CarouselElementValueTuple<boolean>;
    /**
    *It is not advised to use this option if it can be avoided.
    *This will limit the maximum height of the entire carousel.
    *
    *Since the height of the itemViewer is calculated based on the items, specifying a value here may reduce the itemViewer size
    *and a sub-optimal {@link CarouselItemViewerOptions.aspectRatio aspectRatio} may be used.
    *
    * If the {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is {@link CarouselItemDisplayLocation none}, 
    *the {@link CarouselThumbnailOptions.size thumbnailSize} will be reduced if need be.  
    *Otherwise the height of the {@link CarouselItemViewer} will be reduced and the thumbnail size will be maintained.
    *
    *Note:  Only applies when in non-fullscreen mode.
    *
    *Note:  If {@link CarouselItemViewerOptions.aspectRatio} is set to `auto`, this setting is ignored 
    *when {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none}.
    *
    *Default is {@link CAROUSEL_MAX_HEIGHT_DEFAULT here}.
    **/
    maxHeight?: CarouselElementValue<number>;
    /**
    *Overrides any value given in {@link CarouselThumbnailOptions.spacingStrategy spacingStrategy}.
    *
    *Default is {@link CarouselItemThumbnailPositioning left}.
    *@example
    *`left` => the left-most thumbnail item on a given page is positioned flush to the container
    *`center` => the left-most and right-most thumbnail on a given page are equi-distant from the navigation containers ends
    *`right` => the right-most thumbnail item on a given page is positioned flush to the container
    **/
    thumbnailPositioning?: CarouselElementValueTuple<CarouselItemThumbnailPositioning>;
    /**
    *If true, then the default, embedded controls will be used for video items.
    *Only applicable when {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none} 
    *and the carousel is in non-fullscreen mode.
    *Issue when in fullscreen mode and this is true where play/pause indicator and modal don't appear anymore.
    *Default is {@link OptionsLogic.useDefaultVideoControls here}.
    **/
    useDefaultVideoControls?: CarouselElementValueTuple<boolean>
}

export type CarouselSwipingOptions = {
    /**
    *If `true`, then swiping will be disabled.  For {@link CarouselSections.navigation navigation}, this means grabbing a thumbnail
    *and swiping will not change the page (non-fullscreen mode).  
    *For {@link CarouselSections.itemViewer itemViewer}, this means that grabbing and swiping will not change the currently viewing item (fullscreen mode only).
    *Swiping only occurs if mouseup and mousedown coordinate distances are greater than {@link CarouselSwipingOptions.maxClickThreshold maxClickThreshold}. 
    *Default is `true` when {@link CarouselLayoutOptions.isToolbarPositionedInVideo isToolbarPositionedInVideo} is `true` and not fullscreen, otherwise default is `false`.
    *See {@link OptionsLogic.isItemViewerSwipingDisabled ItemViewer Logic} and {@link OptionsLogic.isNavigationSwipingDisabled Navigation Logic}. 
    **/
    disableSwiping?: CarouselElementValueTuple<boolean>;
    /**
    *The max number of pixels that can be moved between mousedown and mouseup to still register a 'click' event.
    *This is used to prevent opening of an item when mousedown and mouseup targets are the same.
    *Higher values mean the user can move the cursor more and still open the item.
    *0 would mean if the user moved the cursor at all between mouseup and mousedown then the item would not open.
    *Default is {@link MAX_CLICK_THRESHOLD_DEFAULT this} when swiping is enabled to allow for slight movement 
    *(swiping is disabled if only 1 page, {@link CarouselSwipingOptions.disableSwiping disableSwiping} is `false`, or in non-fullscreen mode).
    **/
    maxClickThreshold?: CarouselElementValueTuple<number>;
}

export type CarouselModalOptions = {
    /**
    *Allows you to specify whether clicking anywhere in modal will minimize it.  
    *The default is {@link MODAL_MINIMIZE_ON_CLICK_DEFAULT here}.
    **/
    minimizeOnClick?: CarouselElementValue<boolean>;
    /**
    *When `true`, minimizing the modal for one item will cause it top be minimized when changing items.
    *Default is {@link MODAL_MAINTAIN_MINIMIZED_STATE_DEFAULT here}.
    **/
    maintainMinimizedStateAcrossItems?: CarouselElementValue<boolean>;
}

export type CarouselNavigationOptions = {
    /**
    *If `true`, the {@link CarouselContent navigation} automatically changes pages based on the current item being viewed.
    *Default is {@link AUTO_CHANGE_PAGE_DEFAULT this}.
    **/
    autoChangePage?: CarouselElementValue<boolean>;
    /**
    *When `true`, the carousel {@link CarouselContent navigation} can not go from beginning to end directly.
    *When `false`, the right arrow button navigates to the first page when the {@link CarouselNavigationProps.currentPage currentPage} is the final page
    *and the left arrow button navigates to the last page when the {@link CarouselNavigationProps.currentPage currentPage} is the first page.
    *Only applicable when not in fullscreen mode.
    *Default is {@link DISABLE_WRAPPING_DEFAULT this}.
    **/
    disableWrapping?: CarouselElementValueTuple<boolean>;
    /**
    *If `true`, the last page ends with the last item in the list otherwise there may be blank space after the last item.
    *Only applicable when not in fullscreen mode.
    *Default is {@link IS_LAST_PAGE_FLUSH_DEFAULT this}.
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
        *Setting the font-family for text in the {@link CarouselItemViewer itemViewer}
        **/
        itemViewer?: CarouselElementValue<string>;
        /**
        *Setting the font-family for the {@link CarouselContent navigation} items and the carousel itself
        **/
        navigation?: CarouselElementValue<string>;
    },
    {
        /**
        *Setting this sets both {@link CarouselItemViewer itemViewer} and {@link CarouselContent navigation} to the same font-family
        **/
        all?: CarouselElementValue<string>;
    }>

export type CarouselHorizontalPaddingOptions = {
    [SpacingDirection.left]?: CarouselElementValueTuple<CSSProperties['padding']>;
    [SpacingDirection.right]?: CarouselElementValueTuple<CSSProperties['padding']>;
}

export type CarouselVerticalPaddingOptions = {
    [SpacingDirection.bottom]?: CarouselElementValueTuple<CSSProperties['padding']>;
    [SpacingDirection.top]?: CarouselElementValueTuple<CSSProperties['padding']>;
}

export type CarouselHorizontalMarginOptions = {
    [SpacingDirection.left]?: CarouselElementValueTuple<CSSProperties['margin']>;
    [SpacingDirection.right]?: CarouselElementValueTuple<CSSProperties['margin']>;
}

export type CarouselVerticalMarginOptions = {
    [SpacingDirection.bottom]?: CarouselElementValueTuple<CSSProperties['margin']>;
    [SpacingDirection.top]?: CarouselElementValueTuple<CSSProperties['margin']>;
}

export type CarouselStylingOptions = {
    /**
    *Adjust individual element colors, styles, and svgHrefs
    **/
    elements?: CarouselElementStyles;
    /**
    *Change the font either for the entire Carousel or by section
    **/
    fontFamily?: CarouselFontFamilyOptions;
    /**
    *Adjust the color values of the entire Carousel in one fell swoop.
    **/
    colorTheme?: CarouselColorTheme;
} & CarouselSections;

export type CarouselOptions = {
    container?: CarouselTitleOptions;
    itemViewer?: CarouselItemViewerOptions;
    layout?: CarouselLayoutOptions;
    modal?: CarouselModalOptions;
    navigation?: CarouselNavigationOptions;
    shortcuts?: CarouselActions;
    styling?: CarouselStylingOptions;
    thumbnail?: CarouselThumbnailOptions;
}

export type CarouselTitleOptions = {
    /**
    *When {@link CarouselTitleOptions.text text} is truthy, a text element is displayed above the carousel using the element specified in {@link CarouselTitleOptions.tag tag}.
    *Use {@link CarouselTitleOptions.style style} to change the styling of the surrounding `div`.
    **/
    text?: string;
    /**
    *This is passed to the text element.
    **/
    textStyle?: CSSProperties;
    /**
    *This is the tag to use for the text element
    **/
    tag?: ElementType;
    /**
    *This is passed to the div surrounding everything if {@link CarouselTitleOptions.text text} is truthy.
    **/
    style?: CSSProperties;
}

export type CarouselColorTheme = {
    /**
    *This is the darkest color in the default theme.  
    Default is {@link CAROUSEL_COLOR_ONE this}.
    **/
    colorOne?: CarouselElementValue<Color>;
    /**
    *Default is  {@link CAROUSEL_COLOR_TWO this}.
    **/
    colorTwo?: CarouselElementValue<Color>;
    /**
    *Default is  {@link CAROUSEL_COLOR_THREE this}.
    **/
    colorThree?: CarouselElementValue<Color>;
    /**
    *Default is  {@link CAROUSEL_COLOR_FOUR this}.
    **/
    colorFour?: CarouselElementValue<Color>;
    /**
    *This is the lightest color in default theme
    *Default is  {@link CAROUSEL_COLOR_FIVE this}.
    **/
    colorFive?: CarouselElementValue<Color>;
    /**
    *Default is {@link CAROUSEL_COLOR_GREY_ONE this}.
    **/
    colorGreyOne?: CarouselElementValue<Color>;
}

//#region Actions
/**
* Any new additions here need to be added to {@link ToolbarActionsLogic} as well
**/
export type CarouselAction = {
    /**
    *Runs after the the action's default action has been executed.  
    **/
    onActionCompleted?: CarouselActionOnActionCompleted;
} & Required<Pick<KeyboardShortcut, 'keys'>>
export type CarouselActionOnActionCompleted = () => void;

export type CarouselItemViewerActions = {
    /**
    *Additional shortcuts for closing the item-viewer (fullscreen mode).  The `esc` key is a hard-coded value here.
    *Default is {@link ITEM_VIEWER_CLOSE_SHORTCUTS this}.
    **/
    [CarouselElement.closeButton]?: CarouselAction;
    /**
    *Shortcuts for moving to the next item item in the item-viewer (fullscreen mode).  Overrides defaults.
    *Default is {@link ITEM_VIEWER_NEXT_ITEM_SHORTCUTS this}.
    **/
    [CarouselElement.nextButton]?: CarouselAction;
    /**
    *Shortcuts for pausing a video in the item-viewer (fullscreen mode).  Overrides defaults.
    *Default is the same as {@link ITEM_VIEWER_PLAY_SHORTCUTS play} button.
    **/
    [CarouselElement.pauseButton]?: CarouselAction;
    /**
    *Shortcuts for playing a video in the item-viewer (fullscreen mode).  Overrides defaults.
    *Default is {@link ITEM_VIEWER_PLAY_SHORTCUTS this}.
    **/
    [CarouselElement.playButton]?: CarouselAction;
    /**
    *Shortcuts for moving to the previous item item in the item-viewer (fullscreen mode).  Overrides defaults.
    *Default is {@link ITEM_VIEWER_PREVIOUS_ITEM_SHORTCUTS this}.
    **/
    [CarouselElement.previousButton]?: CarouselAction;
    /**
    *Shortcuts for seeking a video backward in the item-viewer (fullscreen mode).  Overrides defaults.
    *Default is {@link ITEM_VIEWER_SEEK_BACKWARDS_SHORTCUTS this}.
    **/
    [CarouselElement.seekBackButton]?: CarouselAction;
    /**
    *Shortcuts for seeking a video forward in the item-viewer (fullscreen mode).  Overrides defaults.
    *Default is {@link ITEM_VIEWER_SEEK_FORWARDS_SHORTCUTS this}.
    **/
    [CarouselElement.seekForwardButton]?: CarouselAction;
}

/**
*The available actions broken down by each section.  
**/
export type CarouselActions = {
    [CarouselSection.itemViewer]: CarouselItemViewerActions;
}
//#endregion

export type CarouselElementCustomization = {
    /**
    *The color to use for a given element in the carousel.
    **/
    fillColor?: CarouselElementValue<Color>;
    /**
    *Href of the svg element.
    **/
    svgHref?: CarouselElementValue<string>;
    /**
    *Styles passed directly to the underlying use element of the svg (for rotation purposes mainly).
    *It's best to make changes to the svg element directly though.
    **/
    style?: CSSProperties;
}

/**
*Creating available options for each element.
**/
export type CarouselElementStyles = {
    [button in CarouselElement]?: button extends CarouselElement.all ? Pick<CarouselElementCustomization, 'fillColor'> : CarouselElementCustomization;
}

/**
*Only applicable in fullscreen mode since thumbnails not visible otherwise
**/
export type CarouselThumbnailBackgroundOptions = {
    /**
    *Specify what you want the gradient to be for browswers that support it.  
    *The gradient starts at the top and goes down by default (180deg angle).
    *Default is {@link OptionsLogic.thumbnailOverlayBackgroundGradient this}.
    **/
    gradient?: {
        angle?: CarouselElementValueTuple<number>;
        end: CarouselThumbnailBackground;
        start: CarouselThumbnailBackground;
    }
    /**
    *The hexadecimal value for the thumbnail's fallback background.
    *Default is {@link OptionsLogic.thumbnailOverlayBackgroundSolid this}.
    **/
    solid?: CarouselThumbnailBackground;
}

/**
*Only applicable in fullscreen mode since thumbnails not visible otherwise
**/
export type CarouselThumbnailBackground = {
    /**
    *This is a hexadecimal color value.
    **/
    color?: CarouselElementValueTuple<Color>;
    /**
    *Valid values are 0-1 inclusive.
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
    *If true the description is disabled in the thumbnail.  
    *Default is `false` is {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is {@link CarouselItemDisplayLocation none}} otherwise `true`.
    *Default is {@link OptionsLogic.thumbnailOverlayIsDisabled this}.
    **/
    isDisabled?: CarouselElementValueTuple<boolean>;
    /**
    *The size of the font in pixels of the thumbnail description;  Default logic is {@link OptionsLogic.thumbnailOverlayText here}.
    **/
    fontSize?: CarouselElementValueTuple<number>;
    /**
    *If `false`, the overlay with the description is always present.  
    *If `true`, the overlay only shows when item is hovered.
    *No overlay is shown if the item's {@link CarouselItemProps.description description} is falsy.
    *Default is {@link THUMBNAIL_OVERLAY_IS_HIDDEN_DEFAULT this}.
    **/
    hideDescriptionOverlayUnlessHovered?: CarouselElementValueTuple<boolean>;
    /**
    *The number of lines to show before an ellipsis is inserted. 
    *Default is {@link CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT this}.
    **/
    maxLineCount?: CarouselElementValueTuple<number>;
    /**
    *The hexadecimal value for the thumbnail background's text.
    *Default is the theme's {@link CAROUSEL_COLOR_FIVE colorFive} value.
    **/
    textColor?: CarouselElementValueTuple<Color>;

}

/**
*Only applicable in fullscreen mode since thumbnails not visible otherwise
**/
export type CarouselThumbnailOptions = {
    /**
    *This is the border used to indicate which thumbnail is active when {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none}}.  
    *Must be in the CSS border property format (e.g. `1px solid #000`). https://developer.mozilla.org/en-US/docs/Web/CSS/border.
    *Will use {@link StylingLogic.getBorderStringToUse default} if the value provided is deemed invalid.
    **/
    currentItemBorder?: CarouselElementValueTuple<CSSProperties['border']>;
    /**
    *This is the background and text that displays with the description text when hovering a thumbnail.
    **/
    descriptionOverlay?: CarouselThumbnailDescriptionOverlayOptions;
    /**
    *The size of the thumbnails in pixels.  
    *Default logic is {@link OptionsLogic.thumbnailSize here}.
    **/
    size?: CarouselElementValueTuple<number>;
    /**
    *The value in pixels that the thumbnails are spaced apart.  
    *If not given, the spacing dynamically adjusts to neatly fit as many items inside the container as possible.
    **/
    spacing?: CarouselElementValueTuple<number>;
    /**
    *Default is `min`.
    *Determines how the thumbnails are spaced out if there is only one page and {@link CarouselThumbnailOptions.spacing spacing} is not given (i.e. dynamic spacing is active).
    *`min` means that the {@link CarouselThumbnailOptions.spacing spacing} will be reduced to a value that would allow for the most number of thumbnails to fit within the container with even spacing.
    *`max` means that the {@link CarouselThumbnailOptions.spacing spacing} will be maximized such that the thumbnails will span the entire width of the container when there is only one page.
    *If {@link CarouselLayoutOptions.thumbnailPositioning thumbnailPositioning} is given, then this value is ignored.
    **/
    spacingStrategy?: CarouselElementValueTuple<'min' | 'max'>;
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

//#region Modal
export type CarouselModalSectionProps = Exclusive<{
    /**
    *Use this to specify what the text tag should be.  Default is a {@link MODAL_TEXT_TAG_DEFAULT here}.
    **/
    textElementType?: ElementType;
    /**
    * This only shows when the video is paused and is an `<h3>` tag under the hood.
    **/
    title?: string | undefined;
    /**
    *Use this to specify what the title tag should be.  Default is a {@link MODAL_TITLE_TAG_DEFAULT here}.
    **/
    titleElementType?: ElementType;
    /**
    * This only shows when the video is paused and is a `<p>` tag under the hood.
    **/
    text?: string | undefined;
    /**
    *These styles are passed into the div that makes up the paragraph.  
    *By default, the padding is set to {@link CAROUSEL_OVERLAY_ITEM_PADDING_TOP this}.
    **/
    textContainerStyles?: CSSProperties;
    /**
    *These styles are passed into the div that makes up the paragraph.  
    *By default, the padding is set to {@link CAROUSEL_OVERLAY_ITEM_PADDING_TOP this}.
    **/
    textStyles?: CSSProperties;
}, {
    /**
    *This is mutually exclusive with the other options and overrides then if given.
    *Use this if you want to specify a coding block.
    *The number of spaces at the beginning of each string corresponds to the number of tabs (see {@link getCodeSections this} for details).
    @example
    codeSection: {
        texts: [
           `itemStyles: {`,
            ` // these styles only apply when not in fullscreen mode`, => has one space at front so one tab
            ` nonFullscreen: {`,
            `  objectFit: 'cover',`, => has two spaces at front so two tabs
            `  objectPosition: 'top',`,
            ` },`,
            ` // these styles only apply when in fullscreen mode`,
            ` fullscreen: {`,
            `  objectFit: 'scale-down',`,
            `  objectPosition: 'left',`,
            ` }`,
            `}`,
        ],
        marginTop: 5,
        startTabCount: 0,
    }
    **/
    codeSection: CarouselModalGetCodeSectionsInput;
}>

export type CarouselModalGetCodeSectionsInput = {
    /**
    *The lines
    *Each space at the beginning of the string in {@link CarouselModalGetCodeSectionsInput.lines texts} specifies how many tabs to use.
    **/
    lines: CarouselModalGetCodeSectionInput['text'][];
    startTabCount?: number;
} & Pick<CarouselModalGetCodeSectionInput, 'tabSpacing' | 'marginTop'>

export type CarouselModalGetCodeSectionInput = {
    text: string;
    marginTop?: number;
    tabCount?: number;
    tabSpacing?: number;
    isComment?: boolean;
}
//#endregion

//#region Keyboard Shortcuts
export enum ModifierKey {
    ctrl = 'ctrl',
    alt = 'alt',
    shift = 'shift',

}
export enum ValidKey {
    a = 'a',
    b = 'b',
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    h = 'h',
    i = 'i',
    j = 'j',
    k = 'k',
    l = 'l',
    m = 'm',
    n = 'n',
    o = 'o',
    p = 'p',
    q = 'q',
    r = 'r',
    s = 's',
    t = 't',
    u = 'u',
    v = 'v',
    w = 'w',
    x = 'x',
    y = 'y',
    z = 'z',
    arrowLeft = 'arrowLeft',
    arrowUp = 'arrowUp',
    arrowDown = 'arrowDown',
    arrowRight = 'arrowRight',
    escape = 'escape',
    spacebar = ' ',
}
export type KeyCombination = [ModifierKey, ValidKey];
export type KeyInput = ValidKey | KeyCombination;
export type KeyboardShortcut = {
    /**
    *This is what happens when you press any one of the key/key combinations specified in the {@link KeyboardShortcut.keys keys} field.
    **/
    action: () => void;
    /**
    *An example of a multi-key shortcut: `[ValidKey.a, [ModifierKey.shift, ValidKey.arrowDown]]`.
    *The first is a {@link ValidKey} and the second a {@link KeyCombination}
    **/
    keys: KeyInput[];
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