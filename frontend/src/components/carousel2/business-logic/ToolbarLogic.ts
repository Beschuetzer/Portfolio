import { CarouselItemProps } from "../components/CarouselItem";

/*
*Use this for logic related to the Item Viewer toolbar
*/
export class ToolbarLogic {
    constructor(public items: CarouselItemProps[]) {}

    getShouldDisplayNextAndBackButton() {
        return this.items?.length > 1;
    }

    getShouldSkipKeyboardShortcuts() {
        return !this.items || this.items?.length === 0;
    }
}