import { CSSProperties } from "react";
import { CarouselElement, CarouselSection, CarouselOptions } from "../types";
import { ItemDisplayLocationLogic } from "./ItemDisplayLocationLogic";
import { convertHexToRgba, getIsVideo } from "../utils";
import {
    CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_SPACING_UNIT,
    CAROUSEL_ITEM_SIZE_DEFAULT,
    CAROUSEL_COLOR_FOUR,
    CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_COLOR_ONE,
    CAROUSEL_DOT_OPACITY_DEFAULT,
    CAROUSEL_COLOR_FIVE,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT,
    CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT,
    CAROUSEL_ITEM_SPACING_DEFAULT,
    CAROUSEL_OVERLAY_ITEM_PADDING_TOP,
    CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT,
    CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT,
    CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT,
    CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT
} from "../constants";
import { CarouselInstanceContextProps } from "../components/CarouselInstanceProvider";
import { CarouselVideoModalProps } from "../components/CarouselVideoModal";
import { LoadingSpinnerProps, LoadingSpinnerOptions } from "../components/LoadingSpinner";

export enum SpacingDirection {
    bottom,
    left,
    right,
    top,
}
export type StylingLogicConstructor = {
    isCurrentItem?: boolean;
    itemDisplayLocationLogic?: ItemDisplayLocationLogic;
    options: CarouselOptions | undefined;
    progressBarValue?: number;
    videoModalRef?: React.MutableRefObject<HTMLElement | undefined> | undefined;
    loadingSpinnerOptions?: LoadingSpinnerProps['options'];
} & Partial<Pick<CarouselInstanceContextProps, 'itemViewerToolbarRef' | 'currentItemInInstance'>>
    & Partial<Pick<CarouselVideoModalProps, 'videoRef'>>
/*
*Use this when extending styling options.  Many default styles are currently in _carousel.scss or _buttons_scss
*/
export class StylingLogic {
    private DEFAULT_FONT_FAMILY: string = 'sans-serif';
    private currentItemInInstance;
    private isCurrentItem: boolean | undefined;
    private itemDisplayLocationLogic: ItemDisplayLocationLogic;
    private itemViewerToolbarRef: CarouselInstanceContextProps['itemViewerToolbarRef'];
    private loadingSpinnerOptions: LoadingSpinnerProps['options'];
    private options: CarouselOptions;
    private videoModalRef: React.MutableRefObject<HTMLElement | undefined> | undefined;
    private progressBarValue: number;
    private videoRef: React.MutableRefObject<HTMLVideoElement | undefined> | undefined;

    constructor(constructor: StylingLogicConstructor) {
        const {
            currentItemInInstance,
            isCurrentItem,
            itemDisplayLocationLogic,
            itemViewerToolbarRef,
            loadingSpinnerOptions,
            options,
            videoModalRef,
            progressBarValue,
            videoRef,
        } = constructor;
        this.currentItemInInstance = currentItemInInstance;
        this.isCurrentItem = isCurrentItem;
        this.loadingSpinnerOptions = loadingSpinnerOptions;
        this.itemViewerToolbarRef = itemViewerToolbarRef;
        this.progressBarValue = progressBarValue || 0;
        this.videoRef = videoRef;
        this.videoModalRef = videoModalRef;
        this.options = options || {};
        const isCurrentItemInInstancePopulated = Object.keys(currentItemInInstance || {}).length > 0;
        this.itemDisplayLocationLogic = itemDisplayLocationLogic || new ItemDisplayLocationLogic({ options: this.options });
    }

