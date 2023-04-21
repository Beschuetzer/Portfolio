import { CSSProperties } from "react";
import { CarouselOptions } from "../types";

/*
*Use this when extending styling options
*/
export class StylingLogic {
    private DEFAULT_FONT_FAMILY: string = 'sans-serif';
    private fontFamilyItemViewerStyle = {} as CSSProperties;
    private fontFamilyNavigationStyle = {} as CSSProperties;

    constructor(options: CarouselOptions) {
        const stylings = options.styling;
        if (!stylings) return;
        const fontFamily = stylings?.fontFamily || {};

        this.fontFamilyItemViewerStyle = fontFamily?.all || fontFamily?.itemViewer ? {
            fontFamily: fontFamily?.all || fontFamily?.itemViewer || this.DEFAULT_FONT_FAMILY,
        } : {}

        this.fontFamilyNavigationStyle = fontFamily?.all || fontFamily?.navigation ? {
            fontFamily: fontFamily?.all || fontFamily?.navigation || this.DEFAULT_FONT_FAMILY,
        } : {}
    }

    getFontFamilyItemViewerStyle(): CSSProperties {
        return this.fontFamilyItemViewerStyle;
    }
    
    getFontFamilyNavigationStyle(): CSSProperties {
        return this.fontFamilyNavigationStyle;
    }
}