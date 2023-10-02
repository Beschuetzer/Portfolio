import { CSSProperties } from "react";
import { CarouselItemProps } from "../components/CarouselItem";
import { CarouselItemViewerCustomButtonProps } from "../components/item-viewer/toolbar/CarouselItemViewerCustomButton";
import {
    CAROUSEL_COLOR_FIVE,
    CAROUSEL_COLOR_GREY_ONE,
    CAROUSEL_COLOR_ONE,
    CAROUSEL_ITEM_SIZE_DEFAULT,
    CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_SPACING_DEFAULT,
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
    CAROUSEL_MODAL_PADDING_DEFAULT,
    CAROUSEL_COLOR_THREE,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_EMBEDDED,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_NOT_EMBEDDED,
    CAROUSEL_PROGRESS_BAR_DOT_DIAMETER,
    CAROUSEL_PROGRESS_BAR_DOT_IS_ALWAYS_VISIBLE,
    CAROUSEL_PROGRESS_BAR_DOT_TRANSITION_DURATION,
    CAROUSEL_PROGRESS_BAR_SECTION_GAP,
    CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MULTIPLE_SECTIONS_DEFAULT,
    CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_ONE_SECTION_DEFAULT,
    AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT,
    CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT,
    CAROUSEL_VIDEO_SCREENSHOT_VIEWER_WIDTH_DEFAULT,
    CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT,
    CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT,
    CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT,
    CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT,
    CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_ANGLE_DEFAULT,
    CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_START_OPACITY_DEFAULT,
    CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_END_OPACITY_DEFAULT,
    CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT,
    CAROUSEL_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_COLOR_FOUR,
    CAROUSEL_COLOR_TWO,
    CAROUSEL_PROGRESS_BAR_HEIGHT_MAX,
    CAROUSEL_PROGRESS_BAR_HEIGHT_MIN,
    CAROUSEL_PROGRESS_BAR_SHOULD_SPAN_ENTIRE_WIDTH_DEFAULT,
    AUTO_CHANGE_PAGE_DEFAULT,
    DISABLE_WRAPPING_DEFAULT,
    IS_LAST_PAGE_FLUSH_DEFAULT,
    THUMBNAIL_OVERLAY_IS_HIDDEN_DEFAULT,
    PROGRESS_BAR_SHOW_CURRENT_POSITION_ON_CHANGE_DEFAULT,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_MOBILE,
    CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MOBILE,
    CAROUSEL_MODAL_MINIMIZED_OPACITY_DEFAULT,
    CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MIN_THESHOLD,
    CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MAX_DEFAULT,
    CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MIN_DEFAULT,
    MODAL_MINIMIZE_ON_CLICK_DEFAULT,
    MODAL_MAINTAIN_MINIMIZED_STATE_DEFAULT,
    CAROUSEL_MAX_HEIGHT_DEFAULT,
    ITEM_VIEWER_HEIGHT_DEFAULT,
    ITEM_VIEWER_ASPECT_RATIOS_TO_DECIMAL_MAPPINGratioValues,
    CLASSNAME__NAVIGATION,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT,
} from "../constants";
import { CarouselElement, CarouselOptions, CarouselSection, CarouselVideoCurrentStateIndicatorButtonName, SpacingDirection } from "../types";
import { convertHexToRgba, getBoundValue, getIsMobile } from "../utils/utils";
import { getCurrentValue } from "../utils/getCurrentValue";
import { CarouselContextInputProps } from "../context";

export type OptionsConstructor = {
    options: CarouselOptions;
    currentItem?: CarouselItemProps;
    isFullscreenMode: boolean;
    numberOfPages?: number;
    items?: CarouselItemProps[];
} & Pick<CarouselContextInputProps, 'carouselContainerRef'>
/*
*Logic related to any option the user can specify
*/
export class OptionsLogic {
    private bodyFontFamily;
    public carouselContainerRef;
    private currentItem;
    private defaultFontFamily: string = 'sans-serif';
    private isFullscreenMode;
    private items;
    private numberOfPages;
    private options;

    constructor(constructor: OptionsConstructor) {
        const {
            carouselContainerRef,
            options,
            currentItem,
            numberOfPages,
            items,
            isFullscreenMode
        } = constructor;
        this.currentItem = currentItem;
        this.carouselContainerRef = carouselContainerRef;
        this.isFullscreenMode = isFullscreenMode;
        this.items = items || [];
        this.numberOfPages = numberOfPages || 0;
        this.options = options;
        this.bodyFontFamily = window.getComputedStyle(document?.body)?.fontFamily;
    }

