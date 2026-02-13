import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './slices/modalSlice';
import userSlice from './slices/userSlice';
import loadingSlice from './slices/loadingSlice';
import postsSlice from './slices/postsSlice'; // ← ADD

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    loading: loadingSlice,
    posts: postsSlice, // ← ADD
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;