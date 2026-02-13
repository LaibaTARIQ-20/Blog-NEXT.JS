/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  authSliderOpen: boolean;
  commentModalOpen: boolean;
  commentDetails: {
    id: string;
    name: string;
    username: string;
    text: string;
    timestamp: any;
  } | null;
}

const initialState: ModalState = {
  authSliderOpen: false,
  commentModalOpen: false,
  commentDetails: null,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openAuthSlider: (state) => {
      state.authSliderOpen = true;
    },
    closeAuthSlider: (state) => {
      state.authSliderOpen = false;
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
      state.commentDetails = null;
    },
    setCommentDetails: (
      state,
      action: PayloadAction<ModalState["commentDetails"]>,
    ) => {
      state.commentDetails = action.payload;
      state.commentModalOpen = true;
    },
  },
});

export const {
  openAuthSlider,
  closeAuthSlider,
  openCommentModal,
  closeCommentModal,
  setCommentDetails,
} = modalSlice.actions;

export default modalSlice.reducer;
