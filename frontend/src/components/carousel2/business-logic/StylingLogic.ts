import { CSSProperties } from "react";
import { CarouselButton, CarouselItem, CarouselOptions } from "../types";
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
    CAROUSEL_ITEM_SPACING_DEFAULT
} from "../constants";
import { CarouselInstanceContextProps } from "../components/CarouselInstanceProvider";
import { CarouselItemProps } from "../components/CarouselItem";
import { CarouselVideoOverlayProps } from "../components/CarouselVideoOverlay";

export enum SpacingDirection {
    bottom,
    left,
    right,
    top,
}
export type StylingLogicConstructor = {
    isCurrentItem?: boolean;
    options: CarouselOptions | undefined;
    progressBarValue?: number;
    overlayRef?: React.MutableRefObject<HTMLElement | undefined> | undefined;
} & Partial<Pick<CarouselInstanceContextProps, 'itemViewerToolbarRef' | 'currentItemInInstance'>>
& Partial<Pick<CarouselVideoOverlayProps, 'videoRef'>>
/*
*Use this when extending styling options
*/
export class StylingLogic {
    private DEFAULT_FONT_FAMILY: string = 'sans-serif';
    private currentItemInInstance;
    private isCurrentItem: boolean | undefined;
    private itemDisplayLocationLogic: ItemDisplayLocationLogic;
    private itemViewerToolbarRef: CarouselInstanceContextProps['itemViewerToolbarRef'];
    private options: CarouselOptions;
    private overlayRef: React.MutableRefObject<HTMLElement | undefined> | undefined;
    private progressBarValue: number;
    private videoRef: React.MutableRefObject<HTMLVideoElement | undefined> | undefined;

