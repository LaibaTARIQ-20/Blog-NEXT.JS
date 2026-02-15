import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const initialState: UIState = {
  theme: 'light',
  sidebarCollapsed: false,
  fontSize: 'medium',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { toggleTheme, toggleSidebar, setFontSize } = uiSlice.actions;
export default uiSlice.reducer;