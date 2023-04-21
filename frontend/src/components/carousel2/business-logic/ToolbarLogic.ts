import { CarouselItemProps } from "../components/CarouselItem";

/*
*Use this for logic related to the Item Viewer toolbar
*/
export class ToolbarLogic {
    constructor(public currentItems: CarouselItemProps[]) {}

    getShouldDisplayNextAndBackButton() {
        return this.currentItems?.length > 1;
    }

    getShouldSkipKeyboardShortcuts() {
        return !this.currentItems || this.currentItems?.length === 0;
    }
}