import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import github from '../apis/github';
import { RootState } from '../store';

export type GeneralSliceState = {
  currentlyViewingImage: string;
  error: string;
  headerHeight: number | null;
  isMobile: boolean | null;
  isSiteNavMinimized: boolean;
  previousUrl: string | null;
  repos: any[];
  scrollPercent: string;
  viewPortWidth: number | null;
}

export const generalSliceInitialState: GeneralSliceState = {
  currentlyViewingImage: '',
  error: '',
  headerHeight: null,
  isMobile: null,
  isSiteNavMinimized: false,
  previousUrl: null,
  repos: [],
  scrollPercent: "0%",
  viewPortWidth: null,
};

//#region Payloads and other Types
export type SetIsMobilePayload = {
  isMobile: boolean;
  viewPortWidth: number;
}
//#endregion

//#region Thunks
export const getRepositories = createAsyncThunk(
  'general/getRepositories',
  async () => {
    const query = 
      `query {
        viewer {
          repositories(first:100) {
            nodes {
              createdAt
              description
              name
              updatedAt
              repositoryTopics(first:100) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              homepageUrl
              url
            }
          }
        }
      }`;
    return github(query);
  }
)
//#endregion

export const generalSlice = createSlice({
  name: 'general',
  initialState: generalSliceInitialState,
  reducers: {
    setCurrentlyViewingCarouselImage: (state, action: PayloadAction<string>) => {
      state.currentlyViewingImage = action.payload;
    },
    setHeaderHeight: (state, action: PayloadAction<number>) => {
      state.headerHeight = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<SetIsMobilePayload>) => {
      const { isMobile, viewPortWidth } = action.payload
      state.isMobile = isMobile;
      state.viewPortWidth = viewPortWidth;
    },
    setIsSiteNavMinimized: (state, action: PayloadAction<boolean>) => {
      state.isSiteNavMinimized = action.payload;
    },
    setPreviousUrl: (state, action: PayloadAction<string>) => {
      state.previousUrl = action.payload;
    },
    setScrollPercent: (state, action: PayloadAction<string>) => {
      state.scrollPercent = action.payload;
    },
    setViewPortWidth: (state, action: PayloadAction<number>) => {
      state.viewPortWidth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRepositories.fulfilled, (state, action) => {
        state.repos = action.payload;
      })
      .addCase(getRepositories.rejected, (state, action) => {
        state.error = action.error?.message || '';
      })
  },
});

//#region Selectors
export const currentlyViewingImageSelector = (state: RootState) => state[generalSlice.name].currentlyViewingImage;
export const headerHeightSelector = (state: RootState) => state[generalSlice.name].headerHeight;
export const isMobileSelector = (state: RootState) => state[generalSlice.name].isMobile;
export const isSiteNavMinimizedSelector = (state: RootState) => state[generalSlice.name].isSiteNavMinimized;
export const previousUrlSelector = (state: RootState) => state[generalSlice.name].previousUrl;
export const reposSelector = (state: RootState) => state[generalSlice.name].repos;
export const scrollPercentSelector = (state: RootState) => state[generalSlice.name].scrollPercent;
export const viewPortWidthSelector = (state: RootState) => state[generalSlice.name].viewPortWidth;
//#endregion

export const { 
  setCurrentlyViewingCarouselImage,
  setHeaderHeight,
  setIsMobile,
  setIsSiteNavMinimized,
  setPreviousUrl,
  setScrollPercent,
  setViewPortWidth,
 } = generalSlice.actions;