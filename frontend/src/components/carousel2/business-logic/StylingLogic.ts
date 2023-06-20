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
    CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT,
    CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT,
    CAROUSEL_TOOLBAR_BUTTON_SIZE_MOBILE_DEFAULT,
    CAROUSEL_TOOLBAR_BUTTON_SIZE_DEFAULT,
    CAROUSEL_VIDEO_MODAL_CLOSE_BUTTON_SIZE_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_THUMBNAIL_BACKGROUND_OPACITY_DEFAULT,
    CAROUSEL_ITEM_VIEWER_PREVIEW_BORDER_CENTER_LINE_OPACITY_DEFAULT,
    CAROUSEL_COLOR_GREY_ONE,
    CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT,
    CAROUSEL_PROGRESS_BAR_HEIGHT_MAX,
    CAROUSEL_PROGRESS_BAR_HEIGHT_MIN,
    CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT,
} from "../constants";
import { CarouselVideoModalInternalProps } from "../components/CarouselVideoModal";
import { LoadingSpinnerProps, LoadingSpinnerOptions } from "../components/LoadingSpinner";
import { CarouselContextInputProps, CarouselContextOutputProps } from "../context";
import { RegexpPattern } from "./RegexpPattern";
import { CarouselItemViewerShortcutIndicatorPosition } from "../components/item-viewer/toolbar/CarouselItemViewerShortcutIndicator";

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
    progressBarValue?: number;
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
    private progressBarValue: number;
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
            progressBarValue,
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
        this.progressBarValue = progressBarValue || 0;
        this.videoRef = videoRef;
        this.videoModalRef = videoModalRef;
        this.options = options || {};
        this.optionsLogic = optionsLogic || new OptionsLogic({ options: this.options, isFullscreenMode: false });
        this.isMobile = getIsMobile();
    }

    //#region Public Getters
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
            // ...cursorStyle,
        } as CSSProperties : {
        } as CSSProperties;
    }

    get carouselStyle() {
        const common = {
            paddingTop: `${this.getPaddingAmount(SpacingDirection.top, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: `${this.getPaddingAmount(SpacingDirection.bottom, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
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

        return {
            width,
            height,
            top: height * -1 - this.getPaddingAmount(SpacingDirection.top, CarouselSection.toolbar),
            right: this.getPaddingAmount(SpacingDirection.right, CarouselSection.toolbar),
            backgroundColor: convertHexToRgba(background, parseFloat(opacity as string)),
            border: border,
            borderRadius: borderRadius,
            paddingTop: padding.top,
            paddingBottom: padding.bottom,
            paddingLeft: padding.left,
            paddingRight: padding.right,
            alignItems: verticalAlignment,
        } as CSSProperties;
    }

    get carouselItemsOuterContainerStyle() {
        const common = {
            marginLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
            marginRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
            overflow: 'hidden',
        } as CSSProperties;

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            marginTop: 0,
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
        const { right: paddingRight, top: paddingTop } = this.options.styling?.videoModal?.padding || {};
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
        const { bottom: paddingBottom, left: paddingLeft, right: paddingRight, top: paddingTop } = this.options.styling?.videoModal?.padding || {};
        const isDefault = this.optionsLogic.isDefaultItemDisplayLocation;
        const videoHeight = this.videoRef?.current?.getBoundingClientRect().height || 0;
        const videoModalHeight = this.videoModalRef?.current?.getBoundingClientRect().height || 0;
        const widthInPercent = getCurrentValue(widthInPercentTemp, undefined, this.isFullscreenMode)
        const widthToUse = widthInPercent !== undefined ? `${widthInPercent}%` : this.isMobile ? "100%" : "75%";
        const customFontSize = getCurrentValue(fontSizeTemp, this.isFullscreenMode ? CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT : CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT, this.isFullscreenMode);
        const itemViewerLeftPadding = this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer);
        const itemViewerRightPadding = this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer);

        const widthStyle = !this.isFullscreenMode || this.isMobile ? {
            width: widthToUse,
            maxWidth: `calc(${widthToUse} - ${(itemViewerLeftPadding + itemViewerRightPadding) / 2}${CAROUSEL_SPACING_UNIT})`,
            boxShadow: `0 10px 15px -3px rgba(0,0,0,.25)`,
        } as CSSProperties : {};
        const paddingStyle = {
            paddingTop: paddingTop !== undefined ? getCurrentValue(paddingTop, 0, this.isFullscreenMode) : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * .5,
            paddingBottom: paddingBottom !== undefined ? getCurrentValue(paddingBottom, 0, this.isFullscreenMode) : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * .5,
            paddingLeft: paddingLeft !== undefined ? getCurrentValue(paddingLeft, 0, this.isFullscreenMode) : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * 1.5 : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT,
            paddingRight: paddingRight !== undefined ? getCurrentValue(paddingRight, 0, this.isFullscreenMode) : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * 1.5 : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT,
        } as CSSProperties;
        const positionStyle = !this.isFullscreenMode ? {
            transform: 'translate(-50%, 0)',
            top: this.isMobile ? 0 : videoHeight && videoModalHeight ? `${Math.abs(videoHeight - videoModalHeight) / 2}${CAROUSEL_SPACING_UNIT}` : '50%',
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
            paddingLeft: this.isFullscreenMode ? 0 : `${this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: this.isFullscreenMode ? 0 : `${this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
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

    get carouselVideoProgressBackgroundStyle() {
        const height = getCurrentValue(this.options.styling?.toolbar?.progressBar?.height, CAROUSEL_PROGRESS_BAR_HEIGHT_DEFAULT, this.isFullscreenMode);
        const background = getCurrentValue(this.options.styling?.toolbar?.progressBar?.background, CAROUSEL_COLOR_GREY_ONE, this.isFullscreenMode);
        const shouldSpanWholeWidth = getCurrentValue(this.options.styling?.toolbar?.progressBar?.shouldSpanContainerWidth, undefined, this.isFullscreenMode);
        const heightToUse = height > CAROUSEL_PROGRESS_BAR_HEIGHT_MAX ? CAROUSEL_PROGRESS_BAR_HEIGHT_MAX : height < CAROUSEL_PROGRESS_BAR_HEIGHT_MIN ? CAROUSEL_PROGRESS_BAR_HEIGHT_MIN : height;
        const marginBottom = CAROUSEL_PROGRESS_BAR_CONTAINER_HEIGHT_DEFAULT - heightToUse;

        const common = {
            marginBottom,
            height: heightToUse,
            background,
            width: shouldSpanWholeWidth ? `calc(100% + ${this.getPaddingAmount(SpacingDirection.left, CarouselSection.toolbar) + this.getPaddingAmount(SpacingDirection.right, CarouselSection.toolbar)}${CAROUSEL_SPACING_UNIT})` : '100%',
        } as CSSProperties

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
    }

    get carouselVideoProgressForegroundStyle() {
        const foregroundColor = getCurrentValue(this.options.styling?.toolbar?.progressBar?.foregroundColor, CAROUSEL_COLOR_FIVE, this.isFullscreenMode);
        const common = {
            background: foregroundColor,
            width: `${this.progressBarValue * 100}%`,
            height: '100%',
        } as CSSProperties

        return !this.optionsLogic.isDefaultItemDisplayLocation ? {
            ...common,
        } as CSSProperties : {
            ...common,
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

    get toolbarBackgroundColorStyle() {
        const customColor = getCurrentValue(this.options.styling?.toolbar?.background, undefined, this.isFullscreenMode) || getCurrentValue(this.options.styling?.container?.background, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
        return {
            background: customColor,
        } as CSSProperties;
    }

    get toolbarStyle() {
        const isItemVideo = getIsVideo(this.currentItem);
        const paddingHorizontalStyle = {
            paddingLeft: this.getPaddingAmount(SpacingDirection.left, CarouselSection.toolbar),
            paddingRight: this.getPaddingAmount(SpacingDirection.right, CarouselSection.toolbar),
        } as CSSProperties;
        const nonDefaultItemDisplayStyle = !this.isFullscreenMode ? {
            ...this.toolbarBackgroundColorStyle,
            ...paddingHorizontalStyle,
            position: "relative",
            width: '100%',
            paddingTop: isItemVideo ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
            paddingBottom: this.optionsLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT,
        } as React.CSSProperties : {};

        return {
            ...nonDefaultItemDisplayStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }
    //#endregion

    //#region Private Getters
    private get allFillColor() {
        return getCurrentValue(this.options.styling?.elements?.all?.fillColor, undefined, this.isFullscreenMode);
    }

    private get imageHeight() {
        const toolbarWidth = this.itemViewerToolbarRef?.current?.getBoundingClientRect()?.width || CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT;
        const toolbarPadding = this.itemViewerContainerHorizontalPadding;
        return this.isFullscreenMode ? 'auto' : (toolbarWidth - toolbarPadding) * 9 / 16;
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
                switch (subElementName) {
                    case "square-outer":
                        return {
                            width: parsedWidth * maxHeightFactor,
                            height: parsedWidth * maxHeightFactor,
                        }
                    case "square-inner":
                        return {
                            width: parsedWidth * .625,
                            height: parsedWidth * .625,
                        }
                    case "rect-horizontal":
                        return {
                            height: parsedWidth * .2083333333,
                        }
                    case "rect-vertical":
                        return {
                            width: parsedWidth * .2083333333,
                        }
                    default:
                        return buttonSizeStyle;
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
        const commonStyle = {
            zIndex: 1000000000000,
            top: -this.getPaddingAmount(SpacingDirection.top, CarouselSection.navigation) * 2 - 4, //no sure why 4 is needed here
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

    private getPaddingAmount(direction: SpacingDirection, item: CarouselSection) {
        let defaultPadding: number;
        let allPadding: number | undefined;
        let customPadding: number | undefined;
        let specificElementPadding: number | undefined;

        switch (direction) {
            case SpacingDirection.bottom: {
                defaultPadding = this.optionsLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : this.optionsLogic.isItemDisplayLocationBelow ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = getCurrentValue(this.options.styling?.container?.padding?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.fullscreen?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingNonFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.nonFullscreen?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingBoth = getCurrentValue((this.options.styling?.[item] as any)?.padding?.bottom, undefined, this.isFullscreenMode);
                const specificElementPaddingToUse = this.isFullscreenMode ? (specificElementPaddingFullscreen || specificElementPaddingBoth) : (specificElementPaddingNonFullscreen || specificElementPaddingBoth);
                customPadding = specificElementPaddingToUse || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            }
            case SpacingDirection.left: {
                defaultPadding = this.optionsLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = getCurrentValue(this.options.styling?.container?.padding?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.fullscreen?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingNonFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.nonFullscreen?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingBoth = getCurrentValue((this.options.styling?.[item] as any)?.padding?.left, undefined, this.isFullscreenMode);
                const specificElementPaddingToUse = this.isFullscreenMode ? (specificElementPaddingFullscreen || specificElementPaddingBoth) : (specificElementPaddingNonFullscreen || specificElementPaddingBoth);
                customPadding = specificElementPaddingToUse || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            }
            case SpacingDirection.right: {
                defaultPadding = this.optionsLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = getCurrentValue(this.options.styling?.container?.padding?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingBoth = getCurrentValue((this.options.styling?.[item] as any)?.padding?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.fullscreen?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingNonFullscreen = getCurrentValue((this.options.styling?.[item] as any)?.padding?.nonFullscreen?.right, undefined, this.isFullscreenMode);
                const specificElementPaddingToUse = this.isFullscreenMode ? (specificElementPaddingFullscreen || specificElementPaddingBoth) : (specificElementPaddingNonFullscreen || specificElementPaddingBoth);
                customPadding = specificElementPaddingToUse || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            }
            case SpacingDirection.top: {
                defaultPadding = this.optionsLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : this.optionsLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
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