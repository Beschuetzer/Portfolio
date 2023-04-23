import { CarouselImage } from "../components/CarouselImage";
import { CarouselItemProps } from "../components/CarouselItem";
import { CarouselVideo } from "../components/CarouselVideo";
import { CAROUSEL_ITEM_SIZE_DEFAULT, CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT } from "../constants";
import { CarouselOptions } from "../types";
import { getIsVideo } from "../utils";

export type ItemDisplayLocationLogicConstructor = {
    options: CarouselOptions;
    currentItem?: CarouselItemProps;
}
/*
*Logic related to itemDisplayLocation option
*/
export class ItemDisplayLocationLogic {
    private isCurrentItemPopulated: boolean;
    private options: CarouselOptions;
    private currentItem?: CarouselItemProps;

    constructor(constructor: ItemDisplayLocationLogicConstructor) {
        const { options, currentItem } = constructor;
        this.options = options;
        this.currentItem = currentItem;
        this.isCurrentItemPopulated = Object.keys(this.currentItem || {}).length > 0;
    }

    get carouselItemSize() {
        if (this.isDefaultItemDisplayLocation) {
            return this.options?.thumbnail?.size || CAROUSEL_ITEM_SIZE_DEFAULT;
        }
        return this.options?.thumbnail?.size || CAROUSEL_ITEM_SIZE_DISPLAY_NON_ITEM_VIEWER_DEFAULT;
    }
    
    get isDefaultItemDisplayLocation() {
        return !this.options?.layout?.itemDisplayLocation || this.options?.layout?.itemDisplayLocation === 'none';
    }

    get itemToRender() {
        if (!this.currentItem) return null as any;
        const isVideo = getIsVideo(this.currentItem);
        return isVideo ? CarouselVideo : CarouselImage;
    }

    get shouldDisplayItemAbove() {
        return this.options?.layout?.itemDisplayLocation === 'above';
    }

    get shouldDisplayItemBelow() {
        return this.options?.layout?.itemDisplayLocation === 'below';
    }
}