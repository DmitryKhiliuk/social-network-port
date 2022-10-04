import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginParamType} from "../../common/types/types";
import {authAPI} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";


export const getAuthUserDataTC = createAsyncThunk('auth/me', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        }
    } catch (error) {

    }
})

export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamType, thunkAPI) => {
    try {
        let res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(getAuthUserDataTC())
        }
    } catch (error) {

    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    try {
        let res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(getAuthUserDataTC())
        }
    } catch (error) {

    }
})


const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
    } as initialStateType,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getAuthUserDataTC.fulfilled, (state, action) => {
                (!state.isAuth) ? state.isAuth = true : state.isAuth = false;

            })

    }
})

export const authReducer = slice.reducer



export type initialStateType = {
    isAuth: boolean
}