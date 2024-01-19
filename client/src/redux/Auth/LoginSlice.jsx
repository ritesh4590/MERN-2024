import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import config from '../../config'

const initialState = {
    isLoading: false,
    data: '',
    isError: '',
    token: ""
}

export const login = createAsyncThunk("login", async (loginData) => {
    const { data } = await config.post("/login", loginData)
    return data
})

const loginSlice = createSlice({
    name: "Login",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(login.rejected, (state, action) => {
            console.log("Login Error action:", action)
            state.isLoading = true,
                state.isError = true
        })
    }

})

export default loginSlice.reducer 