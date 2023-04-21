import { CarouselOptions } from "../types";

export class ItemDisplayLocationLogic {
    constructor(private options: CarouselOptions) {

    }

    getShouldDisplayItemViewer() {
        return !this.options?.itemDisplayLocation || this.options.itemDisplayLocation === 'none';
    }
}