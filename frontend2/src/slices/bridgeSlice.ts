import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type BridgeSliceState = {
  bridgeCards: any[] | null;
  bridgeSections: NodeListOf<Element> | null;
  clickedBridgeInfoButtonCount: number;
  currentBridgeSection: number;
  featureSectionTitle: string;
  hasClickedALink: boolean;
  isCardVideoOpen: boolean;
  lastSecondRowCardNumber: number;
}

export const bridgeSliceInitialState: BridgeSliceState = {
  bridgeCards: null,
  bridgeSections: null,
  clickedBridgeInfoButtonCount: 0,
  currentBridgeSection: 0,
  featureSectionTitle: 'Pick a card any card...',
  hasClickedALink: false,
  isCardVideoOpen: false,
  lastSecondRowCardNumber: 5,
};

//#region Payloads and other Types
//#endregion

//#region Thunks
//#endregion

export const bridgeSlice = createSlice({
  name: 'bridge',
  initialState: bridgeSliceInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setBridgeCards: (state, action: PayloadAction<any[]>) => {
      state.bridgeCards = action.payload;
    },
    setBridgeFeatureSectionTitle: (state, action: PayloadAction<string>) => {
      state.featureSectionTitle = action.payload;
    },
    setBridgeSections: (state, action: PayloadAction<NodeListOf<Element> | null>) => {
      state.bridgeSections = action.payload as any;
    },
    setClickedBridgeInfoButtonCount: (state, action: PayloadAction<number>) => {
      state.clickedBridgeInfoButtonCount = action.payload;
    },
    setCurrentBridgeSection: (state, action: PayloadAction<number>) => {
      state.currentBridgeSection = action.payload;
    },
    setHasClickedALink: (state, action: PayloadAction<boolean>) => {
      state.hasClickedALink = action.payload;
    },
    setIsCardVideoOpen: (state, action: PayloadAction<boolean>) => {
      state.isCardVideoOpen = action.payload;
    },
    setLastSecondRowCardNumber: (state, action: PayloadAction<number>) => {
      state.lastSecondRowCardNumber = action.payload;
    },
  },
});

//#region Selectors
export const bridgeCardsSelector = (state: RootState) => state[bridgeSlice.name].bridgeCards;
export const bridgeSectionsSelector = (state: RootState) => state[bridgeSlice.name].bridgeSections;
export const clickedBridgeInfoButtonCountSelector = (state: RootState) => state[bridgeSlice.name].clickedBridgeInfoButtonCount;
export const currentBridgeSectionSelector = (state: RootState) => state[bridgeSlice.name].currentBridgeSection;
export const featureSectionTitleSelector = (state: RootState) => state[bridgeSlice.name].featureSectionTitle;
export const hasClickedALinkSelector = (state: RootState) => state[bridgeSlice.name].hasClickedALink;
export const isCardVideoOpenSelector = (state: RootState) => state[bridgeSlice.name].isCardVideoOpen;
export const lastSecondRowCardNumberSelector = (state: RootState) => state[bridgeSlice.name].lastSecondRowCardNumber;
//#endregion

export const { 
  setBridgeCards,
  setBridgeFeatureSectionTitle,
  setBridgeSections,
  setClickedBridgeInfoButtonCount,
  setCurrentBridgeSection,
  setHasClickedALink,
  setIsCardVideoOpen,
  setLastSecondRowCardNumber,
 } = bridgeSlice.actions;