import { CSSProperties } from "react";
import { CarouselOptions } from "../types";
import { ItemDisplayLocationLogic } from "./ItemDisplayLocationLogic";
import { convertHexToRgba } from "../utils";
import { CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_SPACING_UNIT, CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_COLOR_FOUR, CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_COLOR_ONE, CAROUSEL_DOT_OPACITY_DEFAULT, CAROUSEL_COLOR_FIVE, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT, CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT } from "../constants";
import { CarouselInstanceContextProps } from "../components/CarouselInstanceProvider";

export type StylingLogicConstructor = {
    options: CarouselOptions | undefined;
    isCurrentItem?: boolean;
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

    constructor(constructor: StylingLogicConstructor) {
        const {
            currentItemInInstance,
            isCurrentItem,
            itemViewerToolbarRef,
            options,
        } = constructor;
        this.itemViewerToolbarRef = itemViewerToolbarRef;
        this.options = options || {};
        this.currentItemInInstance = currentItemInInstance;
        this.isCurrentItem = isCurrentItem;
        const isCurrentItemInInstancePopulated = Object.keys(currentItemInInstance || {}).length > 0;
        this.itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options: this.options, currentItem: currentItemInInstance });
    }

    get carouselImageStlye(){
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: '100%',
            maxHeight: this.maxHeightNonDefaultItemDisplayLocation,
        } as CSSProperties : {} as CSSProperties;
    }

    get carouselStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            backgroundColor: CAROUSEL_COLOR_ONE,
            borderRadius: 4,
        } as CSSProperties : {} as CSSProperties;
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

    get carouselItemContainerHeight() {
        return `${this.options?.layout?.itemDisplayHeight || CAROUSEL_ITEM_CONTAINER_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`;
    }

    get carouselItemContainerStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: this.carouselItemContainerHeight,
            position: "relative",
            backgroundColor: CAROUSEL_COLOR_ONE,
            justifyContent: 'flex-end',
        } as CSSProperties : {};
    }

    get carouselItemsContainerStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            margin: `0 ${this.thumbnailMarginHorizontal}${CAROUSEL_SPACING_UNIT}`,
            overflow: 'hidden',
        } as CSSProperties : {};
    }

    get carouselVideoOverlayStyle() {
        const widthStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "75%",
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
            padding: `0 ${CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
            maxHeight: this.maxHeightNonDefaultItemDisplayLocation,
        } as CSSProperties : {};
    }

    get carouselVideoProgressStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
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

    get maxHeightNonDefaultItemDisplayLocation() {
        return  `calc(100% - ${this.itemViewerToolbarRef?.current?.getBoundingClientRect()?.height || 0}${CAROUSEL_SPACING_UNIT})`;
    }

    get navigationStyle() {
        return !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            marginBottom: 0,
            padding: `${CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT / 2}${CAROUSEL_SPACING_UNIT} ${CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT}${CAROUSEL_SPACING_UNIT}`,
        } as CSSProperties : {};
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

    get thumbnailMarginHorizontal() {
        if (this.itemDisplayLocationLogic.isDefaultItemDisplayLocation) {
            return this.options.thumbnail?.marginHorizontal || CAROUSEL_ITEMS_MARGIN_HORIZONTAL_DEFAULT;
        }
        return this.options.thumbnail?.marginHorizontal || CAROUSEL_ITEMS_MARGIN_HORIZONTAL_NON_ITEM_VIEWER_DEFAULT;
    }

    get toolbarStyle() {
        const nonDefaultItemDisplayStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            background: CAROUSEL_COLOR_ONE,
            position: "static",
            width: '100%',
        } as React.CSSProperties : {};

        return {
            ...nonDefaultItemDisplayStyle,
            ...this.fontFamilyItemViewerStyle,
        }
    }

    getNavigationFillColor(svgRefColor: string | undefined) {
        return this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? svgRefColor : CAROUSEL_COLOR_FIVE;
    }
}