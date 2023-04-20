import { ITEM_VIEWER_CLOSE_SHORTCUTS, ITEM_VIEWER_NEXT_ITEM_SHORTCUTS, ITEM_VIEWER_PLAY_SHORTCUTS, ITEM_VIEWER_PREVIOUS_ITEM_SHORTCUTS, ITEM_VIEWER_SEEK_BACKWARDS_SHORTCUTS, ITEM_VIEWER_SEEK_FORWARDS_SHORTCUTS } from "../constants";
import { KeyInput, ValidKey } from "../hooks/useKeyboardShortcuts";
import { CarouselItemViewerActions, CarouselOptions, CarouselAction, CarouselActionOnActionCompleted } from "../types";

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
export class ToolbarActionsLogic {
    private _itemViewerShortcuts: CarouselItemViewerActions;
    private _doNothing = () => null;
    
    private _closeShortcut: CarouselAction;
    private _nextItemShortcut: CarouselAction;
    private _pauseShortcut: CarouselAction;
    private _playShortcut: CarouselAction;
    private _previousItemShortcut: CarouselAction;
    private _seekBackwardsShortcut: CarouselAction;
    private _seekForwardsShortcut: CarouselAction;
    
    constructor(public options: CarouselOptions) {
        this._itemViewerShortcuts = options?.shortcuts?.itemViewer || {};
        this._closeShortcut =  {
            onActionCompleted: this._itemViewerShortcuts.close?.onActionCompleted,
            keys: this._itemViewerShortcuts.close?.keys || ITEM_VIEWER_CLOSE_SHORTCUTS,
        }
        this._nextItemShortcut =  {
            onActionCompleted: this._itemViewerShortcuts.nextItem?.onActionCompleted,
            keys: this._itemViewerShortcuts.nextItem?.keys || ITEM_VIEWER_NEXT_ITEM_SHORTCUTS,
        }
        this._pauseShortcut =  {
            onActionCompleted: this._itemViewerShortcuts.pause?.onActionCompleted,
            keys: this._itemViewerShortcuts.pause?.keys || ITEM_VIEWER_PLAY_SHORTCUTS,
        }
        this._playShortcut =  {
            onActionCompleted: this._itemViewerShortcuts.play?.onActionCompleted,
            keys: this._itemViewerShortcuts.play?.keys || ITEM_VIEWER_PLAY_SHORTCUTS,
        }
        this._previousItemShortcut =  {
            onActionCompleted: this._itemViewerShortcuts.previousItem?.onActionCompleted,
            keys: this._itemViewerShortcuts.previousItem?.keys || ITEM_VIEWER_PREVIOUS_ITEM_SHORTCUTS,
        }
        this._seekBackwardsShortcut =  {
            onActionCompleted: this._itemViewerShortcuts.seekBackwards?.onActionCompleted,
            keys: this._itemViewerShortcuts.seekBackwards?.keys || ITEM_VIEWER_SEEK_BACKWARDS_SHORTCUTS,
        }
        this._seekForwardsShortcut =  {
            onActionCompleted: this._itemViewerShortcuts.seekForwards?.onActionCompleted,
            keys: this._itemViewerShortcuts.seekForwards?.keys || ITEM_VIEWER_SEEK_FORWARDS_SHORTCUTS,
        }
    }

    getAll(): GetAllResonse {
        return {
            keys: this.getAllKeys(),
            onActionCompleted: this.getAllOnActionCompleted(),
        }
    }

    getAllKeys(): GetAllKeysResponse {
        return {
            close: this._closeShortcut.keys,
            nextItem: this._nextItemShortcut.keys,
            pause: this._pauseShortcut.keys,
            play: this._playShortcut.keys,
            previousItem: this._previousItemShortcut.keys,
            seekBackwards: this._seekBackwardsShortcut.keys,
            seekForwards: this._seekForwardsShortcut.keys,
        }
    }

    getAllOnActionCompleted(): GetAllOnActionCompleted {
        return {
            close: this._closeShortcut.onActionCompleted,
            nextItem: this._nextItemShortcut.onActionCompleted,
            pause: this._pauseShortcut.onActionCompleted,
            play: this._playShortcut.onActionCompleted,
            previousItem: this._previousItemShortcut.onActionCompleted,
            seekBackwards: this._seekBackwardsShortcut.onActionCompleted,
            seekForwards: this._seekForwardsShortcut.onActionCompleted,
        }
    }

    getClose(): GetIndividualResponse {
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
        return {
            onActionCompleted: this._nextItemShortcut.onActionCompleted || this._doNothing,
            keys: this._nextItemShortcut.keys,
        }
    }

    getPause(): GetIndividualResponse {
        return {
            onActionCompleted: this._pauseShortcut.onActionCompleted || this._doNothing,
            keys: this._pauseShortcut.keys,
        }
    }

    getPlay(): GetIndividualResponse {
        return {
            onActionCompleted: this._playShortcut.onActionCompleted || this._doNothing,
            keys: this._playShortcut.keys,
        }
    }

    getPreviousItem(): GetIndividualResponse {
        return {
            onActionCompleted: this._previousItemShortcut.onActionCompleted || this._doNothing,
            keys: this._previousItemShortcut.keys,
        }
    }

    getSeekForwards(): GetIndividualResponse {
        return {
            onActionCompleted: this._seekForwardsShortcut.onActionCompleted || this._doNothing,
            keys: this._seekForwardsShortcut.keys,
        }
    }

    getSeekBackwards(): GetIndividualResponse {
        return {
            onActionCompleted: this._seekBackwardsShortcut.onActionCompleted || this._doNothing,
            keys: this._seekBackwardsShortcut.keys,
        }
    }
}