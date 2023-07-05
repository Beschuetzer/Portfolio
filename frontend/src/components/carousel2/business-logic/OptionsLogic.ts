import { CarouselItemProps } from "../components/CarouselItem";
import {
    CAROUSEL_COLOR_FIVE,
    CAROUSEL_COLOR_GREY_ONE,
    CAROUSEL_COLOR_ONE,
    CAROUSEL_ITEM_SIZE_DEFAULT,
    CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_SPACING_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_RADIUS_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_FIT_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_NO_SWAP_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_SWAP_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_IS_VISIBLE_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_OPACITY_DEFAULT, CAROUSEL_ITEM_VIEWER_PREVIEW_SWAP_IMAGE_AND_TEXT_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_FONT_FAMILY_DEFAULT,
    CAROUSEL_PADDING_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_SIZE_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_VERTICAL_ALIGNMENT_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT,
    MAX_CLICK_THRESHOLD_DEFAULT, SEEK_AMOUNT_DEFAULT,
    CAROUSEL_VIDEO_MODAL_PADDING_DEFAULT,
    CAROUSEL_COLOR_THREE,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_EMBEDDED,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_NOT_EMBEDDED,
    CAROUSEL_PROGRESS_BAR_DOT_DIAMETER,
    CAROUSEL_PROGRESS_BAR_DOT_IS_ALWAYS_VISIBLE,
    CAROUSEL_PROGRESS_BAR_DOT_TRANSITION_DURATION,
    CAROUSEL_PROGRESS_BAR_DIVIDER_WIDTH,
    CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MULTIPLE_SECTIONS_DEFAULT,
    CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_ONE_SECTION_DEFAULT
} from "../constants";
import { CarouselOptions } from "../types";
import { convertHexToRgba, getCurrentValue } from "../utils";

export type OptionsConstructor = {
    options: CarouselOptions;
    currentItem?: CarouselItemProps;
    isFullscreenMode: boolean;
    numberOfPages?: number;
    items?: CarouselItemProps[];
}
/*
*Logic related to options that are not style-related
*/
export class OptionsLogic {
    private options;
    private currentItem;
    private isFullscreenMode;
    private numberOfPages;
    private items;

    constructor(constructor: OptionsConstructor) {
        const { options, currentItem, numberOfPages, items, isFullscreenMode } = constructor;
        this.options = options;
        this.currentItem = currentItem;
        this.isFullscreenMode = isFullscreenMode;
        this.numberOfPages = numberOfPages || 0;
        this.items = items || [];
    }

    //#region Getters
    get autoChangePage() {
        return getCurrentValue(this.options?.navigation?.autoChangePage, true, this.isFullscreenMode);
    }

