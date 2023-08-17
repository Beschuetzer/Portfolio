import { CSSProperties } from "react";
import { CarouselElement, CarouselSection, CarouselOptions, CarouselVideoCurrentStateIndicatorButtonName, SpacingDirection } from "../types";
import { OptionsLogic } from "./OptionsLogic";
import { convertColorNameToHex, convertHexToRgba, getCurrentValue, getIsVideo, getNumberOfItemsThatCanFit } from "../utils";
import {
    CAROUSEL_SPACING_UNIT,
    CAROUSEL_COLOR_FOUR,
    CAROUSEL_COLOR_FIVE,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT,
    CAROUSEL_ITEM_SPACING_DEFAULT,
    CAROUSEL_OVERLAY_ITEM_PADDING_TOP,
    CAROUSEL_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_CENTER_LINE_OPACITY_DEFAULT,
    CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT,
    CLASSNAME__TOOLBAR_PROGRESS,
    CLASSNAME__ITEM_VIEWER_TOOLBAR,
} from "../constants";
import { CarouselModalInternalProps } from "../components/CarouselModal";
import { LoadingSpinnerProps, LoadingSpinnerOptions } from "../components/LoadingSpinner";
import { CarouselContextInputProps, CarouselContextOutputProps } from "../context";
import { RegexpPattern } from "./RegexpPattern";
import { CarouselItemViewerShortcutIndicatorPosition } from "../components/item-viewer/toolbar/CarouselItemViewerShortcutIndicator";
import { TEXT_TRANSLATION_AMOUNT_REF_INITIAL, TextTranslateOffset } from "../components/item-viewer/progress-bar/CarouselItemViewerProgressBarScreenshotViewer";
import { TranslationAmountChange } from "../components/CarouselContent";

export type StylingLogicConstructor = {
    isCurrentItem?: boolean;
    itemViewerToolbarRef?: React.MutableRefObject<HTMLElement | undefined>;
    loadingSpinnerOptions?: LoadingSpinnerProps['options'];
    modalRef?: React.MutableRefObject<HTMLElement | undefined> | undefined;
    options: CarouselOptions | undefined;
    optionsLogic?: OptionsLogic;
} & Partial<Pick<CarouselContextOutputProps, 'currentItem' | 'isFullscreenMode' | 'numberOfPages' | 'items'>>
    & Partial<Pick<CarouselContextInputProps, 'carouselContainerRef'>>
    & Partial<Pick<CarouselModalInternalProps, 'itemRef'>>

export type GetToolbarButtonSizeStlye = {
    buttonName: CarouselElement;
    subElementName?: string;
    style?: CSSProperties;
}

/*
*Use this when extending styling options.  Many default styles are currently in _carousel.scss or _buttons_scss
*/
export class StylingLogic {
    private LAST_PAGE_CAROUSEL_AMOUNT_INITIAL = 0;

