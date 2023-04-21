import { CSSProperties } from "react";
import { CarouselOptions } from "../types";
import { ItemDisplayLocationLogic } from "./ItemDisplayLocationLogic";
import { CarouselItemProps } from "../components/CarouselItem";

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
        this.carouselItemContainerStyle = !this.itemDisplayLocationLogic.getShouldDisplayItemViewer() ? {
            width: "100%",
            height: "50rem",
            maxHeight: '50rem',
            display: "flex",
            flexDirection: "initial",
            alignItems: "initial",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "black",
        } as CSSProperties : {}

    }

    getCarouselItemContainerStyle(): CSSProperties {
        return this.carouselItemContainerStyle;
    }

    getFontFamilyItemViewerStyle(): CSSProperties {
        return this.fontFamilyItemViewerStyle;
    }

    getFontFamilyNavigationStyle(): CSSProperties {
        return this.fontFamilyNavigationStyle;
    }
}