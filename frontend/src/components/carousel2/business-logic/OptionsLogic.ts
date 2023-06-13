import { CarouselItemProps } from "../components/CarouselItem";
import { CAROUSEL_COLOR_ONE, CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_ITEM_SPACING_DEFAULT, MAX_CLICK_THRESHOLD_DEFAULT, SEEK_AMOUNT_DEFAULT } from "../constants";
import { CarouselOptions } from "../types";
import { getCurrentValue } from "../utils";

export type OptionsConstructor = {
    options: CarouselOptions;
    currentItem?: CarouselItemProps;
    isFullscreenMode: boolean;
    numberOfPages?: number;
    items?: CarouselItemProps[];
}
/*
*Logic related to options that are not style-related
*/
export class OptionsLogic {
    private options;
    private currentItem;
    private isFullscreenMode;
    private numberOfPages;
    private items;

    constructor(constructor: OptionsConstructor) {
        const { options, currentItem, numberOfPages, items, isFullscreenMode } = constructor;
        this.options = options;
        this.currentItem = currentItem;
        this.isFullscreenMode = isFullscreenMode;
        this.numberOfPages = numberOfPages || 0;
        this.items = items || [];
    }

    //#region Getters
    get autoChangePage() {
        return getCurrentValue(this.options?.navigation?.autoChangePage, true, this.isFullscreenMode);
    }

    get carouselItemSize() {
        if (this.isDefaultItemDisplayLocation) {
            return getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DEFAULT, this.isFullscreenMode);
        }
        return getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT, this.isFullscreenMode);
    }

    get isDefaultItemDisplayLocation() {
        return this.itemDisplayLocation === 'none';
    }

    get itemDisplayLocation() {
        return getCurrentValue(this.options?.layout?.itemDisplayLocation, 'none', this.isFullscreenMode);
    }

    get isItemDisplayLocationAbove() {
        return this.itemDisplayLocation === 'above';
    }

    get isItemDisplayLocationBelow() {
        return this.itemDisplayLocation === 'below';
    }

    get isItemViewerSwipingDisabled() {
        return this.items.length <= 1 || getCurrentValue(this.options?.itemViewer?.disableSwiping, false, this.isFullscreenMode);
    }

    get isLastPageFlush() {
        return this.options?.navigation?.isLastPageFlush === undefined ? true : this.options.navigation.isLastPageFlush;
    }

    get isNavigationSwipingDisabled() {
        return this.numberOfPages <= 1 || getCurrentValue(this.options?.navigation?.disableSwiping, false, this.isFullscreenMode);
    }

    get isWrappingDisabled() {
        return getCurrentValue(this.options.navigation?.disableWrapping, false, this.isFullscreenMode);
    }

    get itemPositioning() {
        return getCurrentValue(this.options.layout?.itemPositioning, undefined, this.isFullscreenMode);
    }

    get itemSpacingStrategy() {
        return getCurrentValue(this.options.thumbnail?.itemSpacingStrategy, 'min', this.isFullscreenMode);
    }

    get itemViewerMaxClickThreshold() {
        return getCurrentValue(this.options.itemViewer?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT, this.isFullscreenMode);
    }

    get itemViewerPreviewIsVisible() {
        const value = getCurrentValue(this.options.styling?.itemViewerPreview?.isVisibleInNonFullscreenMode, false, this.isFullscreenMode);
        return this.isFullscreenMode ? true : value;
    }

    get navigationMaxClickThreshold() {
        return getCurrentValue(this.options.navigation?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT, this.isFullscreenMode);
    }

    get shouldDisableThumbnailOverlay() {
        return getCurrentValue(this.options.thumbnail?.descriptionOverlay?.isDisabled, !this.isDefaultItemDisplayLocation && this.shouldHideThumbnailOverlay, this.isFullscreenMode);
    }

    get shouldHideThumbnailOverlay() {
        return getCurrentValue(this.options.thumbnail?.descriptionOverlay?.hideDescriptionOverlayUnlessHovered, true, this.isFullscreenMode);
    }

    get videoSeekAmount() {
        return getCurrentValue(this.options?.itemViewer?.seekAmount, SEEK_AMOUNT_DEFAULT, this.isFullscreenMode) / 1000;
    }
    
    get videoCurrentStateIndicatorBackgroundColor() {
        return getCurrentValue(this.options.styling?.videoCurrentStateIndicator?.background, CAROUSEL_COLOR_ONE, this.isFullscreenMode);
    }
    //#endregion

    //#region Methods
    getItemSpacing(valueToUseIfNoPositioningGiven = CAROUSEL_ITEM_SPACING_DEFAULT / 2) {
        const currentItemSpacing = getCurrentValue(this.options.thumbnail?.itemSpacing, CAROUSEL_ITEM_SPACING_DEFAULT / 2, this.isFullscreenMode);
        return this.itemPositioning !== undefined ? currentItemSpacing : valueToUseIfNoPositioningGiven;
    }
    //#endregion
}