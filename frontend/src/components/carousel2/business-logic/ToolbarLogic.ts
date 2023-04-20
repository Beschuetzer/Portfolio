import { CarouselItemProps } from "../components/CarouselItem";

export class ToolbarLogic {
    constructor(public currentItems: CarouselItemProps[]) {
        
    }

    getShouldDisplayNextAndBackButton() {
        return this.currentItems?.length > 1;
    }

    getShouldSkipKeyboardShortcuts() {
        return !this.currentItems || this.currentItems?.length === 0;
    }
}