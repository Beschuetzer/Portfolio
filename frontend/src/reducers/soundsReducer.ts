import {
	SET_CURRENTLY_PLAYING_SOUND,
	SET_IS_LOADING_SOUND,
	SET_SOUNDS,
} from "../actions/types";
import { AudioItem } from "../components/AudioPlayer/AudioList";
import { Action } from "../models";

export interface LoadedSounds {
	loaded: { play: ((sound: string) => void) | null };
}

export interface SoundState {
	loaded: LoadedSounds;
	currentlyPlayingSound: AudioItem;
	isLoadingSound: boolean;
}

const INITIAL_STATE: SoundState = {
	loaded: {} as LoadedSounds,
	currentlyPlayingSound: {} as AudioItem,
	isLoadingSound: false,
};

const soundsReducer = (state = INITIAL_STATE, action: Action) => {
	switch (action.type) {
		case SET_CURRENTLY_PLAYING_SOUND:
			return {
				...state,
				currentlyPlayingSound: action.payload,
			};
		case SET_IS_LOADING_SOUND:
			return {
				...state,
				isLoadingSound: action.payload,
			};
		case SET_SOUNDS:
			return {
				...state,
				loaded: action.payload,
			};
		default:
			return state;
	}
};

export default soundsReducer;
