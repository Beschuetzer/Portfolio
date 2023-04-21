import { CSSProperties } from "react";
import { CarouselOptions } from "../types";
import { ItemDisplayLocationLogic } from "./ItemDisplayLocationLogic";
import { CarouselItemProps } from "../components/CarouselItem";

/*
*Use this when extending styling options
*/
export class StylingLogic {
    private itemDisplayLocationLogic: ItemDisplayLocationLogic;

    private DEFAULT_FONT_FAMILY: string = 'sans-serif';
    private fontFamilyItemViewerStyle = {} as CSSProperties;
    private fontFamilyNavigationStyle = {} as CSSProperties;
    private carouselItemContainerStyle = {} as CSSProperties;

    constructor(options: CarouselOptions) {
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

        this.itemDisplayLocationLogic = new ItemDisplayLocationLogic(options || {}, {} as CarouselItemProps);
        this.carouselItemContainerStyle = !this.itemDisplayLocationLogic.getShouldDisplayItemViewer() ? {
            width: "100%",
            height: "auto",
            maxHeight: '50rem',
            display: "flex",
            flexDirection: "initial",
            alignItems: "initial",
            justifyContent: "center",
            position: "relative",
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