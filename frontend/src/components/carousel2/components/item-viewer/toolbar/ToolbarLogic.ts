import { CarouselItemProps } from "../../CarouselItem";

export class ToolbarLogic {
    constructor(public currentItems: CarouselItemProps[]) {
        
    }

    getShouldDisplayNextAndBackButton() {
        return this.currentItems?.length > 1;
    }
}