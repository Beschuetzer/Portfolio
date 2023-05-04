import { CarouselItemProps } from "../components/CarouselItem";

export type ToolbarLogicConstructor = {
    items: CarouselItemProps[];
}

/*
*Use this for logic related to the Item Viewer toolbar
*/
export class ToolbarLogic {
    private items;

    constructor({
        items,
    }: ToolbarLogicConstructor) {
        this.items = items;
    }

    getShouldDisplayNextAndBackButton() {
        return this.items?.length > 1;
    }

    getShouldSkipKeyboardShortcuts() {
        return !this.items || this.items?.length === 0;
    }
}