    //#region Getters
    get allFillColor() {
        return getCurrentValue(this.options?.styling?.elements?.all?.fillColor, undefined, this.isFullscreenMode);
    }

    get allFontFamily() {
        return getCurrentValue(this.options?.styling?.fontFamily?.all, undefined, this.isFullscreenMode);
    }

    get autoChangePage() {
        return getCurrentValue(this.options?.navigation?.autoChangePage, AUTO_CHANGE_PAGE_DEFAULT, this.isFullscreenMode);
    }

    get autoHideToolbarDuration() {
        return getCurrentValue(this.options?.itemViewer?.autoHideToolbarDuration, AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT, this.isFullscreenMode);
    }

    get containerBackgroundColor() {
        return getCurrentValue(this.options?.styling?.container?.backgroundColor, this.theme.colorOne, this.isFullscreenMode);
    }

    get containerMargin() {
        const bottom = getCurrentValue(this.options?.styling?.container?.margin?.bottom, undefined, this.isFullscreenMode);
        const left = getCurrentValue(this.options?.styling?.container?.margin?.left, undefined, this.isFullscreenMode);
        const right = getCurrentValue(this.options?.styling?.container?.margin?.right, undefined, this.isFullscreenMode);
        const top = getCurrentValue(this.options?.styling?.container?.margin?.top, undefined, this.isFullscreenMode);
        return {
            [SpacingDirection.bottom]: bottom,
            [SpacingDirection.left]: left,
            [SpacingDirection.right]: right,
            [SpacingDirection.top]: top,
        }
    }

    get containerPadding() {
        const bottom = getCurrentValue(this.options?.styling?.container?.padding?.bottom, undefined, this.isFullscreenMode);
        const left = getCurrentValue(this.options?.styling?.container?.padding?.left, undefined, this.isFullscreenMode);
        const right = getCurrentValue(this.options?.styling?.container?.padding?.right, undefined, this.isFullscreenMode);
        const top = getCurrentValue(this.options?.styling?.container?.padding?.top, undefined, this.isFullscreenMode);
        return {
            [SpacingDirection.bottom]: bottom,
            [SpacingDirection.left]: left,
            [SpacingDirection.right]: right,
            [SpacingDirection.top]: top,
        }
    }

    get defaultButtonSize() {
        return this.isMobile ? CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT : CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT;
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

    get isItemVierAspectRatioGiven() {
        return this.options?.itemViewer?.aspectRatio !== undefined;
    }

    get isItemViewerSwipingDisabled() {
        const defaultToUse = (this.isToolbarInVideo || this.isMobile) && !this.isFullscreenMode ? true : false;
        return this.items.length <= 1 || getCurrentValue(this.options?.itemViewer?.disableSwiping, defaultToUse, this.isFullscreenMode);
    }

    get isLastPageFlush() {
        return getCurrentValue(this.options?.navigation?.isLastPageFlush, IS_LAST_PAGE_FLUSH_DEFAULT, this.isFullscreenMode);
    }

    get isMobile() {
        return getIsMobile();
    }

    get isNavigationSwipingDisabled() {
        return this.numberOfPages <= 1 || getCurrentValue(this.options?.navigation?.disableSwiping, false, this.isFullscreenMode);
    }

    get isToolbarInVideo() {
        if (this.isFullscreenMode) return true;
        return getCurrentValue(this.options?.layout?.isToolbarPositionedInVideo, this.isMobile ? false : true, this.isFullscreenMode);
    }

    get isWrappingDisabled() {
        return getCurrentValue(this.options?.navigation?.disableWrapping, DISABLE_WRAPPING_DEFAULT, this.isFullscreenMode);
    }

    get itemContainerContentJustification(): CSSProperties['justifyContent'] {
        const objectPosition = this.itemStyles?.objectPosition;
        return objectPosition === 'bottom' ? 'flex-end' : objectPosition === 'center' ? 'center' : 'flex-start';
    }

    get itemStyles() {
        const defaultObjectStyles = {
            objectFit: 'contain',
            // objectPosition: this.isFullscreenMode ? 'center' : this.isItemDisplayLocationBelow ? 'top' : 'bottom',
            objectPosition: this.isFullscreenMode ? 'center' : 'top',
            // objectPosition: 'center',
        } as React.CSSProperties;

        return {
            ...defaultObjectStyles,
            ...getCurrentValue(this.currentItem?.itemStyles, undefined, this.isFullscreenMode),
        } as CSSProperties;
    }
    
    get itemViewerAspectRatio() {
        const value = getCurrentValue(this.options?.itemViewer?.aspectRatio, this.useDefaultVideoControls ? ITEM_VIEWER_HEIGHT_DEFAULT : 'auto', this.isFullscreenMode);
        return typeof value === 'string' && value !== 'auto' ? ITEM_VIEWER_ASPECT_RATIOS_TO_DECIMAL_MAPPINGratioValues[value] : value;
    }

    get itemViewerBackgroundColor() {
        return getCurrentValue(this.options?.styling?.itemViewer?.backgroundColor, undefined, this.isFullscreenMode) || this.containerBackgroundColor;
    }

    get itemViewerFontFamily() {
        const primary = this.allFontFamily;
        const secondary = getCurrentValue(this.options?.styling?.fontFamily?.itemViewer, undefined, this.isFullscreenMode)
        return primary || secondary || this.bodyFontFamily || this.defaultFontFamily;
    }

    get itemViewerMaxClickThreshold() {
        return getCurrentValue(this.options?.itemViewer?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewBackground() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.backgroundColor, this.theme.colorOne, this.isFullscreenMode);
    }

    get itemViewerPreviewBorder() {
        const defaultBorder = `1px solid ${this.theme.colorFive}`;
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.border, defaultBorder, this.isFullscreenMode);
    }