    constructor(constructor: StylingLogicConstructor) {
        const {
            currentItemInInstance,
            isCurrentItem,
            itemViewerToolbarRef,
            options,
            overlayRef,
            progressBarValue,
            videoRef,
        } = constructor;
        this.currentItemInInstance = currentItemInInstance;
        this.isCurrentItem = isCurrentItem;
        this.itemViewerToolbarRef = itemViewerToolbarRef;
        this.progressBarValue = progressBarValue || 0;
        this.videoRef = videoRef;
        this.overlayRef = overlayRef;
        this.options = options || {};
        const isCurrentItemInInstancePopulated = Object.keys(currentItemInInstance || {}).length > 0;
        this.itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options: this.options, currentItem: currentItemInInstance });
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
            paddingTop: `${this.getPaddingAmount(SpacingDirection.top, CarouselItem.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: `${this.getPaddingAmount(SpacingDirection.bottom, CarouselItem.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties;

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            backgroundColor: this.options?.styling?.navigation?.backgroundColor || this.options.styling?.container?.backgroundColor || CAROUSEL_COLOR_ONE,
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
        const widthStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
            height: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties : {
            width: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
            height: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties;

        const selectionStyle = this.isCurrentItemSelected ? {
            border: `1${CAROUSEL_SPACING_UNIT} dashed ${CAROUSEL_COLOR_FOUR}`,
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
            backgroundColor: this.options.styling?.itemViewer?.backgroundColor || this.options.styling?.container?.backgroundColor || CAROUSEL_COLOR_ONE,
            justifyContent: 'flex-end',
        } as CSSProperties : {};
    }

    get carouselItemsContainerStyle() {
        const common = {
            marginLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselItem.navigation)}${CAROUSEL_SPACING_UNIT}`,
            marginRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselItem.navigation)}${CAROUSEL_SPACING_UNIT}`,
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

    get carouselVideoOverlayStyle() {
        const widthStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "75%",
            boxShadow: `0 10px 15px -3px rgba(0,0,0,.25)`,
        } as CSSProperties : {};

        const videoHeight = this.videoRef?.current?.getBoundingClientRect().height || 0;
        const overlayHeight = this.overlayRef?.current?.getBoundingClientRect().height || 0;
        const positionStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            transform: 'translate(-50%, 0)',
            top: videoHeight && overlayHeight ? `${Math.abs(videoHeight - overlayHeight) / 2}${CAROUSEL_SPACING_UNIT}` : '50%',
        } as CSSProperties : {};

        return {
            ...widthStyle,
            ...positionStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }

    get carouselVideoTimeTextStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            minWidth: "33%",
        } as CSSProperties : {};
    }
    
    get carouselVideoContainerStyle() {
        const common = {
            position: 'relative',
        } as CSSProperties;
        const layoutStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselItem.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselItem.itemViewer)}${CAROUSEL_SPACING_UNIT}`,
            maxHeight: this.maxHeightNonDefaultItemDisplayLocation,
        } as CSSProperties : {

        };

        return {
            ...common,
            ...layoutStyle,
        }
    }

    get carouselVideoStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            objectPosition: 'bottom',
            height: '100%',
        } as CSSProperties : {};
    }

    get carouselVideoProgressBackgroundStyle() {
        const backgroundColor = this.options.styling?.toolbar?.progressBar?.backgroundColor;
        const shouldSpanWholeWidth = this.options.styling?.toolbar?.progressBar?.shouldSpanContainerWidth;
        const common = {
            backgroundColor,
        } as CSSProperties

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: shouldSpanWholeWidth ? `calc(100% + ${this.getPaddingAmount(SpacingDirection.left, CarouselItem.toolbar) + this.getPaddingAmount(SpacingDirection.right, CarouselItem.toolbar)}${CAROUSEL_SPACING_UNIT})` : '100%',
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
    }

    get carouselVideoProgressForegroundStyle() {
        const foregroundColor = this.options.styling?.toolbar?.progressBar?.foregroundColor;
        const common = {
            backgroundColor: foregroundColor,
        } as CSSProperties

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: `${this.progressBarValue * 100}%`,
            height: '100%',
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
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

    get navigationContainerHorizontalPadding() {
        const navigationPadding = this.getPaddingAmount(SpacingDirection.left, CarouselItem.navigation) + this.getPaddingAmount(SpacingDirection.right, CarouselItem.navigation);
        return navigationPadding;
    }

    get navigationStyle() {
        const common = {
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselItem.navigation)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselItem.navigation)}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties;

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            marginBottom: 0,
            paddingTop: `${CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT / 2 - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: this.itemDisplayLocationLogic.shouldDisplayItemBelow ? (CAROUSEL_ITEM_SPACING_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT) : 0,
            ...common,
        } as CSSProperties : {
            ...common,
        };
    }

    get thumbnailBackgroundStyle() {
        const thumbnail = this.options?.thumbnail;
        const solid = thumbnail?.background?.solid;
        const gradient = thumbnail?.background?.gradient;
        const color = solid?.color;
        const shouldHideOverlay = thumbnail?.hideOverlayUnlessHovered === undefined || !!thumbnail?.hideOverlayUnlessHovered;

        const backgroundSolidStyle = color ? {
            background: 'none',
            backgroundColor: convertHexToRgba(
                color?.trim() || CAROUSEL_COLOR_ONE,
                solid?.opacity || CAROUSEL_DOT_OPACITY_DEFAULT
            ),
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
        } as React.CSSProperties

        return thumbnailBackgroundStyle;
    }

    get thumbnailTextStyle() {
        const thumbnail = this.options?.thumbnail;

        const fontSizeStyle = thumbnail ? {
            fontSize: `${thumbnail?.fontSize}${CAROUSEL_SPACING_UNIT}`,
        } as React.CSSProperties : {};
        const maxLineCountStyle = {
            WebkitLineClamp: thumbnail?.maxLineCount || 2,
        } as React.CSSProperties;

        const textColorStyle = thumbnail?.textColor ? {
            color: thumbnail?.textColor,
        } as React.CSSProperties : {};

        return {
            ...maxLineCountStyle,
            ...fontSizeStyle,
            ...textColorStyle,
            ...this.carouselItemCursorStyle,
        }
    }

    get toolbarStyle() {
        const isItemVideo = getIsVideo(this.currentItemInInstance || {} as CarouselItemProps);
        const customColor = this.options.styling?.toolbar?.backgroundColor || this.options.styling?.container?.backgroundColor;
        const nonDefaultItemDisplayStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            background: customColor || CAROUSEL_COLOR_ONE,
            position: "relative",
            width: '100%',
            paddingTop: `${isItemVideo ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT / 2}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: `${CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT}${CAROUSEL_SPACING_UNIT}`,
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left, CarouselItem.toolbar)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right, CarouselItem.toolbar)}${CAROUSEL_SPACING_UNIT}`,
        } as React.CSSProperties : {};

        return {
            ...nonDefaultItemDisplayStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }
    //#endregion

    //#region Private Getters
    private get carouselItemContainerHeight() {
        return `${this.options?.layout?.itemDisplayHeight || CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`;
    }

    private get maxHeightNonDefaultItemDisplayLocation() {
        return `calc(100% - ${this.itemViewerToolbarRef?.current?.getBoundingClientRect()?.height || 0}${CAROUSEL_SPACING_UNIT})`;
    }
    //#endregion

    //#region Public Methods
    getButtonColor(buttonName: CarouselButton, fallbackColor = CAROUSEL_COLOR_FIVE) {
        const specificFillColor = this.options.styling?.buttons?.[buttonName]?.fillColor;
        const allFillColor = this.options.styling?.buttons?.all?.fillColor;
        return specificFillColor || allFillColor || fallbackColor;
    }

    static getButtonColorStyle(fillColor: string, propertyName: keyof CSSProperties, style = {} as CSSProperties) {
        return {
            ...style,
            [propertyName]: fillColor,
        } as CSSProperties;
    }
    //#endregion

    //#region Private Methods
    private getPaddingAmount(direction: SpacingDirection, item: CarouselItem) {
        let defaultPadding: number;
        let allPadding: number | undefined;
        let customPadding: number | undefined;
        let specificElementPadding: number | undefined;

        switch (direction) {
            case SpacingDirection.bottom:
                defaultPadding = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : (CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT);
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
                defaultPadding = this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
                allPadding = this.options.styling?.container?.padding?.top;
                // specificElementPadding = this.options.styling?.[item]?.padding?.top;
                customPadding = specificElementPadding || allPadding
                return customPadding !== undefined ? customPadding : defaultPadding;
        }
        //#endregion
    }
}