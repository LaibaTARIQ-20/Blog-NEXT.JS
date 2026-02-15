/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  filter: "all" | "posts" | "users" | "media";
  results: any[];
  loading: boolean;
}

const initialState: SearchState = {
  query: "",
  filter: "all",
  results: [],
  loading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<SearchState["filter"]>) => {
      state.filter = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.results = action.payload;
      state.loading = false;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.loading = false;
    },
  },
});

export const {
  setSearchQuery,
  setSearchFilter,
  setSearchResults,
  setSearchLoading,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
