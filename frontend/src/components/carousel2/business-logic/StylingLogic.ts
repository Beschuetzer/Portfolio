import { CSSProperties } from "react";
import { CarouselOptions } from "../types";
import { ItemDisplayLocationLogic } from "./ItemDisplayLocationLogic";
import { CarouselItemProps } from "../components/CarouselItem";
import { CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT } from "../constants";

export type StylingLogicConstructor = {
    options: CarouselOptions;
    currentItemInInstance?: CarouselItemProps;
}

/*
*Use this when extending styling options
*/
export class StylingLogic {
    private itemDisplayLocationLogic: ItemDisplayLocationLogic;

    private DEFAULT_FONT_FAMILY: string = 'sans-serif';
    private fontFamilyItemViewerStyle = {} as CSSProperties;
    private fontFamilyNavigationStyle = {} as CSSProperties;
    private carouselItemContainerStyle = {} as CSSProperties;
    private carouselItemStyle = {} as CSSProperties;
    private carouselVideoStyle = {} as CSSProperties;

    constructor(constructor: StylingLogicConstructor) {
        const { options, currentItemInInstance } = constructor;
        const isCurrentItemInInstancePopulated = Object.keys(currentItemInInstance || {}).length > 0;

        const stylings = options.styling;
        if (stylings) {
            const fontFamily = stylings?.fontFamily || {};
            this.fontFamilyItemViewerStyle = fontFamily?.all || fontFamily?.itemViewer ? {
                fontFamily: fontFamily?.all || fontFamily?.itemViewer || this.DEFAULT_FONT_FAMILY,
            } : {}

            this.fontFamilyNavigationStyle = fontFamily?.all || fontFamily?.navigation ? {
                fontFamily: fontFamily?.all || fontFamily?.navigation || this.DEFAULT_FONT_FAMILY,
            } : {}

        }

        this.itemDisplayLocationLogic = new ItemDisplayLocationLogic({options: options || {}, currentItem: currentItemInInstance});
        this.carouselItemContainerStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: "auto",
            maxHeight: '50rem',
            display: "flex",
            flexDirection: "initial",
            alignItems: "initial",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "black",
            marginBottom: "10px",
        } as CSSProperties : {}

        this.carouselVideoStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: "100%",
            height: "100%",
        } as CSSProperties : {}

        this.carouselItemStyle = !this.itemDisplayLocationLogic.isDefaultItemDisplayLocation ? {
            width: options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}px`,
            height: options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT}px`,
        } as CSSProperties : {
            width: options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
            height: options?.thumbnail?.size || `${CAROUSEL_ITEM_SIZE_DEFAULT}px`,
        }
    }

    getCarouselItemStyle(): CSSProperties {
        return this.carouselItemStyle;
    }
    getCarouselItemContainerStyle(): CSSProperties {
        return this.carouselItemContainerStyle;
    }

    getCarouselVideoStyle(): CSSProperties {
        return this.carouselVideoStyle;
    }

    getFontFamilyItemViewerStyle(): CSSProperties {
        return this.fontFamilyItemViewerStyle;
    }

    getFontFamilyNavigationStyle(): CSSProperties {
        return this.fontFamilyNavigationStyle;
    }
}