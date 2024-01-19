import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from '../../config'


const initialState = {
  isLoading: false,
  data: '',
  isError: false
}

export const fetchUser = createAsyncThunk("user", async ({ token }) => {
  const { data } = await config.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
})

const userSlice = createSlice({
  name: "User",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false,
        state.data = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = true,
        state.isError = true
    })
  }
})

export default userSlice.reducer