    //#region Public Getters
    get carouselImageStlye() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: '100%',
            maxHeight: this.maxHeightNonDefaultItemDisplayLocation,
        } as CSSProperties : {} as CSSProperties;
    }

    get carouselStyle() {
        const common = {
            paddingTop: `${this.getPaddingAmount(SpacingDirection.top, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: `${this.getPaddingAmount(SpacingDirection.bottom, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties;

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            background: this.options?.styling?.navigation?.background || this.options.styling?.container?.background || CAROUSEL_COLOR_ONE,
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
        const customCurrenItemBorder = this.options.thumbnail?.currentItemBorder || '';

        const widthStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
            height: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties : {
            width: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
            height: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
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

    get carouselItemContainerStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: this.carouselItemContainerHeight,
            position: "relative",
            backgroundColor: this.itemViewerBackgroundColor,
            justifyContent: 'flex-end',
        } as CSSProperties : {};
    }

    get carouselItemViewerStyle() {
        return {
            backgroundColor: this.itemViewerBackgroundColor,
        } as CSSProperties;
    }

    get carouselItemsContainerStyle() {
        const common = {
            marginLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
            marginRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselSection.navigation)}${CAROUSEL_SPACING_UNIT}`,
            overflow: 'hidden',
        } as CSSProperties;

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            marginTop: 0,
            marginBottom: 0,
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

    get carouselToolbarTextStyle() {
        const customTextColor = this.options.styling?.toolbar?.textColor || this.allFillColor;
        return {
            color: customTextColor || CAROUSEL_COLOR_FIVE,
        } as CSSProperties;
    }

    get carouselVideoModalCloseButtonStyle() {
        const areChildrenPresent = !!this.currentItemInInstance?.video?.overlayProps?.children;
        const { right: paddingRight, top: paddingTop } = this.options.styling?.videoModal?.padding || {};
        const rightStyle = paddingRight !== undefined ? {
            right: `${paddingRight}${CAROUSEL_SPACING_UNIT}`
        } as CSSProperties : {};
        const topStyle = paddingTop !== undefined ? {
            top: `${paddingTop}${CAROUSEL_SPACING_UNIT}`
        } as CSSProperties : {};

        return areChildrenPresent ? {
            ...rightStyle,
            ...topStyle,
        } as CSSProperties : {} as CSSProperties;
    }

    get carouselVideoModalStyle() {
        const { fontSize: customFontSize, background, textColor, widthInPercent } = this.options.styling?.videoModal || {};
        const { bottom: paddingBottom, left: paddingLeft, right: paddingRight, top: paddingTop } = this.options.styling?.videoModal?.padding || {};
        const isDefault = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation;
        const videoHeight = this.videoRef?.current?.getBoundingClientRect().height || 0;
        const videoModalHeight = this.videoModalRef?.current?.getBoundingClientRect().height || 0;
        const widthToUse = widthInPercent !== undefined ? `${widthInPercent}%` : "75%";

        const widthStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: widthToUse,
            maxWidth: widthToUse,
            boxShadow: `0 10px 15px -3px rgba(0,0,0,.25)`,
        } as CSSProperties : {};
        const paddingStyle = {
            paddingTop: paddingTop !== undefined ? paddingTop : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * .5,
            paddingBottom: paddingBottom !== undefined ? paddingBottom : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * .5,
            paddingLeft: paddingLeft !== undefined ? paddingLeft : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * 1.5 : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT,
            paddingRight: paddingRight !== undefined ? paddingRight : isDefault ? CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT * 1.5 : CAROUSEL_OVERLAY_PADDING_TOP_DEFAULT,
        } as CSSProperties;
        const positionStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            transform: 'translate(-50%, 0)',
            top: videoHeight && videoModalHeight ? `${Math.abs(videoHeight - videoModalHeight) / 2}${CAROUSEL_SPACING_UNIT}` : '50%',
        } as CSSProperties : {};
        const textStyle = {
            color: textColor || CAROUSEL_COLOR_ONE,
            fontSize: customFontSize !== undefined ? customFontSize : this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_OVERLAY_FONT_SIZE_DEFAULT : CAROUSEL_OVERLAY_FONT_SIZE_NON_ITEM_VIEWER_DEFAULT,
        } as CSSProperties;
        const backgroundStyle = {
            background: background !== undefined ? background : CAROUSEL_COLOR_FIVE,
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
        const customColor = this.options.styling?.videoModal?.closeButtonColor || CAROUSEL_COLOR_ONE;
        return customColor;
    }

    get carouselVideoContainerStyle() {
        const common = {
            position: 'relative',
        } as CSSProperties;
        const layoutStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselSection.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            maxHeight: this.maxHeightNonDefaultItemDisplayLocation,
        } as CSSProperties : {

        };

        return {
            ...common,
            ...layoutStyle,
        }
    }

    get carouselVideoStyle() {
        const objectStyles = {
            objectFit: this.currentItemInInstance?.video?.objectFit || 'contain',
            objectPosition: this.currentItemInInstance?.video?.objectPosition || 'bottom',
        } as CSSProperties;

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: '100%',
            ...objectStyles,
        } as CSSProperties : {};
    }

    get carouselVideoProgressBackgroundStyle() {
        const background = this.options.styling?.toolbar?.progressBar?.background;
        const shouldSpanWholeWidth = this.options.styling?.toolbar?.progressBar?.shouldSpanContainerWidth;
        const common = {
            background,
            width: shouldSpanWholeWidth ? `calc(100% + ${this.getPaddingAmount(SpacingDirection.left, CarouselSection.toolbar) + this.getPaddingAmount(SpacingDirection.right, CarouselSection.toolbar)}${CAROUSEL_SPACING_UNIT})` : '100%',
        } as CSSProperties

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
    }

    get carouselVideoProgressForegroundStyle() {
        const foregroundColor = this.options.styling?.toolbar?.progressBar?.foregroundColor;
        const common = {
            background: foregroundColor,
            width: `${this.progressBarValue * 100}%`,
            height: '100%',
        } as CSSProperties

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
    }

    get carouselVideoTimeTextStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            minWidth: "33%",
        } as CSSProperties : {};
    }

    get isCurrentItemSelected() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation && !!this.isCurrentItem;
    }

    get fontFamilyItemViewerStyle() {
        const stylings = this.options?.styling;
        const fontFamily = stylings?.fontFamily || {};
        return fontFamily?.all || fontFamily?.itemViewer ? {
            fontFamily: fontFamily?.all || fontFamily?.itemViewer || this.DEFAULT_FONT_FAMILY,
        } : {};
    }

    get fontFamilyNavigationStyle() {
        const stylings = this.options?.styling;
        const fontFamily = stylings?.fontFamily || {};
        return fontFamily?.all || fontFamily?.navigation ? {
            fontFamily: fontFamily?.all || fontFamily?.navigation || this.DEFAULT_FONT_FAMILY,
        } : {};
    }

    get itemViewerBackgroundColor() {
        return this.options.styling?.itemViewer?.background || this.options.styling?.container?.background || CAROUSEL_COLOR_ONE;
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

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            marginBottom: 0,
            paddingTop: CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT,
            paddingBottom: this.itemDisplayLocationLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEM_SPACING_DEFAULT * 2 : 0,
            ...common,
        } as CSSProperties : {
            ...common,
        };
    }

    get thumbnailBackgroundStyle() {
        const thumbnail = this.options?.thumbnail;
        const solid = thumbnail?.descriptionOverlay?.background?.solid;
        const gradient = thumbnail?.descriptionOverlay?.background?.gradient;
        const color = solid?.color;
        const shouldHideOverlay = thumbnail?.descriptionOverlay?.hideDescriptionOverlayUnlessHovered === undefined || !!thumbnail?.descriptionOverlay?.hideDescriptionOverlayUnlessHovered;
        const isDefaultItemDisplayLocation = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation;
        const isDescriptionOverDisabledUndefined = thumbnail?.descriptionOverlay?.isDisabled === undefined;
        const shouldDisableDescriptionOverlayDefault = !isDefaultItemDisplayLocation;
        const shouldDisableDescriptionOverlay = isDescriptionOverDisabledUndefined ? shouldDisableDescriptionOverlayDefault : thumbnail?.descriptionOverlay?.isDisabled;

        const backgroundSolidStyle = color ? {
            background: 'none',
            backgroundColor: convertHexToRgba(
                color?.trim() || CAROUSEL_COLOR_ONE,
                solid?.opacity || CAROUSEL_DOT_OPACITY_DEFAULT
            ),
        } as React.CSSProperties : {};

        const disabledStyle = shouldDisableDescriptionOverlay ? {
            display: 'none'
        } as React.CSSProperties : {};

        const backgroundGradientStyle = gradient ? {
            background: `linear-gradient(${gradient?.angle || 180}deg, ${convertHexToRgba(gradient.start?.color || CAROUSEL_COLOR_FIVE, gradient.start?.opacity || 0)} 0%, ${convertHexToRgba(gradient.end?.color || CAROUSEL_COLOR_ONE, gradient.end?.opacity || 1)} 100%)`,
        } as React.CSSProperties : {};

        const bottomStyle = shouldHideOverlay ? {
            bottom: '-100%',
        } as React.CSSProperties : {};

        const thumbnailBackgroundStyle = {
            ...bottomStyle,
            ...backgroundSolidStyle,
            ...backgroundGradientStyle,
            ...this.carouselItemCursorStyle,
            ...disabledStyle,
        } as React.CSSProperties

        return thumbnailBackgroundStyle;
    }

    get thumbnailTextStyle() {
        const thumbnail = this.options?.thumbnail;

        const fontSizeStyle = thumbnail ? {
            fontSize: `${thumbnail?.descriptionOverlay?.fontSize}${CAROUSEL_SPACING_UNIT}`,
        } as React.CSSProperties : {};
        const maxLineCountStyle = {
            WebkitLineClamp: thumbnail?.descriptionOverlay?.maxLineCount || CAROUSEL_ITEM_THUMBNAIL_DESCRIPTION_OVERLAY_MAX_LINE_COUNT_DEFAULT,
        } as React.CSSProperties;

        const textColorStyle = thumbnail?.descriptionOverlay?.textColor ? {
            color: thumbnail?.descriptionOverlay?.textColor,
        } as React.CSSProperties : {};

        return {
            ...maxLineCountStyle,
            ...fontSizeStyle,
            ...textColorStyle,
            ...this.carouselItemCursorStyle,
        }
    }

    get toolbarBackgroundColorStyle() {
        const customColor = this.options.styling?.toolbar?.background || this.options.styling?.container?.background;
        return {
            background: customColor || CAROUSEL_COLOR_ONE,
        } as CSSProperties;
    }

    get toolbarStyle() {
        const isItemVideo = getIsVideo(this.currentItemInInstance);
        const nonDefaultItemDisplayStyle = this.itemDisplayLocationLogic.isFullscreenButtonVisible ? {
            ...this.toolbarBackgroundColorStyle,
            position: "relative",
            width: '100%',
            paddingTop: `${isItemVideo ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: this.itemDisplayLocationLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT,
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselSection.toolbar)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselSection.toolbar)}${CAROUSEL_SPACING_UNIT}`,
        } as React.CSSProperties : {};

        return {
            ...nonDefaultItemDisplayStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }
    //#endregion

    //#region Private Getters
    private get allFillColor() {
        return this.options.styling?.elements?.all?.fillColor;
    }

    private get carouselItemContainerHeight() {
        return `${this.options?.layout?.itemDisplayHeight || CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`;
    }

    private get maxHeightNonDefaultItemDisplayLocation() {
        return `calc(100% - ${this.itemViewerToolbarRef?.current?.getBoundingClientRect()?.height || 0}${CAROUSEL_SPACING_UNIT})`;
    }
    //#endregion

    //#region Public Methods
    getButtonColor(buttonName: CarouselElement, fallbackColor = CAROUSEL_COLOR_FIVE) {
        const specificFillColor = this.options.styling?.elements?.[buttonName]?.fillColor;

        switch (buttonName) {
            case CarouselElement.arrowLeft:
            case CarouselElement.arrowRight:
            case CarouselElement.dots:
                const navigationElementsColor = this.options.styling?.navigation?.elementColor;
                return specificFillColor || navigationElementsColor || this.allFillColor || fallbackColor;
            case CarouselElement.closeButton:
            case CarouselElement.nextButton:
            case CarouselElement.pauseButton:
            case CarouselElement.playButton:
            case CarouselElement.previousButton:
            case CarouselElement.seekBackButton:
            case CarouselElement.seekForwardButton:
                const toolbarElementsColor = this.options.styling?.toolbar?.elementColor;
                return specificFillColor || toolbarElementsColor || this.allFillColor || fallbackColor;
            default:
                return specificFillColor || this.allFillColor || fallbackColor;
        }
    }

    static getButtonColorStyle(fillColor: string, propertyName: keyof CSSProperties, style = {} as CSSProperties) {
        return {
            ...style,
            [propertyName]: fillColor,
        } as CSSProperties;
    }

    static getCarouselVideoModalChildStyle(index: number) {
        return {
            paddingTop: index === 0 ? 0 : CAROUSEL_OVERLAY_ITEM_PADDING_TOP,
        } as CSSProperties;
    }
    //#endregion

    //#region Private Methods
    /*
    *Only accepts three argument versions or border https://developer.mozilla.org/en-US/docs/Web/CSS/border
    *Currently there is no keyword recognition so something like 'thickest double #000' will be considered valid.
    *If the border isn't showing up, check your string to make sure it is valid.
    */
    private getBorderStringToUse(borderStr: string, defaultValue = `1${CAROUSEL_SPACING_UNIT} solid ${CAROUSEL_COLOR_FOUR}`) {
        const isValid = borderStr && borderStr?.trim()?.split(/(\s+|rgb.+\))/)?.filter(item => !!item && item?.match(/\w+/))?.length === 3;
        return isValid ? borderStr : defaultValue;
    }

    private getPaddingAmount(direction: SpacingDirection, item: CarouselSection) {
        let defaultPadding: number;
        let allPadding: number | undefined;
        let customPadding: number | undefined;
        let specificElementPadding: number | undefined;

        switch (direction) {
            case SpacingDirection.bottom:
                defaultPadding = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = this.options.styling?.container?.padding?.bottom;
                // specificElementPadding = this.options.styling?.[item]?.padding?.bottom;
                customPadding = specificElementPadding || allPadding;
                return customPadding !== undefined ? customPadding : defaultPadding;
            case SpacingDirection.left:
                defaultPadding = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = this.options.styling?.container?.padding?.left;
                specificElementPadding = this.options.styling?.[item]?.padding?.left;
                customPadding = specificElementPadding || allPadding
                return customPadding !== undefined ? customPadding : defaultPadding;
            case SpacingDirection.right:
                defaultPadding = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = this.options.styling?.container?.padding?.right;
                specificElementPadding = this.options.styling?.[item]?.padding?.right;
                customPadding = specificElementPadding || allPadding
                return customPadding !== undefined ? customPadding : defaultPadding;
            case SpacingDirection.top:
                defaultPadding = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : this.itemDisplayLocationLogic.isItemDisplayLocationBelow ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = this.options.styling?.container?.padding?.top;
                // specificElementPadding = this.options.styling?.[item]?.padding?.top;
                customPadding = specificElementPadding || allPadding
                return customPadding !== undefined ? customPadding : defaultPadding;
        }
        //#endregion
    }
}