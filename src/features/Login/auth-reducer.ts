import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginParamType} from "../../common/types/types";
import {authAPI} from "../../api/api";


export const getAuthUserDataTC = createAsyncThunk('auth/me', async (param, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            return res.data.data
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
        id: null,
        login: '',
        email: '',
        isAuth: false,
        captchaUrl: ''
    } as initialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAuthUserDataTC.fulfilled, (state, action) => {
                (!state.isAuth) ? state.isAuth = true : state.isAuth = false;
                !state.id ? state.id = action.payload.id : state.id = null;
                !state.login ? state.login = action.payload.login : state.login = '';
                !state.email ? state.email = action.payload.email : state.email = ''

            })

    }
})

export const authReducer = slice.reducer

export type initialStateType = {
    id: number | null,
    email: string,
    login: string,
    isAuth: boolean
}