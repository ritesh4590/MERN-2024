import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from '../../config'

const initialState = {
  isLoading: false,
  data: [],
  isError: false
}

export const contact = createAsyncThunk("contact", async (contactData) => {
  const contact = config.post("/contact", contactData)
  return contact
})

const contactSlice = createSlice({
  name: "Contact",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(contact.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(contact.fulfilled, (state, action) => {
      state.data.push(action.payload)
    })
    builder.addCase(contact.rejected, (state, action) => {
      state.isLoading = true,
        state.isError = true
    })
  }
})

export default contactSlice.reducer