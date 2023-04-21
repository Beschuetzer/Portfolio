import { CarouselImage } from "../components/CarouselImage";
import { CarouselItemProps } from "../components/CarouselItem";
import { CarouselVideo } from "../components/CarouselVideo";
import { CarouselOptions } from "../types";
import { getIsVideo } from "../utils";

/*
*Logic related to itemDisplayLocation option
*/
export class ItemDisplayLocationLogic {
    constructor(
        private options: CarouselOptions, 
        private currentItem?: CarouselItemProps
    ) {}

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