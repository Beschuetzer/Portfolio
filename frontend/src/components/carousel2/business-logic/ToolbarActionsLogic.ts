import { ITEM_VIEWER_CLOSE_SHORTCUTS, ITEM_VIEWER_NEXT_ITEM_SHORTCUTS, ITEM_VIEWER_PLAY_SHORTCUTS, ITEM_VIEWER_PREVIOUS_ITEM_SHORTCUTS, ITEM_VIEWER_SEEK_BACKWARDS_SHORTCUTS, ITEM_VIEWER_SEEK_FORWARDS_SHORTCUTS } from "../constants";
import { CarouselContextOutputProps } from "../context";
import { CarouselItemViewerActions, CarouselAction, CarouselActionOnActionCompleted, CarouselElement, KeyInput, ValidKey } from "../types";

type GetAllKeysResponse = {
    [name in keyof CarouselItemViewerActions]: KeyInput[];
}
type GetAllOnActionCompleted = {
    [name in keyof CarouselItemViewerActions]: CarouselActionOnActionCompleted;
}
type GetAllResonse = {
    keys: GetAllKeysResponse;
    onActionCompleted: GetAllOnActionCompleted;
}
type GetIndividualResponse = Required<CarouselAction>;

export type ToolbarActionsLogicConstructor = {

} & Pick<CarouselContextOutputProps, 'options'>
& Partial<Pick<CarouselContextOutputProps, 'isFullscreenMode'>>

/*
*Use this if/when adding new actions/buttons to Item Viewer toolbar
*/
export class ToolbarActionsLogic {
    public isPauseSeparate: boolean;

    private _itemViewerShortcuts: CarouselItemViewerActions;
    private _doNothing = () => null;
    
    private _closeShortcut: CarouselAction;
    private _nextItemShortcut: CarouselAction;
    private _pauseShortcut: CarouselAction;
    private _playShortcut: CarouselAction;
    private _previousItemShortcut: CarouselAction;
    private _seekBackwardsShortcut: CarouselAction;
    private _seekForwardsShortcut: CarouselAction;
    private _options; 
    private _isFullscreenMode;

    private _emptyAction = {
        onActionCompleted: this._doNothing,
        keys: [],
    } as Required<CarouselAction>;
    
    constructor(constructor: ToolbarActionsLogicConstructor) {
        const {
            options,
            isFullscreenMode,
        } = constructor;

        this._options = options;
        this._isFullscreenMode = isFullscreenMode;
        this._itemViewerShortcuts = options?.shortcuts?.itemViewer || {};
        this._closeShortcut =  {
            onActionCompleted: this._itemViewerShortcuts?.[CarouselElement.closeButton]?.onActionCompleted,
            keys: this._itemViewerShortcuts?.[CarouselElement.closeButton]?.keys || ITEM_VIEWER_CLOSE_SHORTCUTS,
        }
        this._nextItemShortcut =  {
            onActionCompleted: this._itemViewerShortcuts?.[CarouselElement.nextButton]?.onActionCompleted,
            keys: this._itemViewerShortcuts?.[CarouselElement.nextButton]?.keys || ITEM_VIEWER_NEXT_ITEM_SHORTCUTS,
        }
        this._pauseShortcut =  {
            onActionCompleted: this._itemViewerShortcuts?.[CarouselElement.pauseButton]?.onActionCompleted,
            keys: this._itemViewerShortcuts?.[CarouselElement.pauseButton]?.keys || ITEM_VIEWER_PLAY_SHORTCUTS,
        }
        this._playShortcut =  {
            onActionCompleted: this._itemViewerShortcuts?.[CarouselElement.playButton]?.onActionCompleted,
            keys: this._itemViewerShortcuts?.[CarouselElement.playButton]?.keys || ITEM_VIEWER_PLAY_SHORTCUTS,
        }
        this._previousItemShortcut =  {
            onActionCompleted: this._itemViewerShortcuts?.[CarouselElement.previousButton]?.onActionCompleted,
            keys: this._itemViewerShortcuts?.[CarouselElement.previousButton]?.keys || ITEM_VIEWER_PREVIOUS_ITEM_SHORTCUTS,
        }
        this._seekBackwardsShortcut =  {
            onActionCompleted: this._itemViewerShortcuts?.[CarouselElement.seekBackButton]?.onActionCompleted,
            keys: this._itemViewerShortcuts?.[CarouselElement.seekBackButton]?.keys || ITEM_VIEWER_SEEK_BACKWARDS_SHORTCUTS,
        }
        this._seekForwardsShortcut =  {
            onActionCompleted: this._itemViewerShortcuts?.[CarouselElement.seekForwardButton]?.onActionCompleted,
            keys: this._itemViewerShortcuts?.[CarouselElement.seekForwardButton]?.keys || ITEM_VIEWER_SEEK_FORWARDS_SHORTCUTS,
        }

        this.isPauseSeparate =  !!this._itemViewerShortcuts[CarouselElement.pauseButton]?.keys;
    }

