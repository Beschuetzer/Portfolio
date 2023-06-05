import { CarouselItemProps } from "../components/CarouselItem";
import { CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT, CAROUSEL_ITEM_SPACING_DEFAULT, MAX_CLICK_THRESHOLD_DEFAULT } from "../constants";
import { CarouselOptions } from "../types";
import { getCurrentValue } from "../utils";

export type OptionsConstructor = {
    options: CarouselOptions;
    currentItem?: CarouselItemProps;
    numberOfPages?: number;
    items?: CarouselItemProps[];
}
/*
*Logic related to options that are not style-related
*/
export class OptionsLogic {
    private options;
    private currentItem;
    private numberOfPages;
    private items;

    constructor(constructor: OptionsConstructor) {
        const { options, currentItem, numberOfPages, items } = constructor;
        this.options = options;
        this.currentItem = currentItem;
        this.numberOfPages = numberOfPages || 0;
        this.items = items || [];
    }

    //#region Getters
    get autoChangePage() {
        return getCurrentValue(this.options?.navigation?.autoChangePage, true)
    }

    get carouselItemSize() {
        if (this.isDefaultItemDisplayLocation) {
            return getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DEFAULT);
        }
        return getCurrentValue(this.options?.thumbnail?.size, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT);
    }

    get isDefaultItemDisplayLocation() {
        return this.itemDisplayLocation === 'none';
    }

    get itemDisplayLocation() {
        return getCurrentValue(this.options?.layout?.itemDisplayLocation, 'none');
    }

    get isItemDisplayLocationAbove() {
        return this.itemDisplayLocation === 'above';
    }

    get isItemDisplayLocationBelow() {
        return this.itemDisplayLocation === 'below';
    }

    get isItemViewerSwipingDisabled() {
        return this.items.length <= 1 || getCurrentValue(this.options?.itemViewer?.disableSwiping, false);
    }

    get isNavigationSwipingDisabled() {
        return this.numberOfPages <= 1 || getCurrentValue(this.options?.navigation?.disableSwiping, false);
    }

    get isWrappingDisabled() {
        return getCurrentValue(this.options.navigation?.disableWrapping, false);
    }

    get itemPositioning() {
        return getCurrentValue(this.options.layout?.itemPositioning, undefined);
    }

    get itemSpacingStrategy() {
        return getCurrentValue(this.options.thumbnail?.itemSpacingStrategy, 'min')
    }

    get itemViewerMaxClickThreshold() {
        return getCurrentValue(this.options.itemViewer?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT);
    }

    get navigationMaxClickThreshold() {
        return getCurrentValue(this.options.navigation?.maxClickThreshold, MAX_CLICK_THRESHOLD_DEFAULT);
    }

    get shouldDisableThumbnailOverlay() {
        return getCurrentValue(this.options.thumbnail?.descriptionOverlay?.isDisabled, !this.isDefaultItemDisplayLocation && this.shouldHideThumbnailOverlay)
    }

    get shouldHideThumbnailOverlay() {
        return getCurrentValue(this.options.thumbnail?.descriptionOverlay?.hideDescriptionOverlayUnlessHovered, true);
    }
    //#endregion

    //#region Methods
    getItemSpacing(valueToUseIfNoPositioningGiven = CAROUSEL_ITEM_SPACING_DEFAULT / 2) {
        const currentItemSpacing = getCurrentValue(this.options.thumbnail?.itemSpacing, CAROUSEL_ITEM_SPACING_DEFAULT / 2);
        return this.itemPositioning !== undefined ? currentItemSpacing : valueToUseIfNoPositioningGiven;
    }
    //#endregion
}