    private carouselContainerRef;
    private currentItem;
    private isCurrentItem: boolean | undefined;
    private isCurrentItemVideo: boolean;
    private optionsLogic: OptionsLogic;
    private items;
    private itemViewerToolbarRef;
    private isFullscreenMode: boolean;
    private lastPageCarouselTranslationAmount: number;
    private loadingSpinnerOptions: LoadingSpinnerProps['options'];
    private numberOfPages;
    private options: CarouselOptions;
    private modalRef: React.MutableRefObject<HTMLElement | undefined> | undefined;
    private modalHeight: number;
    private itemRef;

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
            modalRef,
            itemRef,
        } = constructor;
        this.carouselContainerRef = carouselContainerRef;
        this.currentItem = currentItem;
        this.isCurrentItem = isCurrentItem;
        this.isCurrentItemVideo = getIsVideo(currentItem);
        this.isFullscreenMode = !!isFullscreenMode;
        this.items = items || [];
        this.loadingSpinnerOptions = loadingSpinnerOptions;
        this.itemViewerToolbarRef = itemViewerToolbarRef || { current: null };
        this.lastPageCarouselTranslationAmount = this.LAST_PAGE_CAROUSEL_AMOUNT_INITIAL;
        this.numberOfPages = numberOfPages || 0;
        this.itemRef = itemRef;
        this.modalRef = modalRef;
        this.modalHeight = 0;
        this.options = options || {};
        this.optionsLogic = optionsLogic || new OptionsLogic({ options: this.options, isFullscreenMode: false });
    }

    //#region Public Getters
    get carouselImageContainerStlye() {
        const { left: leftSpacing, right: rightSpacing } = this.getItemViewerHorizontalSpacing(0);

        return {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            width: '100%',
            height: '100%',
            paddingLeft: leftSpacing,
            paddingRight: rightSpacing,
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
            background: this.optionsLogic.navigationBackground || this.optionsLogic.carouselContainerBackgroundColor,
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
        const customCurrenItemBorder = this.optionsLogic.thumbnailBorderString;

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
            backgroundColor: this.optionsLogic.itemViewerBackgroundColor,
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

    get carouselModalCloseButtonStyle() {
        const areChildrenPresent = !!this.currentItem?.modal?.children;
        const { right: paddingRight, top: paddingTop } = this.optionsLogic.modalPadding;
        const rightStyle = paddingRight !== undefined ? {
            right: paddingRight,
        } as CSSProperties : {};
        const topStyle = paddingTop !== undefined ? {
            top: paddingTop,
        } as CSSProperties : {};
        const widthStyle = {
            width: this.optionsLogic.modalCloseButtonWidth,
        } as CSSProperties;

        return areChildrenPresent ? {
            ...rightStyle,
            ...topStyle,
            ...widthStyle,
        } as CSSProperties : {
            ...widthStyle,
        } as CSSProperties;
    }

    getCarouselModalStyle(shouldHide: boolean, modalHeight: number) {
        const isToolbarEmbedded = this.optionsLogic.isToolbarInVideo;
        const { bottom: paddingBottom, left: paddingLeft, right: paddingRight, top: paddingTop } = this.optionsLogic.modalPadding;
        const widthInPercent = this.optionsLogic.modalWidth;
        const customFontSize = this.optionsLogic.modalFontSize;
        const widthToUse = widthInPercent !== undefined ? `${widthInPercent}%` : this.optionsLogic.isMobile ? "100%" : "75%";
        const itemViewerLeftPadding = this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer);
        const itemViewerRightPadding = this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer);
        const carouselContainerRect = this.carouselContainerRef?.current?.getBoundingClientRect();
        const toolbar = this.carouselContainerRef?.current?.querySelector(`.${(this.isCurrentItemVideo && isToolbarEmbedded && !this.isFullscreenMode ? CLASSNAME__TOOLBAR_PROGRESS : CLASSNAME__ITEM_VIEWER_TOOLBAR)}`);
        const toolbarRect = toolbar?.getBoundingClientRect();
        const toolbarFirstDiv = toolbar?.querySelector(`div`);
        const toolbarFirstDivRect = toolbarFirstDiv?.getBoundingClientRect();
        const carouselPaddingTop = this.getPaddingAmount(SpacingDirection.top, CarouselSection.container);
        const progressBarPaddingTop = this.getCarouselVideoProgressHitSlop().paddingTop;
        const toolbarPaddingBottom = this.getPaddingAmount(SpacingDirection.bottom, CarouselSection.toolbar);
        this.modalHeight = Math.max(this.modalHeight, modalHeight);

        let heightBetweenItemTopAndToolbarBarTop = 270;
        if (carouselContainerRect && toolbarRect && toolbarFirstDivRect) {
            const toolbarTop = this.isCurrentItemVideo ? (toolbarRect.y + progressBarPaddingTop) : (toolbarFirstDivRect.y + toolbarPaddingBottom)
            heightBetweenItemTopAndToolbarBarTop = Math.abs((carouselContainerRect.y + carouselPaddingTop) - toolbarTop);
        }

        const rectToUse = this.isCurrentItemVideo ? toolbarRect : toolbarFirstDivRect;
        const embeddedOffset = isToolbarEmbedded && this.isCurrentItemVideo ? 0 : CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT * (this.isCurrentItemVideo ? 1.33 : 2);
        const spaceBetweenModalTopAndItemTop = CAROUSEL_ITEM_SPACING_DEFAULT * 2;
        const maxHeight = Math.floor(heightBetweenItemTopAndToolbarBarTop - spaceBetweenModalTopAndItemTop * 2) - embeddedOffset;
        const nonFullscreenCenteringOffset = Math.abs(((carouselContainerRect?.y || 100) + carouselPaddingTop + modalHeight) - ((rectToUse?.y || 100) - progressBarPaddingTop + spaceBetweenModalTopAndItemTop)) / 2 - embeddedOffset / 2;
        const minTopValueNonFullscreen = -(Math.abs((rectToUse?.y || 300) - (carouselContainerRect?.y || 0))) + carouselPaddingTop + spaceBetweenModalTopAndItemTop;
        const containerHeightsIsEmbedded = (toolbarFirstDivRect ? toolbarFirstDivRect?.height : 74) + toolbarPaddingBottom + this.toolbarInnerContainerMarginTop;
        const containerHeightsNotEmbedded = toolbarRect ? toolbarRect?.height : 60;
        const containerHeights = isToolbarEmbedded ? containerHeightsIsEmbedded : containerHeightsNotEmbedded;
        const minTopValueFullscreen = -(window.innerHeight - (toolbarPaddingBottom - progressBarPaddingTop + containerHeights));
        const minTopValue = this.isFullscreenMode ? minTopValueFullscreen : minTopValueNonFullscreen;
        const centeredTopValueNonFullscreen = minTopValue + nonFullscreenCenteringOffset;
        const centeredTopValueFullscreen = minTopValue + window.innerHeight / 2 - this.modalHeight / 2;
        const centeredTopValue = this.isFullscreenMode ? centeredTopValueFullscreen : centeredTopValueNonFullscreen;
        const top = this.modalHeight >= maxHeight ? minTopValue : Math.max(minTopValue, centeredTopValue);

        // console.log({carouselContainerRect, rectToUse, maxHeight, modalHeight: this.modalHeight});
        // console.log({ containerHeights, toolbarPaddingBottom, top, maxHeight, modalHeigt: this.modalHeight, minTopValue, centeredTopValue, centeringOffset: nonFullscreenCenteringOffset, toolbar, tooblarHeight: -(toolbarRect?.height || 0) / 2, toolbarRect});

        const widthStyle = !this.isFullscreenMode || this.optionsLogic.isMobile ? {
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
        const positionStyle = {
            top,
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
        } as CSSProperties;
        const textStyle = {
            color: this.optionsLogic.modalTextColor,
            fontSize: customFontSize,
        } as CSSProperties;
        const generalStyle = {
            position: 'absolute',
            transition: `opacity .5s ease`,
            borderRadius: 5,
            background: this.optionsLogic.modalBackgroundColor,
            maxHeight: maxHeight,
            overflowY: 'auto',
            overflowX: 'hidden',
        } as CSSProperties;
        const hiddenStyle = {
            opacity: shouldHide ? 0 : 1,
            pointerEvents: shouldHide ? 'none' : 'auto',
            visibility: shouldHide ? 'hidden' : 'visible',
        } as CSSProperties;

        return {
            ...generalStyle,
            ...paddingStyle,
            ...widthStyle,
            ...positionStyle,
            ...textStyle,
            ...this.fontFamilyItemViewerStyle,
            ...hiddenStyle,
            zIndex: -1,
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
        return {
            color: this.optionsLogic.toolbarTextColor,
        } as CSSProperties;
    }

    get carouselVideoContainerStyle() {
        const { left: leftSpacing, right: rightSpacing } = this.getItemViewerHorizontalSpacing(0);

        const common = {
            position: 'relative',
            display: 'flex',
        } as CSSProperties;
        const layoutStyle = !this.optionsLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: leftSpacing,
            paddingRight: rightSpacing,
        } as CSSProperties : {

        };

        return {
            ...common,
            ...layoutStyle,
        }
    }

    get carouselVideoCurrentStateIndicatorButtonStyle() {
        const widthToUse = this.optionsLogic.videoCurrentStateIndicatorSize;

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

    getCarouselVideoCurrentTimeViewerStyle(shouldShow: boolean) {
        if (!shouldShow) return {
            display: 'none',
        } as CSSProperties;
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            paddingLeft: this.carouselVideoContainerStyle.paddingLeft,
            paddingRight: this.carouselVideoContainerStyle.paddingRight,
        } as CSSProperties;
    }

    getCarouselVideoStyle(shouldHide: boolean) {
        const objectStyles = {
            objectFit: this.currentItem?.video?.objectFit || 'contain',
            objectPosition: this.currentItem?.video?.objectPosition || 'bottom',
        } as CSSProperties;

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            ...objectStyles,
            zIndex: shouldHide ? -1 : 1,
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
        const widthToUse = this.optionsLogic.progressBarShouldSpanEntireWidth
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

    get carouselVideoProgressScreenshotViewerVideoStyle() {
        return {
            pointerEvents: 'none',
            border: '2px solid white',
            borderRadius: 2,
            backgroundColor: 'white',
            width: '100%'
        } as CSSProperties;
    }

    getCarouselVideoProgressScreenshotViewerContainerStyle(
        percent: number,
        videoRef: React.MutableRefObject<HTMLVideoElement | undefined> | undefined | null,
        toolbarElement: Element,
        screenShotTextElement: Element | undefined | null,
        screenShotCanvasElement: Element | undefined,
        textTranslateOffsetRef: React.MutableRefObject<TextTranslateOffset>,
    ) {
        const { width } = this.optionsLogic.videoProgressBarScreenshotViewer;
        const { left: paddingBetweenContainerAndVideoLeft, right: paddingBetweenContainerAndVideoRight } = this.getItemViewerHorizontalSpacing();

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
            : (isEmbedded ? 103 : 90); //fallback

        let translateX = '-50%'
        let left = `${paddingBetweenContainerAndVideoLeft + ((videoRect?.width || 200) - (this.isFullscreenMode ? (paddingBetweenContainerAndVideoLeft + paddingBetweenContainerAndVideoRight) : 0)) * percent}${CAROUSEL_SPACING_UNIT}`;
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
                translateX = `${-paddingBetweenContainerAndVideoRight}${CAROUSEL_SPACING_UNIT}`;
            }

            //handling left-bound case
            // console.log({ leftBound, viewerLeft, cursorLeftPosition, minCursorLeftValue });
            if ((viewerLeft && viewerLeft < leftBound) || cursorLeftPosition <= minCursorLeftValue) {
                left = `0${CAROUSEL_SPACING_UNIT}`;
                translateX = `${paddingBetweenContainerAndVideoLeft}${CAROUSEL_SPACING_UNIT}`;
            }
        }

        return {
            display: percent < 0 ? 'none' : 'block',
            padding: CAROUSEL_ITEM_SPACING_DEFAULT,
            paddingInline: 0,
            width: width + CAROUSEL_ITEM_SPACING_DEFAULT * 2,
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

    get carouselVideoProgressScreenshotViewerTextContainerStyle() {
        return {
            color: 'white',
            position: 'absolute',
            width: '10000px', //this is a hack to align this centered since translateX(-50%) doesn't work
            transform: `translateX(calc(-4903${CAROUSEL_SPACING_UNIT})`, //this is a hack to align this centered since translateX(-50%) doesn't work
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        } as CSSProperties;
    }

    getCarouselVideoProgressScreenshotViewerTextStyle(
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
        const selectStyle = {
            userSelect: 'none',
        } as CSSProperties;
        return !this.optionsLogic.isDefaultItemDisplayLocation && !this.isFullscreenMode ? {
            paddingInline: CAROUSEL_ITEM_SPACING_DEFAULT / 2,
            flexGrow: 0,
            ...selectStyle,
        } as CSSProperties : {
            ...selectStyle
        };
    }

    get isCurrentItemSelected() {
        return !this.optionsLogic.isDefaultItemDisplayLocation && !!this.isCurrentItem;
    }

    get itemViewerContainerHorizontalPadding() {
        const padding = this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer) + this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer);
        return padding;
    }

    get fontFamilyItemViewerStyle() {
        return {
            fontFamily: this.optionsLogic.itemViewerFontFamily,
        } as CSSProperties;
    }

    get fontFamilyNavigationStyle() {
        return {
            fontFamily: this.optionsLogic.navigationFontFamily,
        } as CSSProperties;
    }

    getItemViewerHorizontalSpacing(fullscreenValue = CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT) {
        return {
            left: this.isFullscreenMode ? fullscreenValue : this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT),
            right: this.isFullscreenMode ? fullscreenValue : this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT),
        }
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
        const isOverlayHidden = this.optionsLogic.thumbnailOverlayIsHidden;
        const isOverlayDisabled = this.optionsLogic.thumbnailOverlayIsDisabled;
        const { angle, startColor, startOpacity, endColor, endOpacity } = this.optionsLogic.thumbnailOverlayBackgroundGradient;
        const { opacity, color } = this.optionsLogic.thumbnailOverlayBackgroundSolid;

        const backgroundSolidStyle = {
            background: 'none',
            backgroundColor: convertHexToRgba(color, opacity),
        } as CSSProperties;

        const disabledStyle = isOverlayDisabled ? {
            display: 'none'
        } as CSSProperties : {};

        const backgroundGradientStyle = this.options?.thumbnail?.descriptionOverlay?.background?.gradient ? {
            background: `linear-gradient(${angle}deg, ${convertHexToRgba(startColor, startOpacity)} 0%, ${convertHexToRgba(endColor, endOpacity)} 100%)`,
        } as CSSProperties : {};

        const bottomStyle = isOverlayHidden ? {
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
        const { fontSize, maxLineCount, color } = this.optionsLogic.thumbnailOverlayText

        return {
            WebkitLineClamp: maxLineCount,
            fontSize,
            color,
            ...this.carouselItemCursorStyle,
        } as CSSProperties
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
        const { left: leftSpacing, right: rightSpacing } = this.getItemViewerHorizontalSpacing();

        const paddingHorizontalStyle = {
            paddingLeft: this.optionsLogic.isToolbarInVideo && !this.isFullscreenMode ? 0 : leftSpacing,
            paddingRight: this.optionsLogic.isToolbarInVideo && !this.isFullscreenMode ? 0 : rightSpacing,
            marginLeft: !this.optionsLogic.isToolbarInVideo || this.isFullscreenMode ? 0 : leftSpacing,
            marginRight: !this.optionsLogic.isToolbarInVideo || this.isFullscreenMode ? 0 : rightSpacing,
        } as CSSProperties;
        const nonDefaultItemDisplayStyle = {
            ...this.getToolbarBackgroundColorStyle(),
            ...paddingHorizontalStyle,
            position: this.optionsLogic.isToolbarInVideo || this.isFullscreenMode ? "absolute" : "relative",
            width: this.optionsLogic.isToolbarInVideo ? undefined : '100%',
            paddingTop: isItemVideo ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
            paddingBottom: this.toolbarPaddingBottom,
            top: this.optionsLogic.isToolbarInVideo ? (this.isFullscreenMode ? '75%' : '0%') : undefined,
            justifyContent: 'flex-end',
            pointerEvents: 'none',
        } as CSSProperties;

        return {
            ...nonDefaultItemDisplayStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }

    get toolbarInnerContainerStyle() {
        const isEmbedded = this.optionsLogic.isToolbarInVideo;
        return {
            paddingLeft: isEmbedded && !this.isFullscreenMode ? CAROUSEL_ITEM_SPACING_DEFAULT : undefined,
            paddingRight: isEmbedded && !this.isFullscreenMode ? CAROUSEL_ITEM_SPACING_DEFAULT : undefined,
            marginTop: this.toolbarInnerContainerMarginTop,
        } as CSSProperties;
    }

    get toolbarInnerContainerMarginTop() {
        const isVideo = getIsVideo(this.currentItem);
        const isEmbedded = this.optionsLogic.isToolbarInVideo;
        const progressBarHitSlop = this.optionsLogic.videoProgressBarHitSlop;
        return isVideo && isEmbedded ? Math.max(CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT - progressBarHitSlop.bottom, 0) : 0;
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
    private get imageHeight() {
        const toolbarWidth = this.itemViewerToolbarRef?.current?.getBoundingClientRect()?.width || CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT;
        return this.isFullscreenMode ? '100%' : (toolbarWidth) * 9 / 16;
    }
    //#endregion

    //#region Public Methods
    //todo: this is currently setup with the assumption that givenButtonSize comes from toolbar.buttonSize
    //need to generalize for other cases (think individual button options)
    //this is used on the button container for each button and the dots
    getCarouselElementSizeStlye(buttonName: CarouselElement, defaultSize = 0) {
        const valueToUse = this.optionsLogic.getButtonSize(buttonName, defaultSize);
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
            backgroundColor: this.optionsLogic.itemViewerBackgroundColor,
            justifyContent: this.isFullscreenMode ? 'center' : 'flex-end',
            overflow: "hidden",
        } as CSSProperties : {};
    }

    getCarouselItemsInnerContainerStyle(
        interItemSpacing: number,
        translationAmount: number,
        isLastPage: boolean,
        translationAmountChangeRef: React.MutableRefObject<TranslationAmountChange>,
    ) {
        const { numberOfWholeItemsThatCanFit, containerWidth, itemSize } = getNumberOfItemsThatCanFit(
            this.items.length,
            this.carouselContainerRef?.current,
            this,
            this.optionsLogic
        );

        let translationAmountToUse = translationAmount;
        const isValidChange = translationAmountChangeRef.current !== TranslationAmountChange.swipe;
        if (isValidChange && isLastPage && !!translationAmountChangeRef.current) {
            if (translationAmount > 0 && this.lastPageCarouselTranslationAmount === this.LAST_PAGE_CAROUSEL_AMOUNT_INITIAL) {
                this.lastPageCarouselTranslationAmount = translationAmount;
            }
            translationAmountToUse = this.lastPageCarouselTranslationAmount;
        }

        const itemPositioning = this.optionsLogic.itemPositioning;
        const numberOfItemsToUse = Math.min(numberOfWholeItemsThatCanFit, (this.items?.length || Number.MAX_SAFE_INTEGER));
        const numberOfSpaces = numberOfItemsToUse - 1;
        const itemSpacing = this.optionsLogic.getItemSpacing(interItemSpacing);
        const widthOfInterItemSpacing = numberOfSpaces * itemSpacing;
        const widthOfItems = numberOfItemsToUse * itemSize;

        // console.log({
        //     numberOfItemsToUse,
        //     containerWidth,
        //     givenItemSpacing: this.options?.thumbnail?.itemSpacing,
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
            transform: `translateX(${translationAmountToUse < 0 ? '' : '-'}${Math.abs(translationAmountToUse)}${CAROUSEL_SPACING_UNIT})`,
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
        const customColor = this.optionsLogic.toolbarBackgroundColor;
        const backgroundToUse = this.optionsLogic.useDefaultVideoControls && getIsVideo(this.currentItem) ? 'transparent' : this.optionsLogic.isToolbarInVideo && !shouldUseSolidColor ? `linear-gradient(0deg, ${customColor}, transparent)` : customColor;
        return {
            background: backgroundToUse,
        } as CSSProperties
    }

    getVideoCurrentStateIndicatorForegroundColor(buttonName: CarouselVideoCurrentStateIndicatorButtonName) {
        const foregroundColor = this.optionsLogic.videoCurrentStateIndicatorForegroundColor;
        const buttonColor = this.optionsLogic.getVideoCurrentStateIndicatorButtonColor(buttonName);
        return buttonColor || foregroundColor;
    }

    static getCarouselModalChildStyle(index: number) {
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

        switch (direction) {
            case SpacingDirection.bottom: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.optionsLogic.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : this.optionsLogic.isItemDisplayLocationBelow ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                break;
            }
            case SpacingDirection.left:
            case SpacingDirection.right: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.optionsLogic.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                break;
            }
            case SpacingDirection.top: {
                defaultPadding = defaultOverride !== undefined && defaultOverride >= 0 ? defaultOverride
                    : this.optionsLogic.isDefaultItemDisplayLocation
                        ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT
                        : this.optionsLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                break;
            }
        }
        return this.optionsLogic.getCustomPadding(item, direction, defaultPadding);
    }
    //#endregion
}