    get shouldReturnEmptyAction() {
        return !this._isFullscreenMode;
    }

    getAll(): GetAllResonse {
        return {
            keys: this.getAllKeys(),
            onActionCompleted: this.getAllOnActionCompleted(),
        }
    }

    getAllKeys(): GetAllKeysResponse {
        return {
            [CarouselElement.closeButton]: this._closeShortcut.keys,
            [CarouselElement.nextButton]: this._nextItemShortcut.keys,
            [CarouselElement.pauseButton]: this._pauseShortcut.keys,
            [CarouselElement.playButton]: this._playShortcut.keys,
            [CarouselElement.previousButton]: this._previousItemShortcut.keys,
            [CarouselElement.seekBackButton]: this._seekBackwardsShortcut.keys,
            [CarouselElement.seekForwardButton]: this._seekForwardsShortcut.keys,
        }
    }

    getAllOnActionCompleted(): GetAllOnActionCompleted {
        return {
            [CarouselElement.closeButton]: this._closeShortcut.onActionCompleted,
            [CarouselElement.nextButton]: this._nextItemShortcut.onActionCompleted,
            [CarouselElement.pauseButton]: this._pauseShortcut.onActionCompleted,
            [CarouselElement.playButton]: this._playShortcut.onActionCompleted,
            [CarouselElement.previousButton]: this._previousItemShortcut.onActionCompleted,
            [CarouselElement.seekBackButton]: this._seekBackwardsShortcut.onActionCompleted,
            [CarouselElement.seekForwardButton]: this._seekForwardsShortcut.onActionCompleted,
        }
    }

    getClose(): GetIndividualResponse {
        if (this.shouldReturnEmptyAction) return this._emptyAction;
        const keysToUse = [...this._closeShortcut.keys];
        if (!keysToUse.includes(ValidKey.escape)) {
            keysToUse.push(ValidKey.escape);
        }

        return {
            onActionCompleted: this._closeShortcut.onActionCompleted || this._doNothing,
            keys: keysToUse,
        }
    }

    getNextItem(): GetIndividualResponse {
        if (this.shouldReturnEmptyAction) return this._emptyAction;
        return {
            onActionCompleted: this._nextItemShortcut.onActionCompleted || this._doNothing,
            keys: this._nextItemShortcut.keys,
        }
    }

    getPause(): GetIndividualResponse {
        if (this.shouldReturnEmptyAction) return this._emptyAction;
        return {
            onActionCompleted: this._pauseShortcut.onActionCompleted || this._doNothing,
            keys: this._pauseShortcut.keys,
        }
    }

    getPlay(): GetIndividualResponse {
        if (this.shouldReturnEmptyAction) return this._emptyAction;
        return {
            onActionCompleted: this._playShortcut.onActionCompleted || this._doNothing,
            keys: this._playShortcut.keys,
        }
    }

    getPreviousItem(): GetIndividualResponse {
        if (this.shouldReturnEmptyAction) return this._emptyAction;
        return {
            onActionCompleted: this._previousItemShortcut.onActionCompleted || this._doNothing,
            keys: this._previousItemShortcut.keys,
        }
    }

    getSeekForwards(): GetIndividualResponse {
        if (this.shouldReturnEmptyAction) return this._emptyAction;
        return {
            onActionCompleted: this._seekForwardsShortcut.onActionCompleted || this._doNothing,
            keys: this._seekForwardsShortcut.keys,
        }
    }

    getSeekBackwards(): GetIndividualResponse {
        if (this.shouldReturnEmptyAction) return this._emptyAction;
        return {
            onActionCompleted: this._seekBackwardsShortcut.onActionCompleted || this._doNothing,
            keys: this._seekBackwardsShortcut.keys,
        }
    }
}