    get itemViewerPreviewBorderRadius() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.borderRadius, CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_RADIUS_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewHeight() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.height, CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT / 2, this.isFullscreenMode);
    }

    get itemViewerPreviewImageFit() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.image?.fit, CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_FIT_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewImagePosition() {
        const defaultToUse = this.itemViewerPreviewSwapImageAndText ? CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_SWAP_DEFAULT : CAROUSEL_ITEM_VIEWER_PREVIEW_IMAGE_POSITION_WHEN_NO_SWAP_DEFAULT;
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.image?.position, defaultToUse, this.isFullscreenMode);
    }

    get itemViewerPreviewIsVisible() {
        const value = getCurrentValue(this.options?.styling?.itemViewerPreview?.isVisibleInNonFullscreenMode, CAROUSEL_ITEM_VIEWER_PREVIEW_IS_VISIBLE_DEFAULT, this.isFullscreenMode);
        return this.isFullscreenMode ? true : value;
    }

    get itemViewerPreviewOpacity() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.opacity, CAROUSEL_ITEM_VIEWER_PREVIEW_OPACITY_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewSwapImageAndText() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.swapImageAndText, CAROUSEL_ITEM_VIEWER_PREVIEW_SWAP_IMAGE_AND_TEXT_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextBodyColor() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.text?.body?.color, this.theme.colorFive, this.isFullscreenMode);
    }

    get itemViewerPreviewTextBodyFontFamily() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.text?.body?.fontFamily, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_FONT_FAMILY_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextBodySize() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.text?.body?.size, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_SIZE_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextHeaderColor() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.text?.header?.color, this.theme.colorGreyOne, this.isFullscreenMode);
    }

    get itemViewerPreviewTextHeaderFontFamily() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.text?.header?.fontFamily, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_FONT_FAMILY_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextHeaderSize() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.text?.header?.size, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_SIZE_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewTextContainerPadding() {
        const paddingStyle = this.options?.styling?.itemViewerPreview?.text?.container?.padding;
        const padding = getCurrentValue(paddingStyle, CAROUSEL_PADDING_DEFAULT, this.isFullscreenMode);
        const paddingLeftStatic = (paddingStyle as any)?.left;
        const paddingRightStatic = (paddingStyle as any)?.right;
        const paddingBottomStatic = (paddingStyle as any)?.bottom;
        const paddingTopStatic = (paddingStyle as any)?.top;
        return {
            top: paddingTopStatic !== undefined ? paddingTopStatic : padding.top,
            bottom: paddingBottomStatic !== undefined ? paddingBottomStatic : padding.bottom,
            left: paddingLeftStatic !== undefined ? paddingLeftStatic : padding.left,
            right: paddingRightStatic !== undefined ? paddingRightStatic : padding.right,
        }
    }

    get itemViewerPreviewTextContainerVerticalAlignment() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.text?.container?.verticalAlignment, CAROUSEL_ITEM_VIEWER_PREVIEW_TEXT_VERTICAL_ALIGNMENT_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewWidth() {
        return getCurrentValue(this.options?.styling?.itemViewerPreview?.width, CAROUSEL_ITEM_VIEWER_PREVIEW_WIDTH_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerUseRecommendedAspectRatio() {
        return getCurrentValue(this.options?.itemViewer?.useRecommendedAspectRatio, !this.isItemVierAspectRatioGiven, this.isFullscreenMode);
    }

    get maxHeight() {
        return getCurrentValue(
            this.options?.layout?.maxHeight,
            CAROUSEL_MAX_HEIGHT_DEFAULT,
            this.isFullscreenMode
        );
    }

    get modalBackgroundColor() {
        return getCurrentValue(
            this.options?.styling?.modal?.backgroundColor,
            this.theme.colorOne,
            this.isFullscreenMode
        );
    }

    get modalCloseButtonColor() {
        return getCurrentValue(this.options?.styling?.modal?.closeButton?.fill, this.modalTextColor, this.isFullscreenMode);
    }

    get modalCloseButtonSize() {
        return getCurrentValue(this.options?.styling?.modal?.closeButton?.size, this.defaultButtonSize, this.isFullscreenMode)
    }

    get modalCloseButtonWidth() {
        const sizeGiven = this.options?.styling?.modal?.closeButton?.size;
        return !!sizeGiven ? this.modalCloseButtonSize : this.isFullscreenMode ? undefined : CAROUSEL_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT;
    }

    get modalFontSize() {
        return getCurrentValue(
            this.options?.styling?.modal?.fontSize,
            this.isFullscreenMode ? CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT : CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT,
            this.isFullscreenMode
        );
    }

    get modalMaintainMinimizedStateAcrossItems() {
        return getCurrentValue(
            this.options?.modal?.maintainMinimizedStateAcrossItems,
            MODAL_MAINTAIN_MINIMIZED_STATE_DEFAULT,
            this.isFullscreenMode
        )
    }

    get modalMinimizeOnClick() {
        return getCurrentValue(
            this.options?.modal?.minimizeOnClick,
            MODAL_MINIMIZE_ON_CLICK_DEFAULT,
            this.isFullscreenMode
        );
    }

    get modalPadding() {
        const paddingStyle = (this.options?.styling?.modal?.padding as any);
        const padding = getCurrentValue(paddingStyle, CAROUSEL_MODAL_PADDING_DEFAULT, this.isFullscreenMode);
        const { left, right, top, bottom } = paddingStyle || {};
        return {
            top: getCurrentValue(top !== undefined ? top : padding.top, CAROUSEL_MODAL_PADDING_DEFAULT.top, this.isFullscreenMode),
            bottom: getCurrentValue(bottom !== undefined ? bottom : padding.bottom, CAROUSEL_MODAL_PADDING_DEFAULT.bottom, this.isFullscreenMode),
            left: getCurrentValue(left !== undefined ? left : padding.left, CAROUSEL_MODAL_PADDING_DEFAULT.left, this.isFullscreenMode),
            right: getCurrentValue(right !== undefined ? right : padding.right, CAROUSEL_MODAL_PADDING_DEFAULT.right, this.isFullscreenMode),
        }
    }

    get modalOpacityWhenMinimized() {
        return getCurrentValue(
            this.options?.styling?.modal?.opacityWhenMinimized,
            CAROUSEL_MODAL_MINIMIZED_OPACITY_DEFAULT,
            this.isFullscreenMode
        ).toString();
    }

    get modalTextColor() {
        return getCurrentValue(
            this.options?.styling?.modal?.textColor,
            this.theme.colorFive,
            this.isFullscreenMode
        );
    }

    getModalWidth(isMinimized: boolean) {
        if (isMinimized) return `auto`;
        return `${getCurrentValue(
            this.options?.styling?.modal?.widthInPercent,
            100,
            this.isFullscreenMode
        )}%`;
    }

    get navigationFontFamily() {
        const primary = this.allFontFamily;
        const secondary = getCurrentValue(this.options?.styling?.fontFamily?.navigation, undefined, this.isFullscreenMode)
        return primary || secondary || this.bodyFontFamily || this.defaultFontFamily;
    }

    get navigationBackground() {
        return getCurrentValue(this.options?.styling?.navigation?.backgroundColor, undefined, this.isFullscreenMode)
    }

    get navigationMaxClickThreshold() {
        return getCurrentValue(this.options?.navigation?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT, this.isFullscreenMode);
    }

    get progressBarShouldSpanEntireWidth() {
        return getCurrentValue(this.options?.styling?.toolbar?.progressBar?.shouldSpanContainerWidth, CAROUSEL_PROGRESS_BAR_SHOULD_SPAN_ENTIRE_WIDTH_DEFAULT, this.isFullscreenMode);
    }

    get theme() {
        const colorOne = getCurrentValue(this.options?.styling?.colorTheme?.colorOne, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
        const colorTwo = getCurrentValue(this.options?.styling?.colorTheme?.colorTwo, CAROUSEL_COLOR_TWO, this.isFullscreenMode);
        const colorThree = getCurrentValue(this.options?.styling?.colorTheme?.colorThree, CAROUSEL_COLOR_THREE, this.isFullscreenMode);
        const colorFour = getCurrentValue(this.options?.styling?.colorTheme?.colorFour, CAROUSEL_COLOR_FOUR, this.isFullscreenMode);
        const colorFive = getCurrentValue(this.options?.styling?.colorTheme?.colorFive, CAROUSEL_COLOR_FIVE, this.isFullscreenMode);
        const colorGreyOne = getCurrentValue(this.options?.styling?.colorTheme?.colorGreyOne, CAROUSEL_COLOR_GREY_ONE, this.isFullscreenMode);
        return {
            colorOne,
            colorTwo,
            colorThree,
            colorFour,
            colorFive,
            colorGreyOne
        }
    }

    get thumbnailBorderString() {
        return getCurrentValue(this.options?.thumbnail?.currentItemBorder, undefined, this.isFullscreenMode)
    }

    get thumbnailOverlayBackgroundSolid() {
        const opacity = getCurrentValue(this.options?.thumbnail?.descriptionOverlay?.background?.solid?.opacity, CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT, this.isFullscreenMode);
        const color = getCurrentValue(this.options?.thumbnail?.descriptionOverlay?.background?.solid?.color, this.theme.colorOne, this.isFullscreenMode).trim();
        return {
            opacity,
            color,
        }
    }

    get thumbnailOverlayBackgroundGradient() {
        const gradient = this.options?.thumbnail?.descriptionOverlay?.background?.gradient;
        const angle = getCurrentValue(gradient?.angle, CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_ANGLE_DEFAULT, this.isFullscreenMode)
        const startColor = getCurrentValue(gradient?.start?.color, this.theme.colorFive, this.isFullscreenMode);
        const startOpacity = getCurrentValue(gradient?.start?.opacity, CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_START_OPACITY_DEFAULT, this.isFullscreenMode);
        const endColor = getCurrentValue(gradient?.end?.color, this.theme.colorOne, this.isFullscreenMode);
        const endOpacity = getCurrentValue(gradient?.end?.opacity, CAROUSEL_THUMBNAIL_OVERLAY_BACKGROUND_GRADIENT_END_OPACITY_DEFAULT, this.isFullscreenMode);
        return {
            angle,
            endColor,
            endOpacity,
            startColor,
            startOpacity,
        }
    }

    get thumbnailOverlayIsDisabled() {
        const isThumbnailTooSmall = this.thumbnailSize < CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MIN_THESHOLD;
        const defaultValue = !this.isDefaultItemDisplayLocation && this.thumbnailOverlayIsHidden && isThumbnailTooSmall;
        return getCurrentValue(this.options?.thumbnail?.descriptionOverlay?.isDisabled, defaultValue, this.isFullscreenMode);
    }

    get thumbnailOverlayIsHidden() {
        return getCurrentValue(this.options?.thumbnail?.descriptionOverlay?.hideDescriptionOverlayUnlessHovered, THUMBNAIL_OVERLAY_IS_HIDDEN_DEFAULT, this.isFullscreenMode);
    }

    get thumbnailOverlayText() {
        const color = getCurrentValue(this.options?.thumbnail?.descriptionOverlay?.textColor, this.theme.colorFive, this.isFullscreenMode);
        const maxLineCount = getCurrentValue(this.options?.thumbnail?.descriptionOverlay?.maxLineCount, CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT, this.isFullscreenMode)
        const fontSizeDefault = Math.floor(getBoundValue(this.thumbnailSize / 10, CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MIN_DEFAULT, CAROUSEL_THUMBNAIL_OVERLAY_FONT_SIZE_MAX_DEFAULT));
        const fontSize = getCurrentValue(this.options?.thumbnail?.descriptionOverlay?.fontSize, fontSizeDefault, this.isFullscreenMode);
        return {
            color,
            fontSize,
            maxLineCount,
        }
    }

    get thumbnailPositioning() {
        return getCurrentValue(this.options?.layout?.thumbnailPositioning, undefined, this.isFullscreenMode);
    }

    get thumbnailSize() {
        const maxHeight = this.maxHeight;
        const navigationDiv = this.carouselContainerRef?.current?.querySelector(`.${CLASSNAME__NAVIGATION}`) as HTMLElement;
        const navigationHeight = navigationDiv?.getBoundingClientRect().height || 0;
        const navigationMarginBottom = parseFloat(navigationDiv?.style?.marginBottom) || 0;
        if (this.isDefaultItemDisplayLocation) {
            const thumbnailSizeGiven = getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DEFAULT, this.isFullscreenMode);
            const maxThumbnailSize = maxHeight - navigationHeight - navigationMarginBottom;
            if (thumbnailSizeGiven > maxThumbnailSize && navigationHeight > 0) {
                return maxHeight - navigationHeight - navigationMarginBottom;
            }
            return thumbnailSizeGiven;
        }

        const thumbnailSizeGiven = getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT, this.isFullscreenMode);
        return thumbnailSizeGiven;
    }

    //todo: is this needed?
    // get thumbnailSizeAvailableSpace() {
    //     const maxHeight = this.maxHeight;
    //     const carouselHeight = this.carouselContainerRef?.current?.getBoundingClientRect().height;

    //     console.log({maxHeight, carouselHeight});
    //     if (!carouselHeight) return 0;
    //     return 0;
    // }

    get thumbnailSpacingStrategy() {
        return getCurrentValue(this.options?.thumbnail?.spacingStrategy, 'min', this.isFullscreenMode);
    }

    get toolbarBackgroundColor() {
        const primary = getCurrentValue(this.options?.styling?.toolbar?.backgroundColor, undefined, this.isFullscreenMode);
        return primary || this.containerBackgroundColor;
    }

    get toolbarShortcutIndicator() {
        const backgroundColor = getCurrentValue(this.options?.styling?.toolbar?.shortcutIndicator?.backgroundColor, this.theme.colorTwo, this.isFullscreenMode);
        const textColor = getCurrentValue(this.options?.styling?.toolbar?.shortcutIndicator?.backgroundColor, this.theme.colorFive, this.isFullscreenMode);
        return {
            backgroundColor, textColor
        }
    }

    get toolbarTextColor() {
        const priorityColor = getCurrentValue(this.options?.styling?.toolbar?.textColor, undefined, this.isFullscreenMode);
        const secondaryColor = getCurrentValue(this.options?.styling?.toolbar?.elements?.color, undefined, this.isFullscreenMode)
        return priorityColor || secondaryColor || this.allFillColor || this.theme.colorFive;
    }

    get useDefaultVideoControls() {
        return getCurrentValue(this.options?.layout?.useDefaultVideoControls, this.isMobile ? true : false, this.isFullscreenMode);
    }

    get videoCurrentStateIndicatorBackgroundColor() {
        return getCurrentValue(this.options?.styling?.videoCurrentStateIndicator?.backgroundColor, this.theme.colorOne, this.isFullscreenMode);
    }

    get videoCurrentStateIndicatorForegroundColor() {
        return getCurrentValue(
            this.options?.styling?.videoCurrentStateIndicator?.textOrForegroundColor,
            this.theme.colorFive,
            this.isFullscreenMode
        );
    }

    get videoCurrentStateIndicatorSize() {
        return getCurrentValue(
            this.options?.styling?.videoCurrentStateIndicator?.size,
            this.defaultButtonSize,
            this.isFullscreenMode
        );
    }

    get videoProgressBarBackgroundColor() {
        const backgroundColorToUse = this.isToolbarInVideo ? convertHexToRgba(this.theme.colorGreyOne, .25) : this.theme.colorGreyOne;
        return getCurrentValue(this.options?.styling?.toolbar?.progressBar?.backgroundColor, backgroundColorToUse, this.isFullscreenMode);
    }

    get videoProgressBarDotSettings() {
        const diameter = getCurrentValue(this.options?.styling?.toolbar?.progressBar?.dot?.diameter, CAROUSEL_PROGRESS_BAR_DOT_DIAMETER, this.isFullscreenMode);
        const isAlwaysVisible = getCurrentValue(this.options?.styling?.toolbar?.progressBar?.dot?.isAlwaysVisible, CAROUSEL_PROGRESS_BAR_DOT_IS_ALWAYS_VISIBLE, this.isFullscreenMode);
        const transitionDuration = getCurrentValue(this.options?.styling?.toolbar?.progressBar?.dot?.transitionDuration, CAROUSEL_PROGRESS_BAR_DOT_TRANSITION_DURATION, this.isFullscreenMode);
        return {
            diameter,
            isAlwaysVisible,
            transitionDuration
        }
    }

    get videoProgressBarForegroundColor() {
        return getCurrentValue(this.options?.styling?.toolbar?.progressBar?.textOrForegroundColor, this.theme.colorThree, this.isFullscreenMode);
    }

    get videoProgressBarHitSlop() {
        const top = getCurrentValue(
            this.options?.styling?.toolbar?.progressBar?.hitSlop?.top,
            CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT * 1,
            this.isFullscreenMode
        );
        const bottom = getCurrentValue(
            this.options?.styling?.toolbar?.progressBar?.hitSlop?.bottom,
            CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT / 2,
            this.isFullscreenMode
        );

        return {
            top,
            bottom,
        }
    }

    get videoProgressBarScaleAmount() {
        const isToolbarInVideo = this.isToolbarInVideo;
        const sections = this.currentItem?.video?.sections;
        const defaultToUse = this.isMobile
            ? CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MOBILE
            : isToolbarInVideo && sections && sections?.length > 1
                ? CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_MULTIPLE_SECTIONS_DEFAULT
                : CAROUSEL_PROGRESS_BAR_SCALE_AMOUNT_ONE_SECTION_DEFAULT;
        return getCurrentValue(this.options?.styling?.toolbar?.progressBar?.scaleAmount, defaultToUse, this.isFullscreenMode);
    }

    get videoProgressBarScreenshotViewer() {
        const width = getCurrentValue(this.options?.styling?.toolbar?.progressBar?.screenshotViewer?.thumbnailWidth, CAROUSEL_VIDEO_SCREENSHOT_VIEWER_WIDTH_DEFAULT, this.isFullscreenMode);
        const textColor = getCurrentValue(this.options?.styling?.toolbar?.progressBar?.textOrForegroundColor, this.theme.colorFive, this.isFullscreenMode);

        return {
            width,
            height: width * 9 / 16,
            textColor
        }
    }

    get videoProgressBarSectionGap() {
        return getCurrentValue(this.options?.styling?.toolbar?.progressBar?.sectionGap, CAROUSEL_PROGRESS_BAR_SECTION_GAP, this.isFullscreenMode);
    }

    get videoProgressBarSeekColor() {
        return getCurrentValue(this.options?.styling?.toolbar?.progressBar?.seekColor, convertHexToRgba(this.theme.colorFive, .5), this.isFullscreenMode);
    }

    get videoProgressBarShowCurrentPosition() {
        return getCurrentValue(this.options?.styling?.toolbar?.progressBar?.showCurrentPositionOnChange, PROGRESS_BAR_SHOW_CURRENT_POSITION_ON_CHANGE_DEFAULT, this.isFullscreenMode);
    }

    get videoProgressBarHeight() {
        const isEmbedded = this.isToolbarInVideo;
        const heightGiven = getCurrentValue(this.options?.styling?.toolbar?.progressBar?.height, undefined, this.isFullscreenMode);
        const defaultBasedOnEmbedded = isEmbedded ? CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_EMBEDDED : CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_NOT_EMBEDDED;
        const isGivenGreaterThanMax = heightGiven !== undefined && heightGiven > CAROUSEL_PROGRESS_BAR_HEIGHT_MAX;
        const isGivenLessThanMin = heightGiven !== undefined && heightGiven < CAROUSEL_PROGRESS_BAR_HEIGHT_MIN;
        return isGivenGreaterThanMax
            ? CAROUSEL_PROGRESS_BAR_HEIGHT_MAX
            : isGivenLessThanMin
                ? CAROUSEL_PROGRESS_BAR_HEIGHT_MIN
                : this.isMobile
                    ? CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT_MOBILE
                    : defaultBasedOnEmbedded;

    }

    get videoSeekAmount() {
        return getCurrentValue(this.options?.itemViewer?.seekAmount, SEEK_AMOUNT_DEFAULT, this.isFullscreenMode) / 1000;
    }
    //#endregion

    //#region Methods
    getButtonColor(buttonName: CarouselElement, fallbackColor?: string) {
        const fallbackColorToUse = fallbackColor || this.theme.colorFive;
        const specificFillColor = getCurrentValue(this.options?.styling?.elements?.[buttonName]?.fillColor, undefined, this.isFullscreenMode);

        switch (buttonName) {
            case CarouselElement.arrowLeft:
            case CarouselElement.arrowRight:
            case CarouselElement.dots:
                const navigationElementsColor = getCurrentValue(this.options?.styling?.navigation?.elements?.color, undefined, this.isFullscreenMode);
                return specificFillColor || navigationElementsColor || this.allFillColor || fallbackColorToUse;
            case CarouselElement.closeButton:
            case CarouselElement.fullscreenButton:
            case CarouselElement.nextButton:
            case CarouselElement.pauseButton:
            case CarouselElement.playButton:
            case CarouselElement.previousButton:
            case CarouselElement.seekBackButton:
            case CarouselElement.seekForwardButton:
                const toolbarElementsColor = getCurrentValue(this.options?.styling?.toolbar?.elements?.color, undefined, this.isFullscreenMode);
                return specificFillColor || toolbarElementsColor || this.allFillColor || fallbackColorToUse;
            default:
                return specificFillColor || this.allFillColor || fallbackColorToUse;
        }
    }

    getButtonSize(buttonName: CarouselElement, defaultOverride = 0) {
        let sectionButtonSize;
        switch (buttonName) {
            case CarouselElement.arrowLeft:
            case CarouselElement.arrowRight:
            case CarouselElement.dots:
                sectionButtonSize = getCurrentValue(this.options?.styling?.navigation?.elements?.size, this.defaultButtonSize, this.isFullscreenMode);
                break;
            case CarouselElement.closeButton:
            case CarouselElement.fullscreenButton:
            case CarouselElement.nextButton:
            case CarouselElement.pauseButton:
            case CarouselElement.playButton:
            case CarouselElement.previousButton:
            case CarouselElement.seekBackButton:
            case CarouselElement.seekForwardButton:
                sectionButtonSize = getCurrentValue(this.options?.styling?.toolbar?.elements?.size, this.defaultButtonSize, this.isFullscreenMode);
                break;
        }
        const valueToUse = defaultOverride || sectionButtonSize || this.defaultButtonSize;

        return valueToUse;
    }

    getPaddingAmount(direction: SpacingDirection, item: CarouselSection, defaultOverride?: number) {
        let defaultPadding: number;

        switch (direction) {
            case SpacingDirection.bottom:
            case SpacingDirection.left:
            case SpacingDirection.right: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                break;
            }
            case SpacingDirection.top: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : this.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                break;
            }
        }
        return this.getCustomPadding(direction, item, defaultPadding);
    }

    getThumbnailSpacingBasedOnThumbnailPositioning(valueToUseIfNoPositioningGiven = CAROUSEL_ITEM_SPACING_DEFAULT / 2) {
        const currentItemSpacing = this.getThumbnailSpacing(CAROUSEL_ITEM_SPACING_DEFAULT / 2);
        return this.thumbnailPositioning !== undefined ? currentItemSpacing : valueToUseIfNoPositioningGiven;
    }

    getThumbnailSpacing(defaultValue = CAROUSEL_ITEM_SPACING_DEFAULT) {
        return getCurrentValue(this.options?.thumbnail?.spacing, defaultValue, this.isFullscreenMode)
    }

    getVideoCurrentStateIndicatorButtonColor(buttonName: CarouselVideoCurrentStateIndicatorButtonName) {
        return getCurrentValue(
            this.options?.styling?.videoCurrentStateIndicator?.[buttonName]?.fillColor,
            undefined,
            this.isFullscreenMode
        );
    }

    getXlinkHref(xlinkHref: CarouselItemViewerCustomButtonProps['xlinkHref']) {
        return getCurrentValue(xlinkHref, undefined, this.isFullscreenMode);
    }
    //#endregion

    //#region Private Methods
    private getCustomPadding(direction: SpacingDirection, item: CarouselSection, defaultPadding = CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT) {
        const containerPadding = this.containerPadding?.[direction];
        const itemPadding = (this.options?.styling?.[item] as any)?.padding;
        const itemPaddingFullscreen = getCurrentValue(itemPadding?.fullscreen?.[direction], undefined, this.isFullscreenMode);
        const itemPaddingNonFullscreen = getCurrentValue(itemPadding?.nonFullscreen?.[direction], undefined, this.isFullscreenMode);
        const itemPaddingAll = getCurrentValue(itemPadding?.[direction], undefined, this.isFullscreenMode);
        const itemPaddingToUse = this.isFullscreenMode ? (itemPaddingFullscreen || itemPaddingAll) : (itemPaddingNonFullscreen || itemPaddingAll);
        const customPadding = itemPaddingToUse || containerPadding;
        return customPadding !== undefined ? customPadding : defaultPadding;
    }
    //#endregion    
}