import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

const initialState = {
  isLoading: false,
  data: "",
  isError: false,
};

export const register = createAsyncThunk("register", async (postData) => {
  const { data } = await config.post("/register", postData);
  return data;
});

const registerSlice = createSlice({
  name: "Register",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload
    });
    builder.addCase(register.rejected, (state, action) => {
      (state.isLoading = true), (state.isError = true);
    });
  },
});

export default registerSlice.reducer
