import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  username: localStorage.getItem("username"),
  email: null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setName(state, action: PayloadAction<string>) {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});

export const { saveToken, setName, setEmail } = authSlice.actions;
export default authSlice.reducer;