    get carouselItemSize() {
        if (this.isDefaultItemDisplayLocation) {
            return getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DEFAULT, this.isFullscreenMode);
        }
        return getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT, this.isFullscreenMode);
    }

    get isDefaultItemDisplayLocation() {
        return this.itemDisplayLocation === 'none';
    }

    get itemDisplayLocation() {
        return getCurrentValue(this.options?.layout?.itemDisplayLocation, 'none', this.isFullscreenMode);
    }

    get isItemDisplayLocationAbove() {
        return this.itemDisplayLocation === 'above';
    }

    get isItemDisplayLocationBelow() {
        return this.itemDisplayLocation === 'below';
    }

    get isItemViewerSwipingDisabled() {
        return this.items.length <= 1 || getCurrentValue(this.options?.itemViewer?.disableSwiping, false, this.isFullscreenMode);
    }

    get isLastPageFlush() {
        return getCurrentValue(this.options?.navigation?.isLastPageFlush, true, this.isFullscreenMode);
    }

    get isNavigationSwipingDisabled() {
        return this.numberOfPages <= 1 || getCurrentValue(this.options?.navigation?.disableSwiping, false, this.isFullscreenMode);
    }

    get isToolbarInVideo() {
        return getCurrentValue(this.options.layout?.isToolbarPositionedInVideo, false, this.isFullscreenMode);
    }

    get isWrappingDisabled() {
        return getCurrentValue(this.options.navigation?.disableWrapping, false, this.isFullscreenMode);
    }

    get itemPositioning() {
        return getCurrentValue(this.options.layout?.itemPositioning, undefined, this.isFullscreenMode);
    }

    get itemSpacingStrategy() {
        return getCurrentValue(this.options.thumbnail?.itemSpacingStrategy, 'min', this.isFullscreenMode);
    }

    get itemViewerMaxClickThreshold() {
        return getCurrentValue(this.options.itemViewer?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewBackground() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.background, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
    }

    get itemViewerPreviewBorder() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.border, CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewBorderRadius() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.borderRadius, CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_RADIUS_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewHeight() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.height, CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT / 2, this.isFullscreenMode);
    }

    get itemViewerPreviewImageFit() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.image?.fit, CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_FIT_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewImagePosition() {
        const defaultToUse = this.itemViewerPreviewSwapImageAndText ? CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_SWAP_DEFAULT : CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_NO_SWAP_DEFAULT;
        return getCurrentValue(this.options.styling?.itemViewerPreview?.image?.position, defaultToUse, this.isFullscreenMode);
    }

    get itemViewerPreviewIsVisible() {
        const value = getCurrentValue(this.options.styling?.itemViewerPreview?.isVisibleInNonFullscreenMode, CAROUSEL_ITEM_VIEWER_PREVIEW_IS_VISIBLE_DEFAULT, this.isFullscreenMode);
        return this.isFullscreenMode ? true : value;
    }

    get itemViewerPreviewOpacity() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.opacity, CAROUSEL_ITEM_VIEWER_PREVIEW_OPACITY_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewSwapImageAndText() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.swapImageAndText, CAROUSEL_ITEM_VIEWER_PREVIEW_SWAP_IMAGE_AND_TEXT_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextBodyColor() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.text?.body?.color, CAROUSEL_COLOR_FIVE, this.isFullscreenMode);
    }

    get itemViewerPreviewTextBodyFontFamily() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.text?.body?.fontFamily, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_FONT_FAMILY_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextBodySize() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.text?.body?.size, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_SIZE_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextHeaderColor() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.text?.header?.color, CAROUSEL_COLOR_GREY_ONE, this.isFullscreenMode);
    }

    get itemViewerPreviewTextHeaderFontFamily() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.text?.header?.fontFamily, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_FONT_FAMILY_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextHeaderSize() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.text?.header?.size, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_SIZE_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextContainerPadding() {
        const padding = getCurrentValue(this.options.styling?.itemViewerPreview?.text?.container?.padding, CAROUSEL_PADDING_DEFAULT, this.isFullscreenMode);
        const paddingLeftStatic = (this.options.styling?.itemViewerPreview?.text?.container?.padding as any)?.left;
        const paddingRightStatic = (this.options.styling?.itemViewerPreview?.text?.container?.padding as any)?.right;
        const paddingBottomStatic = (this.options.styling?.itemViewerPreview?.text?.container?.padding as any)?.bottom;
        const paddingTopStatic = (this.options.styling?.itemViewerPreview?.text?.container?.padding as any)?.top;
        return {
            top: paddingTopStatic !== undefined ? paddingTopStatic : padding.top,
            bottom: paddingBottomStatic !== undefined ? paddingBottomStatic : padding.bottom,
            left: paddingLeftStatic !== undefined ? paddingLeftStatic : padding.left,
            right: paddingRightStatic !== undefined ? paddingRightStatic : padding.right,
        }
    }

    get itemViewerPreviewTextContainerVerticalAlignment() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.text?.container?.verticalAlignment, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_VERTICAL_ALIGNMENT_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewWidth() {
        return getCurrentValue(this.options.styling?.itemViewerPreview?.width, CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT, this.isFullscreenMode);
    }

    get navigationMaxClickThreshold() {
        return getCurrentValue(this.options.navigation?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT, this.isFullscreenMode);
    }

    get shouldDisableThumbnailOverlay() {
        return getCurrentValue(this.options.thumbnail?.descriptionOverlay?.isDisabled, !this.isDefaultItemDisplayLocation && this.shouldHideThumbnailOverlay, this.isFullscreenMode);
    }

    get shouldHideThumbnailOverlay() {
        return getCurrentValue(this.options.thumbnail?.descriptionOverlay?.hideDescriptionOverlayUnlessHovered, true, this.isFullscreenMode);
    }

    get useDefaultVideoControls() {
        return getCurrentValue(this.options.layout?.useDefaultVideoControls, false, this.isFullscreenMode);
    }

    get videoProgressBarBackgroundColor() {
        const backgroundColorToUse = this.isToolbarInVideo ? convertHexToRgba(CAROUSEL_COLOR_GREY_ONE, .25) : CAROUSEL_COLOR_GREY_ONE;
        return getCurrentValue(this.options.styling?.toolbar?.progressBar?.background, backgroundColorToUse, this.isFullscreenMode);
    }

    get videoProgressBarDividerWidth() {
        return getCurrentValue(this.options.styling?.toolbar?.progressBar?.dividerWidth, CAROUSEL_PROGRESS_BAR_DIVIDER_WIDTH, this.isFullscreenMode);
    }

    get videoProgressBarDotSettings() {
        const diameter = getCurrentValue(this.options.styling?.toolbar?.progressBar?.dot?.diameter, CAROUSEL_PROGRESS_BAR_DOT_DIAMETER, this.isFullscreenMode);
        const isAlwaysVisible = getCurrentValue(this.options.styling?.toolbar?.progressBar?.dot?.isAlwaysVisible, CAROUSEL_PROGRESS_BAR_DOT_IS_ALWAYS_VISIBLE, this.isFullscreenMode);
        const transitionDuration = getCurrentValue(this.options.styling?.toolbar?.progressBar?.dot?.transitionDuration, CAROUSEL_PROGRESS_BAR_DOT_TRANSITION_DURATION, this.isFullscreenMode);
        return {
            diameter,
            isAlwaysVisible,
            transitionDuration
        }
    }

    get videoProgressBarForegroundColor() {
        return getCurrentValue(this.options.styling?.toolbar?.progressBar?.foregroundColor, CAROUSEL_COLOR_THREE, this.isFullscreenMode);
    }

    get videoProgressBarScaleAmount() {
        const sections = this.currentItem?.video?.sections;
        const defaultToUse = sections && sections?.length > 1 ? CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MULTIPLE_SECTIONS_DEFAULT : CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_ONE_SECTION_DEFAULT;
        return getCurrentValue(this.options.styling?.toolbar?.progressBar?.scaleAmount, defaultToUse, this.isFullscreenMode);
    }

    get videoProgressBarSeekColor() {
        return getCurrentValue(this.options.styling?.toolbar?.progressBar?.seekColor, convertHexToRgba(CAROUSEL_COLOR_FIVE, .5), this.isFullscreenMode);
    }

    get videoProgressBarHeight() {
        const isEmbedded = this.isToolbarInVideo;
        return getCurrentValue(this.options.styling?.toolbar?.progressBar?.height, isEmbedded ? CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_EMBEDDED : CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_NOT_EMBEDDED, this.isFullscreenMode);
    }

    get videoModalPadding() {
        const padding = getCurrentValue(this.options.styling?.videoModal?.padding, CAROUSEL_VIDEO_MODAL_PADDING_DEFAULT, this.isFullscreenMode);
        const paddingLeftStatic = (this.options.styling?.videoModal?.padding as any)?.left;
        const paddingRightStatic = (this.options.styling?.videoModal?.padding as any)?.right;
        const paddingBottomStatic = (this.options.styling?.videoModal?.padding as any)?.bottom;
        const paddingTopStatic = (this.options.styling?.videoModal?.padding as any)?.top;
        return {
            top: paddingTopStatic !== undefined ?
                paddingTopStatic :
                getCurrentValue(padding.top, CAROUSEL_VIDEO_MODAL_PADDING_DEFAULT.top, this.isFullscreenMode),
            bottom: paddingBottomStatic !== undefined ?
                paddingBottomStatic :
                getCurrentValue(padding.bottom, CAROUSEL_VIDEO_MODAL_PADDING_DEFAULT.bottom, this.isFullscreenMode),
            left: paddingLeftStatic !== undefined ?
                paddingLeftStatic :
                getCurrentValue(padding.left, CAROUSEL_VIDEO_MODAL_PADDING_DEFAULT.left, this.isFullscreenMode),
            right: paddingRightStatic !== undefined ?
                paddingRightStatic :
                getCurrentValue(padding.right, CAROUSEL_VIDEO_MODAL_PADDING_DEFAULT.right, this.isFullscreenMode),
        }
    }

    get videoSeekAmount() {
        return getCurrentValue(this.options?.itemViewer?.seekAmount, SEEK_AMOUNT_DEFAULT, this.isFullscreenMode) / 1000;
    }

    get videoCurrentStateIndicatorBackgroundColor() {
        return getCurrentValue(this.options.styling?.videoCurrentStateIndicator?.background, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
    }
    //#endregion

    //#region Methods
    getItemSpacing(valueToUseIfNoPositioningGiven = CAROUSEL_ITEM_SPACING_DEFAULT / 2) {
        const currentItemSpacing = getCurrentValue(this.options.thumbnail?.itemSpacing, CAROUSEL_ITEM_SPACING_DEFAULT / 2, this.isFullscreenMode);
        return this.itemPositioning !== undefined ? currentItemSpacing : valueToUseIfNoPositioningGiven;
    }
    //#endregion
}