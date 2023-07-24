import { CSSProperties } from "react";
import { CarouselElement, CarouselSection, CarouselOptions } from "../types";
import { OptionsLogic } from "./OptionsLogic";
import { convertColorNameToHex, convertHexToRgba, getCurrentValue, getIsMobile, getIsVideo, getNumberOfItemsThatCanFit } from "../utils";
import {
    CAROUSEL_SPACING_UNIT,
    CAROUSEL_COLOR_FOUR,
    CAROUSEL_COLOR_ONE,
    CAROUSEL_COLOR_FIVE,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT,
    CAROUSEL_ITEM_SPACING_DEFAULT,
    CAROUSEL_OVERLAY_ITEM_PADDING_TOP,
    CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT,
    CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT,
    CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT,
    CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT,
    CAROUSEL_VIDEO_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_CENTER_LINE_OPACITY_DEFAULT,
    CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT,
    CLASSNAME__TOOLBAR_PROGRESS,
} from "../constants";
import { CarouselVideoModalInternalProps } from "../components/CarouselVideoModal";
import { LoadingSpinnerProps, LoadingSpinnerOptions } from "../components/LoadingSpinner";
import { CarouselContextInputProps, CarouselContextOutputProps } from "../context";
import { RegexpPattern } from "./RegexpPattern";
import { CarouselItemViewerShortcutIndicatorPosition } from "../components/item-viewer/toolbar/CarouselItemViewerShortcutIndicator";
import { TEXT_TRANSLATION_AMOUNT_REF_INITIAL, TextTranslateOffset } from "../components/item-viewer/progress-bar/CarouselItemViewerProgressBarScreenshotViewer";

export enum SpacingDirection {
    bottom,
    left,
    right,
    top,
}
export type StylingLogicConstructor = {
    isCurrentItem?: boolean;
    itemViewerToolbarRef?: React.MutableRefObject<HTMLElement | undefined>;
    loadingSpinnerOptions?: LoadingSpinnerProps['options'];
    options: CarouselOptions | undefined;
    optionsLogic?: OptionsLogic;
    videoModalRef?: React.MutableRefObject<HTMLElement | undefined> | undefined;
} & Partial<Pick<CarouselContextOutputProps, 'currentItem' | 'isFullscreenMode' | 'numberOfPages' | 'items'>>
    & Partial<Pick<CarouselContextInputProps, 'carouselContainerRef'>>
    & Partial<Pick<CarouselVideoModalInternalProps, 'videoRef'>>

export type GetToolbarButtonSizeStlye = {
    buttonName: CarouselElement;
    subElementName?: string;
    style?: CSSProperties;
}

/*
*Use this when extending styling options.  Many default styles are currently in _carousel.scss or _buttons_scss
*/
export class StylingLogic {
    private DEFAULT_FONT_FAMILY: string = 'sans-serif';
    private carouselContainerRef;
    private currentItem;
    private isCurrentItem: boolean | undefined;
    private optionsLogic: OptionsLogic;
    private isMobile: boolean;
    private items;
    private itemViewerToolbarRef;
    private isFullscreenMode: boolean;
    private loadingSpinnerOptions: LoadingSpinnerProps['options'];
    private numberOfPages;
    private options: CarouselOptions;
    private videoModalRef: React.MutableRefObject<HTMLElement | undefined> | undefined;
    private videoRef;

    constructor(constructor: StylingLogicConstructor) {
        const {
            carouselContainerRef,
            currentItem,
            isCurrentItem,
            isFullscreenMode,
            optionsLogic,
            items,
            itemViewerToolbarRef,
            loadingSpinnerOptions,
            numberOfPages,
            options,
            videoModalRef,
            videoRef,
        } = constructor;
        this.carouselContainerRef = carouselContainerRef;
        this.currentItem = currentItem;
        this.isCurrentItem = isCurrentItem;
        this.isFullscreenMode = !!isFullscreenMode;
        this.items = items || [];
        this.loadingSpinnerOptions = loadingSpinnerOptions;
        this.itemViewerToolbarRef = itemViewerToolbarRef || { current: null };
        this.numberOfPages = numberOfPages || 0;
        this.videoRef = videoRef;
        this.videoModalRef = videoModalRef;
        this.options = options || {};
        this.optionsLogic = optionsLogic || new OptionsLogic({ options: this.options, isFullscreenMode: false });
        this.isMobile = getIsMobile();
    }

