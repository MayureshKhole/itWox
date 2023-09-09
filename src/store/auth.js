import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  formData: null,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.formData = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.formData = null;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
