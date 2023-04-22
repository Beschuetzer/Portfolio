import { CSSProperties } from "react";
import { CarouselOptions } from "../types";
import { ItemDisplayLocationLogic } from "./ItemDisplayLocationLogic";
import { CarouselItemProps } from "../components/CarouselItem";
import { CAROUSEL_DOT_OPACITY_DEFAULT, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT } from "../constants";
import { convertHexToRgba } from "../utils";

export type StylingLogicConstructor = {
    currentItemInInstance?: CarouselItemProps;
    options: CarouselOptions;
    isCurrentItem?: boolean;
}

/*
*Use this when extending styling options
*/
export class StylingLogic {
    private DEFAULT_FONT_FAMILY: string = 'sans-serif';
    private currentItemInInstance: CarouselItemProps | undefined;
    private isCurrentItem: boolean | undefined;
    private itemDisplayLocationLogic: ItemDisplayLocationLogic;
    private options: CarouselOptions;

    constructor(constructor: StylingLogicConstructor) {
        const {
            currentItemInInstance,
            isCurrentItem,
            options
        } = constructor;
        this.options = options;
        this.currentItemInInstance = currentItemInInstance;
        this.isCurrentItem = isCurrentItem;
        const isCurrentItemInInstancePopulated = Object.keys(currentItemInInstance || {}).length > 0;
        this.itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options: options || {}, currentItem: currentItemInInstance });
    }

    get carouselItemCursorStyle() {
        return this.isCurrentItemSelected ? {
            cursor: 'auto',
        } as CSSProperties : {} as CSSProperties;
    }

    get carouselItemStyle() {
        const widthStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}px`,
            height: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}px`,
        } as CSSProperties : {
            width: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
            height: this.options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
        } as CSSProperties;

        const selectionStyle = this.isCurrentItemSelected ? {
            border: '1px solid red',
            ...this.carouselItemCursorStyle,
        } as CSSProperties : {} as CSSProperties;

        return {
            ...selectionStyle,
            ...widthStyle,
        } as CSSProperties;
    }

    get carouselItemContainerHeight() {
        return `${this.options?.itemHeight || CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT}px`;
    }

    get carouselItemContainerStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: this.carouselItemContainerHeight,
            display: "flex",
            flexDirection: "initial",
            alignItems: "initial",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "black",
            marginBottom: "10px",
        } as CSSProperties : {};
    }

    get carouselItemsContainerStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            margin: `0 ${this.thumbnailMarginHorizontal}px`,
            overflow: 'hidden',
            marginTop: `${this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? 0 : (this.thumbnailMarginHorizontal / 1)}px`,
        } as CSSProperties : {};
    }

    get carouselVideoStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: this.carouselItemContainerHeight,
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

    get thumbnailBackgroundStyle() {
        const thumbnail = this.options?.thumbnail;
        const solid = thumbnail?.background?.solid;
        const gradient = thumbnail?.background?.gradient;
        const color = solid?.color;
        const shouldHideOverlay = thumbnail?.hideOverlayUnlessHovered === undefined || !!thumbnail?.hideOverlayUnlessHovered;

        const backgroundSolidStyle = color ? {
            background: 'none',
            backgroundColor: convertHexToRgba(
                color?.trim() || '#000',
                solid?.opacity || CAROUSEL_DOT_OPACITY_DEFAULT
            ),
        } as React.CSSProperties : {};

        const backgroundGradientStyle = gradient ? {
            background: `linear-gradient(${gradient?.angle || 180}deg, ${convertHexToRgba(gradient.start?.color || '#fff', gradient.start?.opacity || 0)} 0%, ${convertHexToRgba(gradient.end?.color || '#000', gradient.end?.opacity || 1)} 100%)`,
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

    get thumbnailMarginHorizontal() {
        if (this.itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
            return this.options.thumbnail?.marginHorizontal || CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT;
        }
        return this.options.thumbnail?.marginHorizontal || CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
    }
}