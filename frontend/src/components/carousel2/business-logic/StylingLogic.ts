import { CSSProperties } from "react";
import { CarouselOptions } from "../types";
import { ItemDisplayLocationLogic } from "./ItemDisplayLocationLogic";
import { convertHexToRgba, getIsVideo } from "../utils";
import { CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_SPACING_UNIT, CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_COLOR_FOUR, CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_COLOR_ONE, CAROUSEL_DOT_OPACITY_DEFAULT, CAROUSEL_COLOR_FIVE, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT, NUMBER_OF_PAGES_INITIAL, CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT } from "../constants";
import { CarouselInstanceContextProps } from "../components/CarouselInstanceProvider";
import { CarouselItemProps } from "../components/CarouselItem";

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
} & Partial<Pick<CarouselInstanceContextProps, 'itemViewerToolbarRef' | 'currentItemInInstance'>>;
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
    private progressBarValue: number;

    constructor(constructor: StylingLogicConstructor) {
        const {
            currentItemInInstance,
            isCurrentItem,
            itemViewerToolbarRef,
            options,
            progressBarValue,
        } = constructor;
        this.currentItemInInstance = currentItemInInstance;
        this.isCurrentItem = isCurrentItem;
        this.itemViewerToolbarRef = itemViewerToolbarRef;
        this.progressBarValue = progressBarValue || 0;
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
            paddingTop: `${this.getPaddingAmount(SpacingDirection.top)}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: `${this.getPaddingAmount(SpacingDirection.bottom)}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties;

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            backgroundColor: this.options?.layout?.colors?.background?.navigation || this.options.layout?.colors?.background?.all || CAROUSEL_COLOR_ONE,
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
            backgroundColor: this.options.layout?.colors?.background?.itemViewerContainer || this.options.layout?.colors?.background?.all || CAROUSEL_COLOR_ONE,
            justifyContent: 'flex-end',
        } as CSSProperties : {};
    }

    get carouselItemsContainerStyle() {
        const common = {
            marginLeft: `${this.getPaddingAmount(SpacingDirection.left)}${CAROUSEL_SPACING_UNIT}`,
            marginRight: `${this.getPaddingAmount(SpacingDirection.right)}${CAROUSEL_SPACING_UNIT}`,
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

        return {
            ...widthStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }

    get carouselVideoTimeTextStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            minWidth: "33%",
        } as CSSProperties : {};
    }

    get carouselVideoStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            objectPosition: 'bottom',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right)}${CAROUSEL_SPACING_UNIT}`,
            maxHeight: this.maxHeightNonDefaultItemDisplayLocation,
        } as CSSProperties : {};
    }

    get carouselVideoProgressBackgroundStyle() {
        const backgroundColor = this.options.layout?.colors?.items?.toolbar?.progress?.background;
        const common = {
            backgroundColor,
        } as CSSProperties

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            ...common,
        } as CSSProperties : {
            ...common,
        } as CSSProperties;
    }

    get carouselVideoProgressForegroundStyle() {
        const foregroundColor = this.options.layout?.colors?.items?.toolbar?.progress?.foreground;
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

    get horizontalPadding() {
        return this.getPaddingAmount(SpacingDirection.left) + this.getPaddingAmount(SpacingDirection.right);
    }

    get navigationStyle() {
        const common = {
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right)}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties;

        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            marginBottom: 0,
            paddingTop: `${CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT / 2 - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: 0,
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
        const customColor = this.options.layout?.colors?.background?.toolbar || this.options.layout?.colors?.background?.all;
        const nonDefaultItemDisplayStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            background: customColor || CAROUSEL_COLOR_ONE,
            position: "static",
            width: '100%',
            paddingTop: `${isItemVideo ? 0 : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT / 2}${CAROUSEL_SPACING_UNIT}`,
            paddingBottom: `${CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT}${CAROUSEL_SPACING_UNIT}`,
            paddingLeft: `${this.getPaddingAmount(SpacingDirection.left)}${CAROUSEL_SPACING_UNIT}`,
            paddingRight: `${this.getPaddingAmount(SpacingDirection.right)}${CAROUSEL_SPACING_UNIT}`,
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

    private get padding() {
        return `${this.getPaddingAmount(SpacingDirection.top)}${CAROUSEL_SPACING_UNIT} ${this.getPaddingAmount(SpacingDirection.right)}${CAROUSEL_SPACING_UNIT} ${this.getPaddingAmount(SpacingDirection.bottom)}${CAROUSEL_SPACING_UNIT} ${this.getPaddingAmount(SpacingDirection.left)}${CAROUSEL_SPACING_UNIT}`;
    }
    //#endregion

    //#region Public Methods
    getNavigationFillColor(svgRefColor: string | undefined) {
        return this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? svgRefColor : CAROUSEL_COLOR_FIVE;
    }
    //#endregion

    //#region Private Methods
    private getPaddingAmount(direction: SpacingDirection) {
        switch (direction) {
            case SpacingDirection.bottom:
                if (this.itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
                    return this.options.layout?.padding?.bottom !== undefined ? this.options.layout.padding.bottom : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT;
                }
                return this.options.layout?.padding?.bottom !== undefined ? this.options.layout?.padding?.bottom : (CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT - CAROUSEL_ITEM_HOVER_TRANSLATE_UP_AMOUNT);
            case SpacingDirection.left:
                if (this.itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
                    return this.options.layout?.padding?.left !== undefined ? this.options.layout.padding.left : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT;
                }
                return this.options.layout?.padding?.left !== undefined ? this.options.layout?.padding?.left : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
            case SpacingDirection.right:
                if (this.itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
                    return this.options.layout?.padding?.right !== undefined ? this.options.layout.padding.right : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT;
                }
                return this.options.layout?.padding?.right !== undefined ? this.options.layout?.padding?.right : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
            case SpacingDirection.top:
                if (this.itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
                    return this.options.layout?.padding?.top !== undefined ? this.options.layout.padding.top : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT;
                }
                return this.options.layout?.padding?.top !== undefined ? this.options.layout?.padding?.top : CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
        }
    }
    //#endregion
}