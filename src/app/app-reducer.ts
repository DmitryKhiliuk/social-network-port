import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";
import {getAuthUserDataTC} from "../features/Login/auth-reducer";


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())

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
        initializeAppAC(state, action: PayloadAction<{ isInitialized: boolean } >){
            state.isInitialized = action.payload.isInitialized
        },
},
extraReducers: builder => {
    /*builder
        .addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
            console.log('init')
        })*/
}
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, initializeAppAC} = slice.actions

export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    isInitialized: boolean
}