    //#region Public Getters
    get carouselImageContainerStlye() {
        return {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            width: '100%',
            height: '100%',
            paddingLeft: this.isFullscreenMode ? 0 : this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer),
            paddingRight: this.isFullscreenMode ? 0 : this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer),
        } as CSSProperties;
    }

    get carouselImageStlye() {
        // const cursorStyle = this.isFullscreenMode ?  {
        //     zIndex: 0,
        //     cursor: "zoom-out",
        // } as CSSProperties : {
        //     zIndex: 10,
        //     cursor: "zoom-in",
        // }as CSSProperties;

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            width: '100%',
            height: this.imageHeight,
            objectPosition: this.isFullscreenMode ? 'center' : 'bottom',
            // ...cursorStyle,
        } as CSSProperties : {
        } as CSSProperties;
    }

    get carouselStyle() {
        const common = {
            paddingTop: this.getPaddingAmount(SpacingDirection.top, CarouselSection.itemViewer),
            paddingBottom: this.getPaddingAmount(SpacingDirection.bottom, CarouselSection.itemViewer),
        } as CSSProperties;

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            background: getCurrentValue(this.options?.styling?.navigation?.background, undefined, this.isFullscreenMode) || getCurrentValue(this.options.styling?.container?.background, CAROUSEL_COLOR_ONE, this.isFullscreenMode),
            borderRadius: 4,
            paddingRight: 0,
            paddingLeft: 0,
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
    }

    get carouselHiddenInputStyle() {
        return {
            display: 'none',
        } as CSSProperties;
    }

    get carouselItemCursorStyle() {
        return this.isCurrentItemSelected ? {
            cursor: 'auto',
        } as CSSProperties : {} as CSSProperties;
    }

    get carouselItemStyle() {
        const customCurrenItemBorder = getCurrentValue(this.options.thumbnail?.currentItemBorder, '', this.isFullscreenMode);

        const widthStyle = {
            width: this.optionsLogic.carouselItemSize,
            height: this.optionsLogic.carouselItemSize,
        } as CSSProperties;
        const selectionStyle = this.isCurrentItemSelected ? {
            border: this.getBorderStringToUse(customCurrenItemBorder),
            pointerEvents: 'none',
            ...this.carouselItemCursorStyle,
        } as CSSProperties : {} as CSSProperties;

        return {
            ...selectionStyle,
            ...widthStyle,
        } as CSSProperties;
    }

    get carouselItemViewerStyle() {
        return {
            display: this.isFullscreenMode ? 'flex' : 'none',
            backgroundColor: this.itemViewerBackgroundColor,
        } as CSSProperties;
    }

    get carouselItemViewerPreviewImageContainerStyle() {
        const width = this.optionsLogic.itemViewerPreviewWidth;
        const swapImageAndTextToUse = this.optionsLogic.itemViewerPreviewSwapImageAndText;
        const borderTemp = this.optionsLogic.itemViewerPreviewBorder;
        const splitBorder = borderTemp?.toString().trim().split(RegexpPattern.splitAtSpaceAndRgb)?.filter(item => !!item) || [];
        const lastBorderElement = splitBorder[splitBorder?.length - 1]?.trim();
        const isHex = lastBorderElement?.match(RegexpPattern.hexColor);
        const isRgb = lastBorderElement?.match(RegexpPattern.rgbColor);
        const isRgba = lastBorderElement?.match(RegexpPattern.rgbaColor);
        const color = isHex || isRgb || isRgba ? lastBorderElement : convertColorNameToHex(lastBorderElement);
        const borderToUse = `1px solid ${convertHexToRgba(color || CAROUSEL_COLOR_FIVE, CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_CENTER_LINE_OPACITY_DEFAULT)}`;

        return {
            width: width / 2,
            borderLeft: swapImageAndTextToUse ? borderToUse : undefined,
            borderRight: swapImageAndTextToUse ? undefined : borderToUse,
        } as CSSProperties;
    }

    get carouselItemViewerPreviewImageStyle() {
        return {
            objectFit: this.optionsLogic.itemViewerPreviewImageFit,
            objectPosition: this.optionsLogic.itemViewerPreviewImagePosition,
        } as CSSProperties
    }

    get carouselItemViewerPreviewImageDescriptionBodyStyle() {
        const size = this.optionsLogic.itemViewerPreviewTextBodySize;
        const color = this.optionsLogic.itemViewerPreviewTextBodyColor;
        const fontFamily = this.optionsLogic.itemViewerPreviewTextBodyFontFamily;

        return {
            fontFamily,
            color,
            fontSize: size,
        } as CSSProperties;
    }

    get carouselItemViewerPreviewImageDescriptionHeaderStyle() {
        const size = this.optionsLogic.itemViewerPreviewTextHeaderSize;
        const color = this.optionsLogic.itemViewerPreviewTextHeaderColor;
        const fontFamily = this.optionsLogic.itemViewerPreviewTextHeaderFontFamily;

        return {
            fontFamily,
            color,
            fontSize: size,
        } as CSSProperties;
    }

    get carouselItemViewerPreviewImageDescriptionContainerStyle() {
        const width = this.optionsLogic.itemViewerPreviewWidth;
        const fontFamily = this.optionsLogic.itemViewerPreviewTextHeaderFontFamily;

        return {
            width: width / 2,
            fontFamily,
        } as CSSProperties;
    }

    get carouselItemViewerPreviewStyle() {
        const background = this.optionsLogic.itemViewerPreviewBackground;
        const border = this.optionsLogic.itemViewerPreviewBorder;
        const borderRadius = this.optionsLogic.itemViewerPreviewBorderRadius;
        const opacity = this.optionsLogic.itemViewerPreviewOpacity;
        const width = this.optionsLogic.itemViewerPreviewWidth;
        const height = this.optionsLogic.itemViewerPreviewHeight;
        const padding = this.optionsLogic.itemViewerPreviewTextContainerPadding;
        const verticalAlignment = this.optionsLogic.itemViewerPreviewTextContainerVerticalAlignment;
        const hitSlopTop = this.getCarouselVideoProgressHitSlop().paddingTop
        const top = 0;
        const right = this.toolbarInnerContainerStyle.paddingRight;
        const isVideo = getIsVideo(this.currentItem);
        const translateYSpacing = `-${CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT}${CAROUSEL_SPACING_UNIT}`;
        const translateYAmount = this.optionsLogic.isToolbarInVideo && isVideo ? `calc(-100% + ${hitSlopTop}${CAROUSEL_SPACING_UNIT} + ${translateYSpacing})` : `calc(-100% + ${translateYSpacing})`;

        return {
            width,
            height,
            top,
            right,
            backgroundColor: convertHexToRgba(background, parseFloat(opacity as string)),
            border: border,
            borderRadius: borderRadius,
            paddingTop: padding.top,
            paddingBottom: padding.bottom,
            paddingLeft: padding.left,
            paddingRight: padding.right,
            alignItems: verticalAlignment,
            transform: `translateY(${translateYAmount})`
        } as CSSProperties;
    }

    get carouselItemsOuterContainerStyle() {
        const common = {
            marginLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
            marginRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
            overflow: 'hidden',
        } as CSSProperties;

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            marginTop: this.optionsLogic.isToolbarInVideo && this.optionsLogic.isItemDisplayLocationAbove ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT : 0,
            marginBottom: this.numberOfPages <= 1 && this.optionsLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT : 0,
            overflow: 'hidden',
            ...common,
        } as CSSProperties : {
            ...common,
        };
    }

    get carouselLoadingSpinnerRingContainerStyle() {
        const { containerLength, containerMargin } = this.loadingSpinnerOptions as LoadingSpinnerOptions;
        const widthStyle = containerLength ? {
            width: containerLength,
            height: containerLength,
        } as React.CSSProperties : {}
        const marginStyle = containerMargin ? {
            margin: containerMargin,
        } as React.CSSProperties : {}

        return {
            ...widthStyle,
            ...marginStyle,
        }
    }

    get carouselLoadingSpinnerColor() {
        const { color, spinnerColor } = this.loadingSpinnerOptions as LoadingSpinnerOptions;
        return spinnerColor || color;
    }

    get carouselLoadingSpinnerBackgroundColorStyle() {
        return {
            backgroundColor: this.carouselLoadingSpinnerColor,
        } as CSSProperties;
    }

    get carouselLoadingSpinnerRingItemStyle() {
        const RING_RADIUS_DEFAULT = 64;
        const { radius, width, containerLength } = this.loadingSpinnerOptions as LoadingSpinnerOptions;
        const isContainerLengthLessThanRadius = containerLength && containerLength <= (radius || RING_RADIUS_DEFAULT);

        const divRadiusStyle = radius || isContainerLengthLessThanRadius ? {
            width: Math.min((radius || Number.MAX_SAFE_INTEGER), containerLength || Number.MAX_SAFE_INTEGER),
            height: Math.min(radius || Number.MAX_SAFE_INTEGER, containerLength || Number.MAX_SAFE_INTEGER),
        } as React.CSSProperties : {}
        const divSizeStyle = width || containerLength ? {
            margin: width ? width : isContainerLengthLessThanRadius ? containerLength / 4 : 4,
            border: `${width ? width : isContainerLengthLessThanRadius ? containerLength / 4 : 4}${CAROUSEL_SPACING_UNIT} solid ${CAROUSEL_COLOR_FIVE}`,
        } as React.CSSProperties : {}

        const colorStyle = {
            borderTopColor: this.carouselLoadingSpinnerColor,
            borderRightColor: `transparent`,
            borderBottomColor: `transparent`,
            borderLeftColor: `transparent`,
        } as CSSProperties;

        return {
            ...divRadiusStyle,
            ...divSizeStyle,
            ...colorStyle,
        } as CSSProperties;
    }

    get carouselLoadingSpinnerTextStyle() {
        const { color, textColor } = this.loadingSpinnerOptions as LoadingSpinnerOptions;
        const customColor = textColor || color;
        return {
            color: customColor,
        } as CSSProperties;
    }

    get carouselToolbarTextDescriptionStyle() {
        return {
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
        } as CSSProperties;
    }

    get carouselToolbarTextStyle() {
        const customTextColor = getCurrentValue(this.options.styling?.toolbar?.textColor, undefined, this.isFullscreenMode) || getCurrentValue(this.options.styling?.toolbar?.elements?.color, undefined, this.isFullscreenMode) || this.allFillColor;
        return {
            color: customTextColor || CAROUSEL_COLOR_FIVE,
        } as CSSProperties;
    }

    get carouselVideoModalCloseButtonStyle() {
        const sizeGiven = this.options.styling?.videoModal?.closeButton?.size;
        const areChildrenPresent = !!this.currentItem?.video?.overlayProps?.children;
        const { right: paddingRight, top: paddingTop } = this.optionsLogic.videoModalPadding;
        const rightStyle = paddingRight !== undefined ? {
            right: getCurrentValue(paddingRight, 0, this.isFullscreenMode),
        } as CSSProperties : {};
        const topStyle = paddingTop !== undefined ? {
            top: getCurrentValue(paddingTop, 0, this.isFullscreenMode),
        } as CSSProperties : {};
        const widthStyle = {
            width: !!sizeGiven ? getCurrentValue(sizeGiven, this.defaultButtonSize, this.isFullscreenMode) : this.isFullscreenMode ? undefined : CAROUSEL_VIDEO_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT,
        } as CSSProperties;

        return areChildrenPresent ? {
            ...rightStyle,
            ...topStyle,
            ...widthStyle,
        } as CSSProperties : {
            ...widthStyle,
        } as CSSProperties;
    }

    get carouselVideoModalStyle() {
        const { fontSize: fontSizeTemp, background, textColor, widthInPercent: widthInPercentTemp } = this.options.styling?.videoModal || {};
        const { bottom: paddingBottom, left: paddingLeft, right: paddingRight, top: paddingTop } = this.optionsLogic.videoModalPadding;
        const videoHeight = this.videoRef?.current?.getBoundingClientRect().height || 0;
        const videoModalHeight = this.videoModalRef?.current?.getBoundingClientRect().height || 0;
        const widthInPercent = getCurrentValue(widthInPercentTemp, undefined, this.isFullscreenMode)
        const widthToUse = widthInPercent !== undefined ? `${widthInPercent}%` : this.isMobile ? "100%" : "75%";
        const customFontSize = getCurrentValue(fontSizeTemp, this.isFullscreenMode ? CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT : CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT, this.isFullscreenMode);
        const itemViewerLeftPadding = this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer);
        const itemViewerRightPadding = this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer);
        const topOffsetForEmbeddedCase = (this.optionsLogic.isToolbarInVideo ? (this.itemViewerToolbarRef.current?.querySelector('div')?.getBoundingClientRect().height || 0) / 2 : 0);

        const widthStyle = !this.isFullscreenMode || this.isMobile ? {
            width: widthToUse,
            maxWidth: `calc(${widthToUse} - ${(itemViewerLeftPadding + itemViewerRightPadding) / 2}${CAROUSEL_SPACING_UNIT})`,
            boxShadow: `0 10px 15px -3px rgba(0,0,0,.25)`,
        } as CSSProperties : {};
        const paddingStyle = {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
        } as CSSProperties;
        const positionStyle = !this.isFullscreenMode ? {
            transform: 'translate(-50%, 0)',
            top: this.isMobile ? 0 : videoHeight && videoModalHeight ? `${((Math.abs(videoHeight - videoModalHeight) / 2) - topOffsetForEmbeddedCase)}${CAROUSEL_SPACING_UNIT}` : '50%',
        } as CSSProperties : {};
        const textStyle = {
            color: getCurrentValue(textColor, CAROUSEL_COLOR_ONE, this.isFullscreenMode),
            fontSize: customFontSize,
        } as CSSProperties;
        const backgroundStyle = {
            background: getCurrentValue(background, CAROUSEL_COLOR_FIVE, this.isFullscreenMode),
        } as CSSProperties;

        return {
            ...backgroundStyle,
            ...paddingStyle,
            ...widthStyle,
            ...positionStyle,
            ...textStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }

    get carouselVideoCloseButtonColor() {
        return getCurrentValue(this.options.styling?.videoModal?.closeButton?.fill, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
    }

    get carouselVideoContainerStyle() {
        const common = {
            position: 'relative',
            display: 'flex',
        } as CSSProperties;
        const layoutStyle = !this.optionsLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: this.isFullscreenMode ? 0 : this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer),
            paddingRight: this.isFullscreenMode ? 0 : this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer),
        } as CSSProperties : {

        };

        return {
            ...common,
            ...layoutStyle,
        }
    }

    get carouselVideoCurrentStateIndicatorButtonStyle() {
        const widthToUse = getCurrentValue(
            this.options.styling?.videoCurrentStateIndicator?.size,
            this.defaultButtonSize,
            this.isFullscreenMode
        );

        return {
            height: widthToUse,
            width: widthToUse,
        } as CSSProperties;
    }

    get carouselVideoCurrentStateIndicatorContainerStyle() {
        const buttonStyle = this.carouselVideoCurrentStateIndicatorButtonStyle;
        return {
            height: parseInt(buttonStyle?.width as string, 10) * 2.75,
            width: parseInt(buttonStyle?.width as string, 10) * 2.75,
        } as CSSProperties;
    }

    get carouselVideoStyle() {
        const objectStyles = {
            objectFit: this.currentItem?.video?.objectFit || 'contain',
            objectPosition: this.currentItem?.video?.objectPosition || 'bottom',
        } as CSSProperties;

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            ...objectStyles,
        } as CSSProperties : {};
    }

    getCarouselVideoProgressHitSlop() {
        const hitSlop = this.optionsLogic.videoProgressBarHitSlop;
        return {
            paddingTop: hitSlop.top,
            paddingBottom: hitSlop.bottom,
        }
    }

    get carouselVideoProgressContainerStyle() {
        const shouldSpanWholeWidth = getCurrentValue(this.options.styling?.toolbar?.progressBar?.shouldSpanContainerWidth, undefined, this.isFullscreenMode);
        const widthToUse = shouldSpanWholeWidth
            ? `calc(100% + ${this.getPaddingAmount(SpacingDirection.left, CarouselSection.toolbar) + this.getPaddingAmount(SpacingDirection.right, CarouselSection.toolbar)}${CAROUSEL_SPACING_UNIT})`
            : '100%';
        const heightToUse = this.optionsLogic.isToolbarInVideo ? 'auto' : CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT;

        const common = {
            height: heightToUse,
            background: 'transparent',
            width: widthToUse,
            position: 'relative',
            ...(this.optionsLogic.isToolbarInVideo ? this.getCarouselVideoProgressHitSlop() : {}),
        } as CSSProperties

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
    }

    getCarouselVideoProgressSectionCommonStyle(
        percent: number,
        left: number,
        index: number,
        sectionsLength: number,
        isBackgroundDiv = false,
    ) {
        const isFirst = index === 0;
        const isLast = index === sectionsLength - 1;
        const sectionGap = this.optionsLogic.videoProgressBarSectionGap;
        const borderString = `${sectionGap / 2}${CAROUSEL_SPACING_UNIT} solid transparent`;
        const borderLeftToUse = !isBackgroundDiv || isFirst ? undefined : borderString;
        const borderRightToUse = !isBackgroundDiv || isLast ? undefined : borderString;
        const widthOffset = isBackgroundDiv || sectionsLength <= 1 ? 0 : isFirst ? sectionGap / 2 : (isLast ? sectionGap / 2 : sectionGap);
        const leftOffset = isBackgroundDiv || isFirst ? 0 : -sectionGap / 2;

        return {
            width: percent >= 0 && percent <= 1 ? `calc(${percent * 100}% - ${widthOffset}${CAROUSEL_SPACING_UNIT})` : percent - widthOffset,
            left: sectionsLength <= 1 ? 0 : `calc(${left * 100}% - ${leftOffset}${CAROUSEL_SPACING_UNIT})`,
            borderLeft: borderLeftToUse,
            borderRight: borderRightToUse,
            backfaceVisibility: 'hidden',
        } as CSSProperties;
    }

    getCarouselVideoProgressBackgroundSectionContainerStyle(
        percent: number,
        left: number,
        index: number,
        sectionsLength: number,
        currentSectionIndex: number
    ) {
        const isCurrentSection = index === currentSectionIndex;
        const scaleAmount = this.optionsLogic.videoProgressBarScaleAmount;
        const isToolbarInVideo = this.optionsLogic.isToolbarInVideo;

        const common = {
            backfaceVisibility: 'hidden',
            transition: `transform .125s ease`,
            transformOrigin: isToolbarInVideo ? 'center' : 'top',
            // ...(isToolbarInVideo ? this.getCarouselVideoProgressHitSlop(isCurrentSection) : {}),
            ...this.getCarouselVideoProgressSectionCommonStyle(percent, left, index, sectionsLength, true),
        } as CSSProperties;

        if (sectionsLength <= 0) {
            return {
                width: '100%',
                position: 'absolute',
                transform: isCurrentSection ? `${this.carouselVideoProgressPositioningStyle.transform} scaleY(${scaleAmount})` : this.carouselVideoProgressPositioningStyle.transform,
                ...common,
            } as CSSProperties;
        }
        return {
            ...this.carouselVideoProgressPositioningStyle,
            background: 'transparent',
            transform: isCurrentSection ? `${this.carouselVideoProgressPositioningStyle.transform || ''} scaleY(${scaleAmount})` : this.carouselVideoProgressPositioningStyle.transform,
            ...common,
        } as CSSProperties;
    }

    get carouselVideoProgressBackgroundSectionStyle() {
        return {
            ...this.carouselVideoProgressBackgroundCommon,
            width: '100%',
        } as CSSProperties;
    }

    getCarouselVideoProgressForegroundStyle(
        percent: number,
        left: number,
        index: number,
        sectionsLength: number,
        currentSectionIndex: number
    ) {
        const isCurrent = index === currentSectionIndex;

        return {
            background: this.optionsLogic.videoProgressBarForegroundColor,
            height: this.optionsLogic.videoProgressBarHeight * (isCurrent ? this.optionsLogic.videoProgressBarScaleAmount : 1),
            ...this.carouselVideoProgressPositioningStyle,
            ...this.getCarouselVideoProgressSectionCommonStyle(percent, left, index, sectionsLength),
            zIndex: 2,
        }
    }

    getCarouselVideoProgressSeekDotStyle(percentWidthDecimal: number, isVisible: boolean, isInCurrentSection: boolean) {
        const scaleAmount = this.optionsLogic.videoProgressBarScaleAmount;
        const { diameter, isAlwaysVisible, transitionDuration } = this.optionsLogic.videoProgressBarDotSettings;
        return {
            left: `calc(${percentWidthDecimal * 100}% - ${diameter / 2}${CAROUSEL_SPACING_UNIT})`,
            borderRadius: '50%',
            position: 'absolute',
            background: this.optionsLogic.videoProgressBarForegroundColor,
            height: diameter,
            width: diameter,
            transform: `translate(0, -50%) scale(${(isVisible || isAlwaysVisible) ? (isInCurrentSection ? scaleAmount / 2 : '1') : '0'})`,
            transition: `opacity ${transitionDuration} ease, transform ${transitionDuration} ease`,
            zIndex: 10,
        } as CSSProperties;
    }

    getCarouselVideoProgressSeekStyle(
        percent: number,
        left: number,
        index: number,
        sectionsLength: number,
        currentSectionIndex: number
    ) {
        const isCurrent = index === currentSectionIndex;
        return {
            position: 'absolute',
            background: this.optionsLogic.videoProgressBarSeekColor,
            height: this.optionsLogic.videoProgressBarHeight * (isCurrent ? this.optionsLogic.videoProgressBarScaleAmount : 1),
            ...this.carouselVideoProgressPositioningStyle,
            ...this.getCarouselVideoProgressSectionCommonStyle(percent, left, index, sectionsLength),
        } as CSSProperties;
    }

    get carouselVideoProgressSeekThumbnailScreenShotStyle() {
        return {
            pointerEvents: 'none',
            border: '2px solid white',
            borderRadius: 2,
            backgroundColor: 'white',
            width: '100%'
        } as CSSProperties;
    }

    getCarouselVideoProgressSeekThumbnailContainerStyle(
        percent: number,
        videoRef: React.MutableRefObject<HTMLVideoElement | undefined> | undefined | null,
        toolbarElement: Element,
        screenShotTextElement: Element | undefined | null,
        screenShotCanvasElement: Element | undefined,
        textTranslateOffsetRef: React.MutableRefObject<TextTranslateOffset>,
    ) {
        const { width } = this.optionsLogic.videoProgressBarScreenshotViewer;
        const { left: paddingBetweenContainerAndVideo } = this.toolbarHorizontalSpacing;

        const isEmbedded = this.optionsLogic.isToolbarInVideo;
        const videoRect = videoRef?.current?.getBoundingClientRect();
        const toolbarInnerContainerRect = toolbarElement?.querySelector('div')?.getBoundingClientRect();
        const screenShotTextContainerRect = screenShotTextElement?.getBoundingClientRect();
        const screenShotCanvasRect = screenShotCanvasElement?.getBoundingClientRect();
        const progressBarElement = toolbarElement?.querySelector(`.${CLASSNAME__TOOLBAR_PROGRESS}`);
        const progressBarRect = progressBarElement?.getBoundingClientRect();
        const { paddingBottom: hitSlopBottom } = this.getCarouselVideoProgressHitSlop();

        const bottom = toolbarInnerContainerRect?.height && progressBarRect?.height
            ? toolbarInnerContainerRect.height - progressBarRect.height + (screenShotTextContainerRect?.height || 20) + hitSlopBottom + this.toolbarPaddingBottom + CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT * 1.33
            : (isEmbedded ? 103 : 90);

        let translateX = '-50%'
        let left = `${paddingBetweenContainerAndVideo + (videoRect?.width || 200) * percent}${CAROUSEL_SPACING_UNIT}`;
        let right = "auto";

        if (videoRect && screenShotCanvasRect && screenShotTextContainerRect && progressBarRect) {
            const cursorLeftPosition = videoRect.left + videoRect.width * percent;
            const minCursorLeftValue = videoRect.left + (screenShotCanvasRect.width / 2);
            const maxCursorLeftValue = videoRect.right - (screenShotCanvasRect.width / 2);
            const viewerLeft = screenShotCanvasRect.left;
            const viewerRight = screenShotCanvasRect.right;
            const leftBound = progressBarRect?.left;
            const rightBound = progressBarRect?.right;

            //handling right-bound case
            if ((viewerRight && viewerRight > rightBound) || cursorLeftPosition >= maxCursorLeftValue) {
                left = 'auto';
                right = `0${CAROUSEL_SPACING_UNIT}`;
                translateX = `${-paddingBetweenContainerAndVideo / 2}${CAROUSEL_SPACING_UNIT}`;
            }

            //handling left-bound case
            // console.log({ leftBound, viewerLeft, cursorLeftPosition, minCursorLeftValue });
            if ((viewerLeft && viewerLeft < leftBound) || cursorLeftPosition <= minCursorLeftValue) {
                left = `0${CAROUSEL_SPACING_UNIT}`;
                translateX = `${paddingBetweenContainerAndVideo / 2}${CAROUSEL_SPACING_UNIT}`;
            }

            //resetting
            if (cursorLeftPosition < maxCursorLeftValue && cursorLeftPosition > minCursorLeftValue) {
                // textTranslateOffsetRef.current = 0;
            }
        }


        // if (
        //     !screenShotCanvasRect ||
        //     !screenShotTextContainerRect ||
        //     !progressBarRect ||
        //     !videoRect ||
        //     percent <= PROGRESS_BAR_PERCENT_INITIAL_VALUE
        // ) return {
        //     display: 'none',
        //     left: '-1000px',
        // } as CSSProperties;
        return {
            padding: 10,
            width: width + 20,
            pointerEvents: 'none',
            borderRadius: 4,
            textAlign: 'center',
            position: 'absolute',
            bottom,
            left,
            right,
            background: 'transparent',
            zIndex: 100000000,
            transform: `translateX(${translateX})`,
        } as CSSProperties;
    }

    get carouselVideoProgressSeekThumbnailTextContainerStyle() {
        return {
            color: 'white',
            position: 'absolute',
            width: '10000px', //this is a hack to align this centered since translateX(-50%) doesn't work
            transform: `translateX(calc(-4912${CAROUSEL_SPACING_UNIT})`, //this is a hack to align this centered since translateX(-50%) doesn't work
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        } as CSSProperties;
    }

    getCarouselVideoProgressSeekThumbnailTextStyle(
        percent: number,
        videoRef: React.MutableRefObject<HTMLVideoElement | undefined> | undefined | null,
        screenShotTextElement: Element | undefined | null,
        screenShotCanvasElement: Element | undefined,
        textTranslateOffsetRef: React.MutableRefObject<TextTranslateOffset>,
        textTranslationAmountRef: React.MutableRefObject<number>,
    ) {
        const screenShotCanvasRect = screenShotCanvasElement?.getBoundingClientRect();
        const screenShotTextContainerRect = screenShotTextElement?.getBoundingClientRect();

        if (screenShotCanvasRect && screenShotTextContainerRect) {
            const isTextOusdieCanvasBound = screenShotCanvasRect.right < screenShotTextContainerRect.right || screenShotCanvasRect.left > screenShotTextContainerRect.left;
            if (isTextOusdieCanvasBound) {
                const isTextTranslateOffsetRefDone = Object.keys(textTranslateOffsetRef?.current || {}).length > 0
                const videoRect = videoRef?.current?.getBoundingClientRect();

                //setting textTranslateOffsetRef
                if (
                    !isTextTranslateOffsetRefDone &&
                    videoRect &&
                    textTranslateOffsetRef.current
                ) {
                    let leftOffset = 0;
                    if (screenShotCanvasRect.left > screenShotTextContainerRect.left) {
                        leftOffset = Math.abs(screenShotCanvasRect.left - screenShotTextContainerRect.left);
                    }

                    let rightOffset = 0;
                    if (screenShotCanvasRect.right < screenShotTextContainerRect.right) {
                        rightOffset = Math.abs(screenShotCanvasRect.right - screenShotTextContainerRect.right);
                    }

                    const minCursorLeftValue = videoRect?.left + (screenShotCanvasRect.width / 2) + leftOffset;
                    const maxCursorLeftValue = videoRect.right - (screenShotCanvasRect.width / 2) - rightOffset;

                    textTranslateOffsetRef.current = {
                        left: Math.abs(screenShotCanvasRect.left - screenShotTextContainerRect.left),
                        maxCursorLeftValue,
                        minCursorLeftValue,
                        right: Math.abs(screenShotCanvasRect.right - screenShotTextContainerRect.right),
                    }
                }

                //tracking cursor against textTranslateOffsetRef and setting textTranslationAmountRef
                if (isTextTranslateOffsetRefDone && videoRect) {
                    const cursorLeftPosition = videoRect.left + videoRect.width * percent;

                    if (cursorLeftPosition >= textTranslateOffsetRef.current.maxCursorLeftValue) {
                        textTranslationAmountRef.current = -textTranslateOffsetRef.current.right;
                    } else if (cursorLeftPosition <= textTranslateOffsetRef.current.minCursorLeftValue) {
                        textTranslationAmountRef.current = textTranslateOffsetRef.current.left;
                    } else if (
                        cursorLeftPosition > textTranslateOffsetRef.current.minCursorLeftValue &&
                        cursorLeftPosition < textTranslateOffsetRef.current.maxCursorLeftValue
                    ) {
                        textTranslationAmountRef.current = TEXT_TRANSLATION_AMOUNT_REF_INITIAL;
                    }
                    // console.log({ cursorLeftPosition, minCursorLeftValue: textTranslateOffsetRef.current.minCursorLeftValue, maxCursorLeftValue: textTranslateOffsetRef.current.maxCursorLeftValue });
                }
            }
        }

        return {
            transform: !!textTranslationAmountRef.current ? `translateX(${textTranslationAmountRef.current}${CAROUSEL_SPACING_UNIT})` : 'none',
        } as CSSProperties;
    }

    get carouselVideoProgressBackgroundCommon() {
        return {
            height: this.optionsLogic.videoProgressBarHeight,
            background: this.optionsLogic.videoProgressBarBackgroundColor,
        } as CSSProperties;
    }

    get carouselVideoProgressPositioningStyle() {
        const isToolbarInVideo = this.optionsLogic.isToolbarInVideo;

        return {
            position: 'absolute',
            transform: isToolbarInVideo ? 'translate(0, -50%)' : undefined,
            left: 0,
        } as CSSProperties;
    }

    get carouselVideoTimeTextDividierStyle() {
        return {
            paddingInline: CAROUSEL_ITEM_SPACING_DEFAULT / 2,
        } as CSSProperties;
    }

    get carouselVideoTimeTextStyle() {
        return !this.optionsLogic.isDefaultItemDisplayLocation && !this.isFullscreenMode ? {
            paddingInline: CAROUSEL_ITEM_SPACING_DEFAULT / 2,
            flexGrow: 0,
        } as CSSProperties : {};
    }

    get defaultButtonSize() {
        return this.isMobile ? CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT : CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT;
    }

    get isCurrentItemSelected() {
        return !this.optionsLogic.isDefaultItemDisplayLocation && !!this.isCurrentItem;
    }

    get itemViewerContainerHorizontalPadding() {
        const padding = this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer) + this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer);
        return padding;
    }

    get fontFamilyItemViewerStyle() {
        const stylings = this.options?.styling;
        const fontFamily = stylings?.fontFamily || {};
        return fontFamily?.all || fontFamily?.itemViewer ? {
            fontFamily: getCurrentValue(fontFamily?.all, undefined, this.isFullscreenMode) || getCurrentValue(fontFamily?.itemViewer, undefined, this.isFullscreenMode) || this.DEFAULT_FONT_FAMILY,
        } : {};
    }

    get fontFamilyNavigationStyle() {
        const stylings = this.options?.styling;
        const fontFamily = stylings?.fontFamily || {};
        return fontFamily?.all || fontFamily?.navigation ? {
            fontFamily: getCurrentValue(fontFamily?.all, undefined, this.isFullscreenMode) || getCurrentValue(fontFamily?.navigation, undefined, this.isFullscreenMode) || this.DEFAULT_FONT_FAMILY,
        } : {};
    }

    get itemViewerBackgroundColor() {
        return getCurrentValue(this.options.styling?.itemViewer?.background, undefined, this.isFullscreenMode) || getCurrentValue(this.options.styling?.container?.background, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
    }

    get navigationContainerHorizontalPadding() {
        const navigationPadding = this.getPaddingAmount(SpacingDirection.left, CarouselSection.navigation) + this.getPaddingAmount(SpacingDirection.right, CarouselSection.navigation);
        return navigationPadding;
    }

    get navigationStyle() {
        const common = {
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties;

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            marginBottom: 0,
            paddingTop: CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
            paddingBottom: this.optionsLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEM_SPACING_DEFAULT * 2 : 0,
            ...common,
        } as CSSProperties : {
            ...common,
            paddingTop: CAROUSEL_ITEM_SPACING_DEFAULT,

        };
    }

    get thumbnailOverlayBackgroundStyle() {
        const thumbnail = this.options?.thumbnail;
        const solid = thumbnail?.descriptionOverlay?.background?.solid;
        const gradient = thumbnail?.descriptionOverlay?.background?.gradient;
        const shouldHideOverlay = this.optionsLogic.shouldHideThumbnailOverlay;
        const shouldDisableDescriptionOverlay = this.optionsLogic.shouldDisableThumbnailOverlay;

        const backgroundSolidStyle = !!solid ? {
            background: 'none',
            backgroundColor: convertHexToRgba(
                getCurrentValue(solid?.color, CAROUSEL_COLOR_ONE, this.isFullscreenMode).trim(),
                getCurrentValue(solid?.opacity, CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT, this.isFullscreenMode),
            ),
        } as CSSProperties : {};

        const disabledStyle = shouldDisableDescriptionOverlay ? {
            display: 'none'
        } as CSSProperties : {};

        const backgroundGradientStyle = gradient ? {
            background: `linear-gradient(${getCurrentValue(gradient?.angle, 180, this.isFullscreenMode)}deg, ${convertHexToRgba(getCurrentValue(gradient.start?.color, CAROUSEL_COLOR_FIVE, this.isFullscreenMode), getCurrentValue(gradient.start?.opacity, 0, this.isFullscreenMode))} 0%, ${convertHexToRgba(getCurrentValue(gradient.end?.color, CAROUSEL_COLOR_ONE, this.isFullscreenMode), getCurrentValue(gradient.end?.opacity, 1, this.isFullscreenMode))} 100%)`,
        } as CSSProperties : {};

        const bottomStyle = shouldHideOverlay ? {
            bottom: '-100%',
        } as CSSProperties : {};

        const paddingStyle = {
            padding: this.optionsLogic.carouselItemSize * 0.06666667
        } as CSSProperties

        const thumbnailBackgroundStyle = {
            ...paddingStyle,
            ...bottomStyle,
            ...backgroundSolidStyle,
            ...backgroundGradientStyle,
            ...this.carouselItemCursorStyle,
            ...disabledStyle,
        } as CSSProperties

        return thumbnailBackgroundStyle;
    }

    get thumbnailOverlayTextStyle() {
        const thumbnail = this.options?.thumbnail;

        const fontSizeStyle = thumbnail ? {
            fontSize: getCurrentValue(thumbnail?.descriptionOverlay?.fontSize, -1, this.isFullscreenMode),
        } as React.CSSProperties : {};
        const maxLineCountStyle = {
            WebkitLineClamp: getCurrentValue(thumbnail?.descriptionOverlay?.maxLineCount, CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT, this.isFullscreenMode),
        } as React.CSSProperties;

        const textColorStyle = thumbnail?.descriptionOverlay?.textColor ? {
            color: getCurrentValue(thumbnail?.descriptionOverlay?.textColor, CAROUSEL_COLOR_FIVE, this.isFullscreenMode),
        } as React.CSSProperties : {};

        return {
            ...maxLineCountStyle,
            ...fontSizeStyle,
            ...textColorStyle,
            ...this.carouselItemCursorStyle,
        }
    }

    get toolbarHorizontalSpacing() {
        const left = this.getPaddingAmount(SpacingDirection.left, CarouselSection.toolbar, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT);
        const right = this.getPaddingAmount(SpacingDirection.right, CarouselSection.toolbar, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT);
        return {
            left,
            right
        }
    }

    get toolbarStyle() {
        const isItemVideo = getIsVideo(this.currentItem);
        const { left: leftSpacing, right: rightSpacing } = this.toolbarHorizontalSpacing;

        const paddingHorizontalStyle = {
            paddingLeft: this.optionsLogic.isToolbarInVideo && !this.isFullscreenMode ? 0 : leftSpacing,
            paddingRight: this.optionsLogic.isToolbarInVideo && !this.isFullscreenMode ? 0 : rightSpacing,
            marginLeft: !this.optionsLogic.isToolbarInVideo || this.isFullscreenMode ? 0 : leftSpacing,
            marginRight: !this.optionsLogic.isToolbarInVideo || this.isFullscreenMode ? 0 : rightSpacing,
        } as CSSProperties;
        const nonDefaultItemDisplayStyle = !this.isFullscreenMode ? {
            ...this.getToolbarBackgroundColorStyle(),
            ...paddingHorizontalStyle,
            position: this.optionsLogic.isToolbarInVideo ? "absolute" : "relative",
            width: this.optionsLogic.isToolbarInVideo ? undefined : '100%',
            paddingTop: isItemVideo ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
            paddingBottom: this.toolbarPaddingBottom,
            top: this.optionsLogic.isToolbarInVideo ? '50%' : undefined,
            justifyContent: 'flex-end',
            pointerEvents: 'none',
        } as React.CSSProperties : {
            ...paddingHorizontalStyle,
        };

        return {
            ...nonDefaultItemDisplayStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }

    get toolbarInnerContainerStyle() {
        const isVideo = getIsVideo(this.currentItem);
        const isEmbedded = this.optionsLogic.isToolbarInVideo;
        const progressBarHitSlop = this.optionsLogic.videoProgressBarHitSlop;
        return {
            paddingLeft: isEmbedded && !this.isFullscreenMode ? CAROUSEL_ITEM_SPACING_DEFAULT : undefined,
            paddingRight: isEmbedded && !this.isFullscreenMode ? CAROUSEL_ITEM_SPACING_DEFAULT : undefined,
            marginTop: isVideo && isEmbedded ? Math.max(CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT - progressBarHitSlop.bottom, 0) : 0,
        } as CSSProperties;
    }


    get toolbarOuterContainerStyle() {
        return {
            position: 'relative',
            pointerEvents: "all",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexEnd",
            alignItems: "center",
        } as CSSProperties;
    }

    get toolbarPaddingBottom() {
        return this.optionsLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - (this.optionsLogic.isToolbarInVideo ? 0 : CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT);
    }
    //#endregion

    //#region Private Getters
    private get allFillColor() {
        return getCurrentValue(this.options.styling?.elements?.all?.fillColor, undefined, this.isFullscreenMode);
    }

    private get imageHeight() {
        const toolbarWidth = this.itemViewerToolbarRef?.current?.getBoundingClientRect()?.width || CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT;
        return this.isFullscreenMode ? '100%' : (toolbarWidth) * 9 / 16;
    }
    //#endregion

    //#region Public Methods
    getButtonColor(buttonName: CarouselElement, fallbackColor = CAROUSEL_COLOR_FIVE) {
        const specificFillColor = getCurrentValue(this.options.styling?.elements?.[buttonName]?.fillColor, undefined, this.isFullscreenMode);

        switch (buttonName) {
            case CarouselElement.arrowLeft:
            case CarouselElement.arrowRight:
            case CarouselElement.dots:
                const navigationElementsColor = getCurrentValue(this.options.styling?.navigation?.elements?.color, undefined, this.isFullscreenMode);
                return specificFillColor || navigationElementsColor || this.allFillColor || fallbackColor;
            case CarouselElement.closeButton:
            case CarouselElement.fullscreenButton:
            case CarouselElement.nextButton:
            case CarouselElement.pauseButton:
            case CarouselElement.playButton:
            case CarouselElement.previousButton:
            case CarouselElement.seekBackButton:
            case CarouselElement.seekForwardButton:
                const toolbarElementsColor = getCurrentValue(this.options.styling?.toolbar?.elements?.color, undefined, this.isFullscreenMode);
                return specificFillColor || toolbarElementsColor || this.allFillColor || fallbackColor;
            default:
                return specificFillColor || this.allFillColor || fallbackColor;
        }
    }

    //todo: this is currently setup with the assumption that givenButtonSize comes from toolbar.buttonSize
    //need to generalize for other cases (think individual button options)
    //this is used on the button container for each button and the dots
    getCarouselElementSizeStlye(buttonName: CarouselElement, size = 0) {
        let sectionButtonSize;
        switch (buttonName) {
            case CarouselElement.arrowLeft:
            case CarouselElement.arrowRight:
            case CarouselElement.dots:
                sectionButtonSize = getCurrentValue(this.options.styling?.navigation?.elements?.size, this.defaultButtonSize, this.isFullscreenMode);
                break;
            case CarouselElement.closeButton:
            case CarouselElement.fullscreenButton:
            case CarouselElement.nextButton:
            case CarouselElement.pauseButton:
            case CarouselElement.playButton:
            case CarouselElement.previousButton:
            case CarouselElement.seekBackButton:
            case CarouselElement.seekForwardButton:
                sectionButtonSize = getCurrentValue(this.options.styling?.toolbar?.elements?.size, this.defaultButtonSize, this.isFullscreenMode);
                break;
        }

        const valueToUse = size || sectionButtonSize || this.defaultButtonSize;

        return {
            width: valueToUse,
            height: valueToUse,
        } as CSSProperties
    }

    //this is used on the individual divs within a given button
    getCarouselElementChildSizeStlye({ buttonName, subElementName, style }: GetToolbarButtonSizeStlye) {
        const buttonSizeStyle = this.getCarouselElementSizeStlye(buttonName, parseInt(style?.width as string, 10) || 0);
        const parsedWidth = parseInt(buttonSizeStyle.width as string, 10);
        const maxHeightFactor = .8333333;

        const arrowButtonHeight = Math.hypot(parsedWidth, parsedWidth / 2) / 3;
        const commonArrowButtonStyle = {
            width: parsedWidth / 8,
            height: arrowButtonHeight,
        };
        const arrowButtonTranslationAmountOne = arrowButtonHeight / Math.sqrt(40); //no idea why 40 works here
        const arrowButtonTranslationAmountTwo = parsedWidth / Math.sqrt(40);
        const arrowButtonTopOneStlye = {
            top: `calc((50% + ${arrowButtonTranslationAmountOne}${CAROUSEL_SPACING_UNIT}) - ${arrowButtonTranslationAmountTwo}${CAROUSEL_SPACING_UNIT})`,
        } as CSSProperties
        const arrowButtonTopTwoStlye = {
            top: `calc((50% - ${arrowButtonTranslationAmountOne}${CAROUSEL_SPACING_UNIT}) + ${arrowButtonTranslationAmountTwo}${CAROUSEL_SPACING_UNIT})`,
        } as CSSProperties

        switch (buttonName) {
            case CarouselElement.arrowLeft:
                switch (subElementName) {
                    case "first":
                        return {
                            ...commonArrowButtonStyle,
                            ...arrowButtonTopOneStlye,
                        }
                    case "second":
                        return {
                            ...commonArrowButtonStyle,
                            ...arrowButtonTopTwoStlye,
                        }
                    default: return {};
                }
            case CarouselElement.arrowRight:
                switch (subElementName) {
                    case "first":
                        return {
                            ...commonArrowButtonStyle,
                            ...arrowButtonTopTwoStlye,
                        }
                    case "second":
                        return {
                            ...commonArrowButtonStyle,
                            ...arrowButtonTopOneStlye,
                        }
                    default: return {};
                }
            case CarouselElement.closeButton:
                return {
                    height: parsedWidth,
                    width: parsedWidth / 4,
                } as CSSProperties;
            case CarouselElement.fullscreenButton:
                return {
                    height: parsedWidth / 8,
                }
            case CarouselElement.playButton:
            case CarouselElement.nextButton:
            case CarouselElement.previousButton:
            case CarouselElement.seekBackButton:
            case CarouselElement.seekForwardButton:
                const isPlayButton = buttonName === CarouselElement.playButton;
                const isNextButton = buttonName === CarouselElement.nextButton;
                const isPreviousButton = buttonName === CarouselElement.previousButton;
                const isSeekButton = buttonName === CarouselElement.seekBackButton || buttonName === CarouselElement.seekForwardButton;
                const triangleSizeFactorDefaultCase = 2.25;
                const triangleSizeFactorPlayCase = 1.5;
                const triangleSizeFactorSeekCase = 3;

                switch (subElementName) {
                    case "triangle":
                        return {
                            borderTop: `${parsedWidth / triangleSizeFactorDefaultCase}${CAROUSEL_SPACING_UNIT} solid transparent`,
                            borderBottom: `${parsedWidth / triangleSizeFactorDefaultCase}${CAROUSEL_SPACING_UNIT} solid transparent`,
                            borderLeft:
                                isNextButton || isPlayButton || isSeekButton ?
                                    `${parsedWidth / (isPlayButton ? triangleSizeFactorPlayCase : isSeekButton ? triangleSizeFactorSeekCase : triangleSizeFactorDefaultCase)}${CAROUSEL_SPACING_UNIT} solid ${style?.borderLeftColor}` :
                                    undefined,
                            borderRight:
                                isPreviousButton ?
                                    `${parsedWidth / triangleSizeFactorDefaultCase}${CAROUSEL_SPACING_UNIT} solid ${style?.borderRightColor}` :
                                    undefined,
                        }
                    case "bar":
                        return {
                            width: parsedWidth / 8,
                            height: parsedWidth * maxHeightFactor,
                            transform:
                                isNextButton || isPreviousButton ?
                                    `translate(calc(-50% ${isNextButton ? '+' : '-'} ${parsedWidth * maxHeightFactor / 3 * (isPreviousButton ? .85 : 1)}${CAROUSEL_SPACING_UNIT}), -50%) rotate(0)`
                                    : undefined,
                        }
                    default:
                        return buttonSizeStyle;
                }
            case CarouselElement.pauseButton:
                const pauseBarHeight = parsedWidth * maxHeightFactor;
                const pauseBarWidth = parsedWidth * .25;
                const isLeftSide = subElementName === 'left';
                return {
                    width: pauseBarWidth,
                    height: pauseBarHeight,
                    transform: isLeftSide ?
                        `translate(calc(-50% - ${pauseBarWidth * maxHeightFactor * maxHeightFactor}${CAROUSEL_SPACING_UNIT}), -50%) rotate(0)` :
                        `translate(calc(-50% + ${pauseBarWidth * maxHeightFactor * (1 / maxHeightFactor)}${CAROUSEL_SPACING_UNIT}), -50%) rotate(0)`,
                }
            default:
                return buttonSizeStyle;
        }
    }

    //This is a function rather than a getter to allow for setting of itemContainer height manually which prevent "jumping" when switching between item types
    getCarouselItemContainerStyle(height: number | string = 'auto') {
        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: this.isFullscreenMode ? '100vh' : height,
            position: "relative",
            backgroundColor: this.itemViewerBackgroundColor,
            justifyContent: this.isFullscreenMode ? 'center' : 'flex-end',
            overflow: "hidden",
        } as CSSProperties : {};
    }

    getCarouselItemsInnerContainerStyle(interItemSpacing: number, translationAmount: number) {
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            this.items.length,
            this.carouselContainerRef?.current,
            this,
            this.optionsLogic
        );
        const itemPositioning = this.optionsLogic.itemPositioning;
        const numberOfItemsToUse = Math.min(numberOfWholeItemsThatCanFit, (this.items?.length || Number.MAX_SAFE_INTEGER));
        const numberOfSpaces = numberOfItemsToUse - 1;
        const itemSpacing = this.optionsLogic.getItemSpacing(interItemSpacing);
        const widthOfInterItemSpacing = numberOfSpaces * itemSpacing;
        const widthOfItems = numberOfItemsToUse * itemSize;

        // console.log({
        //     numberOfItemsToUse,
        //     containerWidth,
        //     givenItemSpacing: this.options.thumbnail?.itemSpacing,
        //     itemPositioning,
        //     widthOfItems,
        //     widthOfInterItemSpacing, interItemSpacing, numberOfSpaces
        // });
        const positioningStyle = itemPositioning === 'center' ? {
            marginLeft: Math.max((containerWidth - (widthOfItems + widthOfInterItemSpacing)) / 2, 0),
        } as CSSProperties : itemPositioning === 'right' ? {
            marginLeft: Math.max((containerWidth - (widthOfItems + widthOfInterItemSpacing)), 0),
        } : {} as CSSProperties;
        const interItemSpacingStyle = {
            columnGap: itemSpacing,
        } as CSSProperties
        const translationStyle = {
            transform: `translateX(${translationAmount < 0 ? '' : '-'}${Math.abs(translationAmount)}${CAROUSEL_SPACING_UNIT})`,
        } as CSSProperties

        return {
            ...interItemSpacingStyle,
            ...translationStyle,
            ...positioningStyle,
        } as CSSProperties
    }

    getCarouselShortcutIndicatorContainerStlye(showButton: boolean) {
        const containerStyle = !showButton ? {
            display: 'none',
        } as React.CSSProperties : {};

        return {
            ...containerStyle,
        } as CSSProperties;
    }

    getCarouselShortcutIndicatorTextStlye(position: CarouselItemViewerShortcutIndicatorPosition) {
        const isVideo = getIsVideo(this.currentItem);
        const { paddingTop: hitSlopTop, paddingBottom: hitSlopBottom } = this.getCarouselVideoProgressHitSlop();
        const topStyle = {
            top: this.optionsLogic.isToolbarInVideo ? -hitSlopTop - hitSlopBottom + (!isVideo ? CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT : 0) : -hitSlopBottom - (isVideo ? 2 : .5) * CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT
        };
        const commonStyle = {
            zIndex: 1000000000000,
            ...topStyle,
        } as CSSProperties;
        const shortcutStyle = position === 'left' ? {
            ...commonStyle,
            left: 0,
            right: 'auto',
            transform: 'translate(0%, -100%)',
        } as React.CSSProperties : position === 'right' ? {
            ...commonStyle,
            right: 0,
            left: 'auto',
            transform: 'translate(0%, -100%)',
        } as React.CSSProperties : {
            ...commonStyle,
            transform: 'translate(-50%, -100%)',
        };

        return {
            ...shortcutStyle
        } as CSSProperties;
    }

    getToolbarBackgroundColorStyle(shouldUseSolidColor = false) {
        const customColor = getCurrentValue(this.options.styling?.toolbar?.background, undefined, this.isFullscreenMode) || getCurrentValue(this.options.styling?.container?.background, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
        const backgroundToUse = this.optionsLogic.useDefaultVideoControls && getIsVideo(this.currentItem) ? 'transparent' : this.optionsLogic.isToolbarInVideo && !shouldUseSolidColor ? `linear-gradient(0deg, ${customColor}, transparent)` : customColor;
        return {
            background: backgroundToUse,
        } as CSSProperties
    }

    getVideoCurrentStateIndicatorForegroundColor(isPlayButton: boolean) {
        const foregroundColor = getCurrentValue(
            this.options.styling?.videoCurrentStateIndicator?.foregroundColor,
            CAROUSEL_COLOR_FIVE,
            this.isFullscreenMode
        );
        const buttonColor = getCurrentValue(
            this.options.styling?.videoCurrentStateIndicator?.[isPlayButton ? 'playIcon' : 'pauseIcon']?.fillColor,
            undefined,
            this.isFullscreenMode
        );
        return buttonColor || foregroundColor;
    }

    static getCarouselVideoModalChildStyle(index: number) {
        return {
            paddingTop: index === 0 ? 0 : CAROUSEL_OVERLAY_ITEM_PADDING_TOP,
        } as CSSProperties;
    }

    static getColorStyle(fillColor: string, propertyName: keyof CSSProperties, style = {} as CSSProperties) {
        return {
            ...style,
            [propertyName]: fillColor,
        } as CSSProperties;
    }
    //#endregion

    //#region Private Methods
    /*
    *Only accepts three argument versions or border https://developer.mozilla.org/en-US/docs/Web/CSS/border
    *Currently there is no keyword recognition so something like 'thickest double #000' will be considered valid.
    *If the border isn't showing up, check your string to make sure it is valid.
    */
    private getBorderStringToUse(borderStr: CSSProperties['border'], defaultValue = `1${CAROUSEL_SPACING_UNIT} solid ${CAROUSEL_COLOR_FOUR}`) {
        const borderStrToUse = borderStr?.toString();
        const isValid = borderStr && borderStrToUse?.trim()?.split(/(\s+|rgb.+\))/)?.filter(item => !!item && item?.match(/\w+/))?.length === 3;
        return isValid ? borderStr : defaultValue;
    }

    private getPaddingAmount(direction: SpacingDirection, item: CarouselSection, defaultOverride?: number) {
        let defaultPadding: number;
        let allPadding: number | undefined;
        let customPadding: number | undefined;

        switch (direction) {
            case SpacingDirection.bottom: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.optionsLogic.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : this.optionsLogic.isItemDisplayLocationBelow ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = getCurrentValue(this.options.styling?.container?.padding?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.fullscreen?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingNonFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.nonFullscreen?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingBoth = getCurrentValue((this.options.styling?.[item] as any)?.padding?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingToUse = this.isFullscreenMode ? (specificElementPaddingFullscreen || specificElementPaddingBoth) : (specificElementPaddingNonFullscreen || specificElementPaddingBoth);
                customPadding = specificElementPaddingToUse || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            }
            case SpacingDirection.left: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.optionsLogic.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = getCurrentValue(this.options.styling?.container?.padding?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.fullscreen?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingNonFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.nonFullscreen?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingBoth = getCurrentValue((this.options.styling?.[item] as any)?.padding?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingToUse = this.isFullscreenMode ? (specificElementPaddingFullscreen || specificElementPaddingBoth) : (specificElementPaddingNonFullscreen || specificElementPaddingBoth);
                customPadding = specificElementPaddingToUse || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            }
            case SpacingDirection.right: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.optionsLogic.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = getCurrentValue(this.options.styling?.container?.padding?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingBoth = getCurrentValue((this.options.styling?.[item] as any)?.padding?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.fullscreen?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingNonFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.nonFullscreen?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingToUse = this.isFullscreenMode ? (specificElementPaddingFullscreen || specificElementPaddingBoth) : (specificElementPaddingNonFullscreen || specificElementPaddingBoth);
                customPadding = specificElementPaddingToUse || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            }
            case SpacingDirection.top: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.optionsLogic.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : this.optionsLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = getCurrentValue(this.options.styling?.container?.padding?.top, undefined, this.isFullscreenMode);
                const specificElementPaddingFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.fullscreen?.top, undefined, this.isFullscreenMode);
                const specificElementPaddingNonFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.nonFullscreen?.top, undefined, this.isFullscreenMode);
                const specificElementPaddingBoth = getCurrentValue((this.options.styling?.[item] as any)?.padding?.top, undefined, this.isFullscreenMode);
                const specificElementPaddingToUse = this.isFullscreenMode ? (specificElementPaddingFullscreen || specificElementPaddingBoth) : (specificElementPaddingNonFullscreen || specificElementPaddingBoth);
                customPadding = specificElementPaddingToUse || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            }
        }
        //#endregion
    }
}