import { CarouselImage } from "../components/CarouselImage";
import { CarouselItemProps } from "../components/CarouselItem";
import { CarouselVideo } from "../components/CarouselVideo";
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

    getItemToRender() {
        if (!this.currentItem) return null as any;
        const isVideo = getIsVideo(this.currentItem);
        return isVideo ? CarouselVideo : CarouselImage;
    }

    getShouldDisplayItemAbove() {
        return this.options.itemDisplayLocation === 'above';
    }

    getShouldDisplayItemBelow() {
        return this.options.itemDisplayLocation === 'below';
    }
    
    getShouldDisplayItemViewer() {
        return !this.options?.itemDisplayLocation || this.options.itemDisplayLocation === 'none';
    }
}