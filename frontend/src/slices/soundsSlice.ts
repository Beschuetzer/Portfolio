import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioItem } from '../components/AudioPlayer/AudioList';
import { RootState } from '../store';

export type SoundsSliceState = {
	currentlyPlayingSound: AudioItem;
	isLoadingSound: boolean;
  loaded: LoadedSounds;
}

export const soundsSliceInitialState: SoundsSliceState = {
	currentlyPlayingSound: {} as AudioItem,
	isLoadingSound: false,
	loaded: {} as LoadedSounds,
};

//#region Payloads and other Types
export interface LoadedSounds {
	loaded: { play: ((sound: string) => void) | null };
}
//#endregion

export const soundsSlice = createSlice({
  name: 'sounds',
  initialState: soundsSliceInitialState,
  reducers: {
    setCurrentlyPlayingSound: (state, action: PayloadAction<AudioItem>) => {
      state.currentlyPlayingSound = action.payload;
    },
    setIsLoadingSound: (state, action: PayloadAction<boolean>) => {
      state.isLoadingSound = action.payload;
    },
    setSounds: (state, action: PayloadAction<LoadedSounds>) => {
      state.loaded = action.payload;
    },
    
  },
});

//#region Selectors
export const currentlyPlayingSoundSelector = (state: RootState) => state[soundsSlice.name].currentlyPlayingSound;
export const isLoadingSoundSelector = (state: RootState) => state[soundsSlice.name].isLoadingSound;
export const loadedSoundsSelector = (state: RootState) => state[soundsSlice.name].loaded;
//#endregion

export const { 
  setCurrentlyPlayingSound,
  setIsLoadingSound,
  setSounds,
 } = soundsSlice.actions;