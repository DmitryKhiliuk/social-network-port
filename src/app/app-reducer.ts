import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";
import {setIsAuthAC} from "../features/Login/auth-reducer";



export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsAuthAC({isAuth: true, id: res.data.data.id}))

    }
})

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: 'idle' | 'loading' | 'succeeded' | 'failed' }>) {
            state.status = action.payload.status
        },
},
extraReducers: builder => {
    builder
        .addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
        })
}
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions

export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    isInitialized: boolean
}