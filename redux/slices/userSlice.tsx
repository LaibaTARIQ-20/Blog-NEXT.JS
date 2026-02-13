import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string;
  email: string;
  name: string;
  username: string;
  photoUrl: string;
}

const initialState: UserState = {
  uid: "",
  email: "",
  name: "",
  username: "",
  photoUrl: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.photoUrl = action.payload.photoUrl;
    },
    signOutUser: (state) => {
      state.uid = "";
      state.email = "";
      state.name = "";
      state.username = "";
      state.photoUrl = "";
    },
  },
});

export const { setUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
